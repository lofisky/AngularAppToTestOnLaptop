using AngularAppToTestOnLaptop.Server.Business.Services;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;
using Moq;

namespace DSArenaTestProject.Business.Services
{
    public class FlashcardSetServiceTests
    {
        [Fact]
        public void GetFlashcardSetsByTopic_ShouldReturnFlashcardSets()
        {
            // Arrange
            var mockRepo = new Mock<IFlashcardSetRepository>();
            var topic = "Two pointers";
            var expectedSets = new List<FlashcardSet>
            { new FlashcardSet { FlashcardSetId = 1, Topic = topic, Title = "Two Pointers Beginner" }, new FlashcardSet { FlashcardSetId = 2, Topic = topic, Title = "Two Pointers Hard" }};

            mockRepo.Setup(r => r.GetFlashcardSetsByTopic(topic)).Returns(expectedSets); //pretend to return these fake sets
            var service = new FlashcardSetService(mockRepo.Object);

            // Act
            var result = service.GetFlashcardSetsByTopic(topic);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.All(result, s => Assert.Equal(topic, s.Topic)); //ensure topics match and all the flashcard sets are taken
        }

        [Fact]
        public void GetFlashcardsForSet_ShouldReturnFlashcards()
        {
            // Arrange
            var mockRepo = new Mock<IFlashcardSetRepository>();
            var setId = 1;
            var expectedFlashcards = new List<Flashcard> { new Flashcard { FlashcardId = 1, FrontText = "What other types of pointing algorithms are there?", BackText = "3 pointers", FlashcardSetId = setId, FlashcardSetTitle = "Algebra Basics" }, new Flashcard { FlashcardId = 2, FrontText = "What is the time complexity of the two pointers algorithm?", BackText = "O(n)", FlashcardSetId = setId, FlashcardSetTitle = "Two Pointers Easy" }};

            mockRepo.Setup(r => r.GetFlashcardsForSet(setId)).Returns(expectedFlashcards);
            var service = new FlashcardSetService(mockRepo.Object);

            // Act
            var result = service.GetFlashcardsForSet(setId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Contains(result, f => f.FrontText == "What other types of pointing algorithms are there?" && f.BackText == "3 pointers");
        }

        [Fact]
        public void GetFlashcardSetsByTopic_WithNoSets_ShouldReturnEmptyList()
        {
            // Arrange
            var mockRepo = new Mock<IFlashcardSetRepository>();
            var topic = "UnknownTopic";

            mockRepo.Setup(r => r.GetFlashcardSetsByTopic(topic)).Returns(new List<FlashcardSet>()); // empty list, but return this as its expected by method

            var service = new FlashcardSetService(mockRepo.Object);
            // Act
            var result = service.GetFlashcardSetsByTopic(topic);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result); //should exist but should be empty
        }

        [Fact]
        public void GetFlashcardsForSet_WithNoFlashcards_ShouldReturnEmptyList()
        {
            // Arrange
            var mockRepo = new Mock<IFlashcardSetRepository>();
            var setId = 999; //non-existing set

            mockRepo.Setup(r => r.GetFlashcardsForSet(setId)).Returns(new List<Flashcard>()); //empty list again as expected but this time for flashcards
            var service = new FlashcardSetService(mockRepo.Object);

            // Act
            var result = service.GetFlashcardsForSet(setId);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result); //should exist but be empty list of flashcards
        }
    }
}