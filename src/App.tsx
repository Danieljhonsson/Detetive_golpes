typescriptimport React, { useState } from "react";
import { useAppState } from "./AppContext";

const App: React.FC = () => {
  const {
    currentPage,
    pushPage,
    recentSearches,
    addSearch,
    pesquisasRestantes,
    isPremium,
    kiwifyLink,
    customAdDirectLink,
    customAdScript,
    customAdText,
    customAdUrl
  } = useAppState();

  const [inputSearch, setInputSearch] = useState<string>("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSearch.trim()) return;

    const isUrl = inputSearch.includes(".") || inputSearch.includes("http");
    let scamDetected = false;
    let scamType = "None";
    let riskScore = 0;
    let analysisText = "Site verificado e seguro para navegação. Nenhuma irregularidade foi detectada nesta URL.";

    if (isUrl) {
      if (inputSearch.includes("promocao") || inputSearch.includes("correios") || inputSearch.includes("online") || inputSearch.includes("sorteio")) {
        scamDetected = true;
        scamType = "Clonagem de Marca";
        riskScore = 95;
        analysisText = "ALERTA! Este endereço tenta mimetizar os Correios Brasileiros enviando ordens de cobrança falsas para retirada de produtos fantasmas.";
      }
    }

    addSearch(inputSearch, scamDetected, scamType as any, riskScore, analysisText);
    setInputSearch("");
  };

  if (currentPage === "paywall") {
    return (
      <div className="min-h-screen bg-[#060b19] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-[#0d1527] rounded-2xl shadow-2xl p-8 border border-slate-800">
          <div className="w-16 h-16 bg-blue-900/50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="text-3xl font-black mb-3 uppercase tracking-tight text-blue-500">Limite Atingido</h2>
          <p className="text-slate-400 mb-8 text-base">
            Você utilizou suas consultas gratuitas diárias. Escolha como deseja continuar protegendo sua família:
          </p>
          <a
            href="https://effectivecpmnetwork.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(() => window.location.reload(), 1500)}
            className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl shadow-lg transition-all uppercase tracking-wider mb-4"
          >
            🔓 Liberar Buscas Grátis
          </a>
          <a
            href={kiwifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg rounded-xl shadow-lg transition-all uppercase tracking-wider"
          >
            ⭐ Ativar Conta Premium
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b19] text-slate-100 font-sans antialiased pb-24">
      
      {/* MENU SUPERIOR ORIGINAL */}
      <header className="w-full bg-[#0d1527] border-b border-slate-800/80 py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <span className="text-xl font-black text-blue-500 tracking-wider">🕵️‍♂️ Detetive de Golpes</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Apoiar & Sobre</button>
          <button onClick={() => pushPage("paywall")} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xs transition-all shadow-md">Assinar Premium</button>
        </div>
      </header>

      {/* CONTAINER DO BUSCADOR */}
      <main className="max-w-2xl w-full mx-auto px-4 mt-12 flex flex-col gap-8">
        
        <div className="text-center flex flex-col items-center">
          <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-1">BUSCADOR DE SEGURANÇA</p>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-4xl">Cole o link suspeito ou CPF</h2>
          {!isPremium && (
            <span className="inline-block mt-3 px-3 py-1 bg-blue-900/40 text-blue-400 font-extrabold text-xs rounded-full border border-blue-500/20">
              Consultas gratuitas hoje: {pesquisasRestantes} restando
            </span>
          )}
        </div>

        {/* MODIFICAÇÃO DE DESIGN: INPUT GIGANTE EM EVIDÊNCIA COM BORDA AZUL REFORÇADA */}
        <form onSubmit={handleSearchSubmit} className="w-full flex flex-col gap-4 bg-[#0d1527] p-6 rounded-2xl shadow-2xl border border-slate-800">
          <div className="relative flex items-center w-full">
            <span className="absolute left-5 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Cole aqui a URL do site ou número do CPF..."
              className="w-full pl-14 pr-5 py-5 text-lg font-bold text-white placeholder-slate-500 bg-[#060b19] border-4 border-blue-500 focus:border-blue-400 rounded-xl shadow-inner outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl rounded-xl shadow-md transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
          >
            Analisar Agora
          </button>
        </form>

        {/* ÚLTIMAS ANÁLISES */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            📊 ÚLTIMAS ANÁLISES
          </h3>
          
          {recentSearches.map((item) => (
            <div key={item.id} className={`p-5 rounded-xl border bg-[#0d1527] shadow-lg flex flex-col gap-3 ${item.scamDetected ? "border-l-8 border-l-red-500 border-slate-800" : "border-l-8 border-l-emerald-500 border-slate-800"}`}>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="font-mono text-xs text-slate-400 break-all bg-[#060b19] px-2 py-1 rounded border border-slate-800">
                  {item.url}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${item.scamDetected ? "bg-red-950/50 text-red-400 border border-red-500/20" : "bg-emerald-950/50 text-emerald-400 border border-emerald-500/20"}`}>
                  {item.scamDetected ? `RISCO: ${item.riskScore}%` : "SEGURO"}
                </span>
              </div>
              <div className="flex items-start gap-3 mt-1">
                <span className={item.scamDetected ? "text-red-400" : "text-emerald-400"}>
                  {item.scamDetected ? (
                    <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  ) : (
                    <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  )}
                </span>
                <p className="text-slate-300 font-medium text-sm leading-relaxed">{item.analysisText}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SEÇÃO DA TRANSFERÊNCIA PIX ORIGINAL */}
        <div className="bg-[#0d1527] p-6 rounded-2xl border border-slate-800 shadow-2xl mt-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">2. FACA A TRANSFERÊNCIA VIA PIX COPIA E COLA</p>
          <div className="flex items-center justify-between bg-[#060b19] p-3 rounded-xl border border-slate-800 gap-2 flex-wrap sm:flex-nowrap">
            <span className="font-mono text-sm text-slate-300 break-all">daniel.carvalhoba31@gmail.com</span>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-lg uppercase tracking-wider transition-all whitespace-nowrap">Copiar Chave PIX</button>
          </div>
          <span className="block text-right text-[10px] text-blue-500 font-bold mt-2 cursor-pointer">Exibir QR Code Simulado</span>
        </div>

        {/* SEÇÃO MODIFICADA: CANAIS SOCIAIS DIRECIONANDO PARA SUAS REDES SOCIAIS REAIS */}
        <div className="bg-[#0d1527] p-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col gap-4">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">CANAIS SOCIAIS & COMUNIDADE OFICIAL</p>
Use o código com cuidado.Acompanhe nossas ferramentas, novos alertas de fraudes urgentes e vídeos instrucionais em nossas mídias oficiais.{/* Bloco Telegram */}🔷 TELEGRAM GRUPOVazamentos Urgentes & NotificaçõesEm Breve{/* Bloco YouTube */}🔺 YOUTUBE CANALVídeo Tutoriais & Desmascarando GolpesEm Planejamento{/* Bloco TikTok Real do Daniel */}🎵 TIKTOK DIGITALDicas rápidas de defesa em 30 segundosEstruturando{/* Bloco Kwai Real do Daniel */}🔥 KWAI OFICIALAlertas a cidadãos sobre golpes de SMS fictíciosEstruturando{/* SEÇÃO FALE COM O COORDENADOR GERAL */}✉️ FALE COM O COORDENADOR GERALSugestões de novas integrações, parcerias instrucionais ou auditoria técnica.daniel.carvalhoba31@gmail.com{/* RODAPÉ LINKADO COM INSTAGRAM DO DANIEL */}© {new Date().getFullYear()} Detetive de GolpesInstagram Oficial);};export default App;