import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Pessoa, Transacao, RelatorioTotais } from '../types';
import { TransacaoForm } from '../components/TransacaoForm';
import { TotaisTable } from '../components/TotaisTable';

export const TransacoesPage: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [totais, setTotais] = useState<RelatorioTotais | null>(null);

  const carregarDados = async () => {
    try {
      const [resP, resT, resTot] = await Promise.all([
        api.get<Pessoa[]>('/pessoas'),
        api.get<Transacao[]>('/transacoes'),
        api.get<RelatorioTotais>('/totais')
      ]);
      setPessoas(resP.data);
      setTransacoes(resT.data);
      setTotais(resTot.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  return (
    <div>
      <div className="grid-2">
        <div className="card">
          <TransacaoForm pessoas={pessoas} onTransacaoCriada={carregarDados} />
        </div>

        <div className="card">
          <h3>Histórico de Transações</h3>
          {transacoes.length === 0 ? <p>Nenhuma transação registrada.</p> : (
            <ul>
              {transacoes.map(t => (
                <li key={t.id}>
                  <span>{t.descricao} - <strong>R$ {t.valor.toFixed(2)}</strong></span>
                  <span style={{ color: t.tipo === 0 ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
                    {t.tipo === 0 ? 'Receita' : 'Despesa'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <TotaisTable totais={totais} />
      </div>
    </div>
  );
};