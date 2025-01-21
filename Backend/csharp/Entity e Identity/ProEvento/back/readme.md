## Entity Framework & Identity

#### Está documentação é um passo a passo de como criar uma aplicação com  framework core, Entity e Identity. este documento sera uma forma linear de explicação, então siga da maneira que ele foi escrito.

---

### 1. Criando a Solução

1. Execute o comando para criar o arquivo de solução, 
```
dotnet new sln -n ProEvento
```

2. após isso iremos criar as classlib que seria as camadas do projeto, iniciando pela Domain, Persistence, Application, utilizando do comando  
```
dotnet new classlib -n "nome da lib"
```
3. após criar as camadas iremos adicionar as classlib para a solução **ProEvento** faça isso com todas classlib com o comando: 
```
dotnet sln "nome solução" add "classlib"
```
4. logo após execute um o comando abaixo para compilar o projeto e ter certeza que está tudo certo:
```
dotnet build
```
---
### 2. Iniciando a estrutura do Domain

1. inicialmente iremos criar um diretorio chamado Entities que seria as entidades "Tabelas" que o sistema ira ter, e dentro de Entities iremos criar as classes que representara as tabelas do banco, abaixo esta os exemplos das entiidades utilizada neste projeto:

**Evento**
```csharp
using System.ComponentModel;

namespace Domain.entities
{
    public class Evento
    {
        public int Id { get; set; }        
        public string Local { get; set; }
        public string Tema { get; set; }
        public DateTime? dataEvento { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        IEnumerable<Lote> Lotes { get; set; } = new List<Lote>();
        IEnumerable<RedeSocial> RedesSociais = new List<RedeSocial>();
        IEnumerable<EventoPalestrante> EventosPalestrantes = new List<EventoPalestrante>();
    }
}
```
**Lote**
```csharp
namespace Domain.entities
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public decimal Valor { get; set; }
        public int Quantidade { get; set; }
        public int EventoId { get; set; }
        public Evento Evento { get; set; }
    }
}
```
**Rede Social**
```csharp
namespace Domain.entities
{
    public class RedeSocial
    {
        public int Id { get; set; }        
        public string Nome { get; set; }
        public string URL { get; set; }
        public int? EventoId { get; set; }
        public Evento Evento { get; set; }
        public int? PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
    }
}
```
**Palestrante**
```csharp
namespace Domain.entities
{
    public class Palestrante
    {
        public int Id { get; set; }        
        public string Nome { get; set; }
        public string MiniCurriculo { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
        public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
    }
}
```
**EventoPalestrante** está entidade é uma entidade relacional entre Evento e Palestrante pois Palestrante pode participar de muitos eventos e um Evento pode ter muitos palestrantes, então temos um relacionamento composto.
```csharp
namespace Domain.entities
{
    public class EventoPalestrante
    {
        public int EventoId { get; set; }        
        public Evento Evento { get; set; }
        public int PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
    }
}
```
#### Tendo as entidades iniciais prontas podemos partir para a persistencia e criar sua estrutura utilizando das entidades do dominio.

---

### 3. Criando Persistencia,

Logo apos criarmos as entidades do dominio poderemos começar a estruturar a **Persistencia** lembrando que como iremos utilizar das entidades que estão no dominio dentro da persistencia precisaremos inicialmente fazer a referencia da classlib do dominio dentro da classlib de Persistencia com o comando abaixo:
```csharp
dotnet add "sua camada alvo" reference "sua camada referencia"
dotnet add ./Persistence reference ./Domain
```
Agora iremos nos atentar ao arquivos Persistence.csproj no qual iremos adicionar os pacotes necessarios para Criar nosso Contexto e para isos iremos utilizar o NuGet Package Manager e adicionaremos os seguintes pacotes:
```csharp
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.0" /> |
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.0">
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.0">
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.0"/>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="9.0.0" />
```
lembrando que o Package de banco de dados vc deve decidir qual irá utilizar.

**Microsoft.EntityFrameworkCore**:
Fornece funcionalidades principais para o Entity Framework Core.

**Microsoft.EntityFrameworkCore.** Design:
Suporte a ferramentas para desenvolvimento com EF Core.

**Microsoft.EntityFrameworkCore.** Tools:
Ferramentas CLI para comandos do EF Core, como migrações.

**Microsoft.EntityFrameworkCore.SqlServer**:
Permite uso do SQL Server como provedor de banco no EF Core.

---

### 4. Criando Camada de Aplicação

proximo passo é criar o contexto da aplicação, tanto repositorio como classe,

1. crie uma pasta chamada **Context** dentro da camada Persistence.
    1. criar uma nova classe chamada ProEventoContext.
 dentro dela teremos um codigo como este no momento:
    ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Context
    {
        public class ProEventoContext : DbContext
        {
            public ProEventoContext(DbContextOptions<ProEventoContext> options) : base(options) { }

            public DbSet<Evento> Eventos { get; set; } 
            public DbSet<Lote> Lotes { get; set; }
            public DbSet<RedeSocial> RedesSociais { get; set; }
            public DbSet<Palestrante> Palestrantes { get; set; }
            public DbSet<EventoPalestrante> EventosPalestrantes { get; set; }
        }
    }
    ```
2. Gerar as Interfaces de contrato, agora iremos criar o diretório chamado **Contracts** e dentro dela gerar os seguintes arquivos com os código que estão listado a baixo.

    1. **/Contracts/** gere as Interfaces **IGeralPersistence, IEventoPersistence, IPalestrantePersistence**

    2. **IGeralPersist**
    ```csharp
        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading.Tasks;

        namespace Persistence.Contracts
        {
            public interface IGeralPersist
            {
                void Add<T>(T entity)where T : class;
                void Update<T>(T entity)where T : class;
                void Delete<T>(T entity) where T : class;
                void DeleteRange<T>(T[] entity) where T : class;
                Task <bool> SaveChangesAsync();
            }
        }
    ```
    3. **IEventoPersist**
    ```csharp
        using Domain.entities;
        using Microsoft.Identity.Client;

        namespace Persistence.Contracts
        {
            public interface IEventoPersist
            {
                public Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false);
                public Task<Evento[]> GetAllEventosByTemaAsync( string Tema,bool IncludePalestrante = false);
                public Task<Evento> GetEventoByIdAsync(string Id, bool IncludePalestrante = false);
            }
        }
    ```
    4. **IPalestrantePersist**
    ```csharp
        using Domain.entities;

        namespace Persistence.Contracts
        {
            public interface IPalestrantePersist
            {
                public Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEvento = false);
                public Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false);
                public Task<Palestrante> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false);
            }
        }
    ```
3. logo após criar o diretorio de contratos e criar as interfaces de contratos iremos iniciar o diretorio **Repositories** no qual ira ficar as classes que irão assinar as interfaces dos contratos da persistencia, para cada interface criada gere agora uma nova classe com os seugintes nomes e adicione o codigo listado a baixo a cada arquivo, **GeralPersist**, **EventoPersist**, **PalestrantePersist**

    1. **GeralPersist**
    ```csharp
    using Persistence.Context;
    using Persistence.Contracts;
    
    namespace Persistence.Repositories
    {
        public class GeralPersist : IGeralPersist
        {
            private readonly ProEventoContext context;
            public GeralPersist(ProEventoContext context)
            {
                this.context = context;
            }
    
            public void Add<T>(T entity) where T : class
            {
                context.Add(entity);
            }
    
            public void Update<T>(T entity) where T : class
            {
                context.Update(entity);
            }
    
            public void Delete<T>(T entity) where T : class
            {
                context.Remove(entity);
            }
    
            public void DeleteRange<T>(T[] entity) where T : class
            {
                context.RemoveRange(entity);
            }
    
            public async Task<bool> SaveChangesAsync()
            {
                return await (context.SaveChangesAsync()) > 0;
            }
        }
    }
    ```
    2. **EventoPersist**
    ```csharp
    using Domain.entities;
    using Persistence.Context;
    using Persistence.Contracts;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Repositories
    {
        public class EventoPersist : IEventoPersist
        {
            public ProEventoContext context { get; }
            public EventoPersist(ProEventoContext context)
            {
                this.context = context;
            }

            public async Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false)
            {
                IQueryable<Evento> query = Context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

                if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

                return await query.ToArrayAsync();
            }

            public async Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrante = false)
            {
                IQueryable<Evento> query = Context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

                if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

                query = query.Where(E => E.Tema == Tema);

                return await query.ToArrayAsync();
            }

            public async Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false)
            {
                IQueryable<Evento> query = Context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

                if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

                query = query.Where(E => E.Id == Id);

                return await query.FirstOrDefaultAsync();
            }
        }
    }
    ```
    3. **PalestrantePersist**
    ```csharp
    using Domain.entities;
    using Persistence.Context;
    using Persistence.Contracts;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Repositories
    {
        public class PalestrantePersist : IPalestrantePersist
        {
            private readonly ProEventoContext context;
            public PalestrantePersist(ProEventoContext context)
            {
                this.context = context;
            }
            public async Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEvento = false)
            {
                IQueryable<Palestrante> query = context.Palestrantes.Include(P => P.RedesSociais).AsNoTracking();

                if(IncludeEvento) query = query.Include(P => P.EventosPalestrantes).ThenInclude(EP => EP.Palestrante);

                return await query.ToArrayAsync();
            }

            public async Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false)
            {
                IQueryable<Palestrante> query = context.Palestrantes.Include(P => P.RedesSociais).AsNoTracking();

                if(IncludeEvento) query = query.Include(P => P.EventosPalestrantes).ThenInclude(EP => EP.Palestrante);

                query = query.Where(P => P.Nome == Name);

                return await query.ToArrayAsync();
            }

            public async Task<Palestrante> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false)
            {
                IQueryable<Palestrante> query = context.Palestrantes.Include(P => P.RedesSociais).AsNoTracking();

                if(IncludeEvento) query = query.Include(P => P.EventosPalestrantes).ThenInclude(EP => EP.Palestrante);

                query = query.Where(P => P.Id == Id);

                return await query.FirstOrDefaultAsync();
            }
        }
    }
    ```
---

### 5. FluenteAPI

#### Aproveitando que finalizamos a primeira parte da persistencia iremos ja adicionar a configuração do FluenteAPI manualmente, isso nos dara um total controle de como queremos que as tabelas e as propriedades se comportem no banco de dados.

1. Iniciaremos adicionanado o trecho de código abaixo para o Entity procurar dentro de nossa persistencia todas classes que herdam de IEntityTypeConfiguration para dar override e adicionar as configurações do fluenteAPI apartir de outros arquivos, faremos isso para ter uma estrutura mais limpa e organizada, então dentro do repositorio Persistence criaremos uma nova pasta chamada Configurations e dentro dela teremos as classes por exemplo EventoConfiguration.cs e nela tera a configuração de maneira isolada de apenas aquela classe no qula o nome da diz.

2. adicionemos o trecho de código abaixo no arquivo Persistence/Context/ProEventoContext.cs
    ```csharp
    using Domain.entities;
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Context
    {
        public class ProEventoContext : DbContext
        {
            public ProEventoContext(DbContextOptions<ProEventoContext> options) : base(options) { }
            public DbSet<Evento> Eventos { get; set; } 
            public DbSet<Lote> Lotes { get; set; }
            public DbSet<RedeSocial> RedesSociais { get; set; }
            public DbSet<Palestrante> Palestrantes { get; set; }
            public DbSet<EventoPalestrante> EventosPalestrantes { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder) 
            {
                base.OnModelCreating(modelBuilder);
                modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            }
        }
    }
    ```
3. notamos que nesta parte do código a intrução que foi adicionada foi o **Protected Override** e na parte superior adicionamos o System.Reflections.
4. Agora criaremos nossa classe de configuração do FluenteAPI, abaixo estara listada o nome de cada classe e o conteudo:
    1. **EventoConfiguration.cs**
    ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Configurations
    {
        public class EventoConfiguration : IEntityTypeConfiguration<Evento>
        {
            public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Evento> builder)
            {
                builder.ToTable("Evento");
                builder.HasKey(E => E.Id);
                builder.Property(E => E.Local).HasColumnType("VARCHAR(200)");
                builder.Property(E => E.Tema).HasColumnType("VARCHAR(200)");
                builder.Property(E => E.DataEvento).HasColumnType("DATETIME()");
                builder.Property(E => E.QtdPessoas).HasColumnType("INT(4)");
                builder.Property(E => E.ImagemURL).HasColumnType("VARCHAR(400)");
                builder.Property(E => E.Telefone).HasColumnType("VARCHAR(20)");
                builder.Property(E => E.Email).HasColumnType("VARCHAR(100)");

                builder.HasMany(E => E.Lotes)
                    .WithOne(L => L.Evento)
                    .HasForeignKey(L => L.EventoId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);

                builder.HasMany(E => E.RedesSociais)
                    .WithOne(R => R.Evento)
                    .HasForeignKey(R => R.EventoId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);

                builder.HasMany(E => E.EventosPalestrantes)
                    .WithOne(EP => EP.Evento)
                    .HasForeignKey(EP => EP.EventoId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```
    2. **LoteConfiguration.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace Persistence.Configurations
    {
        public class LoteConfiguration : IEntityTypeConfiguration<Lote>
        {

            public void Configure(EntityTypeBuilder<Lote> builder)
            {
                builder.ToTable("Lote");
                builder.HasKey(L => L.Id);
                builder.Property(L => L.Nome).HasColumnType("VARCHAR()");
                builder.Property(L => L.DataInicio).HasColumnType("DATETIME()");
                builder.Property(L => L.DataFim).HasColumnType("DATETIME()");
                builder.Property(L => L.Valor).HasColumnType("DECIMAL()");
                builder.Property(L => L.Quantidade).HasColumnType("INTEGER()");

                builder.HasOne(L => L.Evento)
                .WithMany(E => E.Lotes)
                .HasForeignKey(L => L.EventoId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```

    3. **RedeSocialConfiguration.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace Persistence.Configurations
    {
        public class LoteConfiguration : IEntityTypeConfiguration<Lote>
        {

            public void Configure(EntityTypeBuilder<Lote> builder)
            {
                builder.ToTable("Lote");
                builder.HasKey(L => L.Id);
                builder.Property(L => L.Nome).HasColumnType("VARCHAR()");
                builder.Property(L => L.DataInicio).HasColumnType("DATETIME()");
                builder.Property(L => L.DataFim).HasColumnType("DATETIME()");
                builder.Property(L => L.Valor).HasColumnType("DECIMAL()");
                builder.Property(L => L.Quantidade).HasColumnType("INTEGER()");

                builder.HasOne(L => L.Evento)
                .WithMany(E => E.Lotes)
                .HasForeignKey(L => L.EventoId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```

    4. **PalestarnteConfigurations.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;

    namespace Persistence.Configurations
    {
        public class PalestranteConfiguration : IEntityTypeConfiguration<Palestrante>
        {
            public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Palestrante> builder)
            {
                builder.ToTable("Palestrante");
                builder.HasKey(P => P.Id);
                builder.Property(P => P.Nome).HasColumnType("VARCHAR(150)");
                builder.Property(P => P.MiniCurriculo).HasColumnType("VARCHAR(600)");

                builder.HasMany(P => P.RedesSociais)
                .WithOne(R => R.Palestrante)
                .HasForeignKey(R => R.PalestranteId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

                builder.HasMany(P => P.EventosPalestrantes)
                .WithOne(EP => EP.Palestrante)
                .HasForeignKey(EP => EP.PalestranteId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            }
        }
    }
    ```
    5. **EventoPalestranteConfiguration.cs**
     ```csharp
    using Domain.entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace Persistence.Configurations
    {
        public class EventoPalestranteConfiguration : IEntityTypeConfiguration<EventoPalestrante>
        {
            public void Configure(EntityTypeBuilder<EventoPalestrante> builder)
            {
                builder.HasKey(EP => new { EP.EventoId, EP.PalestranteId });

                builder.HasOne(EP => EP.Evento)
                .WithMany(E => E.EventosPalestrantes)
                .HasForeignKey(EP => EP.EventoId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

                builder.HasOne(EP => EP.Palestrante)
                .WithMany(E => E.EventosPalestrantes)
                .HasForeignKey(EP => EP.PalestranteId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }
    ```
---

### 6. Application

#### Agora partiremos para application com o intuito de criar também as Interfaces de serviço, o serviço e também as DTOs para termos um controle nos objetos de retorno para o cliente, nela também faremos assinaturas das interfaces que está presente na Persistencia e utilizaremos de entidades do dominio, então inicialmente iremos adicionar referencia das outras classlib para ela.

1. Inicialmente iremos adicionar referencias das classlib de **Persistencia** e **Domain** para a nossa **Application**, siga com o comando abaixo
    ```csharp
    dotnet add .\Application\ reference .\Domain\
    dotnet add .\Application\ reference .\Persistence\
     ```
2. Iremos adicionar agora a lib para suportar as DTOs dentro da nossa camada de application, adicione o seguinte pacote:
    ```csharp
    <PackageReference Include="AutoMapper.Extensions.Microsoft. DependencyInjection" Version="12.0.1" />
    ```

3. Criar Diretório DTOs e Helpers, para iniciar a integração da lib DTO em nosso projeto assim podemos tratar os objetos para retornar apenas o necessario para o cliente e não todas as informações contidas neles.

4. Iniciaremos criando as DTOs, como está abaixo: Application/DTOs/

    1.  **EventoDTO.cs**
    ```csharp
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    namespace ProEventos.Application.Dtos
    {
        public class EventoDTO
        {
            public int Id { get; set; }
            public string Local { get; set; }
            public string DataEvento { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigtório."),
             //MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres."),
             //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres.")
             StringLength(50, MinimumLength = 3,
                              ErrorMessage = "Intervalo permitido de 3 a 50 caracteres.")]
            public string Tema { get; set; }


            [Display(Name = "Qtd Pessoas")]
            [Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120.000")]
            public int QtdPessoas { get; set; }

            [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
                               ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
            public string ImagemURL { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [Phone(ErrorMessage = "O campo {0} está com número inválido")]
            public string Telefone { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [Display(Name = "e-mail")]
            [EmailAddress(ErrorMessage = "É necessário ser um {0} válido")]
            public string Email { get; set; }

            public int UserId { get; set; }
            public UserDto UserDto { get; set; }

            public IEnumerable<LoteDto> Lotes { get; set; } = new List<LoteDTo>();
            public IEnumerable<RedeSocialDto> RedesSociais { get; set; } = new List<RedeSocialDto>();
            public IEnumerable<PalestranteDto> Palestrantes { get; set; } = new List<PalestranteDto>();
        }
    }
    ```
    2. **LoteDTO.cs**
    ```csharp
    namespace ProEventos.Application.Dtos
    {
        public class LoteDTO
        {
            public int Id { get; set; }
            public string Nome { get; set; }
            public decimal Preco { get; set; }
            public string DataInicio { get; set; }
            public string DataFim { get; set; }
            public int Quantidade { get; set; }
            public int EventoId { get; set; }
            public EventoDto EventoDto { get; set; }
        }
    }
    ```
    3. **RedeSocialDTO.cs**
    ```csharp
    namespace ProEventos.Application.Dtos
    {
        public class RedeSocialDTO
        {
            public int Id { get; set; }
            public string Nome { get; set; }
            public string URL { get; set; }
            public int? EventoId { get; set; }
            public EventoDto Evento { get; set; }
            public int? PalestranteId { get; set; }
            public PalestranteDto Palestrante { get; set; }
        }
    }
    ```
    4. **PalestranteDTO.cs**
    ```csharp
    namespace Domain.entities
    {
        public class PalestranteDTO
        {
            public int Id { get; set; }        
            public string Nome { get; set; }
            public string MiniCurriculo { get; set; }
            public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
            public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
        }
    }    
    ```

5. Agora iremos configurar o Helpers para mapear a qual Entidades as DTOs irão apontar, segue a configuração dos arquivos no diretório: Application/Helpers:

    1. **ProEventosProfile.cs**
    ```csharp
    using AutoMapper;
    using ProEventos.Domain.Entities; // Namespace da entidade Evento
    using ProEventos.Application.Dtos; // Namespace do DTO EventoDto
    
    namespace ProEventos.API.Helpers
    {
        public class ProEventosProfile : Profile
        {
            public ProEventosProfile()
            {
                // Mapeamento entre Evento e EventoDTO
                CreateMap<Evento, EventoDTO>()
                    // Isso apenas será necessario caso o tipo de uma respectiva propriedade da DTO for diferente do tipo da Entidade como no exemplo abaixo.
                    .ForMember(dest => dest.DataEvento, opt => opt.MapFrom(src => src.dataEvento.HasValue ? src.dataEvento.Value.ToString("yyyy-MM-dd") : null))
                    .ReverseMap()
                    .ForMember(dest => dest.dataEvento, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.DataEvento) ? (DateTime?)null : DateTime.Parse(src.DataEvento)));
    
                // Exemplo de outros mapeamentos (Lote, RedeSocial, etc.)
                CreateMap<Lote, LoteDTO>().ReverseMap();
                CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();
            }
        }
    }
    ```

6. Criando o contrato do serviço no diretório **/Application/Contracts/** criaremos o contrato para Evento e Palestrante como segue nas imagens abaixo:
    1. **IEventoService.cs**
        ```csharp
        using Domain.entities;

        namespace Application.Contracts
        {
            public interface IEventoService
            {
                public Task<EventoDTO> AddEvento(Evento model);
                public Task<EventoDTO> UpdateEvento(int EventoId,Evento model);
                public Task<bool> DeleteEvento(int EventoId);
                public Task<EventoDTO[]> GetAllEventosAsync(bool IncludePalestrante = false);
                public Task<EventoDTO[]> GetAllEventosByTemaAsync( string Tema,bool IncludePalestrante = false);
                public Task<EventoDTO> GetEventoByIdAsync(int Id, bool IncludePalestrante = false);        
            }
        }
        ```
    2. **IPalestranteService.cs**
        ```csharp
        using Application.DTOs;
        using Domain.entities;

        namespace Application.Contracts
        {
            public interface IPalestranteService
            {
                public Task<PalestranteDTO> AddPalestrante(Palestrante model);
                public Task<PalestranteDTO> UpdatePalestrante(int PalestranteId, Palestrante model);
                public Task<PalestranteDTO> DeletePalestrante(int PalestranteId);
                public Task<PalestranteDTO[]> GetAllPalestrantesAsync(bool IncludeEvento = false);
                public Task<PalestranteDTO[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false);
                public Task<PalestranteDTO> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false);
            }
        }
        ```
7. Agora iniciando as classes de Serviço no qual iremos herdar das interfaces criadas acima, criaremos o diretório: Application/Service, e aqui criaremos os arquivos abaixo:

    1. **EventoService.cs**
        ```csharp
        using AutoMapper;
        using Domain.entities;
        using Application.DTOs;
        using Application.Contracts;
        using Persistence.Contracts;

        namespace Application.Services
        {
            public class EventoService : IEventoService
            {
                private readonly IMapper _mapper;
                private readonly IGeralPersist geralPersist;
                private readonly IEventoPersist eventoPersist;
                public EventoService(IMapper _mapper,
                                     IGeralPersist geralPersist,
                                     IEventoPersist eventoPersist)
                {
                    this._mapper = _mapper;
                    this.geralPersist = geralPersist;
                    this.eventoPersist = eventoPersist;
                }
                public async Task<EventoDTO> AddEvento(Evento model)
                {
                    try
                    {
                        if(model == null) throw new Exception("Objeto Nulo ou inválido");
                        var evento = _mapper.Map<Evento>(model);
                        geralPersist.Add(evento);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            var eventoRetorno = await eventoPersist.GetEventoByIdAsync(model.Id);
                            return _mapper.Map<EventoDTO>(eventoRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao persistir o cadastro do evento: {ex.Message}");
                    }
                }

                public async Task<EventoDTO> UpdateEvento(int EventoId, Evento model)
                {
                    try
                    {
                        if(EventoId == null || model == null) throw new Exception("Erro ao Persistir atualização do Evento, EventoID ou Evento Inválido");
                        geralPersist.Update(model);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            var eventoRetorno = await eventoPersist.GetEventoByIdAsync(EventoId);
                            return _mapper.Map<EventoDTO>(eventoRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao persistir atualização do evento: {ex.Message}");
                    }
                }

                public async Task<bool> DeleteEvento(int EventoId)
                {
                    try
                    {
                        if(EventoId == null) throw new Exception("Erro ao Deletar Evento, ID Inválido ou inexistente.");
                        var evento = await eventoPersist.GetEventoByIdAsync(EventoId);
                        geralPersist.Delete(evento);

                        if(await geralPersist.SaveChangesAsync()) 
                        {
                            return true;
                        }
                        return false;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao persistir a deleção do Evento: {ex.Message}");
                    }
                }

                public async Task<EventoDTO[]> GetAllEventosAsync(bool IncludePalestrante = false)
                {
                    try
                    {
                        var eventosRetorno = await eventoPersist.GetAllEventosAsync(IncludePalestrante);
                        return _mapper.Map<EventoDTO[]>(eventosRetorno);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao recuperar todos os Eventos: {ex.Message}");
                    }
                }

                public async Task<EventoDTO[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrante = false)
                {
                    try
                    {
                        if(Tema == null) throw new Exception("Erro ao recuperar Eventos por Tema, pois o campo está Nulo");
                        var eventosRetorno = await eventoPersist.GetAllEventosByTemaAsync(Tema);
                        return _mapper.Map<EventoDTO[]>(eventosRetorno);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao recuperar Evento por Tema: {ex.Message}");
                    }
                }

                public async Task<EventoDTO> GetEventoByIdAsync(int Id, bool IncludePalestrante = false)
                {
                    try
                    {
                        if(Id == 0 || Id == null) throw new Exception("Erro ao recuperar Evento por ID: ID Inválido ou inexistente");
                        var eventoRetorno = await eventoPersist.GetEventoByIdAsync(Id);
                        return _mapper.Map<EventoDTO>(eventoRetorno);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao recuperar Evento: {ex.Message}");
                    }
                }
            }
        }
        ```
    2. **PalestranteService.cs**
        ```csharp
        using AutoMapper;
        using Domain.entities;
        using Application.DTOs;
        using Application.Contracts;
        using Persistence.Contracts;
        using Persistence.Repositories;

        namespace Application.Services
        {
            public class PalestranteService : IPalestranteService
            {
                private readonly IMapper _mapper;
                private readonly IGeralPersist geralPersist;
                private readonly IPalestrantePersist palestrantePersist;
                public PalestranteService(IMapper _mapper,
                                          IGeralPersist geralPersist,
                                          IPalestrantePersist palestrantePersist)
                {
                    this._mapper = _mapper;
                    this.geralPersist = geralPersist;
                    this.palestrantePersist = palestrantePersist;        
                }

                public async Task<PalestranteDTO> AddPalestrante(Palestrante model)
                {
                    try
                    {
                        if(model == null) throw new Exception("Modelo inválido para persistir o registro.");
                        geralPersist.Add(model);

                        if(await geralPersist.SaveChangesAsync()) 
                        {
                            var palestranteRetorno  = await palestrantePersist.GetPalestranteByIdAsync(model.Id);
                            return _mapper.Map<PalestranteDTO>(palestranteRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {   
                        throw new Exception($"Erro ao Persistir cadastro do palestrante: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO> UpdatePalestrante(int PalestranteId, Palestrante model)
                {
                    try
                    {
                        if (model == null || PalestranteId == null || PalestranteId <= 0) throw new Exception("Erro ao alterar Palestrante, ID inválido ou Objeto Inconsistente");

                        var palestrante = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                        if(palestrante.Id != model.Id) throw new Exception("ID fornecido não bate com ID do objeto para ser alterado");
                        geralPersist.Update(model);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            var palestranteRetorno = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                            return _mapper.Map<PalestranteDTO>(palestranteRetorno);
                        }
                        return null;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao Alterar o Palestrante: {ex.Message}");
                    }
                }

                public async Task<bool> DeletePalestrante(int PalestranteId)
                {
                    try
                    {
                        if(PalestranteId == null || PalestranteId < 0) throw new Exception("ID Nulo ou Inexistente");
                        var palestrante = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                        if(palestrante != null) throw new Exception("ID Inexistente para exclusão");
                        geralPersist.Delete(palestrante);

                        if(await geralPersist.SaveChangesAsync())
                        {
                            return true;
                        }
                        return false;
                    }
                    catch (Exception ex)
                    {

                        throw new Exception($"Erro ao persistir exclusão do palestrante: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO[]> GetAllPalestrantesAsync(bool IncludeEvento = false)
                {
                    try
                    {
                        var palestrantes = await palestrantePersist.GetAllPalestrantesAsync();
                        var palestrantesRetorno = _mapper.Map<PalestranteDTO[]>(palestrantes);
                        return palestrantesRetorno;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Erro ao Recuperar palestrantes: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false)
                {
                    try
                    {   
                        if(Name == null) throw new Exception("Erro ao recuperar Palestrante: nome Nulo");
                        var palestrantesRetorno = await palestrantePersist.GetAllPalestrantesByNameAsync(Name);
                        return _mapper.Map<PalestranteDTO[]>(palestrantesRetorno);
                    }
                    catch (Exception ex)
                    { 
                        throw new Exception($"Erro ao Recuperar Palestrantes Pelo Nome: {ex.Message}");
                    }
                }

                public async Task<PalestranteDTO> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false)
                {
                    try
                    {
                        if(Id == null || Id < 0) throw new Exception("Erro ao reucuperar Usuario ID Inexistente");
                        var palestrante = await palestrantePersist.GetPalestranteByIdAsync(Id);
                        return _mapper.Map<PalestranteDTO>(palestrante);
                    }
                    catch (Exception ex)
                    {     
                        throw new Exception($"Erro ao Recuperar Palestrante: {ex.Message}");
                    }
                }
            }
        }
        ```
por momento nossa Application já estara respondendo a nossa API, e agora o próximo passo sera adicionar a camada de API para iniciar as comunicações via requisições http,

---

### 7. API

nesta camada iremos inicalmente criar nossa API, seguimos com o seguinte codigo via terminal dentro do diretorio **back**: 
```csharp
    dotnet new webapi -n ProEvento.API
```

seguiremos adicionando o novo projeto a solução ja criada, e seguiremos com o comando:
```csharp
    dotnet sln .\ProEvento.sln add .\API\
```

próximo passo sera adicionar as referencias necessarias a API que seria a camada de **Aplicação** e camada de **Persistencia**
```csharp
dotnet add .\API\ reference .\Application\
dotnet add .\API\ reference .\Persistence\
```

1.  Adicionando as dependencias necessarias para rodar a API:
```csharp
    <PackageReference Include="Microsoft.AspNetCore.Mvc.NewtonsoftJson" Version="9.0.1" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.0">
	<PackageReference Include="Swashbuckle.AspNetCore.SwaggerUI" Version="7.2.0" />
```

2. Configurando o **Program.cs**
```csharp
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
```
Agora iremos iniciar a configuração de nossa primeira controller, a controller que sera responsavel pelas rotas dos Eventos, teremos outras controller também para outras entidades, commo por exmeplo Palestrante e Login.
```csharp
using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoSerivce;
        public EventoController(IEventoService _eventoSerivce)
        {
            this._eventoSerivce = _eventoSerivce;
        }

        [HttpPost]
        public async Task<IActionResult> AddEvento(EventoDTO model) 
        {
            try
            {
                if(model == null) return BadRequest("Erro ao tentar adicioanr evento");
                var evento = await _eventoSerivce.AddEvento(model);
                if(evento != null) return Ok(evento);
                return BadRequest("Erro ao persistir cadastro ao banco");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvento(int Id, EventoDTO model) 
        {
            var evento = await _eventoSerivce.UpdateEvento(Id, model);
            if(evento == null) return BadRequest("Erro ao tentar adicionar evento");
            return Ok(evento);
        }
                [HttpGet]
        public async Task<IActionResult> GetEventos() 
        {
            try
            {
                var eventos = await _eventoSerivce.GetAllEventosAsync(false);
                if (eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEventoById(int id)
        {
            try
            {
                var eventos = await _eventoSerivce.GetEventoByIdAsync(id, false);
                if(eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int Id) 
        {
            try
            {
                if(Id == null || Id < 0) return BadRequest("Erro ao tentar deletar usuario");
                var resultado = await _eventoSerivce.DeleteEvento(Id);

                if(resultado) return Ok("Evento deletado");
                return BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEventoByTema(string tema) 
        {
            try
            {
                var evento = await _eventoSerivce.GetAllEventosByTemaAsync(tema, false);
                if(evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tenhtar recuperar eventos. Erro: {ex.Message}"
                );
            }
        }
    }
}
```

e agora iremos criar a migration para gerar nosso banco com os comandos:
```csharp
    dotnet ef migrations add InitialCreate -p .\Persistence\ -s .\API\ // Para criar a primeiro migration por nome de InitialCreate
    dotnet ef database update -p .\API\
```