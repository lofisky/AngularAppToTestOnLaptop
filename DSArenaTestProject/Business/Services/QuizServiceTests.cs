using AngularAppToTestOnLaptop.Server.Business.Services;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;
using Moq;

namespace DSArenaTestProject.Business.Services
{
    public class QuizServiceTests
    {
        [Fact]
        public void GetQuizzesByTopic_ShouldReturnQuizzes()
        {
            // Arrange
            var mockRepo = new Mock<IQuizRepository>();
            var topic = "DSA";
            var expectedQuizzes = new List<Quiz> { new Quiz { QuizId = 1, Title = "Basic DSA Quiz 1", Description = "Intro to arrays and loops", Difficulty = "Easy", IsPreBuilt = true, Topic = topic, UserId = 1 }, new Quiz { QuizId = 2, Title = "Basic DSA Quiz 2", Description = "Intro to strings and conditions", Difficulty = "Easy", IsPreBuilt = true, Topic = topic, UserId = 1 }};

            mockRepo.Setup(r => r.GetQuizzesByTopic(topic)).Returns(expectedQuizzes); //fake mock return
            var service = new QuizService(mockRepo.Object);

            // Act
            var result = service.GetQuizzesByTopic(topic);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.All(result, q => Assert.Equal(topic, q.Topic)); //shouldnt be null, and should have two quizzes, and also check if the topic is as defined for each quiz
        }

        [Fact]
        public void GetQuizQuestionsForQuiz_ShouldReturnQuizQuestions()
        {
            // Arrange
            var mockRepo = new Mock<IQuizRepository>();
            var quizId = 1;
            var expectedQuestions = new List<QuizQuestion>
            {
                new QuizQuestion
                {
                    QuizQuestionId = 1,
                    QuestionText = "Which data structure stores elements in LIFO order?",
                    Options = "Array/Stack/Queue/LinkedList",
                    CorrectOptionsIndex = 1,
                    QuizId = quizId,
                    QuizTitle = "Basic DSA Quiz 1"
                },
                new QuizQuestion
                {
                    QuizQuestionId = 2,
                    QuestionText = "Which of the following is a linear data structure?",
                    Options = "Tree/Graph/LinkedList/Heap",
                    CorrectOptionsIndex = 2,
                    QuizId = quizId,
                    QuizTitle = "Basic DSA Quiz 1"
                },
                new QuizQuestion
                {
                    QuizQuestionId = 3,
                    QuestionText = "Which operation adds an element to the end of a queue?",
                    Options = "Push/Pop/Enqueue/Dequeue",
                    CorrectOptionsIndex = 2,
                    QuizId = quizId,
                    QuizTitle = "Basic DSA Quiz 1"
                }
            };

            mockRepo.Setup(r => r.GetQuizQuestionsForQuiz(quizId)).Returns(expectedQuestions);
            var service = new QuizService(mockRepo.Object);

            // Act
            var result = service.GetQuizQuestionsForQuiz(quizId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, result.Count);
            Assert.Contains(result, q => q.QuestionText.Contains("LIFO") && q.Options.Contains("Stack")); //first match just for few to check if its good
        }

        [Fact]
        public void GetQuizzesByTopic_WithNoQuizzes_ShouldReturnEmptyList()
        {
            // Arrange
            var mockRepo = new Mock<IQuizRepository>();
            var topic = "UnknownTopic";

            mockRepo.Setup(r => r.GetQuizzesByTopic(topic)).Returns(new List<Quiz>()); //empty list matching expected
            var service = new QuizService(mockRepo.Object);

            // Act
            var result = service.GetQuizzesByTopic(topic);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }

        [Fact]
        public void GetQuizQuestionsForQuiz_WithNoQuestions_ShouldReturnEmptyList()
        {
            // Arrange
            var mockRepo = new Mock<IQuizRepository>();
            var quizId = 999; // non-existing quiz

            mockRepo.Setup(r => r.GetQuizQuestionsForQuiz(quizId)).Returns(new List<QuizQuestion>()); // empty list
            var service = new QuizService(mockRepo.Object);

            // Act
            var result = service.GetQuizQuestionsForQuiz(quizId);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }
    }
}