import React from "react";
import { useAppContext } from "../AppContext";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  ShieldAlert
} from "lucide-react";
import { motion } from "motion/react";
import logoUrl from "../assets/images/strike_center_logo_1781636017128.jpg";

export const PaywallPage: React.FC = () => {
  const { pushPage, popPage } = useAppContext();
  const [logoError, setLogoError] = React.useState(false);

  return (
    <div id="paywall_view_wrapper" className="flex flex-col space-y-6 max-w-2xl mx-auto px-4 py-8">
      {/* Back navigation - [BUG F] CORRIGIDO com context.safePop() equivalent popPage */}
      <div className="flex items-center">
        <button 
          onClick={popPage}
          className="p-2 -ml-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-900 transition flex items-center space-x-2"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xs font-semibold">Voltar</span>
        </button>
      </div>

      {/* Main Checkout Graphic Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-radial-at-t from-blue-500/10 to-transparent"></div>
        
        {/* Shield Vector Badge with custom Logo */}
        <div className="relative flex justify-center">
          <div className="p-1.5 bg-slate-950 rounded-2xl border border-blue-500/20 overflow-hidden shadow-2xl">
            {logoError ? (
              <div className="w-20 h-20 rounded-xl bg-slate-900/90 flex flex-col items-center justify-center text-blue-400 p-2 text-center">
                <ShieldAlert className="w-8 h-8 text-blue-500 mb-1" />
                <span className="text-[8px] uppercase tracking-wider text-slate-400 font-mono">Forense</span>
              </div>
            ) : (
              <img 
                src={logoUrl} 
                alt="Stalker Center" 
                className="w-20 h-20 rounded-xl object-cover"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
        </div>

        {/* Dynamic Typography Header */}
        <div className="space-y-2 relative">
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Desbloquear Relatório Completo & Acesso Premium
          </h2>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Evite faturas e QR codes de Pix falsos no WhatsApp. Obtenha verificação inteligente em massa.
          </p>
        </div>

        {/* Pricing tag */}
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl max-w-xs mx-auto">
          <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">Acesso Instantâneo</span>
          <div className="text-2xl font-black text-white mt-1">R$ 19,90</div>
          <span className="text-[10px] text-slate-500">Pagamento único · Sem mensalidades</span>
        </div>

        {/* CTA Unlock Now */}
        <div className="pt-2">
          <button 
            onClick={() => pushPage("pagamento")}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
          >
            <span>Desbloquear Agora</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Privacy, Terms, and Contact compliance panel */}
      <div className="space-y-4 pt-4 text-center">
        {/* Cybersecurity encryption message */}
        <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs">
          <Lock className="w-4 h-4 text-slate-500 shrink-0" />
          <span>🔒 Criptografia de ponta a ponta. Seus dados e relatórios estão 100% protegidos.</span>
        </div>

        {/* Standard Terms notice */}
        <div className="flex items-center justify-center space-x-2 text-slate-500 text-[11px]">
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span>Ao prosseguir, você concorda com nossos Termos de Uso e Política de Privacidade.</span>
        </div>

        {/* Technical help mail footer */}
        <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-xl max-w-sm mx-auto">
          <div className="flex items-center space-x-2 text-slate-400 text-[11px] justify-center">
            <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Precisa de ajuda ou teve algum problema?</span>
          </div>
          <a 
            href="mailto:daniel.carvalhoba31@gmail.com" 
            className="text-xs font-bold text-blue-400 hover:text-blue-300 block mt-1 underline"
          >
            Fale conosco: daniel.carvalhoba31@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
