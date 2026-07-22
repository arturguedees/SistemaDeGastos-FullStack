import React from 'react';
import type { RelatorioTotais } from '../types';

interface Props {
  totais: RelatorioTotais | null;
}

export const TotaisTable: React.FC<Props> = ({ totais }) => {
  if (!totais) return <p>Carregando totais...</p>;

  return (
    <div>
      <h3>Consulta de Totais por Pessoa</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {totais.pessoas.map((p, index) => (
            <tr key={index}>
              <td>{p.nome}</td>
              <td style={{ color: 'var(--success-color)' }}>R$ {p.totalReceitas.toFixed(2)}</td>
              <td style={{ color: 'var(--danger-color)' }}>R$ {p.totalDespesas.toFixed(2)}</td>
              <td style={{ fontWeight: 'bold' }}>R$ {p.saldo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Total Geral Residencial</h4>
        <p>Receitas Totais: <strong style={{ color: 'var(--success-color)' }}>R$ {totais.totalGeral.receitas.toFixed(2)}</strong></p>
        <p>Despesas Totais: <strong style={{ color: 'var(--danger-color)' }}>R$ {totais.totalGeral.despesas.toFixed(2)}</strong></p>
        <p>Saldo Líquido: <strong>R$ {totais.totalGeral.saldoLiquido.toFixed(2)}</strong></p>
      </div>
    </div>
  );
};