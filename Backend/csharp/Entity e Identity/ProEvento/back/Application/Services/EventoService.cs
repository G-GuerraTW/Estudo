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
        public async Task<EventoDTO> AddEvento(EventoDTO model)
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

        public async Task<EventoDTO> UpdateEvento(int EventoId, EventoDTO model)
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