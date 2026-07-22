using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore; 

namespace Backend.Services;

// Centraliza as regras de negócio associadas às Transações
public class TransacaoService
{
    private readonly AppDbContext _db;

    public TransacaoService(AppDbContext db)
    {
        _db = db;
    }

    // Especificando a consulta do DbSet para o EF Core
    public async Task<List<Transacao>> ListarTodasAsync()
    {
        return await _db.Transacoes.ToListAsync();
    }

    public async Task<(Transacao? Transacao, string? Erro)> CriarAsync(Transacao transacao)
    {
        var pessoa = await _db.Pessoas.FindAsync(transacao.PessoaId);
        if (pessoa is null) 
            return (null, "Pessoa informada não existe no cadastro.");

        // Regra de negócio: Caso a pessoa seja menor de idade (menor de 18), apenas despesas podem ser cadastradas
        if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
        {
            return (null, "Menores de 18 anos podem cadastrar apenas despesas.");
        }

        _db.Transacoes.Add(transacao);
        await _db.SaveChangesAsync();
        return (transacao, null);
    }
}