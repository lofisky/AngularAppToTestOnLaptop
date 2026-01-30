using AngularAppToTestOnLaptop.Server.Domain.Entities;

namespace AngularAppToTestOnLaptop.Server.Domain.Interfaces
{
    public interface IFlashcardSetRepository
    {
        List<FlashcardSet> GetFlashcardSetsByTopic(string topic);
        List<Flashcard> GetFlashcardsForSet(int id);
    }
}
