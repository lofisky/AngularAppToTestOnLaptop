using Microsoft.AspNetCore.Mvc;
using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.DTOs;

namespace AngularAppToTestOnLaptop.Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class RegisterController : ControllerBase
    {
        private readonly IAuthService _authService;

        public RegisterController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public ActionResult<bool> Register(RegisterRequestDTO request)
        {
            var success = _authService.Register(request.Username, request.UserEmail, request.UserPassword);

            if (!success)
            {
                return BadRequest(new { message = "Email already in use." });
            }
            return Ok(true);
        }
    }
}