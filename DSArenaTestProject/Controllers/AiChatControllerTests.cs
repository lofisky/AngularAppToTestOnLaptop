using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Controllers;
using AngularAppToTestOnLaptop.Server.DTOs.AiDTOS;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DSArenaTestProject.Controllers
{
    public class AiChatControllerTests
    {
        [Fact]
        public async Task SendQuery_ValidMessage_ShouldReturnOk()
        {
            // Arrange
            var mockService = new Mock<IAIFeedbackService>();
            var query = new AskAiRequestDTO { userMessage = "Hello" };
            var aiResponse = "Hey, how can I help?";

            mockService.Setup(s => s.GetFeedbackAsync(query.userMessage)).ReturnsAsync(aiResponse); //return fake ai response

            var controller = new AiChatController(mockService.Object); //needs to have the iaifeedbackservice in constructor

            // Act
            var result = await controller.SendQuery(query);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result); //okobjectresult represents http 200 ok so ensure it succeeded
            var responseDTO = Assert.IsType<AskAiResponseDTO>(okResult.Value); //inside the ok result is the ai response as in the component where the ai response is passed into it
            Assert.Equal(aiResponse, responseDTO.aiResponse); //should be same ai response so it went through the sendquery
        }

        [Fact]
        public async Task SendQuery_ServiceReturnsError_ShouldReturnBadRequest()
        {
            // Arrange
            var mockService = new Mock<IAIFeedbackService>();
            var query = new AskAiRequestDTO { userMessage = "Trigger Error" };
            var errorMessage = "Error, something went wrong";

            mockService.Setup(s => s.GetFeedbackAsync(query.userMessage)).ReturnsAsync(errorMessage);
            var controller = new AiChatController(mockService.Object);

            // Act
            var result = await controller.SendQuery(query);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result); //match badrequest in component with the no query provided message
            Assert.Equal(errorMessage, badRequest.Value);
        }
    }
}