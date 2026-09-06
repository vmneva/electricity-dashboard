using ElectricityData.Api.Data;
using ElectricityData.Api.Models;
using ElectricityData.Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectricityData.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElectricityController(ElectricityDbContext db) : ControllerBase
    {
        /// <summary>
        /// Fetches db data for the specified date
        /// </summary>
        /// <param name="date">Wanted date in YYYY-MM-DD format</param>
        /// <returns>Daily electricity data for the specified date</returns>
        [HttpGet("daily-data/{date}")]
        public async Task<DailyData> GetDailyElectricityData([FromRoute] DateOnly date)
        {
            var dayData = await db.ElectricityDataRecords
                .Where(d => d.Date == date)
                .ToListAsync();

            List<(DateTime? Hour, double? Price)> hourlyData = [.. dayData.Select(d => (d.StartTime, (double?)d.HourlyPrice))];

            return new DailyData
            {
                Date = date,
                ProductionAmount = (decimal)(dayData.Sum(d => d.ProductionAmount) ?? 0),
                ConsumptionAmount = (decimal)(dayData.Sum(d => d.ConsumptionAmount) ?? 0),
                AverageHourlyPrice = (decimal)(dayData.Average(d => d.HourlyPrice) ?? 0),
                CheapestHour = new CheapestHour
                {
                    Hour = HourPriceHelper.GetCheapestHour(hourlyData)?.Hour ?? null,
                    Price = HourPriceHelper.GetCheapestHour(hourlyData)?.Price ?? null
                }
            };
        }

        /// <summary>
        /// Fetches paginated daily electricity data
        /// </summary>
        /// <param name="pageSize">Determined the number of days to fetch</param>
        /// <param name="pageNumber">Determines which page of data to fetch</param>
        /// <param name="orderDir">Determines the order direction, either "asc" or "desc"</param>
        /// <param name="orderBy">Determines the column to order by</param>
        /// <returns>List of daily electricity data for the specified page with the given page size</returns>
        [HttpGet("daily-data")]
        public async Task<PaginatedResponse> GetPageOfDailyData(int pageSize, int pageNumber, string orderDir = "asc", string orderBy = "date", string search = "")
        {
            // QUERY 1: fetch, aggregate, and order the data to daily rows
            var allDays = db.ElectricityDataRecords
                .GroupBy(d => d.Date)
                .Select(e => new
                {
                    Date = e.Key,
                    ProductionAmount = e.Sum(d => d.ProductionAmount),
                    ConsumptionAmount = e.Sum(d => d.ConsumptionAmount),
                    AverageHourlyPrice = e.Average(d => d.HourlyPrice)
                });

            if (!string.IsNullOrEmpty(search))
            {
                var date = DateOnly.TryParse(search, out var parsedDate) ? parsedDate : (DateOnly?)null;
                allDays = allDays.Where(d => d.Date != null && d.Date.Value == date);
            }

            bool descending = orderDir?.ToLower() == "desc";
            allDays = orderBy.ToLowerInvariant() switch
            {
                "date" => descending ? allDays.OrderByDescending(e => e.Date) : allDays.OrderBy(e => e.Date),
                "productionamount" => descending ? allDays.OrderByDescending(e => e.ProductionAmount) : allDays.OrderBy(e => e.ProductionAmount),
                "consumptionamount" => descending ? allDays.OrderByDescending(e => e.ConsumptionAmount) : allDays.OrderBy(e => e.ConsumptionAmount),
                "averagehourlyprice" => descending ? allDays.OrderByDescending(e => e.AverageHourlyPrice) : allDays.OrderBy(e => e.AverageHourlyPrice),
                _ => allDays
            };

            // calculate the paginated data
            var paginatedRows = await allDays
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // QUERY 2: fetch the data for the requested date
            var dates = paginatedRows.Select(d => d.Date).ToList();
            var hourlyData = await db.ElectricityDataRecords
                .Where(d => dates.Contains(d.Date))
                .ToListAsync();

            var result = new PaginatedResponse();

            foreach (var day in paginatedRows)
            {
                List<(DateTime? Hour, double? Price)> hourlyDataForDay = [.. hourlyData.Where(d => d.Date == day.Date).Select(d => (d.StartTime, d.HourlyPrice))];

                result.DailyRows.Add(new DailyData
                {
                    Date = day.Date ?? DateOnly.MinValue,
                    ProductionAmount = (decimal)(day.ProductionAmount ?? 0),
                    ConsumptionAmount = (decimal)(day.ConsumptionAmount ?? 0),
                    AverageHourlyPrice = (decimal)(day.AverageHourlyPrice ?? 0),
                    CheapestHour = new CheapestHour
                    {
                        Hour = HourPriceHelper.GetCheapestHour(hourlyDataForDay)?.Hour ?? null,
                        Price = HourPriceHelper.GetCheapestHour(hourlyDataForDay)?.Price ?? null
                    }
                });
            }
            result.AllPages = (int)Math.Ceiling((double)allDays.Count() / pageSize);

            return result;
        }
    }
}
