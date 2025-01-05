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