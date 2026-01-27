using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AngularAppToTestOnLaptop.Server.Controllers
{
    [ApiController]
    [Route("api/flashcards")]
    public class FlashcardSetController : ControllerBase
    {
        private readonly IFlashcardSetService _flashcardSetService;
        public FlashcardSetController(IFlashcardSetService flashcardSetService)
        {
            _flashcardSetService = flashcardSetService;
        }

        [HttpGet("getFlashcardSets")]
        public async Task<ActionResult> GetFlashcardSets(string topic)
        {
            List<FlashcardSet> flashcardSets = _flashcardSetService.GetFlashcardSetsByTopic(topic);
            
            if (flashcardSets == null || flashcardSets.Count == 0) return NotFound(new { message = "No flashcard sets found" });
            return Ok(flashcardSets);
        }
    }
}
