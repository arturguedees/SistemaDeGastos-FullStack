import React, { useState } from 'react';
import { api } from '../services/api';

interface Props {
  onPessoaCriada: () => void;
}

export const PessoaForm: React.FC<Props> = ({ onPessoaCriada }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/pessoas', { nome, idade: Number(idade) });
      setNome('');
      setIdade('');
      onPessoaCriada();
    } catch (error) {
      alert('Erro ao cadastrar pessoa.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Pessoa</h3>
      <input 
        placeholder="Nome" 
        value={nome} 
        onChange={e => setNome(e.target.value)} 
        required 
      />
      <input 
        placeholder="Idade" 
        type="number" 
        value={idade} 
        onChange={e => setIdade(e.target.value)} 
        required 
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};