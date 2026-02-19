using AngularAppToTestOnLaptop.Server.Business.Interfaces;
using AngularAppToTestOnLaptop.Server.Business.Services;
using AngularAppToTestOnLaptop.Server.Database;
using AngularAppToTestOnLaptop.Server.Domain.Interfaces;
using AngularAppToTestOnLaptop.Server.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("https://localhost:63937", "https://dsarena.runasp.net").AllowAnyHeader().AllowAnyMethod();
    });
});

// optional so the json file loading isnt necessary for the running of proj, but also reload if anything changes without system restart like adjusted db string info updates
builder.Configuration.AddJsonFile("appsettings.secret.json", optional: true, reloadOnChange: true); 

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<databaseAccess>();

builder.Services.AddHttpClient<IAIFeedbackService, AIFeedbackService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAIFeedbackService, AIFeedbackService>();


builder.Services.AddScoped<IFlashcardSetRepository, FlashcardSetRepository>();
builder.Services.AddScoped<IFlashcardSetService, FlashcardSetService>();

builder.Services.AddScoped<IQuizRepository, QuizRepository>();
builder.Services.AddScoped<IQuizService, QuizService>();

var app = builder.Build();

app.UseCors("AllowAngularApp");

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
