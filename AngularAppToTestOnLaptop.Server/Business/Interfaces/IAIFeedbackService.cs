namespace AngularAppToTestOnLaptop.Server.Business.Interfaces
{
    public interface IAIFeedbackService
    {
        Task<string> GetFeedbackAsync(string inputText);
    }
}
