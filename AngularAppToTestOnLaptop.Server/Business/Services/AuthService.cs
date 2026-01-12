using AngularAppToTestOnLaptop.Server.Business.Interfaces;
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

        public bool Login(string email, string password)
        {
            return _userRepository.Get(email, password) != null;
        }
    }
}
