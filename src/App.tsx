import React, { useState, useEffect } from 'react';
import { AppContext } from './AppContext';

// Componente Simulado de Anúncio Intersticial de Alta Monetização
const InterstitialAd = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    console.log("AdMob/AdSense Interstitial Carregado - Maximizando CPM");
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.95)', zindex: 99999, display: 'flex',
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff'
    }}>
      <div style={{ backgroundColor: '#222', padding: '30px', borderRadius: '12px', textAlign: 'center', maxWidth: '400px' }}>
        <span style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '10px' }}>ANÚNCIO PUBLICITÁRIO</span>
        <h3 style={{ marginBottom: '15px' }}>Conteúdo Patrocinado</h3>
        <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '20px' }}>
          Aguarde alguns segundos ou clique no botão abaixo para liberar mais buscas gratuitas no sistema.
        </p>
        <button 
          onClick={onClose}
          style={{ backgroundColor: '#00ff66', color: '#000', border: 'none', padding: '12px 30px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Fechar Anúncio e Continuar
        </button>
      </div>
    </div>
  );
};

export function App() {
  const [cpf, setCpf] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Limpa apenas números do CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length <= 11) {
      setCpf(rawValue);
    }
  };

  const executarPesquisaVirusTotal = async () => {
    setError('');
    setResult(null);

    // VALIDAÇÃO HARD: CPF precisa ter exatamente 11 dígitos numéricos
    if (cpf.length !== 11) {
      setError('Erro: O CPF inserido está incompleto. Digite os 11 números para pesquisar.');
      return;
    }

    // REGRA DE MONETIZAÇÃO: Bloqueia na 4ª tentativa (após 3 acessos livres)
    if (searchCount >= 3) {
      setShowAd(true);
      return;
    }

    setLoading(true);
    try {
      // Simulação da chamada da API VirusTotal Higienizada contra falsos positivos
      // Substitua pelo endpoint real de sua API de busca se necessário
      const response = await fetch(`/api/virus-total?target=${cpf}`);
      
      if (!response.ok) throw new Error('Falha na comunicação com o servidor de segurança.');
      
      const data = await response.json();
      
      setResult(data);
      setSearchCount(prev => prev + 1); // Contabiliza sucesso de busca livre
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao processar a checagem do CPF.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAd = () => {
    setShowAd(false);
    setSearchCount(0); // Reseta o contador dando mais 3 buscas para o usuário após ele ver o anúncio
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#121214', color: '#fff', minHeight: '100vh' }}>
      {showAd && <InterstitialAd onClose={handleCloseAd} />}
      
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1>🕵️‍♂️ Detetive IA - Analisador de Segurança</h1>
        <p style={{ color: '#8d8d99' }}>Buscas gratuitas restantes: {Math.max(0, 3 - searchCount)}</p>
      </header>

      <main style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#202024', padding: '25px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Consulte um CPF:</label>
          <input 
            type="text" 
            placeholder="Digite apenas os 11 números do CPF" 
            value={cpf}
            onChange={handleCpfChange}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #4d4d56', backgroundColor: '#121214', color: '#fff', boxSizing: 'border-box', fontSize: '16px' }}
          />
        </div>

        <button 
          onClick={executarPesquisaVirusTotal}
          disabled={loading}
          style={{ width: '100%', padding: '14px', backgroundColor: '#00ff66', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
        >
          {loading ? 'Analisando Banco de Dados...' : 'Verificar Ameaças'}
        </button>

        {error && (
          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f75a68', color: '#fff', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#29292e', borderRadius: '4px', borderLeft: '4px solid #00ff66' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#00ff66' }}>Análise Concluída com Sucesso</h4>
            <pre style={{ margin: 0, fontSize: '13px', overflowX: 'auto' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
