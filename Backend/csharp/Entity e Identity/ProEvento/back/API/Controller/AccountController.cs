using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Contracts;
using Application.DTOs;

namespace API.Controller
{   
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService tokenService;
        private readonly IAccountService accountService;
        public AccountController(IAccountService accountService, ITokenService tokenService)
        {
            this.tokenService = tokenService;
            this.accountService = accountService;
        }

        [HttpGet("GetUser/{userName}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUser(string userName)
        {
            try
            {
                var user = await this.accountService.GetUserByUsernameAsync(userName);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterUser(UserDTO userDTO)
        {
            try
            {
                if (await accountService.UserExists(userDTO.UserName)) return BadRequest("Usuario já Existe");

                var user = await accountService.CreateAccountAssync(userDTO);
                if(user != null) return Ok(user);

                return BadRequest("Usuário não criado, tente novamente.");

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }

        [HttpGet("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDTO userLogin)
        {
            try
            {
                var user = await this.accountService.GetUserByUsernameAsync(userLogin.UserName);
                if(user == null) return Unauthorized("Usuário Inválido.");

                var result = await accountService.CheckUserPasswordAsync(user, user.Password);
                if(!result.Succeeded) return Unauthorized();

                return Ok(new 
                {
                    userName
                });

                return Ok(user);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Usuário. Erro: {ex.Message}");
            }
        }
    }
}