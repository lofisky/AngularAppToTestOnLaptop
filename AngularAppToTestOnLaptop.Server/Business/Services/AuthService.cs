using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;

namespace AngularAppToTestOnLaptop.Server.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User? Login(string email, string password)
        {
            return _userRepository.Get(email, password);
        }

        public bool Register(string username, string userEmail, string userPassword)
        {
           return _userRepository.CreateUser(username, userEmail, userPassword) != null;
        }
    }
}
