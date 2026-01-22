using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AngularAppToTestOnLaptop.Server.Controllers.TestControllers
{
    [ApiController]
    [Route("api/testAI")]
    public class TestHuggingFaceAPIController : ControllerBase
    {
        private readonly IAIFeedbackService _aiFeedbackService;
        public TestHuggingFaceAPIController(IAIFeedbackService aIFeedbackService)
        {
            _aiFeedbackService = aIFeedbackService;
        }

        [HttpGet("test-connection")]
        public async Task<IActionResult> TestAIConnection()
        {
            var inputText = "Can you explain two pointers to me? i dont understand that data structure.";
            var feedback = await _aiFeedbackService.GetFeedbackAsync(inputText);

            if (feedback.StartsWith("Error"))
            {
                return BadRequest(feedback);
            }
            return Ok(new { message = "HUGGING FACE CONNECTED RAWHWHWHH!!", response = feedback });
        }
    }
}
