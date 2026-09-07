using ElectricityData.Api.Helpers;

namespace ElectricityData.Api.Tests;

// Unit test for the HourPriceHelper class
public class HourPriceHelperTest
{
    [Fact]
    public void GetCheapestHour_ReturnsHourWithLowestPrice()
    {
        var testData = new List<(DateTime? Hour, double? Price)>
        {
            (new DateTime(2024, 6, 1, 1, 0, 0), 15.21),
            (new DateTime(2024, 6, 1, 1, 0, 0), 10.01),
            (new DateTime(2024, 6, 1, 2, 0, 0), 20.11)
        };

        var output = HourPriceHelper.GetCheapestHour(testData);

        Assert.NotNull(output);
        Assert.Equal(TimeSpan.FromHours(1), output.Hour);
        Assert.Equal(10.01m, output.Price);
    }

    [Fact]
    public void GetCheapestHour_CanHandleListWithNullValues()
    {
        var testDataWithNulls = new List<(DateTime? Hour, double? Price)>
        {
            (null, 5.00),
            (new DateTime(2024, 6, 1, 0, 0, 0), 10.01),
            (new DateTime(2024, 6, 1, 2, 0, 0), null)
        };

        var output = HourPriceHelper.GetCheapestHour(testDataWithNulls);

        Assert.NotNull(output);
        Assert.Null(output.Hour);
        Assert.Equal(5m, output.Price);
    }

    [Fact]
    public void GetCheapestHour_ReturnsNullWhenListIsEmpty()
    {
        var emptyTestData = new List<(DateTime? Hour, double? Price)>();

        var output = HourPriceHelper.GetCheapestHour(emptyTestData);

        Assert.Null(output);
    }

    [Fact]
    public void GetCheapestHour_ReturnsNullWhenWholeListIsNull()
    {
        List<(DateTime? Hour, double? Price)> nullTestData = null!;

        var output = HourPriceHelper.GetCheapestHour(nullTestData);

        Assert.Null(output);
    }
}