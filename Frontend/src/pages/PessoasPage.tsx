import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Pessoa } from '../types';
import { PessoaForm } from '../components/PessoaForm';

export const PessoasPage: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const carregarPessoas = async () => {
    try {
      const res = await api.get<Pessoa[]>('/pessoas');
      setPessoas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { carregarPessoas(); }, []);

  const handleDeletar = async (id: number) => {
    if (confirm('Atenção: Ao apagar esta pessoa, todas as transações ligadas a ela serão apagadas.')) {
      await api.delete(`/pessoas/${id}`);
      carregarPessoas();
    }
  };

  return (
    <div className="grid-2">
      <div className="card">
        <PessoaForm onPessoaCriada={carregarPessoas} />
      </div>

      <div className="card">
        <h3>Pessoas Cadastradas</h3>
        {pessoas.length === 0 ? <p>Nenhuma pessoa cadastrada.</p> : (
          <ul>
            {pessoas.map(p => (
              <li key={p.id}>
                <span><strong>{p.nome}</strong> ({p.idade} anos) - ID: {p.id}</span>
                <button className="btn-danger" onClick={() => handleDeletar(p.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};