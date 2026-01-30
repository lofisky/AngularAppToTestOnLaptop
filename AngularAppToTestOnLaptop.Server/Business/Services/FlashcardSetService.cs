using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;

namespace AngularAppToTestOnLaptop.Server.Business.Services
{
    public class FlashcardSetService : IFlashcardSetService
    {
        private readonly IFlashcardSetRepository _flashcardSetRepository;

        public FlashcardSetService(IFlashcardSetRepository flashcardSetRepository) {
            _flashcardSetRepository = flashcardSetRepository;
        }

        public List<FlashcardSet> GetFlashcardSetsByTopic(string topic) 
        {
            return _flashcardSetRepository.GetFlashcardSetsByTopic(topic);
        }
    }
}
