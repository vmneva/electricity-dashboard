using ElectricityData.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var db = builder.Configuration.GetConnectionString("DbConnection")
    ?? throw new InvalidOperationException("DbConnection is missing from configuration.");

builder.Services.AddDbContext<ElectricityDbContext>(options =>
    options.UseNpgsql(db));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// smoke test to check database connectivity
app.MapGet("/db-test", async (ElectricityDbContext db) =>
{
    try
    {
        var testData = await db.ElectricityDataRecords.FirstOrDefaultAsync();

        return Results.Ok(new { connected = true, testData });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
