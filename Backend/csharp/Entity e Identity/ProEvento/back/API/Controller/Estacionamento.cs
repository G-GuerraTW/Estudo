using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstacionamentoController : ControllerBase
    {
        private readonly IEstacionamentoService _estacionamentoService;

        public EstacionamentoController(IEstacionamentoService estacionamentoService)
        {
            _estacionamentoService = estacionamentoService;
        }

        [HttpPost]
        public async Task<IActionResult> AdicionarCarro(EstacionamentoDTO model)
        {
            try
            {
                if (model == null) return BadRequest("Erro ao tentar adicionar carro no estacionamento.");
                var carro = await _estacionamentoService.AdicionarCarro(model);
                if (carro != null) return Ok(carro);
                return BadRequest("Erro ao registrar carro no estacionamento.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar carro. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarCarro(int id, EstacionamentoDTO model)
        {
            var carro = await _estacionamentoService.AtualizarCarro(id, model);
            if (carro == null) return BadRequest("Erro ao tentar atualizar carro no estacionamento.");
            return Ok(carro);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoverCarro(int id)
        {
            try
            {
                if (id <= 0) return BadRequest("ID inválido para remoção.");
                var resultado = await _estacionamentoService.RemoverCarro(id);

                if (resultado) return Ok("Carro removido do estacionamento.");
                return BadRequest("Erro ao tentar remover carro do estacionamento.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar remover carro. Erro: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObterCarrosEstacionados()
        {
            try
            {
                var carros = await _estacionamentoService.ObterCarrosEstacionados();
                if (carros == null || carros.Count == 0) return NoContent();
                return Ok(carros);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar carros. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterCarroPorId(int id)
        {
            try
            {
                var carro = await _estacionamentoService.ObterCarroPorId(id);
                if (carro == null) return NotFound("Carro não encontrado.");
                return Ok(carro);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar carro. Erro: {ex.Message}");
            }
        }

        [HttpGet("placa/{placa}")]
        public async Task<IActionResult> ObterCarroPorPlaca(string placa)
        {
            try
            {
                var carro = await _estacionamentoService.ObterCarroPorPlaca(placa);
                if (carro == null) return NotFound("Carro não encontrado.");
                return Ok(carro);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar carro por placa. Erro: {ex.Message}");
            }
        }
    }
}
