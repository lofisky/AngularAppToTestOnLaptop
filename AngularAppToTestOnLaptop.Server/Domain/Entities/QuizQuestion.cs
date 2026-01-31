namespace AngularAppToTestOnLaptop.Server.Domain.Entities
{
    public class QuizQuestion
    {
        public int QuizQuestionId { get; set; }
        public string QuestionText { get; set; }
        public string Options { get; set; }
        public int CorrectOptionsIndex { get; set; }
        public int QuizId { get; set; }
        public string QuizTitle { get; set; }
    }
}
