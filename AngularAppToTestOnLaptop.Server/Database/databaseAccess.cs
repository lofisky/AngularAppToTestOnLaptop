using Npgsql;

namespace AngularAppToTestOnLaptop.Server.Database
{
    public class databaseAccess
    {
        private readonly string _connectionString;

        public databaseAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Postgres");
        }

        public NpgsqlConnection GetConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }
    }
}