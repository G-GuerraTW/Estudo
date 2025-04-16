using Domain.Enum;
using Microsoft.AspNetCore.Identity;

namespace Domain.Identity
{
    public class User : IdentityUser<int> //INT siguinifica que a key vai ser INT e não GUIDE
    {
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public Titulo? Titulo { get; set; }
        public string? Descricao { get; set; }
        public Funcao? Funcao { get; set; }
        public string? ImagemPerfil { get; set; }
        public IEnumerable<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}