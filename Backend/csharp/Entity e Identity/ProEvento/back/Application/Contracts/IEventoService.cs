using Application.DTOs;
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