namespace ElectricityData.Api.Models;
/*
 * Represents the response for a single day's electricity data.
 */
public class SingleDayData
{
    public DateOnly Date { get; set; }
    public string? ProductionTotal { get; set; }
    public string? ConsumptionTotal { get; set; }
    public decimal AverageHourlyPrice { get; set; }
    public List<decimal?> AllHourlyPrices { get; set; } = new();

}
