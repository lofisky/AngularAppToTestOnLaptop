namespace AngularAppToTestOnLaptop.Server.Domain.Entities
{
    public class FlashcardSet
    {
        public int FlashcardSetId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsPreBuilt { get; set; }
        public string Topic{ get; set; }
        public int UserId { get; set; }
    }
}
