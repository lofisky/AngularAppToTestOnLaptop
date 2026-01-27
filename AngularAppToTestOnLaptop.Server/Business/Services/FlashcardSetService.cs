using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Persistence;

namespace AngularAppToTestOnLaptop.Server.Business.Services
{
    public class FlashcardSetService : IFlashcardSetService
    {
        private readonly FlashcardSetRepository _flashcardSetRepository;

        public FlashcardSetService(FlashcardSetRepository flashcardSetRepository) {
            _flashcardSetRepository = flashcardSetRepository;
        }

        public List<FlashcardSet> GetFlashcardSetsByTopic(string topic) 
        {
            return _flashcardSetRepository.GetFlashcardSetsByTopic(topic);
        }
    }
}
