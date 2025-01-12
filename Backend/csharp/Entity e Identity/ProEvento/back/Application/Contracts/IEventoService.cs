using Domain.entities;

namespace Application.Contracts
{
    public interface IEventoService
    {
        public Task<Evento> AddEvento(Evento evento);
        public Task<Evento> UpdateEvento(Evento evento);
        public Task<Evento> DeleteEvento(Evento evento);
        public Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false);
        public Task<Evento[]> GetAllEventosByTemaAsync( string Tema,bool IncludePalestrante = false);
        public Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false);        
    }
}