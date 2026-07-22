using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

// Centraliza a lógica de negócio associada às Pessoas e Relatórios
public class PessoaService
{
    private readonly AppDbContext _db;

    public PessoaService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Pessoa>> ListarTodasAsync() => 
        await _db.Pessoas.ToListAsync();

    public async Task<Pessoa> CriarAsync(Pessoa pessoa)
    {
        _db.Pessoas.Add(pessoa);
        await _db.SaveChangesAsync();
        return pessoa;
    }

    public async Task<bool> DeletarAsync(int id)
    {
        var pessoa = await _db.Pessoas.FindAsync(id);
        if (pessoa is null) return false;

        _db.Pessoas.Remove(pessoa);
        await _db.SaveChangesAsync();
        return true;
    }

    // Regra de Negócio: Consulta e cálculo de totais individuais e geral
    public async Task<object> ObterTotaisAsync()
    {
        var pessoas = await _db.Pessoas.Include(p => p.Transacoes).ToListAsync();
        
        var relatorio = pessoas.Select(p => new
        {
            p.Nome,
            TotalReceitas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor),
            TotalDespesas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor),
            Saldo = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor) - 
                    p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor)
        }).ToList();

        var totalGeralReceitas = relatorio.Sum(r => r.TotalReceitas);
        var totalGeralDespesas = relatorio.Sum(r => r.TotalDespesas);

        return new
        {
            Pessoas = relatorio,
            TotalGeral = new
            {
                Receitas = totalGeralReceitas,
                Despesas = totalGeralDespesas,
                SaldoLiquido = totalGeralReceitas - totalGeralDespesas
            }
        };
    }
}