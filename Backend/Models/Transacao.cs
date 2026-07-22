namespace Backend.Models;

// Enum para tipar a transação sem usar strings soltas 
public enum TipoTransacao { Receita, Despesa }

// Entidade Transação no sistema
public class Transacao
{
    public int Id { get; set; } // Id único automático
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    
    // Chave estrangeira vinculando a transação a uma pessoa
    public int PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }
}