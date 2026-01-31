using AngularAppToTestOnLaptop.Server.Domain.Entities;

namespace AngularAppToTestOnLaptop.Server.Domain.Interfaces
{
    public interface IQuizRepository
    {
        List<Quiz> GetQuizzesByTopic(string topic);
        List<QuizQuestion> GetQuizQuestionsForQuiz(int id);
    }
}
