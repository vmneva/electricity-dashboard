namespace ElectricityData.Api.Models;

public class DailyDataRequest
{
    public Pagination Pagination { get; set; } = new();
    public SortOptions Sort { get; set; } = new();
    public FilterOptions Filters { get; set; } = new();
}