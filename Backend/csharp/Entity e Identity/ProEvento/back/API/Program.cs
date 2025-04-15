using System.Text;
using Domain.Identity;
using Scalar.AspNetCore;
using Persistence.Context;
using Application.Services;
using Application.Contracts;
using Persistence.Contracts;
using Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

#region 🔧 Configuração de Serviços (DI - Dependency Injection)

// 🔄 Suporte a CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors();

// 📦 Controllers com suporte a JSON e tratamento de loops de referência
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()) // Serializa enums como string
    )
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore // Evita loop de referência nos objetos
    );

// 🔁 AutoMapper - Mapeia objetos entre camadas
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

#endregion

#region 🔐 Configuração de Identity (Usuários, Senhas, Regras)

builder.Services.AddIdentityCore<User>(options =>
    {
        // Regras para criação de senha
        options.Password.RequireDigit = false;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 4;
    })
    .AddRoles<Role>()
    .AddRoleManager<RoleManager<Role>>()
    .AddSignInManager<SignInManager<User>>()
    .AddRoleValidator<RoleValidator<Role>>()
    .AddEntityFrameworkStores<ProEventoContext>() // Usa o EF para armazenar usuários
    .AddDefaultTokenProviders();

#endregion

#region 🔑 Configuração da Autenticação JWT

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])
            ),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

#endregion

#region 🗃️ Configuração do Banco de Dados

builder.Services.AddDbContext<ProEventoContext>(options =>
    options.UseSqlite("Data Source=banco.db")
);

#endregion

#region 📦 Injeção de Dependência (Aplicação e Persistência)

// Repositórios
builder.Services.AddScoped<IGeralPersist, GeralPersist>();
builder.Services.AddScoped<IEventoPersist, EventoPersist>();
builder.Services.AddScoped<IPalestrantePersist, PalestrantePersist>();
builder.Services.AddScoped<IUserPersist, UserPersist>();

// Serviços
builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IPalestranteService, PalestranteService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ITokenService, TokenService>();

#endregion

#region 📘 Documentação Swagger (OpenAPI)

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#endregion

var app = builder.Build();

#region 🧪 Ambiente de Desenvolvimento (Database + Swagger)

if (app.Environment.IsDevelopment())
{
    // Inicializa o banco recriando do zero
    var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<ProEventoContext>();
    dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated();

    // Habilita documentação da API
    app.UseSwagger();
    app.UseSwaggerUI(c =>
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProEvento V1")
    );

    // Mapeia documentação extra (Scalar)
    app.MapOpenApi();
    app.MapScalarApiReference();
}

#endregion

#region 🚀 Pipeline de Execução

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapControllers();

app.Run();

#endregion
