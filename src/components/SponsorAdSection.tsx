import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { 
  Sparkles, 
  X, 
  ExternalLink, 
  ShieldAlert, 
  Gift, 
  Clock, 
  Tv, 
  DollarSign, 
  ThumbsUp, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Pre-configured native premium cybersecurity sponsors (high CPC/CPM fit)
export const PREMIUM_SPONSORS = [
  {
    id: "nordvpn",
    title: "🔒 NordVPN - Especialistas em Privacidade",
    tagline: "Proteja sua rede contra vazamentos de IP de alto risco e phishing governamental com 73% de desconto.",
    badge: "Antivírus & VPN",
    actionText: "Ativar Proteção Nord",
    url: "https://nordvpn.com",
    stats: "CPC Médio: R$ 2,34 | Recomendado",
    bgPattern: "from-blue-950/40 via-slate-900 to-indigo-950/40 border-blue-500/20"
  },
  {
    id: "kaspersky",
    title: "⚡ Kaspersky Total Security 2026",
    tagline: "Verificador de cavalos de troia e clonagem de cartões de crédito em tempo real. Teste gratuito por 30 dias.",
    badge: "Segurança Endpoint",
    actionText: "Fazer Scan Grátis",
    url: "https://kaspersky.com.br",
    stats: "CPC Médio: R$ 1,98 | Alta Conversão",
    bgPattern: "from-emerald-950/30 via-slate-900 to-teal-950/30 border-emerald-500/20"
  },
  {
    id: "protecao_pix",
    title: "💸 Hub de Seguros de Pix & Conta Familiar",
    tagline: "Seu banco recusou ressarcimento do MED? Conheça cooperativas de blindagem anticrime com apólices robustas.",
    badge: "Seguro Financeiro",
    actionText: "Simular Apólice",
    url: "https://www.correios.com.br",
    stats: "CPC Médio: R$ 3,10 | Alta Demanda",
    bgPattern: "from-purple-950/40 via-slate-900 to-indigo-950/40 border-purple-500/20"
  }
];

// IN-FEED SPONSOR AD CARD
export const SponsorInFeedAd: React.FC = () => {
  const { isPremium, setAnunciosVistos, anunciosVistos } = useAppContext();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Cycle sponsors on load/interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex(prev => (prev + 1) % PREMIUM_SPONSORS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (isPremium) return null; // Premium members don't see ads

  const ad = PREMIUM_SPONSORS[currentAdIndex];

  const handleAdClick = () => {
    // Record ad interaction metric
    const currentClicks = parseInt(localStorage.getItem("dg_ad_clicks") || "0", 10);
    localStorage.setItem("dg_ad_clicks", (currentClicks + 1).toString());
    setAnunciosVistos(anunciosVistos + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 bg-gradient-to-tr ${ad.bgPattern} mt-4 shadow-lg`}
    >
      <div className="absolute top-0 right-0 p-1 font-mono text-[8px] bg-slate-950/80 border-b border-l border-slate-800 text-slate-500 rounded-bl-lg font-bold tracking-widest uppercase">
        Patrocinador Parceiro
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 select-none">
          <div className="flex items-center space-x-2">
            <span className="text-[9px] font-extrabold uppercase bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 tracking-wider">
              {ad.badge}
            </span>
            <span className="text-[9px] text-[#00FF00] font-bold font-mono tracking-wider animate-pulse flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-[#00FF00] rounded-full"></span>
              <span>Anúncio Verificado</span>
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-100 flex items-center space-x-1">
            <span>{ad.title}</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {ad.tagline}
          </p>
        </div>

        <a 
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="w-full sm:w-auto shrink-0 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition hover:scale-[1.02]"
        >
          <span>{ad.actionText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};

// ADSENSE/HTML SCRIPT PLACEHOLDER SIMULATOR
export const AdSenseScriptSimulator: React.FC<{ size?: "banner" | "box" }> = ({ size = "banner" }) => {
  const { isPremium, setAnunciosVistos, anunciosVistos } = useAppContext();
  const [customBannerText, setCustomBannerText] = useState("");
  const [customBannerUrl, setCustomBannerUrl] = useState("https://kiwify.app");

  useEffect(() => {
    const textSaved = localStorage.getItem("dg_ads_custom_text");
    if (textSaved) setCustomBannerText(textSaved);
    const urlSaved = localStorage.getItem("dg_ads_custom_url");
    if (urlSaved) setCustomBannerUrl(urlSaved);
  }, []);

  if (isPremium) return null;

  const handleClicks = () => {
    const currentClicks = parseInt(localStorage.getItem("dg_ad_clicks") || "0", 10);
    localStorage.setItem("dg_ad_clicks", (currentClicks + 1).toString());
    setAnunciosVistos(anunciosVistos + 1);
  };

  return (
    <div 
      onClick={handleClicks}
      className={`relative w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-850 p-4 font-mono text-center transition hover:border-blue-500/20 select-none ${
        size === "banner" ? "my-4" : "h-48 flex flex-col justify-between"
      }`}
    >
      <div className="absolute top-0 right-0 px-2 py-0.5 bg-slate-900 text-slate-600 border-l border-b border-slate-850 text-[8px] font-bold uppercase tracking-widest leading-none">
        Rede de Anúncios Ativa
      </div>

      {customBannerText ? (
        <a 
          href={customBannerUrl} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full space-y-1 py-2 text-decoration-none"
        >
          <span className="text-xs font-semibold text-blue-300 break-words max-w-lg">{customBannerText}</span>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
            <span>Visitar Patrocinador Oficial</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </a>
      ) : size === "banner" ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="space-y-1">
            <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wide">
              Ad Exchange: CPM Otimizado
            </span>
            <p className="text-[11px] text-slate-350">
              🔍 Monitore quem busca seus dados! Contrate um <strong>Alerta de CPF Vazado</strong> com inteligência pericial.
            </p>
          </div>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded text-[10px] font-extrabold flex items-center space-x-1 tracking-wider uppercase border border-slate-800"
          >
            <span>Ver Oferta</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full py-2">
          <div>
            <span className="text-[8px] bg-slate-900 border border-slate-800 p-1 text-slate-400 rounded-sm">ADTERRA WIDGET</span>
            <h5 className="text-[11px] font-bold text-slate-200 mt-3 break-words">Seguro Cyber Pessoal contra Engenharia Social</h5>
          </div>
          <p className="text-[10px] text-slate-500 leading-normal mb-2">Restituição imediata programada de pagamentos falsos.</p>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener"
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[10px] rounded"
          >
            Saber Mais Rápido
          </a>
        </div>
      )}
    </div>
  );
};

// REWARD MODAL: WATCH ADS TO UNLOCK CREDITS & PREMIUM REPORTS
interface SponsorAdRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reason?: string;
}

export const SponsorAdRewardModal: React.FC<SponsorAdRewardModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  reason = "liberar novas consultas e laudos certificados"
}) => {
  const { setPesquisasRestantes, pesquisasRestantes, setAnunciosVistos, anunciosVistos } = useAppContext();
  const [countdown, setCountdown] = useState(15);
  const [adStep, setAdStep] = useState<"ready" | "watching" | "completed">("ready");
  const [selectedAdIndex, setSelectedAdIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(15);
      setAdStep("ready");
    } else {
      // Pick a random sponsor to show
      setSelectedAdIndex(Math.floor(Math.random() * PREMIUM_SPONSORS.length));
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (adStep === "watching" && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (adStep === "watching" && countdown === 0) {
      setAdStep("completed");
    }
    return () => clearTimeout(timer);
  }, [adStep, countdown]);

  if (!isOpen) return null;

  const currentSponsor = PREMIUM_SPONSORS[selectedAdIndex];

  const startWatchingAd = () => {
    setAdStep("watching");
    setCountdown(15);
  };

  const claimReward = () => {
    // Add 3 free searches
    setPesquisasRestantes(pesquisasRestantes + 3);
    setAnunciosVistos(anunciosVistos + 1);

    // Save ad stats
    const currentClicks = parseInt(localStorage.getItem("dg_ad_clicks") || "0", 10);
    localStorage.setItem("dg_ad_clicks", (currentClicks + 1).toString());
    const totalEarnings = parseFloat(localStorage.getItem("dg_ad_earnings") || "0");
    localStorage.setItem("dg_ad_earnings", (totalEarnings + 0.45).toFixed(2)); // Each video view simulates R$ 0,45 revenue 

    onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle tech grid background scan and blur */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          <div className="absolute top-0 left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>

          {/* Close button - only active if not currently watching */}
          {adStep !== "watching" && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="relative space-y-5">
            {adStep === "ready" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center">
                  <Tv className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-white uppercase tracking-tight">
                    Liberar com Anúncio Patrocinado
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sua conta está sob limite de consultas grátis. Para {reason}, apoie nosso portal consumindo um vídeo de patrocínio rápido!
                  </p>
                </div>

                {/* Reward Card highlight */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-400 shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Recompensa Instantânea</p>
                      <p className="text-[10px] text-slate-500">Ganhe +3 buscas forenses de imediato</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    GRÁTIS
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={startWatchingAd}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-extrabold text-xs rounded-xl transition duration-150 flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <Tv className="w-4 h-4" />
                    <span>Assistir Anúncio (15 segundos)</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2 bg-transparent text-slate-500 hover:text-slate-300 text-[11px] font-semibold"
                  >
                    Voltar e Pagar com Pix
                  </button>
                </div>
              </div>
            )}

            {adStep === "watching" && (
              <div className="space-y-5 text-center">
                <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg text-[9px] font-mono text-slate-400 border border-slate-850">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span>EXIBINDO VÍDEO DO PATROCINADOR</span>
                  </span>
                  <span className="font-bold">MODAL EXCLUSIVO</span>
                </div>

                {/* Animated Simulated Video Player / Visualizer */}
                <div className="h-44 bg-gradient-to-tr from-indigo-950 to-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-[#00FF00] font-bold border border-[#00FF00]/20 flex items-center space-x-1">
                      <Zap className="w-3 h-3 animate-pulse text-[#00FF00]" />
                      <span>{currentSponsor.badge}</span>
                    </span>

                    <span className="text-xs font-mono font-bold text-white bg-slate-900/80 p-1.5 rounded-lg border border-slate-800 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                      <span>{countdown}s</span>
                    </span>
                  </div>

                  {/* Simulated loading bar */}
                  <div className="py-2 space-y-1">
                    <h4 className="text-xs font-bold text-slate-100 text-left truncate">
                      {currentSponsor.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 text-left line-clamp-2">
                      {currentSponsor.tagline}
                    </p>
                  </div>

                  <div className="space-y-1.5 w-full">
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${((15 - countdown) / 15) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[9px] text-slate-500 text-right">Obrigado por apoiar a integridade da rede brasileira!</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] text-slate-400 leading-normal font-medium">
                    Aguarde o cronômetro finalizar para creditar o saldo.
                  </p>
                  <p className="text-[9.5px] text-slate-500">
                    O bloqueio ou fechamento prematuro deste anúncio cancelará o bônus de créditos do Stalker Center. 
                  </p>
                </div>
              </div>
            )}

            {adStep === "completed" && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-[#00FF00] rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-white uppercase tracking-tight">
                    Patrocínio Validado!
                  </h3>
                  <p className="text-xs text-slate-400">
                    Você apoiou nossa infraestrutura. Os créditos correspondentes foram adicionados com sucesso à sua conta.
                  </p>
                </div>

                <div className="p-3 bg-emerald-950/20 border border-emerald-500/15 rounded-xl font-mono text-[10.5px] flex items-center justify-center space-x-1 text-emerald-400 font-bold">
                  <span>✓ RECOMPENSA LIBERADA: +3 CRÉDITOS DE SCAN</span>
                </div>

                <button
                  onClick={claimReward}
                  className="w-full py-3 bg-[#3AD010] hover:bg-[#32b50d] text-slate-950 font-black text-xs rounded-xl tracking-wide uppercase transition duration-150 cursor-pointer shadow-lg"
                >
                  Confirmar e Ativar Créditos
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
