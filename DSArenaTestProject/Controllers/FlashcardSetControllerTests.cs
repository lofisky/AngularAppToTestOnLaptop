using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Controllers;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DSArenaTestProject.Controllers
{
    public class FlashcardSetControllerTests
    {
        [Fact]
        public async Task GetFlashcardSets_WithExistingTopic_ShouldReturnOk()
        {
            // Arrange
            var mockService = new Mock<IFlashcardSetService>();
            var topic = "DSA";
            var flashcardSets = new List<FlashcardSet>{ new FlashcardSet { FlashcardSetId = 1, Title = "Arrays Basics", Topic = topic }, new FlashcardSet { FlashcardSetId = 2, Title = "Stacks and Queues", Topic = topic }};

            mockService.Setup(s => s.GetFlashcardSetsByTopic(topic)).Returns(flashcardSets);
            var controller = new FlashcardSetController(mockService.Object);

            // Act
            var result = await controller.GetFlashcardSets(topic);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result); //should return ok from controller
            var returnedSets = Assert.IsAssignableFrom<List<FlashcardSet>>(okResult.Value); //can the obj fit into this type
            Assert.Equal(2, returnedSets.Count); //correct num of sets returned after confirming type
        }

        [Fact]
        public async Task GetFlashcardSets_WithNoSets_ShouldReturnNotFound()
        {
            // Arrange
            var mockService = new Mock<IFlashcardSetService>();
            var topic = "UnknownTopic";

            mockService.Setup(s => s.GetFlashcardSetsByTopic(topic)).Returns(new List<FlashcardSet>()); //return empty flashcard sets list
            var controller = new FlashcardSetController(mockService.Object);

            // Act
            var result = await controller.GetFlashcardSets(topic);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);

            var value = notFoundResult.Value;
            var messageProperty = value?.GetType().GetProperty("message"); //use reflection to reflect the type of the object back, to access its properties as dynamic is blocked from guessing at runtime because of the internal preventions of different assemblies/projects, but asking the obj explicitly for its type works
            var actualMessage = messageProperty?.GetValue(value); //message could possibly be null if there is no message, 

            Assert.Equal("No flashcard sets found", actualMessage); //check if the message is the same 
        }


        [Fact]
        public async Task GetFlashcardsForSet_WithExistingFlashcards_ShouldReturnOk()
        {
            // Arrange
            var mockService = new Mock<IFlashcardSetService>();
            var setId = 1;
            var flashcards = new List<Flashcard>{new Flashcard { FlashcardId = 1, FrontText = "What is an array?", BackText = "A collection of elements stored in contiguous memory", FlashcardSetId = setId, FlashcardSetTitle = "Arrays Basics" }, new Flashcard { FlashcardId = 2, FrontText = "How do you access the 3rd element of an array?", BackText = "array[2]", FlashcardSetId = setId, FlashcardSetTitle = "Arrays Basics" }, new Flashcard { FlashcardId = 3, FrontText = "What is the time complexity of accessing an element in an array?", BackText = "O(1)", FlashcardSetId = setId, FlashcardSetTitle = "Arrays Basics" }};

            mockService.Setup(s => s.GetFlashcardsForSet(setId)).Returns(flashcards);
            var controller = new FlashcardSetController(mockService.Object);

            // Act
            var result = await controller.GetFlashcardsForSet(setId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedFlashcards = Assert.IsAssignableFrom<List<Flashcard>>(okResult.Value);
            Assert.Equal(3, returnedFlashcards.Count);
        }

        [Fact]
        public async Task GetFlashcardsForSet_WithNoFlashcards_ShouldReturnNotFound()
        {
            // Arrange
            var mockService = new Mock<IFlashcardSetService>();
            var setId = 999;

            mockService.Setup(s => s.GetFlashcardsForSet(setId)).Returns(new List<Flashcard>()); //empty list
            var controller = new FlashcardSetController(mockService.Object);

            // Act
            var result = await controller.GetFlashcardsForSet(setId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);

            var value = notFoundResult.Value; //get internal obj containing msg
            var messageProperty = value?.GetType().GetProperty("message"); //GetProperty is always called on a type, so get this thing in the object
            var actualMessage = messageProperty?.GetValue(value); //read the value of message from that specific object instance

            Assert.Equal("No flashcards found", actualMessage);
        }
    }
}