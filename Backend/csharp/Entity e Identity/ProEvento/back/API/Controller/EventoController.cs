using Application.DTOs;
using Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IEventoService _eventoSerivce;
        public EventoController(IEventoService _eventoSerivce)
        {
            this._eventoSerivce = _eventoSerivce;
        }

        [HttpPost]
        public async Task<IActionResult> AddEvento(EventoDTO model) 
        {
            try
            {
                if(model == null) return BadRequest("Erro ao tentar adicioanr evento");
                var evento = await _eventoSerivce.AddEvento(model);
                if(evento != null) return Ok(evento);
                return BadRequest("Erro ao persistir cadastro ao banco");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvento(int Id, EventoDTO model) 
        {
            var evento = await _eventoSerivce.UpdateEvento(Id, model);
            if(evento == null) return BadRequest("Erro ao tentar adicionar evento");
            return Ok(evento);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int Id) 
        {
            try
            {
                if(Id == null || Id < 0) return BadRequest("Erro ao tentar deletar usuario");
                var resultado = await _eventoSerivce.DeleteEvento(Id);

                if(resultado) return Ok("Evento deletado");
                return BadRequest("Evento não deletado");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar eventos. Erro: {ex.Message}"
                );
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEventos() 
        {
            try
            {
                var eventos = await _eventoSerivce.GetAllEventosAsync(false);
                if (eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventoById(int id)
        {
            try
            {
                var eventos = await _eventoSerivce.GetEventoByIdAsync(id, false);
                if(eventos == null) return NoContent();
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("tema/")]
        public async Task<IActionResult> GetEventoByTema(string tema) 
        {
            try
            {
                var evento = await _eventoSerivce.GetAllEventosByTemaAsync(tema, false);
                if(evento == null) return NoContent();
                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tenhtar recuperar eventos. Erro: {ex.Message}"
                );
            }
        }
    }
}