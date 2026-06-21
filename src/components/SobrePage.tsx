import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import { 
  ArrowLeft, 
  Heart, 
  Copy, 
  CheckCircle, 
  Mail, 
  Youtube, 
  MessageSquare, 
  Compass, 
  Shield, 
  DollarSign, 
  Share2, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const SobrePage: React.FC = () => {
  const { popPage } = useAppContext();
  
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("20");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showQrCodeSim, setShowQrCodeSim] = useState<boolean>(false);

  const pixDonationKey = "daniel.carvalhoba31@gmail.com";
  const contactEmail = "daniel.carvalhoba31@gmail.com";

  const handleCopyKey = (text: string, type: "key" | "contact") => {
    navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey("PIX copiado com sucesso!");
      setTimeout(() => setCopiedKey(null), 3000);
    } else {
      setCopiedContact("E-mail copiado!");
      setTimeout(() => setCopiedContact(null), 3000);
    }
  };

  const predefinedAmounts = ["10", "20", "50", "100"];

  return (
    <div id="sobre_page_wrapper" className="flex flex-col space-y-6 max-w-3xl mx-auto px-4 py-8">
      {/* Back navigation header */}
      <div className="flex justify-between items-center">
        <button 
          onClick={popPage}
          className="p-2 -ml-2 text-slate-405 hover:text-white rounded-full hover:bg-slate-900 transition flex items-center space-x-2"
        >
          <ArrowLeft className="w-6 h-6 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Voltar</span>
        </button>
        
        <span className="flex items-center space-x-1 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>Iniciativa Independente</span>
        </span>
      </div>

      {/* Main Presentation / About App Block */}
      <div id="about_hero" className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800/85 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-36 h-36 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 font-mono">Nosso Propósito</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Sobre o Detetive de Golpes
          </h1>
          <p className="text-xs sm:text-sm text-slate-350 leading-relaxed max-w-2xl font-normal">
            Nascemos com a missão de democratizar a segurança digital e proteger cidadãos comuns contra fraudes virtuais. No cenário atual, milhares de brasileiros são vítimas diárias de engenharia social, chaves PIX laranjas e portais de e-commerce clonados.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-normal">
            O aplicativo funciona como um scanner de auditoria em tempo real, analisando metadados de domínios, histórico de denúncias de chaves de transferências e flags de vulnerabilidade de KYC para dar uma resposta imediata se uma transação é segura ou não.
          </p>
        </div>
      </div>

      {/* Highlights Bento Row (Why We Need Help) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950/60 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl w-fit">
            <Heart className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-200">Totalmente Sem Fins Lucrativos</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mantemos a ferramenta transparente, livre de anúncios abusivos de terceiros e sem vender dados de pesquisas. Todo o suporte e desenvolvimento vêm de doadores parceiros.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
            <Compass className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-200">Tecnologia de Alta Performance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Garantimos servidores ativos 24/7 para consultas rápidas. Cada verificação consome requisições custosas de APIs de segurança de dados e hospedagem resiliente.
            </p>
          </div>
        </div>
      </div>

      {/* Donations Block */}
      <div id="donation_section" className="bg-slate-950/40 border border-slate-900 rounded-3xl p-5 sm:p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-base font-black text-white uppercase tracking-wider">Apoie esta Causa com uma Doação</h2>
            <p className="text-[11px] text-slate-400">Ajude a custear os servidores de análise preventiva e mantenha o app no ar.</p>
          </div>
        </div>

        {/* Amount Selector */}
        <div className="space-y-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-850/60">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block font-mono">1. Escolha o valor da contribuição (R$)</label>
          <div className="grid grid-cols-4 gap-2">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setDonationAmount(amount);
                  setCustomAmount("");
                  setShowQrCodeSim(false);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition ${
                  donationAmount === amount && !customAmount
                    ? "bg-emerald-550 border-emerald-500 text-emerald-300 bg-emerald-500/10"
                    : "bg-slate-950/70 border-slate-850 text-slate-400 hover:text-slate-250"
                }`}
              >
                R$ {amount}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 border border-slate-900 p-2.5 rounded-xl">
            <span className="text-xs font-semibold text-slate-400 pl-1.5">Outro Valor:</span>
            <input
              type="number"
              className="bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none w-full font-bold"
              placeholder="Digite o valor personalizado"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setDonationAmount("");
                setShowQrCodeSim(false);
              }}
            />
          </div>
        </div>

        {/* PIX Key copier */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest block font-mono">2. Faça a transferência via PIX Copia e Cola</span>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="bg-slate-950 border border-slate-900 px-4 py-3 rounded-xl flex-1 flex justify-between items-center text-slate-300 font-mono text-xs">
              <span className="truncate">{pixDonationKey}</span>
              <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">Chave Aleatória / E-mail</span>
            </div>
            
            <button
              onClick={() => handleCopyKey(pixDonationKey, "key")}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-550 text-white text-xs font-black rounded-xl shadow transition duration-200 flex items-center justify-center space-x-1.5"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar Chave PIX</span>
            </button>
          </div>

          <div className="flex justify-between items-center px-1">
            {copiedKey ? (
              <span className="text-emerald-400 text-xs font-bold flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{copiedKey}</span>
              </span>
            ) : (
              <span className="text-slate-500 text-[11px]">Beneficiário Final: Daniel Carvalho</span>
            )}

            <button
              onClick={() => setShowQrCodeSim(true)}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-semibold"
            >
              Exibir QR Code Simulado
            </button>
          </div>

          {/* QR Code Graphic element */}
          <AnimatePresence>
            {showQrCodeSim && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-900/50 p-4 rounded-2xl border border-slate-850/60 flex flex-col items-center justify-center space-y-3 overflow-hidden"
              >
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  {/* Styled mock vector QR Code block */}
                  <div className="w-32 h-32 bg-slate-100 flex flex-col p-1.5 relative border border-slate-200">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-slate-900"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-slate-900"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-slate-900"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-slate-900"></div>
                    <div className="w-full h-full flex flex-wrap content-between p-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-5 h-5 rounded-sm ${
                            (i * 3 + 2) % 5 === 0 || i % 3 === 0 ? "bg-slate-900" : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-semibold font-mono">
                  Contribuição definida em R$ {customAmount ? parseFloat(customAmount).toFixed(2) : parseFloat(donationAmount).toFixed(2)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Official Communication & Social Networks channels */}
      <div id="socials_panel" className="bg-slate-950/40 border border-slate-900 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-black text-white hover:text-blue-400 transition uppercase tracking-wider">Canais Sociais & Comunidade Oficial</h2>
          <p className="text-xs text-slate-400">
            Acompanhe nossas ferramentas, novos alertas de fraudes urgentes e vídeos instrucionais em nossas futuras mídias oficiais em processo de criação:
          </p>
        </div>

        {/* 2x2 Grid of Social Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Telegram link card */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 flex items-start space-x-3">
            <span className="p-2 bg-sky-500/10 text-sky-400 rounded-lg shrink-0">
              <MessageSquare className="w-4 h-4" />
            </span>
            <div className="space-y-1">
              <strong className="text-white text-xs block font-bold leading-tight uppercase tracking-wide">Telegram Grupo</strong>
              <span className="text-[10.5px] text-slate-400 block leading-tight">Vazamentos Urgentes & Notificações</span>
              <span className="text-[9.5px] font-semibold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded-full w-fit block mt-1.5">Em breve</span>
            </div>
          </div>

          {/* YouTube channel card */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 flex items-start space-x-3">
            <span className="p-2 bg-red-500/10 text-red-400 rounded-lg shrink-0">
              <Youtube className="w-4 h-4" />
            </span>
            <div className="space-y-1">
              <strong className="text-white text-xs block font-bold leading-tight uppercase tracking-wide">YouTube Canal</strong>
              <span className="text-[10.5px] text-slate-400 block leading-tight">Vídeo Tutoriais & Desmascarando Golpes</span>
              <span className="text-[9.5px] font-semibold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full w-fit block mt-1.5">Em Planejamento</span>
            </div>
          </div>

          {/* TikTok channel card */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 flex items-start space-x-3">
            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-lg shrink-0">
              <Share2 className="w-4 h-4" />
            </span>
            <div className="space-y-1">
              <strong className="text-white text-xs block font-bold leading-tight uppercase tracking-wide">TikTok Digital</strong>
              <span className="text-[10.5px] text-slate-400 block leading-tight">Dicas rápidas de defesa em 30 segundos</span>
              <span className="text-[9.5px] font-semibold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded-full w-fit block mt-1.5">Estruturando</span>
            </div>
          </div>

          {/* Kwai channel card */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 flex items-start space-x-3">
            <span className="p-2 bg-orange-500/10 text-orange-400 rounded-lg shrink-0">
              <ExternalLink className="w-4 h-4" />
            </span>
            <div className="space-y-1">
              <strong className="text-white text-xs block font-bold leading-tight uppercase tracking-wide">Kwai Oficial</strong>
              <span className="text-[10.5px] text-slate-400 block leading-tight">Alertará cidadãos sobre golpes de SMS fictícios</span>
              <span className="text-[9.5px] font-semibold text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded-full w-fit block mt-1.5">Estruturando</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mail Contacts segment */}
      <div id="contact_area" className="bg-slate-900/30 p-5 rounded-2xl border border-slate-850/60 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-center md:justify-start space-x-1.5">
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Fale com o Coordenador Geral</span>
          </h4>
          <p className="text-xs text-slate-400">Sugestões de novas integrações, parcerias instrucionais ou auditoria técnica para órgãos de justiça.</p>
        </div>

        <div className="flex flex-col space-y-1.5">
          <button
            onClick={() => handleCopyKey(contactEmail, "contact")}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-xs font-bold text-slate-200 rounded-xl border border-slate-850 hover:border-slate-800 transition duration-150 flex items-center space-x-1.5"
          >
            <span>{contactEmail}</span>
            <Copy className="w-3.5 h-3.5 text-slate-500" />
          </button>
          {copiedContact && (
            <span className="text-[10px] text-emerald-400 font-bold block text-center animate-pulse">{copiedContact}</span>
          )}
        </div>
      </div>
    </div>
  );
};
