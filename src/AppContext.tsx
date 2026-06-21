import React, { createContext, useContext, useState, useEffect } from "react";
import { PageName, Usuario, BuscaRecente, AppStateContextType } from "./types";

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State with custom history
  const [currentPage, setCurrentPage] = useState<PageName>("home");
  const [navigationHistory, setNavigationHistory] = useState<PageName[]>(["home"]);

  const pushPage = (page: PageName) => {
    setCurrentPage(page);
    setNavigationHistory(prev => [...prev, page]);
  };

  const popPage = () => {
    if (navigationHistory.length <= 1) return;
    const newHistory = [...navigationHistory];
    newHistory.pop(); // remove current
    const previousPage = newHistory[newHistory.length - 1];
    setNavigationHistory(newHistory);
    setCurrentPage(previousPage);
  };

  // Premium & Scan variables loaded/persisted from localStorage
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    const saved = localStorage.getItem("dg_is_premium");
    return saved ? JSON.parse(saved) : false;
  });

  const [pesquisasRestantes, setPesquisasRestantes] = useState<number>(() => {
    const saved = localStorage.getItem("dg_pesquisas_restantes");
    return saved ? parseInt(saved, 10) : 3; // Starts with 3 scans
  });

  const [anunciosVistos, setAnunciosVistos] = useState<number>(() => {
    const saved = localStorage.getItem("dg_anuncios_vistos");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("dg_maintenance_mode");
    return saved ? JSON.parse(saved) : false;
  });

  const [kiwifyLink, setKiwifyLink] = useState<string>(() => {
    const saved = localStorage.getItem("dg_kiwify_link");
    if (!saved || saved.includes("kiwify") || saved.includes("Deck1ag") || saved === "" || saved.includes("perfectpay") || saved.includes("mercadopago")) {
      return "https://go.pepperpay.com.br/xtkbe";
    }
    return saved;
  });

  const [paymentPlatform, setPaymentPlatform] = useState<string>(() => {
    return "pepper";
  });

  // Force Pepper and the user's specific checkout link on mount to clean up any old cached state
  useEffect(() => {
    setPaymentPlatform("pepper");
    localStorage.setItem("dg_payment_platform", "pepper");
    
    const savedLink = localStorage.getItem("dg_kiwify_link");
    if (!savedLink || savedLink.includes("kiwify") || savedLink.includes("Deck1ag") || savedLink === "" || savedLink.includes("perfectpay") || savedLink.includes("mercadopago")) {
      setKiwifyLink("https://go.pepperpay.com.br/xtkbe");
      localStorage.setItem("dg_kiwify_link", "https://go.pepperpay.com.br/xtkbe");
    }
  }, []);

  // Pre-seeded users simulation
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const saved = localStorage.getItem("dg_usuarios");
    if (saved) return JSON.parse(saved);
    return [
      { id: "1", displayName: "Daniel Carvalho (Você)", email: "Daniel.carvalhoba31@gmail.com", statusPremium: false, searchesCount: 14 },
      { id: "2", displayName: "Ana Souza", email: "ana.souza@gmail.com", statusPremium: true, searchesCount: 42 },
      { id: "3", displayName: "Lucas Rocha", email: "lucas.rocha@gmail.com", statusPremium: false, searchesCount: 5 },
      { id: "4", displayName: "Mariana Costa", email: "mariana.costa@hotmail.com", statusPremium: true, searchesCount: 119 },
      { id: "5", displayName: "Guilherme Santos", email: "guilherme.santos@gmail.com", statusPremium: false, searchesCount: 0 }
    ];
  });

  // Pre-seeded searches dashboard simulation
  const [recentSearches, setRecentSearches] = useState<BuscaRecente[]>(() => {
    const saved = localStorage.getItem("dg_searches");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "s1",
        url: "https://correios-taxa-taxacao-falsa.online/rastreamento",
        scamDetected: true,
        scamType: "Clonagem de Marca",
        riskScore: 98,
        analysisText: "🚨 ALERTA! Este endereço tenta mimetizar os Correios Brasileiros enviando ordens de cobrança falsas para retirada de produtos fantasmas.",
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        detectedBrand: "Correios do Brasil",
        maliciousIndicators: ["Uso de domínio não governamental (.online)", "Gateways de Pix fraudulentos", "Mensagens alarmantes de urgência"]
      },
      {
        id: "s2",
        url: "http://sorteios-instagram-iphone-gratis.site/cadastro",
        scamDetected: true,
        scamType: "Phishing",
        riskScore: 95,
        analysisText: "🚨 PHISHING DETECTADO! Ofertas de eletrônicos ou carros de alto luxo de graça mediante preenchimento de pesquisas invasivas.",
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        detectedBrand: "Instagram Oficial",
        maliciousIndicators: ["Domínio suspeito sem criptografia SSL", "Falsos comentários simulados na barra lateral"]
      },
      {
        id: "s3",
        url: "https://governo-taxas-cadastro-receita.com/cpf-desregular",
        scamDetected: true,
        scamType: "Golpe do Pix",
        riskScore: 91,
        analysisText: "🚨 GOLPE DO PIX! Solicita faturamento de guias falsas sob pena fictícia de perda ou cancelamento de CPF.",
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        detectedBrand: "Receita Federal",
        maliciousIndicators: ["Cobrança de taxas para serviços públicos gratuitos", "Domínio sem terminação oficial '.gov.br'"]
      },
      {
        id: "s4",
        url: "https://www.google.com/?q=seguranca",
        scamDetected: false,
        scamType: "None",
        riskScore: 2,
        analysisText: "✅ LINK SEGURO! Google é um motor de busca global seguro e institucionalmente verificado.",
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        detectedBrand: "Google Inc.",
        maliciousIndicators: []
      }
    ];
  });

  // Sync state variables with local storage to endure reloads
  useEffect(() => {
    localStorage.setItem("dg_is_premium", JSON.stringify(isPremium));
    
    // Automatically match the user's local isPremium with the Admin user ID index 1 (Daniel Carvalho)
    setUsuarios(prev => prev.map(u => u.id === "1" ? { ...u, statusPremium: isPremium } : u));
  }, [isPremium]);

  useEffect(() => {
    localStorage.setItem("dg_pesquisas_restantes", pesquisasRestantes.toString());
  }, [pesquisasRestantes]);

  useEffect(() => {
    localStorage.setItem("dg_anuncios_vistos", anunciosVistos.toString());
  }, [anunciosVistos]);

  useEffect(() => {
    localStorage.setItem("dg_usuarios", JSON.stringify(usuarios));
    // If the Admin toggled Daniel's premium status, it should reflect globally
    const daniel = usuarios.find(u => u.id === "1");
    if (daniel && daniel.statusPremium !== isPremium) {
      setIsPremium(daniel.statusPremium);
    }
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("dg_searches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem("dg_maintenance_mode", JSON.stringify(maintenanceMode));
  }, [maintenanceMode]);

  useEffect(() => {
    localStorage.setItem("dg_kiwify_link", kiwifyLink);
  }, [kiwifyLink]);

  useEffect(() => {
    localStorage.setItem("dg_payment_platform", paymentPlatform);
  }, [paymentPlatform]);

  // Actions
  const setPremiumGlobal = (value: boolean) => {
    setIsPremium(value);
  };

  const toggleUserPremium = (id: string, value: boolean) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, statusPremium: value } : u));
    
    // If we toggled 'Daniel Carvalho' (id: '1'), reflect on main state
    if (id === "1") {
      setIsPremium(value);
    }
  };

  const addUsuario = (displayName: string, email: string) => {
    const isFirstPremium = email.toLowerCase().includes("premium");
    const newU: Usuario = {
      id: Date.now().toString(),
      displayName,
      email,
      statusPremium: isFirstPremium,
      searchesCount: 0
    };
    setUsuarios(prev => [newU, ...prev]);
  };

  const addSearch = (
    url: string,
    scamDetected: boolean,
    scamType: "Phishing" | "Golpe do Pix" | "Venda Falsa" | "Clonagem de Marca" | "None",
    riskScore: number,
    analysisText: string,
    brand?: string,
    indicators?: string[]
  ) => {
    const newSearch: BuscaRecente = {
      id: Date.now().toString(),
      url,
      scamDetected,
      scamType,
      riskScore,
      analysisText,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      detectedBrand: brand || "Nenhuma",
      maliciousIndicators: indicators || []
    };
    setRecentSearches(prev => [newSearch, ...prev]);
  };

  const clearSearches = () => {
    setRecentSearches([]);
  };

  return (
    <AppStateContext.Provider
      value={{
        currentPage,
        navigationHistory,
        pushPage,
        popPage,
        isPremium,
        setPremiumGlobal,
        pesquisasRestantes,
        setPesquisasRestantes,
        anunciosVistos,
        setAnunciosVistos,
        usuarios,
        toggleUserPremium,
        addUsuario,
        recentSearches,
        addSearch,
        clearSearches,
        maintenanceMode,
        setMaintenanceMode,
        kiwifyLink,
        setKiwifyLink,
        paymentPlatform,
        setPaymentPlatform
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppStateProvider");
  }
  return context;
};
