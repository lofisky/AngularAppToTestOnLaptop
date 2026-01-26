using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.DTOs.AiDTOS;
using Microsoft.AspNetCore.Mvc;

namespace AngularAppToTestOnLaptop.Server.Controllers
{
    [ApiController]
    [Route("api/askAi")]
    public class AiChatController : ControllerBase
    {
        private readonly IAIFeedbackService _aiFeedbackService;
        public AiChatController(IAIFeedbackService aiFeedbackService)
        {
            _aiFeedbackService = aiFeedbackService;
        }

        [HttpPost("sendQuery")]
        public async Task <ActionResult<AskAiResponseDTO>> SendQuery(AskAiRequestDTO query)
        {
            if (query == null || string.IsNullOrEmpty(query.userMessage)) return BadRequest("No query provided");
            var response = await _aiFeedbackService.GetFeedbackAsync(query.userMessage);

            if (response.StartsWith("Error"))
            {
                return BadRequest(response);
            }
            return Ok(new AskAiResponseDTO { aiResponse = response });
;        }
    }
}
