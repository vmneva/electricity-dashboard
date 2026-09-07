// Model representing filter options for querying electricity data
namespace ElectricityData.Api.Models;
/*
 * Represents filter options for querying data.
 */
public class FilterOptions
{
    public string Date { get; set; } = "";
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
}
