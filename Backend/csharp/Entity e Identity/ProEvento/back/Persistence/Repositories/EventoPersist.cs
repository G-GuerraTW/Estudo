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
            IQueryable<Evento> query = context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

            if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrante = false)
        {
            IQueryable<Evento> query = context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

            if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

            query = query.Where(E => E.Tema == Tema);

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false)
        {
            IQueryable<Evento> query = context.Eventos.Include(E => E.Lotes).Include(E => E.RedesSociais).AsNoTracking();

            if(IncludePalestrante) query = query.Include(E => E.EventosPalestrantes).ThenInclude(EP => EP.Evento);

            query = query.Where(E => E.Id == Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}