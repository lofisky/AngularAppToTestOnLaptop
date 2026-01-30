namespace AngularAppToTestOnLaptop.Server.Domain.Entities
{
    public class Flashcard
    {
        public int FlashcardId { get; set; }
        public string FrontText { get; set; }
        public string BackText { get; set; }
        public int FlashcardSetId { get; set; }
    }
}
