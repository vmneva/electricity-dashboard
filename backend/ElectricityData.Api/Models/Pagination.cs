namespace ElectricityData.Api.Models;
/*
 * Represents pagination options for querying data.
 */
public class Pagination
{
    public int PageSize { get; set; }
    public int PageNumber { get; set; }
}