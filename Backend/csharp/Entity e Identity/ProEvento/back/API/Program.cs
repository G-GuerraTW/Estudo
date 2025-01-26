using Persistence.Context;
using Application.Services;
using Application.Contracts;
using Persistence.Contracts;
using Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers()
    .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


//Add Scopeds
builder.Services.AddScoped<IGeralPersist, GeralPersist>();
builder.Services.AddScoped<IEventoPersist, EventoPersist>();
builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IPalestrantePersist, PalestrantePersist>();
builder.Services.AddScoped<IPalestranteService, PalestranteService>();

builder.Services.AddDbContext<ProEventoContext>(options =>
    options.UseSqlite("DATA Source=banco.db")
);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Ensure database is deleted and recreated (only in development mode)
if (app.Environment.IsDevelopment())
{
    var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<ProEventoContext>();
    
    // Deleta o banco de dados e recria
    dbContext.Database.EnsureDeleted(); // Exclui o banco
    dbContext.Database.EnsureCreated(); // Cria o banco novamente

    app.MapOpenApi();
    app.UseSwaggerUI(options =>
        options.SwaggerEndpoint("/openapi/v1.json", "ProEvento API")
    );
}
app.Run();


