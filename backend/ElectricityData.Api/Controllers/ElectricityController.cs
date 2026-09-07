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
        public async Task<SingleDayData> GetDailyElectricityData([FromRoute] DateOnly date)
        {
            var dayData = await db.ElectricityDataRecords
                .Where(d => d.Date == date)
                .ToListAsync();

            List<(DateTime? Hour, double? Price)> hourlyData = [.. dayData.Select(d => (d.StartTime, (double?)d.HourlyPrice))];

            return new SingleDayData
            {
                Date = date,
                ProductionTotal = dayData.Sum(d => d.ProductionAmount).ToString(),
                ConsumptionTotal = dayData.Sum(d => d.ConsumptionAmount).ToString(),
                AverageHourlyPrice = (decimal)(dayData.Average(d => d.HourlyPrice) ?? 0),
                AllHourlyPrices = [.. hourlyData.Select(h => (decimal?)(h.Price ?? 0))],
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
        public async Task<PaginatedData> GetPageOfDailyData([FromQuery] DailyDataRequest req)
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

            // apply given search parameter if any
            if (!string.IsNullOrEmpty(req.Filters?.Date))
            {
                var date = DateOnly.TryParse(req.Filters.Date, out var parsedDate) ? parsedDate : (DateOnly?)null;
                allDays = allDays.Where(d => d.Date != null && d.Date.Value == date);
            }

            // apply given filters if any
            if (req.Filters != null)
            {
                if (req.Filters.StartDate.HasValue)
                {
                    allDays = allDays.Where(d => d.Date != null && d.Date.Value >= req.Filters.StartDate.Value);
                }
                if (req.Filters.EndDate.HasValue)
                {
                    allDays = allDays.Where(d => d.Date != null && d.Date.Value <= req.Filters.EndDate.Value);
                }
                if (req.Filters.MinPrice.HasValue)
                {
                    allDays = allDays.Where(d => d.AverageHourlyPrice != null && d.AverageHourlyPrice >= req.Filters.MinPrice.Value);
                }
                if (req.Filters.MaxPrice.HasValue)
                {
                    allDays = allDays.Where(d => d.AverageHourlyPrice != null && d.AverageHourlyPrice <= req.Filters.MaxPrice.Value);
                }
            }

            bool descending = req.Sort?.OrderDir?.ToLower() == "desc";
            allDays = req.Sort?.OrderBy?.ToLowerInvariant() switch
            {
                "date" => descending ? allDays.OrderByDescending(e => e.Date) : allDays.OrderBy(e => e.Date),
                "productionamount" => descending ? allDays.OrderByDescending(e => e.ProductionAmount) : allDays.OrderBy(e => e.ProductionAmount),
                "consumptionamount" => descending ? allDays.OrderByDescending(e => e.ConsumptionAmount) : allDays.OrderBy(e => e.ConsumptionAmount),
                "averagehourlyprice" => descending ? allDays.OrderByDescending(e => e.AverageHourlyPrice) : allDays.OrderBy(e => e.AverageHourlyPrice),
                _ => allDays
            };

            // calculate the paginated data
            var paginatedRows = await allDays
                .Skip((req.Pagination.PageNumber - 1) * req.Pagination.PageSize)
                .Take(req.Pagination.PageSize)
                .ToListAsync();

            // QUERY 2: fetch the data for the requested date
            var dates = paginatedRows.Select(d => d.Date).ToList();
            var hourlyData = await db.ElectricityDataRecords
                .Where(d => dates.Contains(d.Date))
                .ToListAsync();

            var result = new PaginatedData();

            foreach (var day in paginatedRows)
            {
                List<(DateTime? Hour, double? Price)> hourlyDataForDay = [.. hourlyData.Where(d => d.Date == day.Date).Select(d => (d.StartTime, d.HourlyPrice))];

                result.DailyRows.Add(new DailyData
                {
                    Date = day.Date ?? DateOnly.MinValue,
                    ProductionAmount = day.ProductionAmount.ToString(),
                    ConsumptionAmount = day.ConsumptionAmount.ToString(),
                    AverageHourlyPrice = (decimal)(day.AverageHourlyPrice ?? 0),
                    CheapestHour = new CheapestHour
                    {
                        Hour = HourPriceHelper.GetCheapestHour(hourlyDataForDay)?.Hour ?? null,
                        Price = HourPriceHelper.GetCheapestHour(hourlyDataForDay)?.Price ?? null
                    }
                });
            }
            result.AllPages = (int)Math.Ceiling((double)allDays.Count() / req.Pagination.PageSize);

            return result;
        }
    }
}
