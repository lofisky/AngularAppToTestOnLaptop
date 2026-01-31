namespace AngularAppToTestOnLaptop.Server.Domain.Entities
{
    public class Quiz
    {
        public int QuizId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Difficulty { get; set; }
        public bool IsPreBuilt { get; set; }
        public string Topic { get; set; }
        public int UserId { get; set; }
    }
}
