using AngularAppToTestOnLaptop.Server.Domain.Entities;

namespace AngularAppToTestOnLaptop.Server.Domain.Interfaces
{
    public interface IUserRepository
    {
        User? Get(string email, string password);
        User? GetUserByEmail(string email);
        User CreateUser(string username, string userEmail, string userPassword);
    }
}
