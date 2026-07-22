using System.Text.Json.Serialization;

namespace Backend.Models;

// Entidade Pessoa no sistema
public class Pessoa
{
    public int Id { get; set; } // Id único automático
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
    
    // O JsonIgnore evita referências cíclicas infinitas ao serializar para JSON
    [JsonIgnore] 
    public List<Transacao> Transacoes { get; set; } = new();
}