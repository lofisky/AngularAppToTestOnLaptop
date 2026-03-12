using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Controllers;
using AngularAppToTestOnLaptop.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DSArenaTestProject.Controllers
{
    public class RegisterControllerTests
    {
        [Fact]
        public void Register_WithNewUser_ShouldReturnOk()
        {
            // Arrange
            var mockAuthService = new Mock<IAuthService>();
            var request = new RegisterRequestDTO{ Username = "NewUser", UserEmail = "newuser@test.com", UserPassword = "password123" };

            mockAuthService.Setup(s => s.Register(request.Username, request.UserEmail, request.UserPassword)).Returns(true);
            var controller = new RegisterController(mockAuthService.Object);

            // Act
            var result = controller.Register(request);

            // Assert
            var actionResult = Assert.IsType<ActionResult<bool>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var trueVal = Assert.IsType<bool>(okResult.Value);
            Assert.True(trueVal);
        }

        [Fact]
        public void Register_WithExistingEmail_ShouldReturnBadRequest()
        {
            // Arrange
            var mockAuthService = new Mock<IAuthService>();
            var request = new RegisterRequestDTO
            {
                Username = "ExistingUser",
                UserEmail = "existing@test.com",
                UserPassword = "password123"
            };

            // Mock failed registration due to duplicate email
            mockAuthService
                .Setup(s => s.Register(request.Username, request.UserEmail, request.UserPassword))
                .Returns(false);

            var controller = new RegisterController(mockAuthService.Object);

            // Act
            var result = controller.Register(request);

            // Assert

            var actionResult = Assert.IsType<ActionResult<bool>>(result);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result); //check expected types, step by step extraction

            var value = badRequestResult.Value;
            var messageProperty = value?.GetType().GetProperty("message"); //get object, find property, get property value from original object
            var actualMessage = messageProperty?.GetValue(value);

            Assert.Equal("Email already in use.", actualMessage); //ensure messages are the same
        }
    }
}