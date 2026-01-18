using AngularAppToTestOnLaptop.Server.Domain.Entities;

namespace AngularAppToTestOnLaptop.Server.Business.Interfaces
{
    public interface IAuthService
    {
        User? Login(string email, string password);
        bool Register(string username, string userEmail, string userPassword);
    }
}
