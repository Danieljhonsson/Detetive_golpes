import React from "react";
import { AppStateProvider, useAppContext } from "./AppContext";
import { HomePage } from "./components/HomePage";
import { AdminPage } from "./components/AdminPage";
import { GerenciarUsuariosPage } from "./components/GerenciarUsuariosPage";
import { PagamentoPage } from "./components/PagamentoPage";
import { PaywallPage } from "./components/PaywallPage";
import { RecuperacaoPage } from "./components/RecuperacaoPage";
import { SobrePage } from "./components/SobrePage";
import { 
  AlertTriangle, 
  Settings, 
  Lock, 
  ShieldAlert,
  Terminal,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "./assets/images/strike_center_logo_1781636017128.jpg";

// Main wrapper content that consumes Context
const AppContent: React.FC = () => {
  const { currentPage, maintenanceMode, pushPage, isPremium } = useAppContext();
  const [logoError, setLogoError] = React.useState(false);

  // If the system is in Maintenance Mode AND we are not in admin-related panels, block user access.
  const isBlockedByMaintenance = maintenanceMode && currentPage !== "admin" && currentPage !== "usuarios";

  if (isBlockedByMaintenance) {
    return (
      <div id="maintenance_stage" className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-center items-center p-6 text-center space-y-6">
        <div className="absolute top-4 right-4 animate-pulse">
          <button 
            onClick={() => pushPage("admin")}
            title="Acesso Privado"
            className="p-2 text-slate-700 hover:text-slate-400 border border-slate-800 rounded-xl"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl scale-150"></div>
          <div className="relative bg-gradient-to-tr from-amber-600 to-yellow-500 p-5 rounded-full shadow-2xl border border-amber-400/25 text-white flex justify-center items-center">
            <AlertTriangle className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-2 max-w-sm">
          <h1 className="text-xl sm:text-2xl font-black text-white">Servidor em Manutenção</h1>
          <p className="text-sm text-slate-400 leading-relaxed text-balance">
            Estamos aplicando melhorias e atualizações imediatas em nossas bases de dados do VirusTotal para sua segurança.
          </p>
          <p className="text-xs text-slate-500 pt-1">Por favor, retorne em alguns instantes.</p>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl max-w-xs flex items-center space-x-2 text-slate-400 text-left">
          <Terminal className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-[10px] font-mono">CODE_STATUS: DB_RESEEDING_OK</span>
        </div>
      </div>
    );
  }

  // Render current view matching context state
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "admin":
        return <AdminPage />;
      case "usuarios":
        return <GerenciarUsuariosPage />;
      case "pagamento":
        return <PagamentoPage />;
      case "paywall":
        return <PaywallPage />;
      case "recuperacao":
        return isPremium ? <RecuperacaoPage /> : <PaywallPage />;
      case "sobre":
        return <SobrePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div id="app_frame" className="min-h-screen bg-[#060A13] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white relative">
      {/* Decorative ambient color overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main navigation header */}
      <header id="global_header" className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => pushPage("home")}
            className="flex items-center space-x-2.5 w-auto border-none bg-transparent hover:opacity-80 transition cursor-pointer"
          >
            {logoError ? (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 bg-slate-950 font-black text-xs shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                SC
              </div>
            ) : (
              <img 
                src={logoUrl} 
                alt="Stalker Center Logo" 
                className="w-8 h-8 rounded-lg object-cover border border-blue-500/30"
                referrerPolicy="no-referrer"
                onError={() => {
                  console.warn("Header logo failed to load, switching to professional seal.");
                  setLogoError(true);
                }}
              />
            )}
            <span className="font-extrabold tracking-tight text-white text-sm">
              Detetive de Golpes
            </span>
          </button>
          
          <div className="flex items-center space-x-2.5 text-xs font-semibold">
            <button 
              onClick={() => pushPage("sobre")}
              className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-750 text-slate-350 hover:text-white bg-slate-950/80 transition flex items-center space-x-1"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/10 shrink-0" />
              <span>Apoiar & Sobre</span>
            </button>

            {isPremium ? (
              <button 
                onClick={() => pushPage("recuperacao")}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white shadow flex items-center space-x-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0"></span>
                <span>Área de Membros</span>
              </button>
            ) : (
              <button 
                onClick={() => pushPage("paywall")}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white shadow"
              >
                Assinar Premium
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main responsive stage content wrapper with motion transition effects */}
      <main className="flex-1 max-w-7xl w-full mx-auto pb-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer copyright */}
      <footer id="global_footer" className="border-t border-slate-950/60 bg-slate-950 py-6 text-center text-[11px] text-slate-600 font-mono mt-auto shrink-0 leading-normal">
        <div className="max-w-md mx-auto space-y-2 px-4">
          <p>© {new Date().getFullYear()} Detetive de Golpes Sênior Co. Todos os direitos reservados.</p>
          <p className="opacity-75">Criptografia de ponta a ponta & análise inteligente de links.</p>
          
          {/* Visual Update Confirmation Badge */}
          <div className="pt-2 flex justify-center">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/15 animate-pulse">
              <span>●</span>
              <span>Versão Atualizada v1.1.2 Ativa</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
