using AngularAppToTestOnLaptop.Server.Business.Services;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;
using Moq;

namespace DSArenaTestProject.Business.Services
{
    public class AuthServiceTests
    {
        [Fact]
        public void Login_WithValidCredentials_ShouldReturnUser()
        {
            // Arrange
            var mockRepo = new Mock<IUserRepository>();
            var email = "test@example.com";
            var password = "password123"; //fake user data to be created
            var expectedUser = new User { UserId = 1, Username = "TestUser", Email = email };

            mockRepo.Setup(r => r.Get(email, password)).Returns(expectedUser); //when this method is called do this
            var authService = new AuthService(mockRepo.Object); //expected in the constructor

            // Act
            var result = authService.Login(email, password);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedUser.Email, result?.Email);
            Assert.Equal(expectedUser.Username, result?.Username); //ensure correct credentials
        }

        [Fact]
        public void Login_WithInvalidCredentials_ShouldReturnNull()
        {
            // Arrange
            var mockRepo = new Mock<IUserRepository>();
            var email = "wrong@example.com"; 
            var password = "wrongpassword";

            mockRepo.Setup(r => r.Get(email, password)).Returns((User?)null); //return the null as a user type with casting so its a nullable user which is as expected
            var authService = new AuthService(mockRepo.Object);

            // Act
            var result = authService.Login(email, password);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void Register_WhenUserCreated_ShouldReturnTrue()
        {
            // Arrange
            var mockRepo = new Mock<IUserRepository>();
            var username = "NewUser";
            var email = "newuser@example.com";
            var password = "newpassword";

            mockRepo.Setup(r => r.CreateUser(username, email, password)).Returns(new User { UserId = 2, Username = username, Email = email }); //when this method is called do this
            var authService = new AuthService(mockRepo.Object); //fake user above

            // Act
            var result = authService.Register(username, email, password);

            // Assert
            Assert.True(result); //should work
        }

        [Fact]
        public void Register_WhenUserNotCreated_ShouldReturnFalse()
        {
            // Arrange
            var mockRepo = new Mock<IUserRepository>();
            var username = "FailUser";
            var email = "fail@example.com";
            var password = "failpassword";

            mockRepo.Setup(r => r.CreateUser(username, email, password)).Returns((User?)null); //pretend user creation failed and return null
            var authService = new AuthService(mockRepo.Object);

            // Act
            var result = authService.Register(username, email, password); //shouldnt work

            // Assert
            Assert.False(result);
        }
    }
}