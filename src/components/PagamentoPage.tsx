import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { 
  ArrowLeft, 
  ShieldAlert, 
  Check, 
  Tv, 
  CreditCard,
  QrCode,
  Sparkles,
  Award,
  Video,
  X,
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../assets/images/strike_center_logo_1781636017128.jpg";

export const PagamentoPage: React.FC = () => {
  const { 
    pushPage, 
    popPage, 
    anunciosVistos, 
    setAnunciosVistos, 
    pesquisasRestantes, 
    setPesquisasRestantes,
    setPremiumGlobal,
    kiwifyLink,
    paymentPlatform
  } = useAppContext();

  const [adModalOpen, setAdModalOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [adTimer, setAdTimer] = useState(10);
  const [adProgress, setAdProgress] = useState(0);
  const [adPlaying, setAdPlaying] = useState(false);

  const [copied, setCopied] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [clickedKiwify, setClickedKiwify] = useState(false);

  // Payment Simulator states
  const [activeTab, setActiveTab] = useState<"pix" | "cartao">("pix");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const mockPixKey = "00020101021126580014br.gov.bcb.pix0136kiwify-deck1ag-fake-pix-key520400005303986540519.905802BR5915STRIKE_CENTER_6009SAO_PAULO62070503***6304CAAA";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(kiwifyLink);
    setCopied(true);
    setClickedKiwify(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixKey);
    setCopiedPix(true);
    setTimeout(() => {
      setCopiedPix(false);
    }, 2500);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clickedKiwify) {
      alert("⚠️ Atenção: Você precisa clicar no botão oficial de pagamento da Kiwify ('Pagar com Pix ou Cartão (Kiwify)') ou em 'Copiar Link' para acessar a tela de pagamento oficial antes de poder prosseguir.");
      return;
    }

    setPaymentLoading(true);

    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentSuccess(true);
      setPremiumGlobal(true); // Elevates premium status dynamically
      
      setTimeout(() => {
        alert("🎉 Simulação Concluída! Estatuto Premium ativado em seu perfil.");
        pushPage("recuperacao");
      }, 1500);
    }, 2000);
  };

  // Rewarded ad countdown mechanism
  useEffect(() => {
    let timerId: any;
    if (adPlaying && adTimer > 0) {
      timerId = setInterval(() => {
        setAdTimer(prev => {
          const next = prev - 1;
          setAdProgress(((10 - next) / 10) * 100);
          return next;
        });
      }, 1000);
    } else if (adPlaying && adTimer === 0) {
      // Completed Ad Reward
      setAdPlaying(false);
      setAdModalOpen(false);
      
      const nextVistos = anunciosVistos + 1;
      if (nextVistos >= 3) {
        setAnunciosVistos(0);
        setPesquisasRestantes(pesquisasRestantes + 1);
        alert("🎉 Parabéns! Você assistiu 3/3 vídeos e ganhou 1 análise de golpe gratuita!");
        pushPage("home");
      } else {
        setAnunciosVistos(nextVistos);
        alert(`👉 Vídeo contabilizado com sucesso! Faltam ${3 - nextVistos} vídeo(s) para liberar sua análise gratuita.`);
      }
    }
    return () => clearInterval(timerId);
  }, [adPlaying, adTimer]);

  const startVideoPlayback = () => {
    setAdTimer(10);
    setAdProgress(0);
    setAdPlaying(true);
    setAdModalOpen(true);
  };

  return (
    <div id="payment_view_wrapper" className="flex flex-col space-y-6 max-w-2xl mx-auto px-4 py-8">
      {/* Top Navigator */}
      <div className="flex items-center">
        <button 
          onClick={popPage}
          className="p-2 -ml-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-900 transition flex items-center space-x-2"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xs font-semibold">Voltar</span>
        </button>
      </div>

      {/* Main Vector Badge Logo with Stalker Center */}
      <div className="flex flex-col items-center text-center space-y-3 pt-2">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-2xl scale-125"></div>
          <div className="relative bg-gradient-to-tr from-slate-900 to-indigo-950 p-1 bg-slate-950 rounded-2xl shadow-2xl border border-blue-500/20 text-white flex justify-center items-center overflow-hidden">
            {logoError ? (
              <div className="w-20 h-20 rounded-xl bg-slate-900/90 flex flex-col items-center justify-center text-blue-400 p-2 text-center">
                <ShieldAlert className="w-8 h-8 text-blue-500 mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-mono">Forense</span>
              </div>
            ) : (
              <img 
                src={logoUrl} 
                alt="Stalker Center News Logo" 
                className="w-20 h-20 rounded-xl object-cover"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-white">Desbloquear Relatório Completo</h1>
          <p className="text-slate-400 text-xs tracking-wider uppercase font-semibold">Ative o Plano Premium ou use buscas assistidas</p>
        </div>
      </div>

      {/* Checklist Benefits */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Vantagens de se tornar detetive premium:</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 text-slate-200 text-xs">
            <div className="p-1 bg-emerald-500/10 rounded-md text-emerald-400 shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-white block font-semibold">🛡️ Análises de links ilimitadas</strong>
              <span className="text-slate-400">Escaneie quantos sites, links promocionais ou boletos quiser sem renovações ou bloqueios em cascata.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-slate-200 text-xs">
            <div className="p-1 bg-emerald-500/10 rounded-md text-[#39EF6C] shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <strong className="text-white block font-semibold">🚨 Alertas de vazamento de CPF</strong>
              <span className="text-slate-400">Pesquise bases nacionais e receba notificações imediatas em caso de vazas ou faturas falsificadas anexadas ao seu documento.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-slate-200 text-xs">
            <div className="p-1 bg-emerald-500/10 rounded-md text-emerald-400 shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-white block font-semibold">📋 Histórico completo de buscas</strong>
              <span className="text-slate-400">Acesse relatórios técnicos retroativos das URLs consultadas e revise as evidências detalhadas do VirusTotal.</span>
            </div>
          </div>
        </div>
      </div>

      {/* monetization action pay card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col items-center space-y-4 text-center">
        <div>
          <span className="text-[10px] bg-[#39EF6C]/10 text-[#39EF6C] px-3 py-1 rounded-full font-extrabold tracking-widest border border-[#39EF6C]/25">
            OFERTA ESPECIAL
          </span>
          <div className="text-2xl font-black text-white mt-2.5">R$ 19,90 pago único</div>
          <p className="text-xs text-slate-500 mt-1">Garantia total de segurança de ponta a ponta</p>
        </div>

        {/* Live notification ticker to mimic high-demand apps */}
        <div className="bg-slate-950/40 border border-slate-800/80 p-2 text-center rounded-lg w-full flex items-center justify-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#39EF6C] animate-pulse shrink-0"></span>
          <p className="text-[10.5px] text-slate-300 font-medium">
            <strong className="text-[#39EF6C]">Membro Ativado:</strong> Daniel S. C. acabou de assinar o plano premium há 1 min.
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-3">
          {(() => {
            let bgClass = "bg-[#3AD010] hover:bg-[#32b50d] text-slate-950 shadow-[0_0_20px_rgba(58,208,16,0.25)]";
            let label = "Pagar com Pix ou Cartão (Kiwify)";
            if (paymentPlatform === "pepper") {
              bgClass = "bg-[#ff1e42] hover:bg-[#e41535] text-white shadow-[0_0_20px_rgba(255,30,66,0.35)]";
              label = "Pagar com Pix ou Cartão via Pepper";
            } else if (paymentPlatform === "mercadopago") {
              bgClass = "bg-[#009EE3] hover:bg-[#0081C4] text-white shadow-[0_0_20px_rgba(0,158,227,0.3)]";
              label = "Pagar com Pix ou Cartão (Mercado Pago)";
            } else if (paymentPlatform === "perfectpay") {
              bgClass = "bg-[#FF4B2B] hover:bg-[#e43a1a] text-white shadow-[0_0_20px_rgba(255,75,43,0.3)]";
              label = "Pagar no Pix/Cartão via Perfect Pay";
            } else if (paymentPlatform === "kirvano") {
              bgClass = "bg-[#7B2CBF] hover:bg-[#62219c] text-white shadow-[0_0_20px_rgba(123,44,191,0.3)]";
              label = "Pagar no Pix/Cartão via Kirvano";
            } else if (paymentPlatform === "stripe") {
              bgClass = "bg-[#635BFF] hover:bg-[#4E46E5] text-white shadow-[0_0_20px_rgba(99,91,255,0.3)]";
              label = "Pagar com Cartão/Pix via Stripe";
            } else if (paymentPlatform === "outro") {
              bgClass = "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]";
              label = "Acessar Checkout de Pagamentos";
            }

            return (
              <a 
                href={kiwifyLink}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                onClick={() => setClickedKiwify(true)}
                className={`flex-1 py-3.5 ${bgClass} font-black text-xs rounded-xl hover:scale-[1.01] transition flex items-center justify-center space-x-2 text-center decoration-none`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </a>
            );
          })()}

          <button 
            type="button"
            onClick={handleCopyLink}
            className={`px-4 py-3.5 border font-bold text-xs rounded-xl transition duration-150 flex items-center justify-center space-x-1.5 ${
              copied 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-slate-950 border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <span>{copied ? "✓ Copiado" : "Copiar Link"}</span>
          </button>
        </div>

        {/* PROCEED / VERIFY ACTION BUTTON - [BUG FIXED] Added to enable instant activation */}
        <div className="w-full pt-2">
          <button
            onClick={handleSimulatePayment}
            disabled={paymentLoading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-xl hover:scale-[1.005] active:scale-[0.995] transition flex items-center justify-center space-x-2.5"
          >
            {paymentLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="uppercase tracking-wider">Ativando sua Assinatura Premium...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span className="uppercase tracking-wider font-extrabold">Já Paguei / Ativar Plano Premium</span>
              </>
            )}
          </button>
        </div>

        {/* Security badges */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
          <span>🔒 Criptografia SSL</span>
          <span>•</span>
          <span>⚡ Liberação Imediata</span>
          <span>•</span>
          <span>🛡️ Garantia PROCON / Reclame Aqui</span>
        </div>

        {/* Informative helper label about iframe constraints */}
        <p className="text-[10px] text-slate-400 leading-normal max-w-sm">
          ⚠️ <strong>Nota:</strong> Se o checkout oficial abrir em uma tela em branco devido à segurança de seu navegador ou do sandbox do Google AI Studio, clique em <strong>Copiar Link</strong> acima e cole diretamente em uma nova guia de seu navegador!
        </p>

      </div>

      {/* video progress indicator reward */}
      <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Tv className="w-3.5 h-3.5 text-blue-400" />
              <span>Vídeos Recompensa AdMob</span>
            </h4>
            <p className="text-[11px] text-slate-400">Assista a 3 comerciais rápidos para ganhar 1 busca avulsa.</p>
          </div>
          <span className="text-xs font-black text-blue-300 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
            {anunciosVistos}/3 vídeos
          </span>
        </div>

        {/* 3 Step progress row */}
        <div className="flex items-center space-x-2.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i < anunciosVistos ? "bg-[#3AD010]" : "bg-slate-800"
              }`}
            ></div>
          ))}
        </div>

        {/* Action Button Ad Watch */}
        <button
          onClick={startVideoPlayback}
          className="w-full py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[#3AD010] hover:text-[#42e815] font-bold text-xs rounded-xl transition duration-150 flex items-center justify-center space-x-2"
        >
          <Video className="w-4 h-4 shrink-0" />
          <span>👉 Assistir Vídeo (Liberar 1 Pesquisa)</span>
        </button>
      </div>

      {/* Beautiful modal animation for the Ad Player simulation */}
      <AnimatePresence>
        {adModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-950 border border-slate-800 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* Ad content banner */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase">Anúncio de Segurança</span>
                <span className="text-xs text-amber-400 font-bold">{adTimer} segundos restantes</span>
              </div>

              {/* simulated media stage (interactive) */}
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 h-56 bg-slate-950 relative">
                {/* Simulated video graphics */}
                <div className="absolute inset-0 bg-radial-at-c from-blue-500/10 to-transparent"></div>
                <div className="p-4 bg-blue-500/10 rounded-full text-blue-400 animate-pulse relative border border-blue-500/20">
                  <span className="absolute inset-0 rounded-full bg-blue-500/1 w-full h-full animate-ping"></span>
                  <Award className="w-10 h-10" />
                </div>
                <div className="space-y-1 relative">
                  <h4 className="text-xs font-black uppercase text-indigo-400 tracking-wider">Detector de Golpes Pro</h4>
                  <p className="text-xs text-white font-medium">Sua proteção diária em todos os apps instalados.</p>
                  <p className="text-[10px] text-slate-500">Mantenha seus familiares protegidos contra golpes do INSS.</p>
                </div>
              </div>

              {/* Progress player board */}
              <div className="bg-slate-900 p-4 space-y-3">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${adProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-[10.5px] text-slate-400">
                  <span>AdMob Video ID: rewarded-test-ads</span>
                  <span>{adProgress.toFixed(0)}% completo</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
