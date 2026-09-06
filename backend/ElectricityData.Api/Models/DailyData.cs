namespace ElectricityData.Api.Models;

public class SingleDayData
{
    public DateOnly Date { get; set; }
    public decimal? ProductionTotal { get; set; }
    public decimal? ConsumptionTotal { get; set; }
    public decimal? AverageHourlyPrice { get; set; }
    public List<decimal> AllHourlyPrices { get; set; } = new();
    public List<decimal> ProductionAmounts { get; set; } = new();
    public List<decimal> ConsumptionAmounts { get; set; } = new();

}
