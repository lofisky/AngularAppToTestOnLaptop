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
            Console.WriteLine($"Querying for topic: {topic}"); //logging topic for query
            using var connection = _dbAccess.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("SELECT title, description, topic, is_pre_built FROM flashcard_set WHERE LOWER(topic) = LOWER(@topic)", connection);
            command.Parameters.AddWithValue("@topic", topic);

            using var reader = command.ExecuteReader();

            var flashcardSets = new List<FlashcardSet>();

            while (reader.Read()) {
                flashcardSets.Add(new FlashcardSet
                {
                    Title = reader.GetString(reader.GetOrdinal("title")),
                    Description = reader.GetString(reader.GetOrdinal("description")),
                    Topic = reader.GetString(reader.GetOrdinal("topic")),
                    IsPreBuilt = reader.GetBoolean(reader.GetOrdinal("is_pre_built")),
                });
            }

            Console.WriteLine($"Found {flashcardSets.Count} flashcard sets for topic: {topic}"); //loggin num of flashcards found
            return flashcardSets;
        }
    }
}
