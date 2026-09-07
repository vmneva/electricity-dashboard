namespace ElectricityData.Api.Models;
/*
 * Represents a paginated response of the daily electricity data.
 */
public class PaginatedData
{
    public List<DailyData> DailyRows { get; set; } = [];
    public int AllPages { get; set; }
}

public class DailyData
{
    public DateOnly Date { get; set; }
    public string? ProductionAmount { get; set; }
    public string? ConsumptionAmount { get; set; }
    public decimal? AverageHourlyPrice { get; set; }
    public CheapestHour CheapestHour {get; set; } = new();
}

public class CheapestHour
{
    public TimeSpan? Hour { get; set; }
    public decimal? Price { get; set; }
}
