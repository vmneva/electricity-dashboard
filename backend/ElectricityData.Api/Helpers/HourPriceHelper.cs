using ElectricityData.Api.Models;

namespace ElectricityData.Api.Helpers
{
    public static class HourPriceHelper
    {
        // Method to resolve the cheapest hour of the day
        public static CheapestHour? GetCheapestHour(List<(DateTime? Hour, double? Price)> data)
        {
            if (data == null || !data.Any(d => d.Price.HasValue))
            {
                return null;
            }

            var (Hour, Price) = data
                .Where(d => d.Price.HasValue)
                .OrderBy(d => d.Price)
                .FirstOrDefault();

            return new CheapestHour
            {
                Hour = Hour?.TimeOfDay ?? null,
                Price = (decimal?)Price ?? null
            };
        }
    }
}