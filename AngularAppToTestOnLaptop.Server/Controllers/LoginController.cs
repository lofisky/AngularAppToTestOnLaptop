using Microsoft.AspNetCore.Mvc;
using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.DTOs;

namespace AngularAppToTestOnLaptop.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;

        public LoginController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult<bool> Login(LoginRequestDTO request)
        {
            return Ok(_authService.Login(request.Email, request.Password));
        }
    }
}