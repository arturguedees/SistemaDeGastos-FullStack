import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="card">
      <h2>Bem-vindo ao Sistema de Controle de Gastos Residenciais</h2>
      <p>Gerencie de forma simples o orçamento da sua residência, controlando receitas, despesas e acompanhando o saldo por morador.</p>
      
      <div className="grid-2" style={{ marginTop: '30px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Gerenciar Pessoas</h3>
          <p>Cadastre moradores, veja a lista e gerencie cadastros.</p>
          <Link to="/pessoas"><button>Acessar Pessoas</button></Link>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Transações & Resumo</h3>
          <p>Registre receitas, despesas e consulte o saldo total residencial.</p>
          <Link to="/transacoes"><button>Acessar Transações</button></Link>
        </div>
      </div>
    </div>
  );
};