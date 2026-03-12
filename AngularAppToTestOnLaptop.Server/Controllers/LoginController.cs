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
        public ActionResult<UserDTO> Login(LoginRequestDTO request)
        {
            var user = _authService.Login(request.Email, request.Password);
            if(user == null) return Unauthorized(); //can return this, actionresult is flexible and can take results or types

            return Ok(new UserDTO{ Username = user.Username, Email = user.Email });
        }
    }
}