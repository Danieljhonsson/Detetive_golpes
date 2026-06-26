import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';

// Algoritmo Oficial de Validação de CPF (Evita CPFs falsos ou inexistentes)
const validarCPFMatematicamente = (cpfLimpo: string): boolean => {
  if (cpfLimpo.length !== 11 || !!cpfLimpo.match(/^(.)\1+$/)) return false;
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpfLimpo.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpfLimpo.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;
  
  return true;
};

const InterstitialAd = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(10, 10, 12, 0.98)', zIndex: 99999, display: 'flex',
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        backgroundColor: '#16161a', padding: '40px', borderRadius: '16px', 
        textAlign: 'center', maxWidth: '440px', border: '1px solid #2f2f37',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <span style={{ fontSize: '11px', color: '#00ff66', fontWeight: 'bold', letterSpacing: '1.5px', display: 'block', marginBottom: '15px' }}>CONTEÚDO PATROCINADO</span>
        <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: '700' }}>Verificação Concluída!</h3>
        <p style={{ fontSize: '14px', color: '#9a9a9f', lineHeight: '1.6', marginBottom: '25px' }}>
          Para visualizar o relatório completo anti-fraude do VirusTotal, clique no botão abaixo.
        </p>
        <button 
          onClick={onClose}
          style={{ 
            backgroundColor: '#00ff66', color: '#0a0a0c', border: 'none', 
            padding: '14px 35px', borderRadius: '8px', fontSize: '15px',
            fontWeight: 'bold', cursor: 'pointer', width: '100%'
          }}
        >
          Verificar Relatório e Fechar
        </button>
      </div>
    </div>
  );
};

export function App() {
  const { searchCount, incrementSearchCount, resetSearchCount } = useApp();
  const [cpf, setCpf] = useState('');
  const [showAd, setShowAd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [pendingResult, setPendingResult] = useState<any>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length <= 11) {
      setCpf(rawValue);
    }
  };

  const executarPesquisa = async () => {
    setError('');
    setResult(null);
    setPendingResult(null);

    // 1. VALIDAÇÃO DE TAMANHO
    if (cpf.length !== 11) {
      setError('⚠️ Erro: O CPF deve conter exatamente 11 dígitos.');
      return;
    }

    // 2. VALIDAÇÃO MATEMÁTICA REAL (Impedir CPFs falsos/inventados)
    if (!validarCPFMatematicamente(cpf)) {
      setError('❌ CPF Inválido! Este documento não existe no registro matemático nacional. Verifique os dígitos.');
      return;
    }

    setLoading(true);
    try {
      const urlAlvo = `https://virustotal.com{cpf}`;
      const response = await fetch(`/api/virus-total?target=${cpf}`);
      
      if (!response.ok) {
        throw new Error('Não foi possível conectar aos servidores de análise. Tente novamente.');
      }
      
      const data = await response.json();

      // PROTEÇÃO CONTRA RETORNOS VAZIOS OU FALSA VALIDAÇÃO
      if (!data || data.error || (data.data && data.data.length === 0)) {
        throw new Error('Este CPF é matematicamente válido, mas nenhuma ocorrência ou relatório de ameaça foi encontrado para ele.');
      }
      
      const dadosTratados = {
        ...data,
        link_verificacao_direta: urlAlvo
      };

      // 3. REGRA DE MONETIZAÇÃO (Se for a 4ª busca ou mais, guarda o resultado e força o anúncio)
      if (searchCount >= 3) {
        setPendingResult(dadosTratados);
        setShowAd(true);
      } else {
        setResult(dadosTratados);
        incrementSearchCount();
      }

    } catch (err: any) {
      setError(err.message || 'Erro crítico ao consultar a base de dados de proteção.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAd = () => {
    setShowAd(false);
    if (pendingResult) {
      setResult(pendingResult);
      setPendingResult(null);
    }
    resetSearchCount(); // Reinicia o contador dando mais 3 buscas
  };

  return (
    <div style={{ 
      padding: '40px 20px', fontFamily: 'system-ui, sans-serif', 
      backgroundColor: '#0a0a0c', color: '#f1f1f3', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      {showAd && <InterstitialAd onClose={handleCloseAd} />}
      
      <header style={{ marginBottom: '32px', textAlign: 'center', maxWidth: '480px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>🕵️‍♂️ Detetive IA</h1>
        <p style={{ color: '#9a9a9f', fontSize: '14px' }}>Módulo de Segurança e Checagem de Credenciais Contra Golpes</p>
        <div style={{ 
          marginTop: '16px', display: 'inline-block', padding: '6px 14px', 
          backgroundColor: '#16161a', borderRadius: '20px', border: '1px solid #2f2f37', fontSize: '13px'
        }}>
          Consultas livres restantes: <span style={{ color: '#00ff66', fontWeight: 'bold' }}>{Math.max(0, 3 - searchCount)}/3</span>
        </div>
      </header>

      <main style={{ 
        width: '100%', maxWidth: '460px', backgroundColor: '#111114', 
        padding: '32px', borderRadius: '16px', border: '1px solid #202024'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#e1e1e6' }}>Digite o CPF para varredura:</label>
          <input 
            type="text" 
            placeholder="Apenas os 11 números" 
            value={cpf}
            onChange={handleCpfChange}
            style={{ 
              width: '100%', padding: '14px', borderRadius: '8px', 
              border: '1px solid #2f2f37', backgroundColor: '#0a0a0c', color: '#fff', 
              boxSizing: 'border-box', fontSize: '16px', textAlign: 'center', outline: 'none'
            }}
          />
        </div>

        <button 
          onClick={executarPesquisa}
          disabled={loading}
          style={{ 
            width: '100%', padding: '16px', backgroundColor: '#00ff66', color: '#0a0a0c', 
            border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer'
          }}
        >
          {loading ? 'Processando análise...' : 'Verificar Ameaças'}
        </button>

        {error && (
          <div style={{ marginTop: '24px', padding: '14px', backgroundColor: 'rgba(247, 90, 104, 0.1)', color: '#f75a68', borderRadius: '8px', fontSize: '14px', border: '1px solid rgba(247, 90, 104, 0.2)' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#16161a', borderRadius: '8px', border: '1px solid #2f2f37' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, color: '#00ff66', fontSize: '15px' }}>✓ Varredura Concluída</h4>
              <a href={result.link_verificacao_direta} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff66', fontSize: '13px', fontWeight: '600' }}>
                Ver no VirusTotal
              </a>
            </div>
            <pre style={{ margin: 0, fontSize: '13px', backgroundColor: '#0a0a0c', padding: '12px', borderRadius: '6px', overflowX: 'auto', color: '#c4c4cc' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
