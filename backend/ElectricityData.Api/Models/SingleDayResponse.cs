namespace ElectricityData.Api.Models;

public class SingleDayData
{
    public DateOnly Date { get; set; }
    public string? ProductionTotal { get; set; }
    public string? ConsumptionTotal { get; set; }
    public decimal AverageHourlyPrice { get; set; }
    public List<decimal?> AllHourlyPrices { get; set; } = new();

}
