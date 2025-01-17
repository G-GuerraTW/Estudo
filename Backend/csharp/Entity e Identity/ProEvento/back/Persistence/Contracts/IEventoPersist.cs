using Domain.entities;

namespace Persistence.Contracts
{
    public interface IEventoPersist
    {
        public Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false);
        public Task<Evento[]> GetAllEventosByTemaAsync( string Tema,bool IncludePalestrante = false);
        public Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false);
    }
}