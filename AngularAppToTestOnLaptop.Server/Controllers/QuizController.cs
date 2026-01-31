using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AngularAppToTestOnLaptop.Server.Controllers
{
    [ApiController]
    [Route("api/quizzes")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;
        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpGet("getQuizzes")]
        public async Task<ActionResult> GetQuizzes(string topic)
        {
            Console.WriteLine($"Received topic: {topic}"); //logging topic received 
            List<Quiz> quizzes = _quizService.GetQuizzesByTopic(topic);

            if (quizzes == null || quizzes.Count == 0) return NotFound(new { message = "No quizzes found" });

            return Ok(quizzes);
        }

        [HttpGet("getQuizQuestionsForQuiz")]
        public async Task<ActionResult> GetQuizQuestionsForQuiz(int id)
        {
            var quizQuestion = _quizService.GetQuizQuestionsForQuiz(id);

            if (quizQuestion == null || quizQuestion.Count == 0) return NotFound(new { message = "No quiz questions found" });
            return Ok(quizQuestion);
        }
    }
}
