namespace ElectricityData.Api.Models;
/*
 * Represents sorting options for querying data.
 */
public class SortOptions
{
    public string OrderDir { get; set; } = "asc";
    public string OrderBy { get; set; } = "date";
}