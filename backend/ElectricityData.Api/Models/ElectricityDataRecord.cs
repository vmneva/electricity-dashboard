using System.Text.Json.Serialization;

namespace ElectricityData.Api.Models;
/*
 * Represents a single record of electricity data from the database.
 */
public class ElectricityDataRecord
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("date")]
    public DateOnly? Date { get; set; }

    [JsonPropertyName("startTime")]
    public DateTime? StartTime { get; set; }

    [JsonPropertyName("productionAmount")]
    public double? ProductionAmount { get; set; }

    [JsonPropertyName("consumptionAmount")]
    public double? ConsumptionAmount { get; set; }

    [JsonPropertyName("hourlyPrice")]
    public double? HourlyPrice { get; set; }
}