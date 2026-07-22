using Backend.Data;
using Backend.Models;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1- Configuração de persistência (Banco de dados SQLite)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gastos.db"));

// 2- Registro das classes de Serviço no Container de Injeção de Dependência do .NET
builder.Services.AddScoped<PessoaService>();
builder.Services.AddScoped<TransacaoService>();

// 3- Configuração do CORS para comunicação com o front-end
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("AllowAll");

// Cria e sincroniza o banco de dados SQLite na primeira execução
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// ROTAS DE PESSOAS (Consome PessoaService)
app.MapGet("/pessoas", async (PessoaService service) => 
    Results.Ok(await service.ListarTodasAsync()));

app.MapPost("/pessoas", async (PessoaService service, Pessoa pessoa) =>
{
    var novaPessoa = await service.CriarAsync(pessoa);
    return Results.Created($"/pessoas/{novaPessoa.Id}", novaPessoa);
});

app.MapDelete("/pessoas/{id}", async (PessoaService service, int id) =>
{
    var sucesso = await service.DeletarAsync(id);
    return sucesso ? Results.NoContent() : Results.NotFound();
});

// ROTAS DE TRANSAÇÕES (Consome TransacaoService)
app.MapGet("/transacoes", async (TransacaoService service) => 
    Results.Ok(await service.ListarTodasAsync()));

app.MapPost("/transacoes", async (TransacaoService service, Transacao transacao) =>
{
    var (novaTransacao, erro) = await service.CriarAsync(transacao);
    if (erro != null) return Results.BadRequest(erro);
    return Results.Created($"/transacoes/{novaTransacao!.Id}", novaTransacao);
});

// ROTA DE CONSULTA DE TOTAIS
app.MapGet("/totais", async (PessoaService service) => 
    Results.Ok(await service.ObterTotaisAsync()));

app.Run();