namespace ElectricityData.Api.Models;

public class PaginatedResponse
{
    public List<DailyData> DailyRows { get; set; } = [];
    public int AllPages { get; set; }
}
