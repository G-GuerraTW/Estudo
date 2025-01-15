using Application.DTOs;
using AutoMapper;
using Domain.entities;

namespace Application.Helpers.ProEvento
{
    public class ProEventoProfile : Profile
    {
        public ProEventoProfile()
       {
            // Mapeamento entre Evento e EventoDTO
            CreateMap<Evento, EventoDTO>().ReverseMap();
            CreateMap<Lote, LoteDTO>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();
            CreateMap<Evento, EventoDTO>().ReverseMap();
        }
    }
}