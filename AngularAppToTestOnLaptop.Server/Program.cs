using AngularAppToTestOnLaptop.Server.Database;

var builder = WebApplication.CreateBuilder(args);

// optional so the json file loading isnt necessary for the running of proj, but also reload if anything changes without system restart like adjusted db string info updates
builder.Configuration.AddJsonFile("appsettings.secret.json", optional: true, reloadOnChange: true); 

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<databaseAccess>();


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
