using Application.Contracts;
using Domain.entities;

namespace Application.Services
{
    public class PalestranteService : IEventoService
    {
        public Task<Evento> AddEvento(Evento model)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<bool> DeleteEvento(int EventoId)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrante = false)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public Task<Evento> UpdateEvento(int EventoId, Evento evento)
        {
            try
            {
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }
    }
}