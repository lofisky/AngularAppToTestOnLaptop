using AngularAppToTestOnLaptop.Server.Domain.Entities;

namespace AngularAppToTestOnLaptop.Server.Domain.Interfaces
{
    public interface IUserRepository
    {
        User? Get(string email, string password);
    }
}
