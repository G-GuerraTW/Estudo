using Domain.entities;

namespace Application.DTOs
{
    public class PalestranteDTO
        {
            public int Id { get; set; }        
            public string Nome { get; set; }
            public string MiniCurriculo { get; set; }
            public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
            public IEnumerable<EventoPalestrante> EventosPalestrantes { get; set; } = new List<EventoPalestrante>();
        }
}