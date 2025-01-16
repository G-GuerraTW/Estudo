using AutoMapper;
using Domain.entities;
using Application.DTOs;

namespace Application.Helpers.ProEvento
{
    public class ProEventoProfile : Profile
    {
        public ProEventoProfile()
       {
            // Mapeamento entre Evento e EventoDTO
            CreateMap<Evento, EventoDTO>().ReverseMap();
            CreateMap<Lote, LoteDTO>().ReverseMap();
            CreateMap<Palestrante, PalestranteDTO>().ReverseMap(); 
            CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();
        }
    }
}