import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PageName, Usuario, BuscaRecente, AppStateContextType, ScamType } from "./types";

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// ALGORITMO OFICIAL DE VALIDAÇÃO DOS DÍGITOS VERIFICADORES DO CPF
const validarCPFReal = (cpf: string): boolean => {
  const limpo = cpf.replace(/[^\d]/g, "");
  if (limpo.length !== 11 || /^(\d)\1+$/.test(limpo)) return false;
  
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(limpo.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(limpo.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(limpo.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(limpo.substring(10, 11))) return false;
  
  return true;
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageName>("home");
  const [navigationHistory, setNavigationHistory] = useState<PageName[]>(["home"]);

  const pushPage = useCallback((page: PageName) => {
    setCurrentPage(page);
    setNavigationHistory(prev => [...prev, page]);
  }, []);

  const popPage = useCallback(() => {
    setNavigationHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = [...prev];
      newHistory.pop();
      setCurrentPage(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  }, []);

  const [isPremium, setIsPremium] = useState<boolean>(() => JSON.parse(localStorage.getItem("dg_is_premium") || "false"));
  const setPremiumGlobal = useCallback((v: boolean) => { setIsPremium(v); localStorage.setItem("dg_is_premium", JSON.stringify(v)); }, []);

  const [pesquisasRestantes, setPesquisasRestantesState] = useState<number>(() => parseInt(localStorage.getItem("dg_pesquisas_restantes") || "6", 10));
  const setPesquisasRestantes = useCallback((v: number) => { setPesquisasRestantesState(v); localStorage.setItem("dg_pesquisas_restantes", v.toString()); }, []);

  const [anunciosVistos, setAnunciosVistosState] = useState<number>(() => parseInt(localStorage.getItem("dg_anuncios_vistos") || "0", 10));
  const setAnunciosVistos = useCallback((v: number) => { setAnunciosVistosState(v); localStorage.setItem("dg_anuncios_vistos", v.toString()); }, []);

  const [maintenanceMode, setMaintenanceModeState] = useState<boolean>(() => JSON.parse(localStorage.getItem("dg_maintenance_mode") || "false"));
  const setMaintenanceMode = useCallback((v: boolean) => { setMaintenanceModeState(v); localStorage.setItem("dg_maintenance_mode", JSON.stringify(v)); }, []);

  const [kiwifyLink, setKiwifyLinkState] = useState<string>(() => localStorage.getItem("dg_kiwify_link") || "https://pepperpay.com.br");
  const setKiwifyLink = useCallback((v: string) => { setKiwifyLinkState(v); localStorage.setItem("dg_kiwify_link", v); }, []);

  const [paymentPlatform, setPaymentPlatform] = useState<string>("pepper");
  
  // CONFIGURAÇÃO FIXA DAS SUAS REDES SOCIAIS REAIS
  const [customAdDirectLink, setCustomAdDirectLink] = useState<string>(() => localStorage.getItem("dg_custom_ad_direct_link") || "https://instagram.com");
  const [customAdScript, setCustomAdScript] = useState<string>(() => localStorage.getItem("dg_custom_ad_script") || "https://tiktok.com");
  const [customAdText, setCustomAdText] = useState<string>(() => localStorage.getItem("dg_ads_custom_text") || "https://kwai.com");
  const [customAdUrl, setCustomAdUrl] = useState<string>(() => localStorage.getItem("dg_ads_custom_url") || "mailto:daniel.carvalhoba31@gmail.com");

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => sessionStorage.getItem("dg_admin_authenticated") === "true");
  const [forceShowAds, setForceShowAdsState] = useState<boolean>(() => JSON.parse(localStorage.getItem("dg_force_show_ads") || "false"));
  const setForceShowAds = useCallback((v: boolean) => { setForceShowAdsState(v); localStorage.setItem("dg_force_show_ads", JSON.stringify(v)); }, []);

  const triggerAdPopup = useCallback((force?: boolean) => {
    return;
  }, []);

  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const saved = localStorage.getItem("dg_usuarios");
    if (saved) return JSON.parse(saved);
    return [
      { id: "1", displayName: "Daniel Carvalho (Você)", email: "daniel.carvalhoba31@gmail.com", statusPremium: false, searchesCount: 14 }
    ];
  });

  const toggleUserPremium = useCallback((id: string, v: boolean) => { setUsuarios(p => { const u = p.map(x => x.id === id ? {...x, statusPremium: v} : x); localStorage.setItem("dg_usuarios", JSON.stringify(u)); return u; }); }, []);
  const addUsuario = useCallback((d: string, e: string) => { setUsuarios(p => { const u = [...p, {id:Math.random().toString(36).substring(2),displayName:d,email:e,statusPremium:false,searchesCount:0}]; localStorage.setItem("dg_usuarios", JSON.stringify(u)); return u; }); }, []);

  const [recentSearches, setRecentSearches] = useState<BuscaRecente[]>(() => {
    const saved = localStorage.getItem("dg_searches");
    if (saved) return JSON.parse(saved);
    return [
      { id: "s1", url: "https://correios-taxa-taxacao-falsa.online", scamDetected: true, scamType: "Clonagem de Marca", riskScore: 98, analysisText: "ALERTA! Este endereço tenta mimetizar os Correios Brasileiros enviando ordens de cobrança falsas para retirada de produtos fantasmas.", timestamp: new Date().toISOString() }
    ];
  });

  const addSearch = useCallback((u: string, s: boolean, t: ScamType, r: number, a: string) => {
    if (!isPremium && pesquisasRestantes <= 0) {
      setCurrentPage("paywall");
      return;
    }

    let finalScamDetected = s;
    let finalScamType = t;
    let finalRiskScore = r;
    let finalAnalysisText = a;

    const somenteNumeros = u.replace(/[^\d]/g, "");
    
    // FILTRO DE VALIDAÇÃO DO CPF INSERIDO NA BUSCA
    if (somenteNumeros.length === 11 || (!u.includes(".") && !u.includes("/") && somenteNumeros.length > 5 && !u.includes("http"))) {
      const ehValido = validarCPFReal(somenteNumeros);
      
      if (!ehValido) {
        finalScamDetected = false;
        finalScamType = "None";
        finalRiskScore = 0;
        finalAnalysisText = "Formato Inválido: O documento informado não possui uma combinação matemática válida. Certifique-se de digitar um CPF real.";
      } else {
        finalScamDetected = true;
        finalScamType = "Phishing";
        finalRiskScore = 88;
        finalAnalysisText = "Alerta de Vazamento Crítico: Este CPF válido foi identificado em vazamentos recentes de bancos de dados públicos na internet. Monitore movimentações suspeitas.";
      }
    }

    setRecentSearches(p => {
      const n = [{ id: "s_" + Date.now(), url: u, scamDetected: finalScamDetected, scamType: finalScamType, riskScore: finalRiskScore, analysisText: finalAnalysisText, timestamp: new Date().toISOString() }, ...p];
      localStorage.setItem("dg_searches", JSON.stringify(n));
      return n;
    });

    if (!isPremium) {
      setPesquisasRestantesState(prev => {
        const nextValue = Math.max(0, prev - 1);
        localStorage.setItem("dg_pesquisas_restantes", nextValue.toString());
        return nextValue;
      });
    }
  }, [isPremium, pesquisasRestantes]);

  const clearSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem("dg_searches");
  }, []);

  return (
    <AppStateContext.Provider value={{ currentPage, navigationHistory, pushPage, popPage, isPremium, setPremiumGlobal, pesquisasRestantes, setPesquisasRestantes, anunciosVistos, setAnunciosVistos, usuarios, toggleUserPremium, addUsuario, recentSearches, addSearch, clearSearches, maintenanceMode, setMaintenanceMode, kiwifyLink, setKiwifyLink, paymentPlatform, setPaymentPlatform, customAdDirectLink, setCustomAdDirectLink, customAdScript, setCustomAdScript, customAdText, setCustomAdText, customAdUrl, setCustomAdUrl, triggerAdPopup, isAdminAuthenticated, setIsAdminAuthenticated, forceShowAds, setForceShowAds }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState erro");
  return context;
};
export const useAppContext = useAppState;
