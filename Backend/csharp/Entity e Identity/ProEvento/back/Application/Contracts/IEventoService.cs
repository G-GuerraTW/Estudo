using Domain.entities;

namespace Application.Contracts
{
    public interface IEventoService
    {
        public Task<Evento> AddEvento(Evento model);
        public Task<Evento> UpdateEvento(int EventoId,Evento evento);
        public Task<bool> DeleteEvento(int EventoId);
        public Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false);
        public Task<Evento[]> GetAllEventosByTemaAsync( string Tema,bool IncludePalestrante = false);
        public Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false);        
    }
}