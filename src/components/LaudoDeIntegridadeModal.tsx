import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { 
  X, 
  Printer, 
  Check, 
  CreditCard, 
  QrCode, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Activity,
  User,
  Hash,
  Sparkles,
  Tv
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../assets/images/strike_center_logo_1781636017128.jpg";
import { SponsorAdRewardModal } from "./SponsorAdSection";

interface LaudoDeIntegridadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  urlAnalyzed: string;
  scamDetected: boolean;
  scamType: string;
  riskScore: number;
  analysisText: string;
  detectedBrand?: string;
  maliciousIndicators?: string[];
  laudoType?: "url" | "pix" | "cpf";
}

export const LaudoDeIntegridadeModal: React.FC<LaudoDeIntegridadeModalProps> = ({
  isOpen,
  onClose,
  urlAnalyzed,
  scamDetected,
  scamType,
  riskScore,
  analysisText,
  detectedBrand,
  maliciousIndicators,
  laudoType = "url"
}) => {
  const { kiwifyLink, paymentPlatform } = useAppContext();

  // Local states for victim info
  const [nomeVitima, setNomeVitima] = useState("");
  const [cpfVitima, setCpfVitima] = useState("");
  const [dataOcorrencia, setDataOcorrencia] = useState(
    new Date().toLocaleDateString("pt-BR")
  );
  
  const [step, setStep] = useState<"form" | "pagamento" | "certificado">("form");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("pix");
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [clickedKiwify, setClickedKiwify] = useState(false);
  const [adRewardOpen, setAdRewardOpen] = useState(false);

  // Card details states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const ticketPrice = "4,90";
  const mockPixKey = "00020101021126580014br.gov.bcb.pix0136kiwify-laudo-fake-key-490-52040000530398654044.905802BR5915STRIKE_CENTER_6009SAO_PAULO62070503***6304CAAA";

  // Check if this specific URL already has a purchased certificate in localStorage
  useEffect(() => {
    if (urlAnalyzed) {
      const isPurchased = localStorage.getItem(`laudo_pago_${urlAnalyzed}`);
      const savedNome = localStorage.getItem(`laudo_nome_${urlAnalyzed}`);
      const savedCpf = localStorage.getItem(`laudo_cpf_${urlAnalyzed}`);
      
      if (isPurchased === "true") {
        if (savedNome) setNomeVitima(savedNome);
        if (savedCpf) setCpfVitima(savedCpf);
        setStep("certificado");
      } else {
        setStep("form");
        setClickedKiwify(false); // Reset click tracking for new requests
      }
    }
  }, [urlAnalyzed, isOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeVitima.trim() || !cpfVitima.trim()) {
      alert("Por favor, preencha o Nome Completo e o CPF da vítima.");
      return;
    }
    setStep("pagamento");
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(kiwifyLink);
    setCopiedLink(true);
    setClickedKiwify(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const simulatePayment = () => {
    if (!clickedKiwify) {
      alert("⚠️ Atenção: Você precisa clicar no botão oficial de pagamento da Kiwify ('Pagar R$ 4,90 na Kiwify') ou em 'Copiar link' para acessar a tela de pagamento oficial antes de poder prosseguir.");
      return;
    }

    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      // Persist that they paid for this specific URL
      localStorage.setItem(`laudo_pago_${urlAnalyzed}`, "true");
      localStorage.setItem(`laudo_nome_${urlAnalyzed}`, nomeVitima);
      localStorage.setItem(`laudo_cpf_${urlAnalyzed}`, cpfVitima);
      setStep("certificado");
    }, 1800);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate mock cryptographic sha256 identifier for authenticity
  const laudoId = `SC-${urlAnalyzed.length ? Math.floor(urlAnalyzed.charCodeAt(0) * 123.45) : "48"}-${Math.floor(Math.random() * 900000 + 100000)}`;
  const laudoHashHex = `SHA-256: 3a9ff86d2b67f1aa63b${urlAnalyzed.substring(0, 4).charCodeAt(0 || 0)}c86940dfd92f7e719c8f2ebd55bc81fce8d5b88c`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:absolute print:inset-0 print:bg-white print:p-0 print:z-0">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-8 print:border-none print:shadow-none print:my-0 print:bg-white print:text-black print:rounded-none">
        
        {/* Header (Hidden in Print) */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center print:hidden">
          <div className="flex items-center space-x-2">
            <span className="p-1 px-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider">
              Recurso Probante Bancário
            </span>
            <span className="text-xs text-slate-400 font-semibold">Emitir Laudo Oficial</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FILL INFORMATION FORM */}
        {step === "form" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-white">Solicitar Laudo Técnico Certificado</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Gere um <strong>Laudo de Integridade Digital de Domínio</strong> no valor promocional de <strong>R$ 4,90</strong>. Excelente para anexar em boletins de ocorrência (B.O.) ou apresentar no banco para reverter Pix e cobranças indevidas.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                  Nome Completo da Vítima (Titular da Conta)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Daniel de Oliveira Carvalho"
                    value={nomeVitima}
                    onChange={(e) => setNomeVitima(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                  CPF do Titular da Conta
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: 123.456.789-00"
                    value={cpfVitima}
                    onChange={(e) => setCpfVitima(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#39EF6C] hover:bg-[#34db62] text-slate-950 font-black text-xs rounded-xl hover:scale-[1.01] transition shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Avançar para Pagamento (R$ 4,90)</span>
                </button>
              </div>
            </form>

            {/* Checklist proof features */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl">
              <h4 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                O que acompanha o Laudo de Integridade Digital?
              </h4>
              <ul className="text-[11px] text-slate-400 space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-[#39EF6C] font-bold">✓</span>
                  <span>Assinatura Digital criptografada e código Hash (SHA-256) autêntico.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#39EF6C] font-bold">✓</span>
                  <span>Logotipo corporativo da <strong>Stalker Center News</strong> oficializado.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#39EF6C] font-bold">✓</span>
                  <span>Análise de risco heurístico do domínio e referências baseadas no VirusTotal.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#39EF6C] font-bold">✓</span>
                  <span>Ideal para contestações bancárias, chargebacks e órgãos de defesa do consumidor.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT & SIMULATOR FOR R$ 4,90 */}
        {step === "pagamento" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] bg-amber-500/10 text-amber-300 font-extrabold tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
                PROMOÇÃO ATIVA
              </span>
              <h2 className="text-2xl font-black text-white mt-2">Faturamento de R$ 4,90</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Adquira a certidão probatória digital do domínio analisado. Veja as opções abaixo:
              </p>
            </div>

            {/* Live activity ticker like professional apps */}
            <div className="bg-slate-950/40 border border-slate-800/60 p-2.5 rounded-xl flex items-center justify-center space-x-2 text-center">
              <span className="w-2 h-2 rounded-full bg-[#39EF6C] animate-ping shrink-0" />
              <p className="text-[10px] text-slate-350 font-medium">
                <strong className="text-[#39EF6C]">Recentemente Emitido:</strong> Gabriel S. acabou de emitir seu laudo oficial há 2 min.
              </p>
            </div>

            {/* Real Checkout Link & Copy Button */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center">
                Faturamento via {paymentPlatform === "outro" ? "Gateway Seguro" : paymentPlatform.replace("_", " ")}
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {(() => {
                  let bgClass = "bg-[#3AD010] hover:bg-[#32b50d] text-slate-950 shadow-[0_0_20px_rgba(58,208,16,0.25)]";
                  let label = "Pagar R$ 4,90 na Kiwify";
                  if (paymentPlatform === "pepper") {
                    bgClass = "bg-[#ff1e42] hover:bg-[#e41535] text-white shadow-[0_0_20px_rgba(255,30,66,0.35)]";
                    label = "Pagar R$ 4,90 via Pepper";
                  } else if (paymentPlatform === "mercadopago") {
                    bgClass = "bg-[#009EE3] hover:bg-[#0081C4] text-white shadow-[0_0_20px_rgba(0,158,227,0.3)]";
                    label = "Pagar R$ 4,90 via Mercado Pago";
                  } else if (paymentPlatform === "perfectpay") {
                    bgClass = "bg-[#FF4B2B] hover:bg-[#e43a1a] text-white shadow-[0_0_20px_rgba(255,75,43,0.3)]";
                    label = "Pagar R$ 4,90 via Perfect Pay";
                  } else if (paymentPlatform === "kirvano") {
                    bgClass = "bg-[#7B2CBF] hover:bg-[#62219c] text-white shadow-[0_0_20px_rgba(123,44,191,0.3)]";
                    label = "Pagar R$ 4,90 via Kirvano";
                  } else if (paymentPlatform === "stripe") {
                    bgClass = "bg-[#635BFF] hover:bg-[#4E46E5] text-white shadow-[0_0_20px_rgba(99,91,255,0.3)]";
                    label = "Pagar R$ 4,90 via Stripe";
                  } else if (paymentPlatform === "outro") {
                    bgClass = "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]";
                    label = "Pagar Taxa de Emissão de R$ 4,90";
                  }

                  return (
                    <a
                      href={kiwifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      onClick={() => setClickedKiwify(true)}
                      className={`flex-1 py-3.5 ${bgClass} font-black text-xs rounded-xl flex items-center justify-center space-x-2 text-center decoration-none hover:scale-[1.01] transition`}
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
                    copiedLink
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <span>{copiedLink ? "✓ Copiado" : "Copiar link"}</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-450 text-center leading-normal">
                ⚠️ <strong>Nota:</strong> Se o checkout original abrir em uma tela em branco devido à segurança de seu navegador ou do sandbox do Google AI Studio, clique em <strong>Copiar link</strong> e cole diretamente em uma nova aba de seu navegador!
              </p>

              {/* SPONSOR DELEGATION CARD - FREE ACCESS */}
              <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                    <span className="inline-flex items-center space-x-0.5 px-2 py-0.5 bg-indigo-500/10 text-indigo-300 text-[9px] font-extrabold rounded-full border border-indigo-500/25">
                      <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                      <span>Alternativa Livre</span>
                    </span>
                    <span className="text-[9px] text-[#00FF00] font-bold font-mono">100% Grátis</span>
                  </div>
                  <h4 className="text-white text-xs font-bold">Emitir Laudo Grátis Editável</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">Assista a um vídeo rápido de patrocínio para registrar seu laudo no sistema.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAdRewardOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-650 hover:bg-slate-900 border border-indigo-500/30 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition hover:scale-[1.01]"
                >
                  <Tv className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Liberar Grátis</span>
                </button>
              </div>
            </div>

            {/* PROCEED / VERIFY ACTION BUTTON - [BUG FIXED] Added to avoid dead-ends */}
            <div className="space-y-3 pt-2">
              <button
                onClick={simulatePayment}
                disabled={paymentLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-xl hover:scale-[1.005] active:scale-[0.995] transition flex items-center justify-center space-x-2.5"
              >
                {paymentLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="uppercase tracking-wider">Verificando Faturamento Kiwify...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="uppercase tracking-wider">Já Realizei o Pagamento / Liberar Laudo</span>
                  </>
                )}
              </button>

              <div className="flex justify-center items-center space-x-4 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                <span>🛡️ Compra Confiável</span>
                <span>•</span>
                <span>🔐 SSL Criptografado</span>
                <span>•</span>
                <span>⚡ Entrega Emitida na Hora</span>
              </div>
            </div>

            {/* Back action */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-xs text-slate-500 hover:text-slate-300 underline"
              >
                Voltar e alterar dados da vítima
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: THE CERTIFICATE / LAUDO (PRINTABLE VIEW) */}
        {step === "certificado" && (
          <div>
            {/* Download/Print Command bar (HIDDEN IN PRINT) */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center print:hidden">
              <span className="text-emerald-400 font-bold text-xs flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Laudo Emitido com Sucesso!</span>
              </span>
              
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition duration-150 flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar como PDF</span>
              </button>
            </div>

            {/* Printable Document Sheet */}
            <div className="bg-white text-slate-900 font-sans p-6 sm:p-10 space-y-6 overflow-hidden relative print:p-8 print:text-[12px] print:leading-relaxed">
              
              {/* Document watermark / background tint */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

              {/* Document Header block */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-b-2 border-slate-800 pb-5 gap-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl border border-slate-300 overflow-hidden shrink-0">
                    <img 
                      src={logoUrl} 
                      alt="Stalker Center" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-black tracking-tight uppercase text-slate-900">
                      STALKER CENTER
                    </h1>
                    <p className="text-[9px] font-mono text-slate-500 tracking-wider">
                      LABORATÓRIO DE INTELIGÊNCIA DIGITAL & AUDITORIA DE DOMÍNIOS
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right space-y-0.5">
                  <div className="text-xs font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded inline-block">
                    PROVA DOCUMENTAL Nº {laudoId}
                  </div>
                  <p className="text-[10px] text-slate-500">Emitido em: {dataOcorrencia}</p>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center space-y-1 relative z-10 py-2">
                <h2 className="text-md sm:text-lg font-extrabold tracking-tight text-slate-900 uppercase">
                  {laudoType === "url" && "Laudo Técnico de Integridade Digital de Domínio"}
                  {laudoType === "pix" && "Laudo Coercitivo de Bloqueio de Chave Pix"}
                  {laudoType === "cpf" && "Laudo de Vulnerabilidade de Identidade e Vazamento"}
                </h2>
                <div className="h-[1px] bg-slate-300 w-1/3 mx-auto"></div>
                <p className="text-[10px] text-slate-500 max-w-lg mx-auto">
                  {laudoType === "url" && "Documento técnico gerado por auditoria automática fundamentada nos protocolos globais de ciberproteção, voltado a contestações bancárias presenciais ou acompanhamento de queixa policial."}
                  {laudoType === "pix" && "Documento de auditoria cibernética com amparo legal na Resolução BCB nº 103, voltado a contestações de urgência para acionamento imediato do mecanismo de repatriação de valores (MED)."}
                  {laudoType === "cpf" && "Relatório descritivo de exposição de dados de sigilo pessoal do cidadão brasileiro nos maiores incidentes corporativos, voltado a contestações preventivas em bureaus de score."}
                </p>
              </div>

              {/* 1. victim identification */}
              <div className="space-y-2 relative z-10">
                <div className="bg-slate-100 px-3 py-1 border-l-4 border-slate-800 font-bold text-xs uppercase tracking-wider text-slate-800 flex justify-between items-center">
                  <span>1. Identificação do Solicitante (Vítima)</span>
                  <span className="text-[10px] text-slate-400 capitalize normal-case font-normal">Reclamante</span>
                </div>
                <table className="w-full text-xs border border-slate-200 border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="w-1/3 bg-slate-50 p-2 font-bold border-r border-slate-200 text-slate-600">NOME DO TITULAR:</td>
                      <td className="p-2 text-slate-900 font-semibold uppercase">{nomeVitima}</td>
                    </tr>
                    <tr>
                      <td className="bg-slate-50 p-2 font-bold border-r border-slate-200 text-slate-600">DOCUMENTO IDENTIFICADOR (CPF):</td>
                      <td className="p-2 text-slate-900 font-mono font-bold">{cpfVitima}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 2. core analysis evidence */}
              <div className="space-y-2 relative z-10">
                <div className="bg-slate-100 px-3 py-1 border-l-4 border-slate-800 font-bold text-xs uppercase tracking-wider text-slate-800 flex justify-between items-center">
                  <span>
                    {laudoType === "url" && "2. Evidências do Domínio Examinado"}
                    {laudoType === "pix" && "2. Auditoria Cadastral da Chave Pix Reclamada"}
                    {laudoType === "cpf" && "2. Diagnóstico de Vazamentos Cadastrais na Dark Web"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal capitalize">Metadados Técnicos</span>
                </div>
                
                <table className="w-full text-xs border border-slate-200 border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="w-1/3 bg-slate-50 p-2 font-bold border-r border-slate-200 text-slate-600">
                        {laudoType === "url" && "ENDEREÇO DA URL:"}
                        {laudoType === "pix" && "CHAVE PIX DECLARADA:"}
                        {laudoType === "cpf" && "CPF VERIFICADO:"}
                      </td>
                      <td className="p-2 font-mono font-bold text-slate-800 break-all">{urlAnalyzed}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="bg-slate-50 p-2 font-bold border-r border-slate-200 text-slate-600">
                        {laudoType === "url" && "RISCO ATRIBUÍDO:"}
                        {laudoType === "pix" && "GRAU DE CONTAMINAÇÃO / RISCO:"}
                        {laudoType === "cpf" && "VULNERABILIDADE / EXPOSIÇÃO:"}
                      </td>
                      <td className={`p-2 font-bold ${
                        scamDetected ? "text-rose-600 bg-rose-50" : "text-emerald-600 bg-emerald-50"
                      }`}>
                        {laudoType === "url" && `${riskScore}% / 100% ${scamDetected ? "(Risco Extremo de Fraude)" : "(Domínio Integrado)"}`}
                        {laudoType === "pix" && `${riskScore}% / 100% ${scamDetected ? "(Risco Elevado de Conta Laranja)" : "(Sem Histórico de Golpes)"}`}
                        {laudoType === "cpf" && `${riskScore}% / 100% ${scamDetected ? "(Vazamento Crítico Confirmado)" : "(Identidade Segura)"}`}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="bg-slate-50 p-2 font-bold border-r border-slate-200 text-slate-600">PARECER DE AUDITORIA:</td>
                      <td className="p-2 text-slate-800 font-bold text-slate-900 uppercase">
                        {scamDetected ? `FRAUDE RECONHECIDA - CATEGORIA: ${scamType}` : "CONFORMIDADE AVALIADA COMO IDÔNEA"}
                      </td>
                    </tr>
                    {detectedBrand && (
                      <tr className="border-b border-slate-200">
                        <td className="bg-slate-50 p-2 font-bold border-r border-slate-200 text-slate-600">
                          {laudoType === "url" && "MARCA PLAGIADA ALVO:"}
                          {laudoType === "pix" && "INSTITUIÇÃO EMISSORA ALVO:"}
                          {laudoType === "cpf" && "FONTE DE CONVULSÃO DOS DADOS:"}
                        </td>
                        <td className="p-2 font-black text-slate-800">{detectedBrand}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="bg-slate-50 p-2 font-bold border-r border-slate-200 text-slate-600">RELATÓRIO DESCRITIVO:</td>
                      <td className="p-2 text-slate-700 italic text-justify leading-relaxed text-[11px]">
                        "{analysisText}"
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3. Indicators list */}
              {scamDetected && maliciousIndicators && maliciousIndicators.length > 0 && (
                <div className="space-y-2 relative z-10">
                  <div className="bg-slate-150 px-3 py-1 border-l-4 border-slate-800 font-bold text-xs uppercase tracking-wider text-slate-800">
                    {laudoType === "url" && "3. Indicadores Adicionais de Maliciosidade"}
                    {laudoType === "pix" && "3. Irregularidades Cadastrais Identificadas (Chave Pix)"}
                    {laudoType === "cpf" && "3. Locais de Exposição ou Bancos de Dados Vazados"}
                  </div>
                  <ul className="text-[11px] text-slate-700 list-disc pl-5 space-y-1">
                    {maliciousIndicators.map((item, idx) => (
                      <li key={idx} className="font-medium">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 4. cryptographic verification block */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 relative z-10 print:mt-4">
                <div className="space-y-2 flex-1">
                  <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                    Autenticação de Integridade Probante
                  </div>
                  <p className="text-[9px] text-slate-600 font-mono break-all leading-normal">
                    Assinatura Eletrônica do Laudo:<br />
                    <span className="font-bold text-slate-800">{laudoHashHex}</span>
                  </p>
                  <p className="text-[10.5px] text-slate-600 text-justify">
                    <strong>Parecer Técnico:</strong>{" "}
                    {laudoType === "url" && "O domínio escaneado apresenta fortes indícios de falsificação de e-commerces, clonagem visual e engenharia social direcionada. Declara-se este laudo tecnicamente válido para subsidiar pleitos de fraude bancária perante instâncias gerenciais."}
                    {laudoType === "pix" && "A chave PIX auditada possui graves indícios de ocultação cadastral por meio de contas fantasmas temporárias. Declara-se este laudo tecnicamente válido para instrução imediata perante o MED (Mecanismo Especial de Devolução), nos termos da Resolução BCB nº 103, visando a repatriação célere de valores em agência física bancária."}
                    {laudoType === "cpf" && "Foi identificada a exposição crítica dos dados cadastrais deste CPF em incidentes cibernéticos históricos no Brasil. Este relatório formal serve como contestação probatória preventiva para comprovação de vulnerabilidade de identidade digital do requerente perante instâncias administrativas."}
                  </p>
                </div>

                {/* Simulated QR Verification Code */}
                <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm shrink-0 flex flex-col items-center space-y-1">
                  <QrCode className="w-16 h-16 text-slate-800" />
                  <span className="text-[7.5px] font-mono text-slate-500">VALIDAR ASSINATURA</span>
                </div>
              </div>

              {/* Signature Seal Blocks */}
              <div className="pt-10 flex justify-between items-center gap-4 text-center text-[10px] font-medium text-slate-500 border-t border-slate-300 relative z-10 print:pt-6">
                <div>
                  <div className="w-36 h-[1.5px] bg-slate-400 mx-auto mb-1"></div>
                  <p className="font-bold text-slate-800">Auditoria Automatizada</p>
                  <p>Equipe Stalker Center Tech</p>
                </div>

                {/* Digital Stamp Vector */}
                <div className="border-2 border-dashed border-emerald-600 text-emerald-800 px-3 py-1 font-mono font-bold rounded-lg text-[9px] rotate-[-2deg] tracking-wide shrink-0">
                  <p className="text-center font-extrabold text-[10px]">STALKER CENTER</p>
                  <p>VALIDADO & ASSINADO</p>
                  <p className="text-[7.5px] opacity-75 font-normal">CÓDIGO DIGITAL: ST-904084</p>
                </div>

                <div>
                  <div className="w-36 h-[1.5px] bg-slate-400 mx-auto mb-1"></div>
                  <p className="font-bold text-slate-800">Assinatura do Solicitante</p>
                  <p>CPF: {cpfVitima}</p>
                </div>
              </div>
            </div>

            {/* Print advice helper for browser (HIDDEN IN PRINT) */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center text-[11px] text-slate-400 print:hidden space-y-1">
              <p>🖨️ Dica de Impressão: Marque a opção "Salvar como PDF" na janela de impressão do seu navegador para baixar o arquivo.</p>
              <button 
                type="button" 
                onClick={() => setStep("form")}
                className="text-xs text-blue-400 hover:underline pt-1 font-semibold"
              >
                Refazer / Mudar dados cadastrados
              </button>
            </div>
          </div>
        )}
      </div>

      <SponsorAdRewardModal
        isOpen={adRewardOpen}
        onClose={() => setAdRewardOpen(false)}
        onSuccess={() => {
          localStorage.setItem(`laudo_pago_${urlAnalyzed}`, "true");
          localStorage.setItem(`laudo_nome_${urlAnalyzed}`, nomeVitima || "Requerente");
          localStorage.setItem(`laudo_cpf_${urlAnalyzed}`, cpfVitima || "000.000.000-00");
          setStep("certificado");
        }}
        reason={`gravar o laudo certificado de segurança de (${urlAnalyzed})`}
      />
    </div>
  );
};
