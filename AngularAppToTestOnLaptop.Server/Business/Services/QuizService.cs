using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;

namespace AngularAppToTestOnLaptop.Server.Business.Services
{
    public class QuizService : IQuizService
    {
        private readonly IQuizRepository _quizRepository;

        public QuizService(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }

        public List<Quiz> GetQuizzesByTopic(string topic)
        {
            return _quizRepository.GetQuizzesByTopic(topic);
        }

        public List<QuizQuestion> GetQuizQuestionsForQuiz(int id)
        {
            return _quizRepository.GetQuizQuestionsForQuiz(id);
        }
    }
}
