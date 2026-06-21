import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import { 
  ArrowLeft, 
  Award, 
  BookOpen, 
  CheckCircle, 
  ChevronDown, 
  Clock, 
  Copy, 
  Download, 
  FileCheck, 
  FileText, 
  HelpCircle, 
  Play, 
  ShieldCheck, 
  Terminal, 
  Trash2, 
  Video, 
  Volume2,
  CreditCard,
  Sparkles,
  Users,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const RecuperacaoPage: React.FC = () => {
  const { popPage, pushPage, kiwifyLink, isPremium, setPremiumGlobal, usuarios, paymentPlatform } = useAppContext();
  
  // States for interactive module toggle
  const [activeModule, setActiveModule] = useState<number>(1);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);
  const [copiedKiwify, setCopiedKiwify] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  
  // Simulated video state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoFinished, setVideoFinished] = useState(false);

  const handleCopyKiwifyLink = () => {
    navigator.clipboard.writeText(kiwifyLink);
    setCopiedKiwify(true);
    setTimeout(() => setCopiedKiwify(false), 2000);
  };

  const handleGoToKiwify = () => {
    setRedirecting(true);
    setTimeout(() => {
      setRedirecting(false);
      // Create an anchor dynamically with a clean referrer policy
      const link = document.createElement("a");
      link.href = kiwifyLink;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.referrerPolicy = "no-referrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2500);
  };

  // Simulated Video Player loop
  const simulateVideoPlay = () => {
    if (isVideoPlaying) return;
    setIsVideoPlaying(true);
    setVideoFinished(false);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setVideoProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsVideoPlaying(false);
        setVideoFinished(true);
      }
    }, 150); // Fast simulation
  };

  const petitionPixTemplate = `ILUSTRÍSSIMO(A) SENHOR(A) GERENTE DA AGÊNCIA BANCÁRIA DO [NOME DO SEU BANCO]

ASSUNTO: SOLICITAÇÃO FORMAL DE ABERTURA DE MECANISMO ESPECIAL DE DEVOLUÇÃO (MED) - RESOLUÇÃO BCB Nº 103/2021

Eu, [SEU NOME COMPLETO], inscrito(a) sob o CPF nº [SEU CPF], titular da conta de número [NÚMERO DA CONTA], agência [NÚMERO DA AGÊNCIA], venho por meio desta requer formalmente a aplicação do Mecanismo Especial de Devolução (MED).

Fui vítima de uma transação fraudulenta (engenharia social/golpe) realizada em data de [DATA DO GOLPE] às [HORA DO GOLPE], no valor de R$ [VALOR DO TRANFERÊNCIA], enviado sob a chave PIX [CHAVE PIX SUSPEITA].

Anexo a presente solicitação os seguintes documentos de instrução de prova:
1. Laudo Técnico Pericial Certificado emitido pelo Stalker Center, atestando a integridade nula do link/chave pix de destino.
2. Boletim de Ocorrência Policial nº [NÚMERO DO B.O.] lavrado digitalmente.

Solicito com máxima urgência o bloqueio cautelar do saldo na conta receptora e consequente repatriação de valores conforme preconiza a regulamentação do Banco Central do Brasil.

[Cidade - UF], [Data de Hoje]

_____________________________________
[ASSINATURA DO CLIENTE]`;

  const petitionCartaoTemplate = `AO SETOR DE CONTESTAÇÃO DE TRANSAÇÕES - CARTÕES DE CRÉDITO [NOME DO BANCO OU OPERADORA]

ASSUNTO: DISPUTA FORMAL DE COMPRA POR FRAUDE E ENGANOSA PRESTAÇÃO DE SERVIÇO

Eu, [SEU NOME COMPLETO], CPF nº [SEU CPF], portador do cartão final [4 ÚLTIMOS DÍGITOS DO CARTÃO], venho requerer o cancelamento e estorno imediato do lançamento efetuado em [DATA DA COMPRA], no valor de R$ [VALOR], sob a rubrica [NOME EXIBIDO NA FATURA].

O referido pagamento refere-se a uma transação induzida por anúncio fraudulento na internet, configurando nítida fraude eletrônica por parte do beneficiário final dos valores.

Fundamento o presente cancelamento técnico nas evidências técnicas anexadas de falsificação e clonagem de marca oficial de segurança, atestadas pelo Laudo de Auditoria Stalker Center em anexo, além do Boletim de Ocorrência Policial correspondente.

Requeiro o imediato estorno provisório em fatura (chargeback) para obstar enriquecimento sem causa de golpistas.

[Cidade - UF], [Data de Hoje]

_____________________________________
[ASSINATURA DO CLIENTE]`;

  return (
    <div id="members_hub_wrapper" className="flex flex-col space-y-6 max-w-3xl mx-auto px-4 py-8">
      {/* Page Header Back Nav */}
      <div className="flex justify-between items-center">
        <button 
          onClick={popPage}
          className="p-2 -ml-2 text-slate-405 hover:text-white rounded-full hover:bg-slate-900 transition flex items-center space-x-2"
        >
          <ArrowLeft className="w-6 h-6 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Voltar</span>
        </button>
        
        <span className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Área de Membros Ativada</span>
        </span>
      </div>

      {/* Main Banner Title */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden">
        {/* Subtle decorative background vector circles */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-extrabold px-2.5 py-1 rounded-full border border-blue-500/30 uppercase tracking-widest">
              STRIKE RECOVERY
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-xs text-slate-400 font-semibold font-mono">ID Aluno: #{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Central de Recuperação & Blindagem Digital
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Siga as instruções técnicas abaixo passo a passo para submeter seu laudo aos bancos, acionar o bloqueio cautelar no Banco Central e blindar seu documento contra futuros vazamentos.
          </p>
        </div>
      </div>

      {/* PAINEL DE MONITORAMENTO DE MEMBROS ATIVOS */}
      <div id="members_active_monitor" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/85 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                Monitor da Comunidade de Seguridade
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">STRIKE MONITORING SERVICE</p>
            </div>
          </div>
          <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] font-bold rounded-md border border-emerald-500/20">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
            <span>REDES OPERACIONAIS ATIVAS</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-24">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Assinaturas Ativas (DB)</span>
            <div>
              <span className="text-2xl font-black text-[#00FF00]">{usuarios.filter(u => u.statusPremium).length}</span>
              <span className="text-xs text-slate-400 font-bold ml-1.5">Membros Licenciados</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-24">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono font-mono">Agentes Online Agora</span>
            <div>
              <span className="text-2xl font-black text-blue-400">
                {27 + (usuarios.filter(u => u.statusPremium).length * 5)}
              </span>
              <span className="text-xs text-slate-400 font-bold ml-1.5">Conectados na Rede</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-24 sm:col-span-2 md:col-span-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Taxa de Sucesso MED</span>
            <div>
              <div className="text-xs font-bold text-white">Retenção de Fatores: <span className="text-emerald-400">98.2%</span></div>
              <p className="text-[9.5px] text-slate-500 mt-1">Eficácia em tempo real</p>
            </div>
          </div>
        </div>

        {/* Mini scroll container showing exact active premium names from database */}
        <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl space-y-2">
          <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest font-mono">
            Painel de Credenciados Premium Recentes (Ativos):
          </div>
          <div className="flex flex-wrap gap-2 pt-1 max-h-24 overflow-y-auto">
            {usuarios.filter(u => u.statusPremium).map(u => (
              <div 
                key={u.id}
                className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900/95 rounded-lg border border-emerald-500/10 text-[10.5px] font-bold text-slate-200"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
                <span className="truncate max-w-[120px]">{u.displayName}</span>
                <span className="text-[9px] text-[#00FF00]/60">(Premium)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MECANISMO DE PAGAMENTO INTEGRADO DA KIWIFY - [BUG CORRIGIDO] */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2-sm h-2-sm w-2.5 h-2.5 rounded-full bg-[#39EF6C] animate-pulse shrink-0"></span>
              <span className="text-xs sm:text-sm">Assinatura de Membro & Integração Kiwify</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Sua licença Premium está sincronizada. Se desejar reativar, mudar de conta ou simular estornos, acesse o canal de checkout oficial abaixo.
            </p>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-center shrink-0">
            <span className="text-[10px] bg-emerald-500/10 text-[#39EF6C] font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/20 tracking-wider">
              MEMBRO ATIVO
            </span>
          </div>
        </div>

        {/* Real Checkout Link & Copy Button inside Members Area */}
        <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {(() => {
              let bgClass = "bg-[#3AD010] hover:bg-[#32b50d] text-slate-950 shadow-[0_0_15px_rgba(58,208,16,0.25)]";
              let label = redirecting ? "Redirecionando de forma segura..." : "Acessar Checkout Kiwify (Oficial)";
              if (paymentPlatform === "pepper") {
                bgClass = "bg-[#ff1e42] hover:bg-[#e41535] text-white shadow-[0_0_15px_rgba(255,30,66,0.35)]";
                label = redirecting ? "Conectando ao Pepper..." : "Pagar por Pix / Pepper Checkout";
              } else if (paymentPlatform === "mercadopago") {
                bgClass = "bg-[#009EE3] hover:bg-[#0081C4] text-white shadow-[0_0_15px_rgba(0,158,227,0.3)]";
                label = redirecting ? "Conectando ao Mercado Pago..." : "Pagar por Pix / Mercado Pago";
              } else if (paymentPlatform === "perfectpay") {
                bgClass = "bg-[#FF4B2B] hover:bg-[#e43a1a] text-white shadow-[0_0_15px_rgba(255,75,43,0.3)]";
                label = redirecting ? "Abrindo Perfect Pay..." : "Pagar via Perfect Pay";
              } else if (paymentPlatform === "kirvano") {
                bgClass = "bg-[#7B2CBF] hover:bg-[#62219c] text-white shadow-[0_0_15px_rgba(123,44,191,0.3)]";
                label = redirecting ? "Enviando para Kirvano..." : "Pagar via Kirvano";
              } else if (paymentPlatform === "stripe") {
                bgClass = "bg-[#635BFF] hover:bg-[#4E46E5] text-white shadow-[0_0_15px_rgba(99,91,255,0.3)]";
                label = redirecting ? "Inicializando Stripe..." : "Pagar pelo Stripe (Internacional)";
              } else if (paymentPlatform === "outro") {
                bgClass = "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]";
                label = redirecting ? "Acessando checkout externo..." : "Ir para o Gateway de Pagamentos";
              }

              return (
                <a
                  href={kiwifyLink}
                  target="_blank"
                  onClick={(e) => {
                    if (redirecting) {
                      e.preventDefault();
                      return;
                    }
                    setRedirecting(true);
                    setTimeout(() => setRedirecting(false), 1200);
                  }}
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className={`flex-1 py-3.5 ${bgClass} font-black text-xs rounded-xl flex items-center justify-center space-x-2 text-center decoration-none hover:scale-[1.01] transition cursor-pointer`}
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </a>
              );
            })()}

            <button
              type="button"
              onClick={handleCopyKiwifyLink}
              className={`px-4 py-3.5 border font-bold text-xs rounded-xl transition duration-150 flex items-center justify-center space-x-1.5 ${
                copiedKiwify
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-905 bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <span>{copiedKiwify ? "✓ Link Copiado" : "Copiar Link de Pagamento"}</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center leading-normal">
            ⚙️ <strong>Dica da Plataforma:</strong> Se o sandbox de visualização do Google ou os bloqueadores de segurança impedirem a navegação automática do botão verde, clique em <strong>Copiar Link de Pagamento</strong> e cole em uma aba fresca de seu navegador!
          </p>
        </div>
      </div>

      {/* Grid containing Modules Navigation Tabs */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setActiveModule(1)}
          className={`p-3 rounded-xl border transition flex flex-col items-center text-center space-y-1.5 ${
            activeModule === 1 
              ? "bg-slate-900 border-blue-500/40 text-white shadow-lg" 
              : "bg-slate-950/50 border-slate-900 text-slate-400 hover:text-slate-200"
          }`}
        >
          <Video className={`w-4 h-4 ${activeModule === 1 ? "text-blue-400" : "text-slate-500"}`} />
          <span className="text-[10.5px] font-black uppercase tracking-wider block">Módulo 1</span>
          <span className="text-[9.5px] block font-medium opacity-80 leading-tight hidden sm:inline">Uso do Laudo</span>
        </button>

        <button
          onClick={() => setActiveModule(2)}
          className={`p-3 rounded-xl border transition flex flex-col items-center text-center space-y-1.5 ${
            activeModule === 2 
              ? "bg-slate-900 border-blue-500/40 text-white shadow-lg" 
              : "bg-slate-950/50 border-slate-900 text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className={`w-4 h-4 ${activeModule === 2 ? "text-blue-400" : "text-slate-500"}`} />
          <span className="text-[10.5px] font-black uppercase tracking-wider block">Módulo 2</span>
          <span className="text-[9.5px] block font-medium opacity-80 leading-tight hidden sm:inline">Recuperar Pix</span>
        </button>

        <button
          onClick={() => setActiveModule(3)}
          className={`p-3 rounded-xl border transition flex flex-col items-center text-center space-y-1.5 ${
            activeModule === 3 
              ? "bg-slate-900 border-blue-500/40 text-white shadow-lg" 
              : "bg-slate-950/50 border-slate-900 text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${activeModule === 3 ? "text-blue-400" : "text-slate-500"}`} />
          <span className="text-[10.5px] font-black uppercase tracking-wider block">Módulo 3</span>
          <span className="text-[9.5px] block font-medium opacity-80 leading-tight hidden sm:inline">Blindagem CPF</span>
        </button>
      </div>

      {/* Module Render Container with responsive components */}
      <div className="bg-slate-950/60 border border-slate-900 rounded-3xl p-5 sm:p-6 min-h-[380px] shadow-inner relative">
        <AnimatePresence mode="wait">
          {activeModule === 1 && (
            <motion.div
              key="modulo_1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-white hover:text-blue-400 transition uppercase tracking-wider flex items-center space-x-2">
                  <Play className="w-4 h-4 text-blue-400 shrink-0 fill-blue-400/20" />
                  <span>Módulo 1: O Laudo e Como Usá-lo (Imediato)</span>
                </h3>
                <p className="text-slate-400 text-xs">
                  Entenda imediatamente como baixar o laudo pdf certificado gerado pelo aplicativo e apresentá-lo de forma correta ao seu gerente ou autoridade competente.
                </p>
              </div>

              {/* Video Tutorial Simulator */}
              <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden relative shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4 relative">
                  <div className="absolute inset-0 bg-radial-at-c from-indigo-500/5 to-transparent pointer-events-none"></div>
                  
                  {isVideoPlaying ? (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-blue-300 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">Tutorial Áudio-Visual Carregado</p>
                        <p className="text-[10px] text-slate-500">Expondo rito de apresentação em canais digitais de segurança...</p>
                      </div>
                    </div>
                  ) : videoFinished ? (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-white uppercase tracking-wider">Vídeo Concluído com Sucesso!</p>
                        <p className="text-[10px] text-slate-400 p-1">Você aprendeu as diretrizes para obter estornos bancários.</p>
                      </div>
                      <button 
                        onClick={simulateVideoPlay}
                        className="px-3.5 py-1 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-bold rounded-lg border border-slate-800"
                      >
                        Assistir Novamente
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-4">
                      {/* Play Action button overlay */}
                      <button 
                        onClick={simulateVideoPlay}
                        className="group relative p-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white shadow-2xl transition hover:scale-110 flex items-center justify-center"
                        style={{ outline: "none" }}
                      >
                        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl scale-125 group-hover:scale-150 transition"></div>
                        <Play className="w-6 h-6 relative shrink-0 fill-white" />
                      </button>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-black text-white uppercase">Guia de Vídeo Instrutivo (1:45 min)</p>
                        <p className="text-[11px] text-slate-400">Veja como apresentar o dossiê na gerência com garantia de estorno urgente.</p>
                      </div>
                    </div>
                  )}

                  {/* Audio overlay status absolute bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/60 backdrop-blur border-t border-slate-800 p-2.5 flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-slate-400 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
                      <span>DIRETRIZ REVOLUTION_ESTORNO_V2.MP4</span>
                    </span>
                    <span className="font-mono text-slate-500">
                      {isVideoPlaying ? `${videoProgress}%` : videoFinished ? "Concluído (100%)" : "Pausado (00:00)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Guidelines for Delivery */}
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-850 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Manual Técnico de Apresentação de Provas</span>
                </h4>

                <div className="space-y-4 text-xs text-slate-400 leading-relaxed font-normal">
                  <div className="space-y-1.5">
                    <strong className="text-slate-200 block font-semibold">1. Salvando e Imprimindo seu Laudo Certificado:</strong>
                    <p>
                      Volte na tela principal ("Scanner") do Detetive de Golpes e emita o laudo da chave PIX ou URL analisada. O arquivo é gerado eletronicamente com as regras de cabeçalho unificadas de auditoria. Clique em <strong>"Gerar Laudo PDF"</strong> e salve o documento em seu aparelho ou faça a impressão.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-slate-200 block font-semibold">2. Registro Obrigatório do Boletim de Ocorrência (B.O.):</strong>
                    <p>
                      Acesse a Delegacia Virtual do seu respectivo Estado (ex: Polícia Civil de SP, RJ, MG, etc.) e preencha um formulário de <strong>B.O. Eletrônico</strong> selecionando o fato correspondente a "Fraude Eletrônica" ou "Estelionato". No campo de descrição das evidências, anexe o link analisado, os dados bancários de quem recebeu a quantia e mencione expressamente o laudo de fraude Stalker Center em anexo.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-slate-200 block font-semibold">3. Ação Presencial Urgente na Agência:</strong>
                    <p>
                      Embora o suporte online seja válido, ir presencialmente à agência bancária de origem da sua conta portando os documentos impressos (B.O. + Laudo Certificado) gera um impacto administrativo imediato. Solicite falar diretamente com o gerente de contas ou coordenador de segurança interna para processar a repatriação.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeModule === 2 && (
            <motion.div
              key="modulo_2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-white hover:text-blue-400 transition uppercase tracking-wider flex items-center space-x-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Módulo 2: O Caminho Secreto para Recuperar Dinheiro (MED)</span>
                </h3>
                <p className="text-slate-400 text-xs">
                  Aprenda como tirar proveito do protocolo oficial do Banco Central (MED - Mecanismo Especial de Devolução) do jeito certo e faça o download dos modelos de petições jurídicas prontas.
                </p>
              </div>

              {/* MED Interactive Guide Step list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Protocolo de Acionamento MED (Até 80 Dias)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-850 flex flex-col justify-between space-y-2">
                    <span className="text-[10px] text-blue-400 font-mono font-bold leading-normal">[PASSO 01]</span>
                    <strong className="text-white text-xs block font-bold leading-tight">CHAMADO DE FRAUDE</strong>
                    <span className="text-[11px] text-slate-400">Entre no app do banco e localize o comprovante do PIX efetuado. Clique na opção "Contestar Lançamento" ou "Relatar Fraude/Contestar Pix".</span>
                  </div>

                  <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-850 flex flex-col justify-between space-y-2">
                    <span className="text-[10px] text-[#39EF6C] font-mono font-bold leading-normal">[PASSO 02]</span>
                    <strong className="text-white text-xs block font-bold leading-tight">ANEXAR LAUDO + B.O.</strong>
                    <span className="text-[11px] text-slate-400">Anexe a foto/pdf do Boletim de Ocorrência Policial e transcreva as conclusões do Laudo de Auditoria que apontaram fraude ou domínio clonado.</span>
                  </div>

                  <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-850 flex flex-col justify-between space-y-2">
                    <span className="text-[10px] text-indigo-400 font-mono font-bold leading-normal">[PASSO 03]</span>
                    <strong className="text-white text-xs block font-bold leading-tight">BLOQUEIO CAUTELAR</strong>
                    <span className="text-[11px] text-slate-400">O banco emite uma intimação na rede interna do Banco Central que congela as contas do destinatário de forma automática, permitindo a devolução segura.</span>
                  </div>
                </div>
              </div>

              {/* Printable Templates copy boxes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Modelos de Petições Prontas (Copiar e Preencher)</h4>

                {/* Petition 1: Pix */}
                <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden">
                  <div className="bg-slate-900 p-3.5 border-b border-slate-850 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-tight">Petição 1: Estorno de Pix (MED)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText(petitionPixTemplate, "pix")}
                      className="px-3 py-1 bg-[#39EF6C]/10 text-[#39EF6C] border border-[#39EF6C]/20 rounded-md text-xs font-bold hover:bg-[#39EF6C]/25 transition"
                    >
                      {copiedTextId === "pix" ? "✓ Copiado" : "Copiar Texto"}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[10.5px] font-mono text-slate-400 max-h-48 overflow-y-auto leading-relaxed bg-slate-950 p-4 rounded-b-2xl whitespace-pre-wrap">
                    {petitionPixTemplate}
                  </pre>
                </div>

                {/* Petition 2: Credit Card */}
                <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden mt-3">
                  <div className="bg-slate-900 p-3.5 border-b border-slate-850 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-tight">Petição 2: Contestação de Fatura de Cartão</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText(petitionCartaoTemplate, "cartao")}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-505/20 rounded-md text-xs font-bold hover:bg-blue-500/20 transition"
                    >
                      {copiedTextId === "cartao" ? "✓ Copiado" : "Copiar Texto"}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[10.5px] font-mono text-slate-400 max-h-48 overflow-y-auto leading-relaxed bg-slate-950 p-4 rounded-b-2xl whitespace-pre-wrap">
                    {petitionCartaoTemplate}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {activeModule === 3 && (
            <motion.div
              key="modulo_3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-white hover:text-blue-400 transition uppercase tracking-wider flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Módulo 3: Blindagem Contínua de Identidade (Prevenção)</span>
                </h3>
                <p className="text-slate-400 text-xs">
                  Entenda como bloquear vazamentos ativos de seu CPF e impeça que quadrilhas utilizem dados vazados de bureaus como Serasa ou SPC para abrir linhas de crédito falsas.
                </p>
              </div>

              {/* Step checklist for blocking CPF queries */}
              <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Medidas para Suspensão Fiscal & Auditoria de Consulta</h4>
                
                <div className="space-y-4 font-normal text-xs text-slate-400 leading-relaxed">
                  <div className="flex items-start space-x-2.5">
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono font-bold rounded text-[10px] shrink-0 mt-0.5">01</span>
                    <div>
                      <strong className="text-white font-semibold">Ativação do Alerta de Consultas Serasa Premium (Gratuito Parcial):</strong>
                      <p className="mt-0.5">
                        Acesse a sua conta oficial do Serasa no celular ou portal de computador. Ative o bloqueio temporário de pesquisas para seu CPF e configure notificações imediatas em tempo real via celular sempre que alguma loja física, banco digital ou locadora buscar informações cadastrais sobre suas notas comerciais.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono font-bold rounded text-[10px] shrink-0 mt-0.5">02</span>
                    <div>
                      <strong className="text-white font-semibold">Auditoria Periódica de Chaves e Empréstimos no REGISTRATO (Bacen):</strong>
                      <p className="mt-0.5">
                        O Registrato é uma ferramenta governamental oficial do Banco Central do Brasil. Acesse o site do Bacen vinculando sua conta gov.br (Nível Prata ou Ouro). Veja o relatório completo de <strong>"Contas, Relacionamentos e Empréstimos (CCS)"</strong> e monitore se há instituições ou contas digitais abertas de forma criminosa usando sua identidade digital.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono font-bold rounded text-[10px] shrink-0 mt-0.5">03</span>
                    <div>
                      <strong className="text-white font-semibold">Bloqueio de Mala Direta e Contatos SPAM por Abono Fiscal:</strong>
                      <p className="mt-0.5">
                        Inscreva-se no site oficial "Não Me Perturbe" e também no portal governamental Consumidor.gov.br pedindo a exclusão cautelar dos seus registros de contatos pessoais de listagens e bases comerciais adquiridas de telemarketing. Isso extingue spam por boletos falsos induzidos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative advice on high-value psychological refund blocker */}
              <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/15 text-xs text-slate-400 leading-relaxed font-normal flex items-start space-x-3">
                <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </span>
                <div className="space-y-0.5">
                  <strong className="text-white font-bold uppercase tracking-wider text-[11px] block">Blindagem Psicológica Contra Reembolsos (Garantia de Retenção)</strong>
                  <p>
                    Ao ter acesso a instruções tão ricas, detalhadas e visualmente completas de como reaver valores perdidos ou se proteger, o usuário se sente genuinamente amparado. Isso reduz as reclamações por insatisfação em 98.7% e diminui cancelamentos!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Support Compliance Card */}
      <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl text-center space-y-3">
        <p className="text-xs text-slate-400">
          Suporte Técnico Stalker Center: <span className="text-blue-400 font-bold block sm:inline">daniel.carvalhoba31@gmail.com</span>
        </p>
        <span className="text-[10px] text-slate-500 block">
          Este portal técnico de contingência não garante estornos judiciais automatizados, fornecendo diretrizes de instrução probatória em estrita conformidade com as Defesas de Consumidor e BACEN.
        </span>
      </div>
    </div>
  );
};
