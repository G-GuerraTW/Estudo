using Persistence.Context;
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
builder.Services.AddScoped<IPalestrantePersist, PalestrantePersist>();

builder.Services.AddDbContext<ProEventoContext>(options =>
    options.UseSqlite("DATA Source=banco.db")
);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseHttpsRedirection();
app.Run();


