using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

// Framework encarregado da comunicação com o SQLite
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<Pessoa> Pessoas => Set<Pessoa>();
    public DbSet<Transacao> Transacoes => Set<Transacao>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configura a regra de negócio: Deleção em Cascata
        // Se a pessoa for apagada, todas as suas transações vinculadas deixam de existir
        modelBuilder.Entity<Pessoa>()
            .HasMany(p => p.Transacoes)
            .WithOne(t => t.Pessoa)
            .HasForeignKey(t => t.PessoaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}