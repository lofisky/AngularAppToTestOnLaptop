using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Controllers;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DSArenaTestProject.Controllers
{
    public class QuizControllerTests
    {
        [Fact]
        public async Task GetQuizzes_WithExistingTopic_ShouldReturnOk()
        {
            // Arrange
            var mockService = new Mock<IQuizService>();
            var topic = "DSA";
            var quizzes = new List<Quiz>{ new Quiz { QuizId = 1, Title = "Arrays Basics", Topic = topic }, new Quiz { QuizId = 2, Title = "Stacks and Queues", Topic = topic }}; //parameterisless constructor on constructorless quiz domain obj

            mockService.Setup(s => s.GetQuizzesByTopic(topic)).Returns(quizzes);
            var controller = new QuizController(mockService.Object);

            // Act
            var result = await controller.GetQuizzes(topic);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result); //also sends result wrapped inside that ok object
            var returnedQuizzes = Assert.IsAssignableFrom<List<Quiz>>(okResult.Value); //can be assigned to expected type
            Assert.Equal(2, returnedQuizzes.Count); //should be 2 quizzes as defined above
        }

        [Fact]
        public async Task GetQuizzes_WithNoQuizzes_ShouldReturnNotFound()
        {
            // Arrange
            var mockService = new Mock<IQuizService>();
            var topic = "UnknownTopic";

            mockService.Setup(s => s.GetQuizzesByTopic(topic)).Returns(new List<Quiz>()); //establish interface method
            var controller = new QuizController(mockService.Object);

            // Act
            var result = await controller.GetQuizzes(topic);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result); //same type as expected, not found in controller
            var value = notFoundResult.Value;
            var messageProperty = value?.GetType().GetProperty("message"); //access the data and inside the message property and extract the property value of original result
            var actualMessage = messageProperty?.GetValue(value);

            Assert.Equal("No quizzes found", actualMessage); //should be the correct message
        }

        [Fact]
        public async Task GetQuizQuestionsForQuiz_WithExistingQuestions_ShouldReturnOk()
        {
            // Arrange
            var mockService = new Mock<IQuizService>();
            var quizId = 1;
            var questions = new List<QuizQuestion>{ new QuizQuestion { QuizQuestionId = 1, QuestionText = "What is the time complexity of accessing an array element?", QuizId = quizId }, new QuizQuestion { QuizQuestionId = 2, QuestionText = "Which data structure uses LIFO?", QuizId = quizId }};

            mockService.Setup(s => s.GetQuizQuestionsForQuiz(quizId)).Returns(questions); //define interface method
            var controller = new QuizController(mockService.Object);

            // Act
            var result = await controller.GetQuizQuestionsForQuiz(quizId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedQuestions = Assert.IsAssignableFrom<List<QuizQuestion>>(okResult.Value);
            Assert.Equal(2, returnedQuestions.Count); //same count same type
        }

        [Fact]
        public async Task GetQuizQuestionsForQuiz_WithNoQuestions_ShouldReturnNotFound()
        {
            // Arrange
            var mockService = new Mock<IQuizService>();
            var quizId = 999; //random invalid quizid

            mockService.Setup(s => s.GetQuizQuestionsForQuiz(quizId)).Returns(new List<QuizQuestion>()); //return fake empty list
            var controller = new QuizController(mockService.Object); //create real controller instance

            // Act
            var result = await controller.GetQuizQuestionsForQuiz(quizId); //await for async

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);

            var value = notFoundResult.Value;
            var messageProperty = value?.GetType().GetProperty("message"); //extract data and find its property to get that property value from original data as instant type checking wont be valid
            var actualMessage = messageProperty?.GetValue(value);

            Assert.Equal("No quiz questions found", actualMessage); //same message as expected
        }
    }
}