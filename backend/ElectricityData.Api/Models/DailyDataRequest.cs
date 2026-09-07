namespace ElectricityData.Api.Models;

/*
 * Represents a request sent to the API, including pagination, sorting, and filtering options.
 */
public class DailyDataRequest
{
    public Pagination Pagination { get; set; } = new();
    public SortOptions Sort { get; set; } = new();
    public FilterOptions Filters { get; set; } = new();
}