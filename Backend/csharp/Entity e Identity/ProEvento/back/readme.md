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

proximo passo é criar o contexto da aplicação, tanto repositorio como classe,

1. crie uma pasta chamada **Context** dentro da camada Persistence.
    1. criar uma nova classe chamada ProEventoContext.
    2. dentro dela teremos um codigo como este no momento:

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

### FluenteAPI

#### Aproveitando que finalizamos a primeira parte da persistencia iremos ja adicionar a configuração do FluenteAPI manualmente, isso nos dara um total controle de como queremos que as tabelas e as propriedades se comportem no banco de dados.



---

### Application

#### Agora partiremos para application com o intuito de criar também as Interfaces de serviço, o serviço e também as DTOs para termos um controle nos objetos de retorno para o cliente, nela também faremos assinaturas das interfaces que está presente na Persistencia e utilizaremos de entidades do dominio, então inicialmente iremos adicionar referencia das outras classlib para ela.

1. Inicialmente iremos adicionar referencias das classlib de **Persistencia** e **Domain** para a nossa **Application**, siga com o comando abaixo
    1. ```csharp
        dotnet add .\Application\ reference .\Domain\
        dotnet add .\Application\ reference .\Persistence\
       ```
