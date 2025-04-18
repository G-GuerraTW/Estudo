using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class EventoDTO
        {
            public int Id { get; set; }
            public string Local { get; set; }
            public DateTime? DataEvento { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigtório."),
             //MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres."),
             //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres.")
             StringLength(50, MinimumLength = 3,
                              ErrorMessage = "Intervalo permitido de 3 a 50 caracteres.")]
            public string Tema { get; set; }


            [Display(Name = "Qtd Pessoas")]
            [Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120.000")]
            public int QtdPessoas { get; set; }

            [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
                               ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
            public string ImagemURL { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [Phone(ErrorMessage = "O campo {0} está com número inválido")]
            public string Telefone { get; set; }

            [Required(ErrorMessage = "O campo {0} é obrigatório")]
            [Display(Name = "e-mail")]
            [EmailAddress(ErrorMessage = "É necessário ser um {0} válido")]
            public string Email { get; set; }

            public IEnumerable<LoteDTO> Lotes { get; set; } = new List<LoteDTO>();
            public IEnumerable<RedeSocialDTO> RedesSociais { get; set; } = new List<RedeSocialDTO>();
            public IEnumerable<PalestranteDTO> Palestrantes { get; set; } = new List<PalestranteDTO>();
        }
}