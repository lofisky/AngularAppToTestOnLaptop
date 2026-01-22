using AngularAppToTestOnLaptop.Server.Database;
using Microsoft.AspNetCore.Mvc;

namespace AngularAppToTestOnLaptop.Server.Controllers.TestControllers
{
    [ApiController]
    [Route("[controller]")]
    public class testDbController : ControllerBase
    {
        private readonly databaseAccess _db;

        public testDbController(databaseAccess db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                await using var conn = _db.GetConnection();
                await conn.OpenAsync();
                return Ok("db connected!! :D");
            }
            catch (Exception ex)
            {
                return BadRequest("DB CONNECTION FAILURE: "+ ex.Message);
            }
        }
    }
}
