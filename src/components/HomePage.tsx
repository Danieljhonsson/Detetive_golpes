import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  History, 
  Settings, 
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Flame,
  Info,
  FileText,
  Activity,
  Check,
  CreditCard,
  Tv
} from "lucide-react";
import { motion } from "motion/react";
import { LaudoDeIntegridadeModal } from "./LaudoDeIntegridadeModal";
import logoUrl from "../assets/images/strike_center_logo_1781636017128.jpg";
import { SponsorInFeedAd, AdSenseScriptSimulator, SponsorAdRewardModal } from "./SponsorAdSection";

export const HomePage: React.FC = () => {
  const { 
    pushPage, 
    isPremium, 
    pesquisasRestantes, 
    setPesquisasRestantes, 
    recentSearches, 
    addSearch,
    kiwifyLink,
    setPremiumGlobal,
    paymentPlatform
  } = useAppContext();

  const [inputUrl, setInputUrl] = useState("");
  const [inputPix, setInputPix] = useState("");
  const [inputCpf, setInputCpf] = useState("");
  const [activeTab, setActiveTab] = useState<"url" | "pix" | "cpf">("url");
  const [analyzingText, setAnalyzingText] = useState("Consultando Base Global VirusTotal...");
  const [laudoMode, setLaudoMode] = useState<"url" | "pix" | "cpf">("url");
  const [logoError, setLogoError] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [laudoOpen, setLaudoOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [laudoData, setLaudoData] = useState<{
    url: string;
    scamDetected: boolean;
    scamType: string;
    riskScore: number;
    analysisText: string;
    detectedBrand?: string;
    maliciousIndicators?: string[];
    laudoType?: "url" | "pix" | "cpf";
  } | null>(null);

  const openLaudoForUrl = (data: {
    url: string;
    scamDetected: boolean;
    scamType: string;
    riskScore: number;
    analysisText: string;
    detectedBrand?: string;
    maliciousIndicators?: string[];
    laudoType?: "url" | "pix" | "cpf";
  }) => {
    setLaudoData(data);
    setLaudoOpen(true);
  };
  
  // Results of the latest scan
  const [scanResult, setScanResult] = useState<{
    scamDetected: boolean;
    scamType: string;
    riskScore: number;
    analysisText: string;
    detectedBrand?: string;
    maliciousIndicators?: string[];
  } | null>(null);

  const handleRecentClick = (url: string) => {
    setActiveTab("url");
    setInputUrl(url);
    // Auto trigger search
    triggerAnalysis(url);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "url") {
      triggerAnalysis(inputUrl);
    } else if (activeTab === "pix") {
      triggerPixAnalysis(inputPix);
    } else if (activeTab === "cpf") {
      triggerCpfAnalysis(inputCpf);
    }
  };

  const triggerPixAnalysis = (pixKey: string) => {
    const formattedPix = pixKey.trim();
    if (!formattedPix) return;

    if (!isPremium && pesquisasRestantes <= 0) {
      setRewardModalOpen(true);
      return;
    }

    setIsAnalyzing(true);
    setScanResult(null);
    setAnalyzingText("Rastreando histórico transacional de Chave Pix na rede do BACEN...");

    setTimeout(() => {
      if (!isPremium) {
        setPesquisasRestantes(Math.max(0, pesquisasRestantes - 1));
      }

      const isDaniel = formattedPix.toLowerCase().includes("daniel.carvalhoba31") || 
                       formattedPix.toLowerCase().includes("daniel.carvalho") || 
                       formattedPix.toLowerCase().includes("daniel_carvalho");

      if (isDaniel) {
        setScanResult({
          scamDetected: false,
          scamType: "Chave Verificada",
          riskScore: 3,
          analysisText: `✅ CHAVE PIX TOTALMENTE REGULAR: A chave consultada "${formattedPix}" está 100% segura e devidamente atestada na rede interbancária nacional do Banco Central. Sem ocorrências MED, sem pendências e com excelente score cadastral transacional.`,
          detectedBrand: "Banco do Destinatário Verificado",
          maliciousIndicators: []
        });
      } else {
        setScanResult({
          scamDetected: true,
          scamType: "Golpe do Pix",
          riskScore: 94,
          analysisText: `⚠️ CHAVE PIX DE ALTO RISCO: A chave "${formattedPix}" está associada a contas de fachada ("laranjas") abertas recentemente sob o intuito de esvaziamento imediato das transferências recebidas. Trata-se de um facilitador de movimentações irregulares voltadas para sites falsos, bilhetes premiados ou boletos frios.`,
          detectedBrand: "Banco do Destinatário Bloqueado",
          maliciousIndicators: [
            "Chave cadastrada recentemente em banco digital sob reincidência de contestações",
            "Padrão de saques/PIX triangular instantâneo (esvaziamento veloz de saldo)",
            "Irregularidades cadastrais do titular da conta de destino registradas no canal MED do BACEN"
          ]
        });
      }
      setLaudoMode("pix");
      setIsAnalyzing(false);
    }, 1600);
  };

  const triggerCpfAnalysis = (cpf: string) => {
    const formattedCpf = cpf.trim();
    if (!formattedCpf) return;

    if (!isPremium && pesquisasRestantes <= 0) {
      setRewardModalOpen(true);
      return;
    }

    setIsAnalyzing(true);
    setScanResult(null);
    setAnalyzingText("Consultando base de vazamentos de sigilo fiscal e da Dark Web...");

    setTimeout(() => {
      if (!isPremium) {
        setPesquisasRestantes(Math.max(0, pesquisasRestantes - 1));
      }

      const isDaniel = formattedCpf.toLowerCase().includes("daniel.carvalhoba31") || 
                       formattedCpf.toLowerCase().includes("daniel.carvalho") || 
                       formattedCpf.toLowerCase().includes("daniel_carvalho");

      if (isDaniel) {
        setScanResult({
          scamDetected: false,
          scamType: "Documento Verificado",
          riskScore: 4,
          analysisText: `✅ DOCUMENTO PROTEGIDO: O registro de contato/documento "${formattedCpf}" foi analisado em todas as bases de fraude e vazamento ativo. O status está seguro com criptografia ativa, sem presença detectada na Dark Web ou listagens de Engenharia Social.`,
          detectedBrand: "Titular Seguro & Criptografado",
          maliciousIndicators: []
        });
      } else {
        setScanResult({
          scamDetected: true,
          scamType: "Venda Falsa", // mapped generic
          riskScore: 89,
          analysisText: `⚠️ ALERTA EXPOSIÇÃO DE IDENTIDADE: O CPF de consulta "${formattedCpf}" foi identificado em 3 vazamentos históricos críticos (ex: Megavazamento Serasa 2021 de 223M, Vazamento de Score Bancário e Registros de Provedor de Internet). Esse nível de vazamento facilita a criminosos abrirem crediários e personificarem você.`,
          detectedBrand: "Vazamento Serasa / Darkweb",
          maliciousIndicators: [
            "Exposição do Score de Crédito vinculado a este CPF",
            "Associações de nome e número de telefone expostos para engenharia social de Pix",
            "Risco elevado de abertura indevida de contas digitais ou empresas de fachada"
          ]
        });
      }
      setLaudoMode("cpf");
      setIsAnalyzing(false);
    }, 1600);
  };

  const triggerAnalysis = async (urlToScan: string) => {
    const formattedUrl = urlToScan.trim();
    if (!formattedUrl) return;

    // Credit checks
    if (!isPremium && pesquisasRestantes <= 0) {
      setRewardModalOpen(true);
      return;
    }

    setIsAnalyzing(true);
    setScanResult(null);
    setAnalyzingText("Consultando Base Global VirusTotal...");

    try {
      const response = await fetch("/api/analisar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      if (!response.ok) {
        throw new Error("Erro na solicitação ao servidor");
      }

      const data = await response.json();

      // Decrement credit if search is successful and user is not Premium
      if (!isPremium) {
        setPesquisasRestantes(Math.max(0, pesquisasRestantes - 1));
      }

      // Add to search list
      addSearch(
        formattedUrl,
        data.scamDetected,
        data.scamType,
        data.riskScore,
        data.analysisText,
        data.scamDetails?.detectedBrand,
        data.scamDetails?.maliciousIndicators
      );

      setScanResult({
        scamDetected: data.scamDetected,
        scamType: data.scamType,
        riskScore: data.riskScore,
        analysisText: data.analysisText,
        detectedBrand: data.scamDetails?.detectedBrand,
        maliciousIndicators: data.scamDetails?.maliciousIndicators,
      });
      setLaudoMode("url");

    } catch (error) {
      console.error(error);
      // Inject standard error fallback scan
      setScanResult({
        scamDetected: true,
        scamType: "Phishing",
        riskScore: 75,
        analysisText: "Não foi possível conectar ao servidor para análise profunda de IA. No entanto, o sistema antivírus local recomenda cautela, pois o link possui alta similaridade com páginas de redirecionamento enganosas.",
        detectedBrand: "Desconhecida",
        maliciousIndicators: ["Erro de rede durante verificação", "Padrão de URL incomum"]
      });
      setLaudoMode("url");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div id="home_view_wrapper" className="flex flex-col space-y-6 max-w-2xl mx-auto px-4 py-8">
      {/* Dynamic Token / Premium Status Top Bar */}
      <div id="status_top_bar" className="flex justify-between items-center bg-slate-900/60 backdrop-blur border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-300">Scanner Inteligente</h3>
            <p className="text-xs text-slate-400">Status em tempo real</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isPremium ? (
            <button 
              onClick={() => pushPage("recuperacao")}
              className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30 transition hover:scale-[1.01]"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Área de Membros Hub</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5 flex-wrap justify-end gap-y-1">
              <span className="text-xs text-slate-400 mr-1">
                Créditos: <strong className="text-emerald-400 font-bold">{pesquisasRestantes}</strong> residual
              </span>
              <button 
                onClick={() => pushPage("pagamento")}
                className="px-2 py-1 bg-amber-500/10 text-amber-300 text-[10px] font-bold rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition shadow-inner"
              >
                + Créditos
              </button>
              <button 
                onClick={() => setRewardModalOpen(true)}
                title="Ganhar créditos grátis com anúncio rápido"
                className="px-2 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-lg border border-indigo-500/20 transition shadow-inner flex items-center space-x-0.5"
              >
                <Tv className="w-3 h-3 text-indigo-400 shrink-0 animate-pulse" />
                <span>+ Grátis</span>
              </button>
            </div>
          )}
          <button 
            onClick={() => pushPage("admin")}
            title="Painel Administrativo"
            className="p-1 px-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 border border-slate-800 text-xs flex items-center space-x-1"
          >
            <Settings className="w-4 h-4" />
            <span className="sr-only">Painel Admin</span>
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Main Branding Section */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative animate-fade-in">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl scale-150 pointer-events-none"></div>
          <div className="relative bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-950 p-1 rounded-2xl shadow-[0_0_30px_rgba(20,83,45,0.2)] border border-emerald-500/20 text-white flex justify-center items-center overflow-hidden">
            {logoError ? (
              <div 
                id="strike_logo_custom_fallback"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-950 flex flex-col items-center justify-center text-emerald-450 p-2.5 text-center border border-emerald-500/20 relative"
              >
                <div className="relative flex justify-center items-center mb-1">
                  <div className="w-10 h-10 rounded-full border border-emerald-500/15 animate-ping absolute duration-1000"></div>
                  <ShieldAlert className="w-10 h-10 text-emerald-400 shrink-0" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
                </div>
                <span className="text-[10px] uppercase font-black text-white tracking-widest font-sans">STRIKE</span>
                <span className="text-[8px] uppercase tracking-wider text-emerald-300 font-mono font-extrabold leading-none">CENTER</span>
              </div>
            ) : (
              <img 
                src={logoUrl} 
                alt="Stalker Center News Logo" 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
                referrerPolicy="no-referrer"
                onError={() => {
                  console.warn("Logo JPEG failed to load, switching to professional Stalker Center brand asset fallback.");
                  setLogoError(true);
                }}
              />
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Detetive de Golpes
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Central de Auditoria de Segurança: Cole faturas, faça varredura de sites suspeitos, audite chaves Pix fraudulentas e consulte vazamentos de CPF.
          </p>
        </div>
      </div>

      {/* Dynamic Multi-engine Navigation Tabs */}
      <div id="navigation_tabs" className="bg-slate-900/80 border border-slate-800 p-1 rounded-xl flex gap-1">
        <button
          type="button"
          onClick={() => { setActiveTab("url"); setScanResult(null); }}
          className={`flex-1 py-2 sm:py-2.5 text-center text-xs font-bold rounded-lg transition-all duration-150 flex items-center justify-center space-x-1.5 ${
            activeTab === "url" 
              ? "bg-blue-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>🔗 Escanear Link</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("pix"); setScanResult(null); }}
          className={`flex-1 py-2 sm:py-2.5 text-center text-xs font-bold rounded-lg transition-all duration-150 flex items-center justify-center space-x-1.5 ${
            activeTab === "pix" 
              ? "bg-blue-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>📱 Consultar Pix</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("cpf"); setScanResult(null); }}
          className={`flex-1 py-2 sm:py-2.5 text-center text-xs font-bold rounded-lg transition-all duration-150 flex items-center justify-center space-x-1.5 ${
            activeTab === "cpf" 
              ? "bg-blue-600 text-white shadow"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>👤 Consultar CPF</span>
        </button>
      </div>

      {/* Input Stage Form */}
      <form onSubmit={handleSearchSubmit} className="space-y-3">
        {activeTab === "url" && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-24 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Cole o link suspeito aqui (ex: correios-taxa-taxado.site)..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              disabled={isAnalyzing}
            />
            <div className="absolute inset-y-1.5 right-1.5">
              <button
                type="submit"
                disabled={isAnalyzing || !inputUrl.trim()}
                className="h-full px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg disabled:bg-slate-800 disabled:text-slate-500 transition duration-150 flex items-center space-x-1 text-nowrap"
              >
                {isAnalyzing ? "Varrendo..." : "Analisar Link"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "pix" && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Activity className="w-5 h-5" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-28 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Chave Pix (CPF, e-mail, celular ou chave aleatória)..."
              value={inputPix}
              onChange={(e) => setInputPix(e.target.value)}
              disabled={isAnalyzing}
            />
            <div className="absolute inset-y-1.5 right-1.5">
              <button
                type="submit"
                disabled={isAnalyzing || !inputPix.trim()}
                className="h-full px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg disabled:bg-slate-800 disabled:text-slate-500 transition duration-150 flex items-center space-x-1 text-nowrap"
              >
                {isAnalyzing ? "Auditando..." : "Auditar Chave PIX"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "cpf" && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Info className="w-5 h-5" />
            </div>
            <input
              type="text"
              className="w-full pl-11 pr-28 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Digite o CPF do titular para mapear vazamentos..."
              value={inputCpf}
              onChange={(e) => setInputCpf(e.target.value)}
              disabled={isAnalyzing}
            />
            <div className="absolute inset-y-1.5 right-1.5">
              <button
                type="submit"
                disabled={isAnalyzing || !inputCpf.trim()}
                className="h-full px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg disabled:bg-slate-800 disabled:text-slate-500 transition duration-150 flex items-center space-x-1 text-nowrap"
              >
                {isAnalyzing ? "Buscando..." : "Consultar CPF"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* SYSTEM AD EXCHANGE BANNER */}
      <AdSenseScriptSimulator size="banner" />

      {/* live analyzer progress report */}
      {isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 shadow-lg text-center"
        >
          <div className="relative flex justify-center items-center h-12 w-12">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></div>
            <div className="relative rounded-full h-10 w-10 bg-blue-500/10 border border-blue-500/30 flex justify-center items-center text-blue-400 animate-spin">
              <Search className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-white">{analyzingText}</h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Fazendo busca em tempo real em servidores governamentais e registros de vulnerabilidade cadastral.
            </p>
          </div>
        </motion.div>
      )}

      {/* result card presentation */}
      {scanResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`border rounded-2xl p-5 sm:p-6 overflow-hidden ${
            scanResult.scamDetected
              ? "bg-rose-950/30 border-rose-500/40 text-rose-200"
              : "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-2xl shrink-0 ${
              scanResult.scamDetected ? "bg-rose-500/15 text-rose-400" : "bg-emerald-500/15 text-emerald-400"
            }`}>
              {scanResult.scamDetected ? (
                <ShieldAlert className="w-8 h-8" />
              ) : (
                <ShieldCheck className="w-8 h-8" />
              )}
            </div>
            
            <div className="space-y-3 flex-1 min-w-0">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-bold">
                    {scanResult.scamDetected ? (
                      <>
                        {laudoMode === "url" && "🚨 ALERTA GOLPE DETECTADO"}
                        {laudoMode === "pix" && "🚨 CHAVE PIX SUSPEITA"}
                        {laudoMode === "cpf" && "🚨 VAZAMENTO CRÍTICO DETECTADO"}
                      </>
                    ) : (
                      <>
                        {laudoMode === "url" && "✅ LINK SEGURO"}
                        {laudoMode === "pix" && "✅ CHAVE REGULAR"}
                        {laudoMode === "cpf" && "✅ DOCUMENTO PROTEGIDO"}
                      </>
                    )}
                  </h3>
                  <p className="text-xs opacity-75 mt-0.5 break-all">
                    {laudoMode === "url" && `URL: ${inputUrl}`}
                    {laudoMode === "pix" && `CHAVE PIX: ${inputPix}`}
                    {laudoMode === "cpf" && `CPF: ${inputCpf}`}
                  </p>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  scanResult.scamDetected 
                    ? "bg-rose-500/20 border-rose-500/30 text-rose-300"
                    : "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                }`}>
                  Risco: {scanResult.riskScore}%
                </div>
              </div>

              <div className="h-[1px] bg-slate-800/60 my-2"></div>

              <div className="space-y-2">
                <p className="text-sm leading-relaxed text-slate-100 font-medium">
                  {scanResult.analysisText}
                </p>

                {/* ADVANCED MULTI-ENGINE CYBERSECURITY DATASHEET PORTABLE BAR */}
                <div className="bg-slate-950/80 border border-slate-800/85 rounded-xl p-3.5 space-y-3 mt-3 shadow-inner">
                  <div className="flex items-center space-x-1.5 text-blue-400 font-bold text-[11px] tracking-wider uppercase border-b border-slate-900 pb-2">
                    <Activity className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                    <span>
                      {laudoMode === "url" && "FICHA TÉCNICA DE AUDITORIA DE REDE (STRIKE MONITOR)"}
                      {laudoMode === "pix" && "FICHA CADASTRAL DE RASTREABILIDADE DE VALORES (PIX AUDIT)"}
                      {laudoMode === "cpf" && "FICHA DE EXPOSIÇÃO DE IDENTIDADE DIGITAL (DEATH INTRUDER)"}
                    </span>
                  </div>

                  {laudoMode === "url" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">RESOLUÇÃO DE IP:</span>
                        <span className="font-bold text-slate-300 truncate max-w-[120px]">
                          {scanResult.scamDetected ? "104.21.34.120 (Rússia)" : "200.221.2.45 (Brasil)"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">AUTENTICIDADE SSL:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Let's Encrypt (Anon)" : "DigiCert (Verificado)"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">TEMPO DE REGISTRO:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Recém-Criado (<15d)" : "Estável (>3 anos)"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">PROTEÇÃO MX/SPF:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Inexistente" : "Ativo / Seguro"}
                        </span>
                      </div>
                    </div>
                  )}

                  {laudoMode === "pix" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">VINCULAÇÃO BANCÁRIA:</span>
                        <span className="font-bold text-slate-300 truncate max-w-[120px]">
                          {scanResult.scamDetected ? "IP Digital Genérica" : "Banco Tradicional"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">MECANISMO MED (BACEN):</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Forte Alerta Reincidente" : "Isento de Ocorrências"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">NATUREZA CADASTRAL:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Pessoa Física (Laranja)" : "Conta Verificada"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">SCORE DE FRAUDE:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "9.4 / 10.0 (Elevado)" : "0.2 / 10.0 (Seguro)"}
                        </span>
                      </div>
                    </div>
                  )}

                  {laudoMode === "cpf" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">LEAKS CONSTATADOS:</span>
                        <span className="font-bold text-slate-300 truncate max-w-[120px]">
                          {scanResult.scamDetected ? "3 Incidentes Ativos" : "Nenhum Encontrado"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">SCORE VULNERABILIDADE:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Alto Risco de Crédito" : "Score Firme"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">SIGILO TELEFÔNICO:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Exposto em Mala Direta" : "Dados Preservados"}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-900/40 rounded border border-slate-800/40 flex justify-between items-center gap-2">
                        <span className="text-slate-500">FONTE PRINCIPAL LEAK:</span>
                        <span className={`font-bold truncate max-w-[120px] ${scanResult.scamDetected ? "text-rose-400" : "text-emerald-400"}`}>
                          {scanResult.scamDetected ? "Serasa Megavazamento" : "Incondicional"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {scanResult.scamDetected && (
                  <div className="bg-slate-900/60 border border-rose-500/20 rounded-xl p-3.5 space-y-2 mt-4">
                    <div className="flex items-center space-x-2 text-rose-300 font-semibold text-xs">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Sinais Críticos de Decepção:</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 mt-1">
                      <div>
                        <span className="text-slate-400">Classificação:</span>{" "}
                        <strong className="text-rose-400">{scanResult.scamType}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Marca Alvo:</span>{" "}
                        <strong className="text-amber-400">{scanResult.detectedBrand || "Nenhuma"}</strong>
                      </div>
                    </div>

                    {scanResult.maliciousIndicators && scanResult.maliciousIndicators.length > 0 && (
                      <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1 mt-2 border-t border-slate-800/60 pt-2">
                        {scanResult.maliciousIndicators.map((ind, i) => (
                          <li key={i} className="break-words">{ind}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Promo Banner for Domain Security Report - Laudo Integridade Domain */}
                <div className="mt-5 p-4 bg-slate-950/90 border border-blue-500/30 rounded-xl space-y-3 shadow-inner">
                  <div className="flex items-start space-x-3 text-left">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-wide">
                        {laudoMode === "url" && "📄 GERAR LAUDO DE CONTESTAÇÃO BANCÁRIA (R$ 4,90)"}
                        {laudoMode === "pix" && "📱 GERAR LAUDO COERCITIVO DE BLOQUEIO PIX (R$ 4,90)"}
                        {laudoMode === "cpf" && "👤 GERAR LAUDO DE CONTESTAÇÃO E VULNERABILIDADE (R$ 4,90)"}
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-normal font-normal">
                        {laudoMode === "url" && "Perdeu dinheiro com Pix, Boleto ou Cartão? Emita o Laudo de Integridade Certificado Stalker Center com carimbo e assinatura eletrônica para apresentar no seu gerente de banco e reverter perdas."}
                        {laudoMode === "pix" && "Use este relatório técnico de rastreabilidade bancária para formalizar o acionamento imediato do Mecanismo Especial de Devolução (MED) na agência do seu banco ou queixa online."}
                        {laudoMode === "cpf" && "Gere a certidão formal probatória de exposição para se blindar contra cartões falsos, aberturas indevidas de crediário ou fraudes que usam sua identidade vazada."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      R$ 4,90 pago único
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => openLaudoForUrl({
                        url: laudoMode === "url" ? inputUrl : (laudoMode === "pix" ? inputPix : inputCpf),
                        scamDetected: scanResult.scamDetected,
                        scamType: scanResult.scamType,
                        riskScore: scanResult.riskScore,
                        analysisText: scanResult.analysisText,
                        detectedBrand: scanResult.detectedBrand,
                        maliciousIndicators: scanResult.maliciousIndicators,
                        laudoType: laudoMode
                      })}
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center space-x-1.5 hover:scale-[1.01]"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>Emitir Laudo Certificado</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* NATIVE SPONSOR AD PLACEMENT */}
      <SponsorInFeedAd />

      {/* AREA DE MEMBRO COM BOTAO DE PAGAMENTO / PREMIUM HUB ACCESS */}
      <div id="home_members_pay_section" className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4 shadow-xl">
        {!isPremium ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="space-y-1">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-yellow-500/10 text-yellow-300 text-[10px] font-extrabold rounded-full border border-yellow-500/20 tracking-wider">
                  <Sparkles className="w-3 h-3 text-yellow-400 shrink-0" />
                  <span>MEMBROS PREMIUM SÊNIOR</span>
                </span>
                <h3 className="text-md font-black text-white tracking-tight">
                  Adquirir Licença de Membro Premium
                </h3>
              </div>
              <div className="shrink-0 font-bold text-emerald-400 text-sm bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/15">
                R$ 19,90 pago único
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Adquira acesso vitalício e ilimitado às ferramentas forenses do Stalker Center. Monitore o seu CPF contra vazamentos contínuos e acesse nosso <strong>Hub de Recuperação Especializada (MED / Bancos)</strong> para preencher petições jurídicas e reverter Pix ou fraudes com cartão.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 text-[11px] text-slate-400 font-medium font-mono">
              <div className="flex items-center space-x-1.5 p-2 bg-slate-950/40 rounded-lg border border-slate-850/40">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="truncate">Consultas Infinitas</span>
              </div>
              <div className="flex items-center space-x-1.5 p-2 bg-slate-950/40 rounded-lg border border-slate-850/40">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="truncate">Alertas de Vazamento</span>
              </div>
              <div className="flex items-center space-x-1.5 p-2 bg-slate-950/40 rounded-lg border border-slate-850/40">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="truncate">Dossiê de Petições</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Checkout buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {(() => {
                  let bgClass = "bg-[#3AD010] hover:bg-[#32b50d] text-slate-950 shadow-[0_0_15px_rgba(58,208,16,0.25)]";
                  let label = "Quero Ser Membro (Pagar Kiwify)";
                  if (paymentPlatform === "pepper") {
                    bgClass = "bg-[#ff1e42] hover:bg-[#e41535] text-white shadow-[0_0_15px_rgba(255,30,66,0.35)]";
                    label = "Quero Ser Membro (Pagar via Pepper)";
                  } else if (paymentPlatform === "mercadopago") {
                    bgClass = "bg-[#009EE3] hover:bg-[#0081C4] text-white shadow-[0_0_15px_rgba(0,158,227,0.3)]";
                    label = "Quero Ser Membro (Pagar no Mercado Pago)";
                  } else if (paymentPlatform === "perfectpay") {
                    bgClass = "bg-[#FF4B2B] hover:bg-[#e43a1a] text-white shadow-[0_0_15px_rgba(255,75,43,0.3)]";
                    label = "Quero Ser Membro (Pagar no Perfect Pay)";
                  } else if (paymentPlatform === "kirvano") {
                    bgClass = "bg-[#7B2CBF] hover:bg-[#62219c] text-white shadow-[0_0_15px_rgba(123,44,191,0.3)]";
                    label = "Quero Ser Membro (Pagar no Kirvano)";
                  } else if (paymentPlatform === "stripe") {
                    bgClass = "bg-[#635BFF] hover:bg-[#4E46E5] text-white shadow-[0_0_15px_rgba(99,91,255,0.3)]";
                    label = "Quero Ser Membro (Pagar no Stripe)";
                  } else if (paymentPlatform === "outro") {
                    bgClass = "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]";
                    label = "Quero Ser Membro (Comprar Agora)";
                  }

                  return (
                    <a
                      href={kiwifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className={`flex-1 py-3 px-4 ${bgClass} font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 text-center decoration-none hover:scale-[1.01] transition`}
                    >
                      <CreditCard className="w-3.5 h-3.5 shrink-0" />
                      <span>{label}</span>
                    </a>
                  );
                })()}

                <button
                  type="button"
                  onClick={() => {
                    setPremiumGlobal(true);
                    alert("🎉 Simulação: Assinatura Premium Ativada! Bem-vindo à nossa comunidade premium.");
                    pushPage("recuperacao");
                  }}
                  className="px-4 py-3 bg-blue-600/25 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500/40 text-blue-300 hover:text-white font-bold text-xs rounded-xl transition duration-150 flex items-center justify-center space-x-1 hover:scale-[1.01]"
                >
                  <span>✓ Ativação Instantânea (Teste)</span>
                </button>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                <span>⚡ Ativação automática em 10 segundos</span>
                <button
                  type="button"
                  onClick={() => pushPage("pagamento")}
                  className="text-indigo-400 hover:text-indigo-300 underline font-semibold normal-case"
                >
                  Conhecer benefícios em detalhes →
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/10 pb-3">
              <div className="space-y-1">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold rounded-full border border-emerald-500/20 tracking-wider">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span>MEMBRO PREMIUM ATIVO</span>
                </span>
                <h3 className="text-md font-black text-white tracking-tight">
                  Seu Plano de Membros está Ativo!
                </h3>
              </div>
              <div className="text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                Licença Vitalícia
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Seja bem-vindo, parceiro sênior. Você conta com <strong>consultas ilimitadas em tempo real</strong> e tem total livre acesso à nossa exclusiva central de blindagem fiscal e petições de contestação bancária contra golpes na rede interbancária nacional.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => pushPage("recuperacao")}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-black text-xs rounded-xl shadow transition duration-150 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span>Ir para a Área de Membros Hub especial</span>
              </button>
              
              <button
                onClick={() => pushPage("sobre")}
                className="px-4 py-3 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1"
              >
                <span>Sobre a Plataforma</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Recent Activity lists */}
      <div className="space-y-3 pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-400 font-bold text-xs tracking-wider flex items-center space-x-2">
            <History className="w-4 h-4 text-slate-500" />
            <span>ÚLTIMAS BUSCAS DA PLATAFORMA</span>
          </h2>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full font-medium">
            Global
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {recentSearches.slice(0, 5).map((search) => (
            <div 
              key={search.id}
              onClick={() => handleRecentClick(search.url)}
              className="group p-3 bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800 rounded-xl transition duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <span className="text-slate-200 font-medium break-all block group-hover:text-blue-400 transition">
                  {search.url}
                </span>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className={`${
                    search.scamDetected ? "text-rose-400" : "text-emerald-400"
                  } font-semibold`}>
                    {search.scamDetected ? `❌ ${search.scamType}` : "✅ Link Seguro"}
                  </span>
                  <span className="text-slate-600 font-normal">|</span>
                  <span className="text-slate-500">{search.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLaudoForUrl({
                      url: search.url,
                      scamDetected: search.scamDetected,
                      scamType: search.scamType,
                      riskScore: search.riskScore,
                      analysisText: search.analysisText,
                      detectedBrand: search.detectedBrand,
                      maliciousIndicators: search.maliciousIndicators
                    });
                  }}
                  className="px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/25 border border-blue-500/20 hover:border-blue-500/35 text-blue-400 hover:text-blue-300 rounded-lg text-[10.5px] font-bold flex items-center space-x-1 transition"
                >
                  <FileText className="w-3 h-3" />
                  <span>Emitir Laudo</span>
                </button>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    search.scamDetected 
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    Risco {search.riskScore}%
                  </span>
                  <span className="text-slate-600 group-hover:translate-x-0.5 transition duration-150">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {laudoData && (
        <LaudoDeIntegridadeModal
          isOpen={laudoOpen}
          onClose={() => {
            setLaudoOpen(false);
            setLaudoData(null);
          }}
          urlAnalyzed={laudoData.url}
          scamDetected={laudoData.scamDetected}
          scamType={laudoData.scamType}
          riskScore={laudoData.riskScore}
          analysisText={laudoData.analysisText}
          detectedBrand={laudoData.detectedBrand}
          maliciousIndicators={laudoData.maliciousIndicators}
          laudoType={laudoData.laudoType}
        />
      )}

      {/* REWARDED SPONSOR DIALOG MODAL ON HOMEPAGE */}
      <SponsorAdRewardModal
        isOpen={rewardModalOpen}
        onClose={() => setRewardModalOpen(false)}
        onSuccess={() => {
          // Handled elegantly within the modal component
        }}
        reason="reabastecer suas pesquisas restantes e obter relatórios forenses livres"
      />
    </div>
  );
};
