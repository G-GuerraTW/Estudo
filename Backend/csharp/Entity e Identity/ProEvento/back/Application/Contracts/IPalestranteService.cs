using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;

namespace Application.Contracts
{
    public interface IPalestranteService
    {
        public Task<Palestrante> AddPalestrante(Palestrante model);
        public Task<Palestrante> UpdatePalestrante(int PalestranteId, Palestrante model);
        public Task<Palestrante> DeletePalestrante(int PalestranteId);
        public Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEvento = false);
        public Task<Palestrante[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false);
        public Task<Palestrante> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false);
    }
}