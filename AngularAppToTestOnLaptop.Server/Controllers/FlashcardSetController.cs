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
            Console.WriteLine($"Received topic: {topic}"); //logging topic received 
            List<FlashcardSet> flashcardSets = _flashcardSetService.GetFlashcardSetsByTopic(topic);

            if (flashcardSets == null || flashcardSets.Count == 0) return NotFound(new { message = "No flashcard sets found" });

            //ensure flashcardsetid is included
            return Ok(flashcardSets.Select(flashcardSet => new {
                flashcardSetId = flashcardSet.FlashcardSetId,  
                flashcardSet.Title,
                flashcardSet.Description,
                flashcardSet.Topic,
                flashcardSet.IsPreBuilt
            }));
        }

        [HttpGet("getFlashcardsForSet")]
        public async Task<ActionResult> GetFlashcardsForSet(int id)
        {
            var flashcard = _flashcardSetService.GetFlashcardsForSet(id);

            if (flashcard == null || flashcard.Count == 0) return NotFound(new { message = "No flashcards found" });
            return Ok(flashcard);
        }
    }
}
