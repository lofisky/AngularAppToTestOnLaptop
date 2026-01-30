using AngularAppToTestOnLaptop.Server.Database;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;
using Npgsql;

namespace AngularAppToTestOnLaptop.Server.Persistence
{
    public class FlashcardSetRepository : IFlashcardSetRepository
    {
        private readonly databaseAccess _dbAccess;

        public FlashcardSetRepository(databaseAccess dbAccess)
        {
            _dbAccess = dbAccess;
        }

        public List<FlashcardSet> GetFlashcardSetsByTopic(string topic) {
            Console.WriteLine($"querying for topic: {topic}"); //logging topic for query
            using var connection = _dbAccess.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("SELECT flashcard_set_id, title, description, topic, is_pre_built FROM flashcard_set WHERE LOWER(topic) = LOWER(@topic)", connection);
            command.Parameters.AddWithValue("@topic", topic);

            using var reader = command.ExecuteReader();

            var flashcardSets = new List<FlashcardSet>();

            while (reader.Read()) {
                flashcardSets.Add(new FlashcardSet
                {
                    FlashcardSetId = reader.GetInt32(reader.GetOrdinal("flashcard_set_id")),
                    Title = reader.GetString(reader.GetOrdinal("title")),
                    Description = reader.GetString(reader.GetOrdinal("description")),
                    Topic = reader.GetString(reader.GetOrdinal("topic")),
                    IsPreBuilt = reader.GetBoolean(reader.GetOrdinal("is_pre_built")),
                });
            }

            Console.WriteLine($"found {flashcardSets.Count} flashcard sets for topic: {topic}"); //loggin num of flashcards found
            return flashcardSets;
        }

        public List<Flashcard> GetFlashcardsForSet(int flashcardSetId)
        {
            using var connection = _dbAccess.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("SELECT flashcard.front_text, flashcard.back_text, flashcard.flashcard_set_id, flashcard_set.title FROM flashcard JOIN flashcard_set ON flashcard.flashcard_set_id = flashcard_set.flashcard_set_id WHERE flashcard.flashcard_set_id = @flashcardSetId", connection);
            command.Parameters.AddWithValue("@flashcardSetId", flashcardSetId);

            using var reader = command.ExecuteReader();

            var flashcards = new List<Flashcard>();

            while (reader.Read())
            {
                flashcards.Add(new Flashcard
                {
                    FrontText = reader.GetString(reader.GetOrdinal("front_text")),
                    BackText = reader.GetString(reader.GetOrdinal("back_text")),
                    FlashcardSetId = reader.GetInt32(reader.GetOrdinal("flashcard_set_id")),
                    FlashcardSetTitle = reader.GetString(reader.GetOrdinal("title"))
                });
            }

            return flashcards;
        }
    }
}
