using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace AngularAppToTestOnLaptop.Server.Business.Services
{
    public class AIFeedbackService : IAIFeedbackService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        public AIFeedbackService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["HuggingFace:ApiKey"];
        }

        public async Task<string> GetFeedbackAsync(string inputText)
        {
            var url = "https://router.huggingface.co/v1/chat/completions";

            var payload = new { model = "Qwen/Qwen2.5-7B-Instruct", messages = new[] { new { role = "user", content = inputText } } };
            var jsonPayload = JsonSerializer.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            try
            {
                var response = await _httpClient.PostAsync(url, content);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    return $"Error: { response.StatusCode} - {error}";
                }

                using var jsonDoc = JsonDocument.Parse(responseString);
                var assistantMessage = jsonDoc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

                return assistantMessage;
            }
            catch (Exception ex) {
                return "Error connecting to huggingface :CC" + ex;
            }
        }
    }
}

