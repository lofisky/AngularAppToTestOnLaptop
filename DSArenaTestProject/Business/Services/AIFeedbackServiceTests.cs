using AngularAppToTestOnLaptop.Server.Business.Services;
using Microsoft.Extensions.Configuration;

namespace DSArenaTestProject.Business.Services
{
    public class AIFeedbackServiceTests
    {
        [Fact]
        public async Task GetFeedbackAsync_ShouldReturnString()
        {
            var httpClient = new HttpClient(); //just a placeholder, real calls won't work here
            var config = new ConfigurationBuilder().AddInMemoryCollection(new System.Collections.Generic.Dictionary<string, string?>
                {
                    { "HuggingFace:ApiKey", "fake-key" } //to give configuration builder what it needs to build
                })
                .Build();

            var service = new AIFeedbackService(httpClient, config);
            var result = await service.GetFeedbackAsync("Hello world");
            Assert.IsType<string>(result); //check that it returns a string
        }
    }
}