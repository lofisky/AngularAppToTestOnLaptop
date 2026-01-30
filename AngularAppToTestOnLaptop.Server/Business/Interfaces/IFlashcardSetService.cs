using AngularAppToTestOnLaptop.Server.Domain.Entities;

namespace AngularAppToTestOnLaptop.Server.Business.Interfaces
{
    public interface IFlashcardSetService
    {
        List<FlashcardSet> GetFlashcardSetsByTopic(string topic);
        List<Flashcard> GetFlashcardsForSet(int id);
    }
}
