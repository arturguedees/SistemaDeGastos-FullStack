export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export const TipoTransacao = {
  Receita: 0,
  Despesa: 1,
} as const;

export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
}

export interface ResumoPessoa {
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioTotais {
  pessoas: ResumoPessoa[];
  totalGeral: {
    receitas: number;
    despesas: number;
    saldoLiquido: number;
  };
}