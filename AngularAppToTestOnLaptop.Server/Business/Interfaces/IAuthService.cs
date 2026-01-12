namespace AngularAppToTestOnLaptop.Server.Business.Interfaces
{
    public interface IAuthService
    {
        bool Login(string email, string password);
    }
}
