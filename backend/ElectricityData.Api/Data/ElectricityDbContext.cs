using Microsoft.EntityFrameworkCore;
using ElectricityData.Api.Models;

namespace ElectricityData.Api.Data;
/*
 * Class for the Entity Framework database context for database data.
 * This allows querying the data using EF Core.
 */
public class ElectricityDbContext(DbContextOptions<ElectricityDbContext> options) : DbContext(options)
{
    public DbSet<ElectricityDataRecord> ElectricityDataRecords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ElectricityDataRecord>(entity =>
        {
            entity.ToTable("electricitydata");
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.StartTime).HasColumnName("starttime");
            entity.Property(e => e.ProductionAmount).HasColumnName("productionamount");
            entity.Property(e => e.ConsumptionAmount).HasColumnName("consumptionamount");
            entity.Property(e => e.HourlyPrice).HasColumnName("hourlyprice");
        });
    }
}