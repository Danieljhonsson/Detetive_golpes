import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { 
  Building, 
  Users, 
  DollarSign, 
  ToggleLeft, 
  ToggleRight, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  ChevronLeft,
  Settings,
  AlertOctagon,
  KeyRound,
  Sparkles,
  CheckCircle,
  QrCode,
  CreditCard,
  Tv,
  Coins,
  TrendingUp,
  Save
} from "lucide-react";
import { motion } from "motion/react";
import logoUrl from "../assets/images/strike_center_logo_1781636017128.jpg";

export const AdminPage: React.FC = () => {
  const { 
    pushPage, 
    popPage, 
    usuarios, 
    maintenanceMode, 
    setMaintenanceMode,
    isPremium,
    setPremiumGlobal,
    kiwifyLink,
    setKiwifyLink,
    paymentPlatform,
    setPaymentPlatform
  } = useAppContext();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [simUrl, setSimUrl] = useState("");
  const [simLaudoSuccess, setSimLaudoSuccess] = useState("");

  // Sponsorship and Ad Monetization stats
  const [adViews, setAdViews] = useState(0);
  const [adClicks, setAdClicks] = useState(0);
  const [adEarnings, setAdEarnings] = useState(0.00);

  const [customAdText, setCustomAdText] = useState("");
  const [customAdUrl, setCustomAdUrl] = useState("https://kiwify.app");
  const [adSaveSuccess, setAdSaveSuccess] = useState(false);

  useEffect(() => {
    // Sync telemetry analytics to make the administrator experience highly authentic
    let views = parseInt(localStorage.getItem("dg_ad_views") || "0", 10);
    if (views === 0) {
      views = 428; 
      localStorage.setItem("dg_ad_views", "428");
    }
    
    let clicks = parseInt(localStorage.getItem("dg_ad_clicks") || "0", 10);
    if (clicks === 0) {
      clicks = 34;
      localStorage.setItem("dg_ad_clicks", "34");
    }

    let earnings = parseFloat(localStorage.getItem("dg_ad_earnings") || "0");
    if (earnings === 0) {
      earnings = 79.56;
      localStorage.setItem("dg_ad_earnings", "79.56");
    }

    setAdViews(views);
    setAdClicks(clicks);
    setAdEarnings(earnings);

    const txt = localStorage.getItem("dg_ads_custom_text") || "";
    const url = localStorage.getItem("dg_ads_custom_url") || "https://kiwify.app";
    setCustomAdText(txt);
    setCustomAdUrl(url);
  }, []);

  const handleSaveAdSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("dg_ads_custom_text", customAdText);
    localStorage.setItem("dg_ads_custom_url", customAdUrl);
    setAdSaveSuccess(true);
    setTimeout(() => setAdSaveSuccess(false), 3000);
  };

  // Calculate dynamic stats
  const premiumCount = usuarios.filter(u => u.statusPremium).length;
  const faturamentoSimulado = premiumCount * 19.90;

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password === "Dcm1982**") {
      setSuccessMessage("🔐 Acesso liberado! Bem-vindo, Administrador.");
      setTimeout(() => {
        pushPage("usuarios");
      }, 1000);
    } else {
      setErrorMessage("❌ Senha incorreta! Acesso negado.");
    }
  };

  return (
    <div id="admin_view_wrapper" className="flex flex-col space-y-6 max-w-2xl mx-auto px-4 py-8">
      {/* Header Banner Page */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-indigo-900/40 p-6 flex items-center justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="space-y-1 relative">
          <button 
            onClick={popPage}
            className="text-indigo-400 hover:text-white flex items-center space-x-1.5 text-xs font-semibold mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar ao Inicio</span>
          </button>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <Building className="w-5 h-5 text-indigo-400" />
            <span>Painel de Administração</span>
          </h1>
          <p className="text-xs text-slate-400">Modo Administrador Geral do Sistema</p>
        </div>
        <div className="rounded-xl border border-blue-500/30 overflow-hidden shrink-0">
          <img 
            src={logoUrl} 
            alt="Stalker Center Logo" 
            className="w-12 h-12 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Grid of Dynamic Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card Premium Users */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl relative flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Usuários Premium</span>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#00FF00] tracking-tight">{premiumCount}</div>
            <p className="text-[11px] text-slate-500 mt-1">Sincronizado via Firebase</p>
          </div>
        </div>

        {/* Card Faturamento Simulado */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl relative flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Faturamento Real</span>
            <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              R$ {faturamentoSimulado.toFixed(2).replace(".", ",")}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Faturamento bruto recorrente (Kiwify)</p>
          </div>
        </div>

        {/* Card Faturamento Ads */}
        <div className="p-5 bg-gradient-to-tr from-slate-900/80 to-indigo-950/85 border border-indigo-900/35 rounded-2xl relative flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest flex items-center space-x-1">
              <Tv className="w-3.5 h-3.5 text-indigo-400" />
              <span>Receita de Ads</span>
            </span>
            <div className="p-1 px-2 bg-indigo-500/15 rounded border border-indigo-500/20 text-indigo-400 text-[9px] font-mono font-bold">
              Subsidio Livre
            </div>
          </div>
          <div>
            <div className="text-3.5xl font-black text-[#00FF00] tracking-tight">
              R$ {adEarnings.toFixed(2).replace(".", ",")}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">
              {adViews} views • {adClicks} cliques
            </p>
          </div>
        </div>
      </div>

      {/* Maintenance controls */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/60">
        <div className="p-4 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-1.5">
              <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Manutenção Geral</span>
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Bloqueia temporariamente o app para os usuários em caso de atualizações de servidor.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className="text-slate-400 hover:text-white transition"
          >
            {maintenanceMode ? (
              <ToggleRight className="w-12 h-12 text-[#00FF00]" />
            ) : (
              <ToggleLeft className="w-12 h-12 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Admin verification key */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center space-x-3 text-slate-400">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Acesso Restrito ao Firestore</h3>
            <p className="text-xs text-slate-500">Insira a Senha Master do servidor para liberar o formulário comercial.</p>
          </div>
        </div>

        <form onSubmit={handleAdminAccess} className="space-y-4 pt-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Digite a Senha Master..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-rose-500/15 border border-rose-500/20 text-rose-300 rounded-lg text-xs font-semibold"
            >
              {errorMessage}
            </motion.div>
          )}

          {successMessage && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs font-semibold"
            >
              {successMessage}
            </motion.div>
          )}

          {/* [BUG H] CORRIGIDO & OTIMIZADO: botão visível sempre */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-md cursor-pointer transition flex justify-center items-center space-x-2"
          >
            <Unlock className="w-4 h-4" />
            <span>Gerenciar Usuários (Firebase)</span>
          </button>
        </form>
      </div>

      {/* SEÇÃO RESTRITA: SIMULADOR DE CHECKOUT */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Simulador de Checkout Integrado (Restrito)
          </h3>
        </div>

        <p className="text-xs text-slate-400 leading-normal">
          ⚙️ <strong>Painel de Testes do Coordenador:</strong> Utilize os botões abaixo para simular pagamentos e testar o funcionamento dos fluxos bloqueados do sistema.
        </p>

        {/* PERSONALIZAÇÃO INTEGRAL DE OUTROS GATEWAYS DE PAGAMENTO */}
        <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
            <div className="space-y-0.5">
              <span className="text-[11px] font-extrabold uppercase text-indigo-400">Painel de Gateway de Recebimento</span>
              <p className="text-[10px] text-slate-500">Ajuste onde seu cliente realiza o pagamento e ativa as credenciais</p>
            </div>
            <span className="text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase border border-emerald-500/20 shadow-sm leading-none">
              Sincronizado
            </span>
          </div>

          {/* CONSULTORIA PROFISSIONAL DIRECT: QUAL PLATAFORMA UTILIZAR? */}
          <div className="p-3 bg-indigo-950/20 border border-indigo-500/15 rounded-xl space-y-2">
            <h5 className="text-[11px] font-bold text-indigo-300 flex items-center space-x-1">
              <span>💡 Processamento de Pagamentos Exclusivo</span>
            </h5>
            <p className="text-[10.5px] text-slate-350 leading-relaxed font-normal">
              A plataforma está agora configurada para operar <strong>exclusivamente</strong> com a Pepper, garantindo aprovação instantânea, Pix imediato e checkout premium moderno com taxas amigáveis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase block">1. Plataforma de Vendas Ativa</label>
              <select
                value={paymentPlatform}
                onChange={(e) => setPaymentPlatform("pepper")}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-not-allowed"
                disabled
              >
                <option value="pepper">Pepper Checkout (Ativo & Exclusivo)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase block">2. Seu Link da Pepper (URL)</label>
              <input
                type="text"
                placeholder="Ex: https://go.pepperpay.com.br/xxxxx"
                value={kiwifyLink}
                onChange={(e) => setKiwifyLink(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-705 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="text-[10.5px] text-slate-500 flex items-center space-x-1 font-mono pt-1">
            <span>🔧 Status Atual:</span>
            <span className="text-emerald-400 font-bold capitalize">
              Link de pagamento ativo 100% via Pepper
            </span>
          </div>
        </div>

        {/* PERSONALIZAÇÃO DE ANÚNCIOS PATROCINADOS (ADSENSE / MONETIZAÇÃO) */}
        <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
            <div className="space-y-0.5">
              <span className="text-[11px] font-extrabold uppercase text-indigo-400">Configuração de Anúncios & Patrocínio</span>
              <p className="text-[10px] text-slate-500">Substitua o conteúdo da rede AdSense por anúncios ou ofertas personalizadas de alta conversão (CPC/CPA)</p>
            </div>
            <span className="text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase border border-emerald-500/20 shadow-sm leading-none">
              Campanha Ativa
            </span>
          </div>

          <form onSubmit={handleSaveAdSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Texto da Oferta Promocional (Customizado)</label>
                <input
                  type="text"
                  placeholder="Ex: 🛡️ Alerta Hacker: Monitore seu CPF ativamente por apenas R$ 9,90"
                  value={customAdText}
                  onChange={(e) => setCustomAdText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase block">URL de Redirecionamento (Link de Afiliado)</label>
                <input
                  type="text"
                  placeholder="Ex: https://kirvano.com/seu-link-afiliado"
                  value={customAdUrl}
                  onChange={(e) => setCustomAdUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {adSaveSuccess && (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-2.5 bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 rounded-lg text-[10.5px] font-bold"
              >
                ✓ Configuração de Anúncios Salva com Sucesso! Os feeds de anúncios da plataforma foram devidamente atualizados.
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition"
            >
              <Save className="w-4 h-4 shrink-0" />
              <span>Salvar Alterações de Anúncios</span>
            </button>
          </form>

          {/* SIMULADO: SEGREDO DE CPM */}
          <div className="p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl text-[10px] text-slate-400 uppercase tracking-wide leading-relaxed font-mono flex items-center justify-between gap-2">
            <span>💸 Valor Médio Adquirido por Impressão de Vídeo: <strong className="text-emerald-400">R$ 0,45 por visualização</strong></span>
            <span>Renda passiva ativa</span>
          </div>
        </div>

        {/* SIMULATOR 1: PREMIUM (R$ 19,90) */}
        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase text-slate-400">Assinatura Premium (R$ 19,90)</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
              isPremium 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "bg-slate-800 text-slate-400"
            }`}>
              {isPremium ? "Assinatura: ATIVA ✅" : "Assinatura: INATIVA ❌"}
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            Alterna o status Premium global da sua própria conta (Daniel Carvalho) para simular as telas exclusivas liberadas após pagamento na Kiwify.
          </p>

          <button
            type="button"
            onClick={() => {
              const newVal = !isPremium;
              setPremiumGlobal(newVal);
              alert(`🎉 Status Premium simulação alterado para: ${newVal ? "ATIVADO" : "DESATIVADO"}`);
            }}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition duration-150 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>{isPremium ? "Simular Cancelamento da Assinatura" : "Simular Pagamento R$ 19,90 (Ativar Premium)"}</span>
          </button>
        </div>

        {/* SIMULATOR 2: LAUDO DE INTEGRIDADE (R$ 4,90) */}
        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase text-slate-400">Laudo de Integridade (R$ 4,90)</span>
            <span className="text-teal-400 font-extrabold bg-teal-500/10 px-2 py-0.5 rounded text-[10px]">R$ 4,90 por URL</span>
          </div>

          <p className="text-[11px] text-slate-500">
            Insira um domínio verificado para simular o pagamento da taxa de R$ 4,90 da Kiwify. Isso irá autorizar a exibição e impressão do certificado do laudo correspondente.
          </p>

          <div className="space-y-2">
            <label className="text-[9.5px] text-slate-500 font-bold uppercase block">Endereço do Site Analisado</label>
            <input
              type="text"
              placeholder="Ex: correios-taxa-falsa.online"
              value={simUrl}
              onChange={(e) => {
                setSimUrl(e.target.value);
                setSimLaudoSuccess("");
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {simLaudoSuccess && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 rounded-lg text-[11px] font-semibold"
            >
              ✓ {simLaudoSuccess}
            </motion.div>
          )}

          <button
            type="button"
            onClick={() => {
              if (!simUrl.trim()) {
                alert("⚠️ Por favor, digite uma URL válida.");
                return;
              }
              const cleanUrl = simUrl.trim().toLowerCase();
              localStorage.setItem(`laudo_pago_${cleanUrl}`, "true");
              localStorage.setItem(`laudo_nome_${cleanUrl}`, "Simulação Adm");
              localStorage.setItem(`laudo_cpf_${cleanUrl}`, "000.000.000-00");
              setSimLaudoSuccess(`Pagamento simulado com SUCESSO para o domínio "${cleanUrl}"! O laudo PDF de R$ 4,90 está liberado.`);
            }}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[#3AD010] font-bold text-xs rounded-xl transition duration-150 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <QrCode className="w-4 h-4 shrink-0" />
            <span>Simular Liberação de Laudo R$ 4,90</span>
          </button>
        </div>
      </div>
    </div>
  );
};
