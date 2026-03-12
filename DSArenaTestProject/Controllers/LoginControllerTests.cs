using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Controllers;
using AngularAppToTestOnLaptop.Server.DTOs;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DSArenaTestProject.Controllers
{
    public class LoginControllerTests
    {
        [Fact]
        public void Login_WithValidCredentials_ShouldReturnOk()
        {
            // Arrange
            var mockAuthService = new Mock<IAuthService>();
            var request = new LoginRequestDTO { Email = "user@test.com", Password = "password123" };
            var user = new User { Username = "TestUser", Email = "user@test.com" };

            mockAuthService.Setup(s => s.Login(request.Email, request.Password)).Returns(user);

            var controller = new LoginController(mockAuthService.Object);

            // Act
            var result = controller.Login(request);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDTO>>(result); //ensure result is expected type

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result); //extract the data, result being http codes and value being data returned, can use type here
            var returnedUser = Assert.IsType<UserDTO>(okResult.Value);
            Assert.Equal(user.Username, returnedUser.Username);
            Assert.Equal(user.Email, returnedUser.Email);
        }

        [Fact]
        public void Login_WithInvalidCredentials_ShouldReturnUnauthorized()
        {
            // Arrange
            var mockAuthService = new Mock<IAuthService>(); //create new mock that implements interface
            var request = new LoginRequestDTO { Email = "wrong@test.com", Password = "incorrect" }; //fake dto of login request

            mockAuthService.Setup(s => s.Login(request.Email, request.Password)).Returns((User)null); //define behaviour for interface driven method
            var controller = new LoginController(mockAuthService.Object); //controller controls flow of data and so calls methods which calls onto service

            // Act
            var result = controller.Login(request); //what login attempt output is

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDTO>>(result);
            Assert.IsType<UnauthorizedResult>(actionResult.Result); //verifies that obj is of given type
        }
    }
}