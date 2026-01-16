using AngularAppToTestOnLaptop.Server.Database;
using AngularAppToTestOnLaptop.Server.Domain.Entities;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;
using Npgsql;

namespace AngularAppToTestOnLaptop.Server.Persistence
{
    public class UserRepository : IUserRepository
    {
        private readonly databaseAccess _db;

        public UserRepository(databaseAccess db)
        {
            _db = db;
        }

        public User? Get(string email, string password) {
            using var connection = _db.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("SELECT user_id, username, email, password_hash, role FROM users WHERE email = @email AND password_hash = @password", connection);
            
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@password", password);

            using var reader = command.ExecuteReader();

            if (!reader.Read()) return null;

            var role = reader.GetString(reader.GetOrdinal("role"));

            if (role.ToLower() == "admin")
            {
                return new Admin
                {
                    UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                    Username = reader.GetString(reader.GetOrdinal("username")),
                    Email = reader.GetString(reader.GetOrdinal("email")),
                    Password = reader.GetString(reader.GetOrdinal("password_hash"))
                };
            }
            return new User
            {
                UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                Username = reader.GetString(reader.GetOrdinal("username")),
                Email = reader.GetString(reader.GetOrdinal("email")),
                Password = reader.GetString(reader.GetOrdinal("password_hash"))
            };
        }

        public User? GetUserByEmail(string email)
        {
            using var connection = _db.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("SELECT user_id, username, email, password_hash, role FROM users WHERE email = @email", connection);

            command.Parameters.AddWithValue("@email", email);

            using var reader = command.ExecuteReader();

            if (!reader.Read()) return null;

            return new User
            {
                UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                Username = reader.GetString(reader.GetOrdinal("username")),
                Email = reader.GetString(reader.GetOrdinal("email")),
                Password = reader.GetString(reader.GetOrdinal("password_hash"))
            };
        }

        public User CreateUser(string username, string userEmail, string userPassword)
        {
            var existingUser = GetUserByEmail(userEmail);
            if (existingUser != null) return null;
            
            using var connection = _db.GetConnection();
            connection.Open();

            using var command = new NpgsqlCommand("INSERT INTO users (username, email, password_hash, role) VALUES (@username, @userEmail, @userPassword, 'user')", connection);

            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@userEmail", userEmail);
            command.Parameters.AddWithValue("@userPassword", userPassword);

            var result = command.ExecuteNonQuery();

            if(result > 0)
            {
                return new User
                {
                    Username = username, 
                    Email = userEmail,
                    Password = userPassword,
                    Role = "user"
                };
            }
            return null;
        }
    }
}
