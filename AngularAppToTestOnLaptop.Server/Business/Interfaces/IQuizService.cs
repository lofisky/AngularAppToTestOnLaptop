using AngularAppToTestOnLaptop.Server.Domain.Entities;

namespace AngularAppToTestOnLaptop.Server.Business.Interfaces
{
    public interface IQuizService
    {
        List<Quiz> GetQuizzesByTopic(string topic);
        List<QuizQuestion> GetQuizQuestionsForQuiz(int id);
    }
}
