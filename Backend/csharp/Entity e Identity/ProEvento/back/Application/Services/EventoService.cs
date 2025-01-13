using Application.Contracts;
using Domain.entities;
using Persistence.Contracts;

namespace Application.Services
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersist geralPersist;
        private readonly IEventoPersist eventoPersist;
        public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist)
        {
            this.geralPersist = geralPersist;
            this.eventoPersist = eventoPersist;
        }
        public async Task<Evento> AddEvento(Evento model)
        {
            try
            {
                if(model == null) throw new Exception("Objeto Nulo ou inválido");
                geralPersist.Add(model);

                if(await geralPersist.SaveChangesAsync())
                {
                    await eventoPersist.GetEventoByIdAsync(model.Id);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro do evento: {ex.Message}");
            }
        }

        public async Task<Evento> UpdateEvento(int EventoId, Evento evento)
        {
            try
            {
                if(EventoId == null || evento == null) throw new Exception("Erro ao Persistir atualização do Evento, EventoID ou Evento Inválido");
                geralPersist.Update(evento);

                if(await geralPersist.SaveChangesAsync())
                {
                    return await eventoPersist.GetEventoByIdAsync(EventoId);
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

        public async Task<Evento[]> GetAllEventosAsync(bool IncludePalestrante = false)
        {
            try
            {
                var eventos = await eventoPersist.GetAllEventosAsync(IncludePalestrante);
                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar todos os Eventos: {ex.Message}");
            }
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool IncludePalestrante = false)
        {
            try
            {
                if(Tema == null) throw new Exception("Erro ao recuperar Eventos por Tema, pois o campo está Nulo");
                var eventos = await eventoPersist.GetAllEventosByTemaAsync(Tema);
                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar Evento por Tema: {ex.Message}");
            }
        }

        public async Task<Evento> GetEventoByIdAsync(int Id, bool IncludePalestrante = false)
        {
            try
            {
                if(Id == 0 || Id == null) throw new Exception("Erro ao recuperar Evento por ID: ID Inválido ou inexistente");
                var evento = await eventoPersist.GetEventoByIdAsync(Id);
                return evento;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao recuperar Evento: {ex.Message}");
            }
        }
    }
}