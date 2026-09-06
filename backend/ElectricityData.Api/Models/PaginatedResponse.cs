namespace ElectricityData.Api.Models;

public class PaginatedResponse
{
    public List<DailyData> DailyRows { get; set; } = [];
    public int AllPages { get; set; }
}

public class DailyData
{
    public DateOnly Date { get; set; }
    public decimal? ProductionAmount { get; set; }
    public decimal? ConsumptionAmount { get; set; }
    public decimal? AverageHourlyPrice { get; set; }
    public CheapestHour CheapestHour {get; set; } = new();
}

public class CheapestHour
{
    public TimeSpan? Hour { get; set; }
    public decimal? Price { get; set; }
}
