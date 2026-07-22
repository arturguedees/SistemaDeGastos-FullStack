import React, { useState } from 'react';
import { api } from '../services/api';
import { TipoTransacao } from '../types';
import type { Pessoa } from '../types'; // <--- Importado separadamente como "type"

interface Props {
  pessoas: Pessoa[];
  onTransacaoCriada: () => void;
}

export const TransacaoForm: React.FC<Props> = ({ pessoas, onTransacaoCriada }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/transacoes', {
        descricao,
        valor: Number(valor),
        tipo: Number(tipo),
        pessoaId: Number(pessoaId)
      });
      setDescricao('');
      setValor('');
      onTransacaoCriada();
    } catch (error: any) {
      // Exibe mensagem da regra de negócio (ex: menor de idade não pode cadastrar receita)
      const mensagemErro = error.response?.data || 'Erro ao cadastrar transação.';
      alert(mensagemErro);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Transação</h3>
      <input 
        placeholder="Descrição" 
        value={descricao} 
        onChange={e => setDescricao(e.target.value)} 
        required 
      />
      <input 
        placeholder="Valor (R$)" 
        type="number" 
        step="0.01" 
        value={valor} 
        onChange={e => setValor(e.target.value)} 
        required 
      />
      <select value={tipo} onChange={e => setTipo(Number(e.target.value) as TipoTransacao)}>
        <option value={TipoTransacao.Receita}>Receita</option>
        <option value={TipoTransacao.Despesa}>Despesa</option>
      </select>
      <select value={pessoaId} onChange={e => setPessoaId(e.target.value)} required>
        <option value="">Selecione a Pessoa</option>
        {pessoas.map(p => (
          <option key={p.id} value={p.id}>{p.nome} ({p.idade} anos)</option>
        ))}
      </select>
      <button type="submit">Cadastrar Transação</button>
    </form>
  );
};