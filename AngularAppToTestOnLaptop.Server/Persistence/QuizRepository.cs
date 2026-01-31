using AngularAppToTestOnLaptop.Server.Database;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;
using Npgsql;

namespace AngularAppToTestOnLaptop.Server.Persistence
{
    public class QuizRepository : IQuizRepository
    {
        private readonly databaseAccess _dbAccess;

        public QuizRepository(databaseAccess dbAccess)
        {
            _dbAccess = dbAccess;
        }

        public List<Quiz> GetQuizzesByTopic(string topic)
        {
            Console.WriteLine($"querying for topic: {topic}"); //logging topic for query
            using var connection = _dbAccess.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("SELECT quiz_id, title, description, topic, is_pre_built, difficulty FROM quiz WHERE LOWER(topic) = LOWER(@topic)", connection);
            command.Parameters.AddWithValue("@topic", topic);

            using var reader = command.ExecuteReader();

            var quizzes = new List<Quiz>();

            while (reader.Read())
            {
                quizzes.Add(new Quiz
                {
                    QuizId = reader.GetInt32(reader.GetOrdinal("quiz_id")),
                    Title = reader.GetString(reader.GetOrdinal("title")),
                    Description = reader.GetString(reader.GetOrdinal("description")),
                    Topic = reader.GetString(reader.GetOrdinal("topic")),
                    IsPreBuilt = reader.GetBoolean(reader.GetOrdinal("is_pre_built")),
                    Difficulty = reader.GetString(reader.GetOrdinal("difficulty")),
                });
            }

            Console.WriteLine($"found {quizzes.Count} quizzes for topic: {topic}"); //loggin num of flashcards found
            return quizzes;
        }

        public List<QuizQuestion> GetQuizQuestionsForQuiz(int quizId)
        {
            using var connection = _dbAccess.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("SELECT quiz_question.question_text, quiz_question.options, quiz_question.quiz_id, quiz.title, quiz_question.correct_options_index FROM quiz_question JOIN quiz ON quiz_question.quiz_id = quiz.quiz_id WHERE quiz_question.quiz_id = @quizId", connection);
            command.Parameters.AddWithValue("@quizId", quizId);

            using var reader = command.ExecuteReader();

            var quizQuestions = new List<QuizQuestion>();

            while (reader.Read())
            {
                quizQuestions.Add(new QuizQuestion {
                
                    QuestionText = reader.GetString(reader.GetOrdinal("question_text")),
                    Options = reader.GetString(reader.GetOrdinal("options")),
                    QuizId = reader.GetInt32(reader.GetOrdinal("quiz_id")),
                    CorrectOptionsIndex = reader.GetInt32(reader.GetOrdinal("correct_options_index")),
                    QuizTitle = reader.GetString(reader.GetOrdinal("title"))
                });
            }

            return quizQuestions;
        }
    }
}
