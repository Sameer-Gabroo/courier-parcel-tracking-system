using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RouteEntity = CourierParcelTrackingSystem.API.Entities.Route;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class RouteConfiguration : IEntityTypeConfiguration<RouteEntity>
    {
        public void Configure(EntityTypeBuilder<RouteEntity> builder)
        {
            // Table Name
            builder.ToTable("Routes");

            // Primary Key
            builder.HasKey(r => r.RouteId);

            // Route Code
            builder.Property(r => r.RouteCode)
                   .IsRequired()
                   .HasMaxLength(20);

            // RouteCode must be unique
            builder.HasIndex(r => r.RouteCode)
                   .IsUnique();

            // Origin Hub
            builder.Property(r => r.OriginHubId)
                   .IsRequired();

            // Destination Hub
            builder.Property(r => r.DestinationHubId)
                   .IsRequired();

            // Distance in KM
            builder.Property(r => r.DistanceKm)
                   .IsRequired()
                   .HasPrecision(10, 2);

            // Estimated Hours
            builder.Property(r => r.EstimatedHours)
                   .HasPrecision(10, 2);

            // Is Active
            builder.Property(r => r.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            // Created At
            builder.Property(r => r.CreatedAt)
                   .IsRequired();

            // Created By
            builder.Property(r => r.CreatedBy);

            // Updated At
            builder.Property(r => r.UpdatedAt);

            // Updated By
            builder.Property(r => r.UpdatedBy);

            // Is Deleted
            builder.Property(r => r.IsDeleted)
                   .IsRequired()
                   .HasDefaultValue(false);

            // One Hub -> Many Routes as Origin
            builder.HasOne(r => r.OriginHub)
                   .WithMany(h => h.RouteOriginHubs)
                   .HasForeignKey(r => r.OriginHubId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One Hub -> Many Routes as Destination
            builder.HasOne(r => r.DestinationHub)
                   .WithMany(h => h.RouteDestinationHubs)
                   .HasForeignKey(r => r.DestinationHubId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One Route -> Many Parcels
            builder.HasMany(r => r.Parcels)
                   .WithOne(p => p.Route)
                   .HasForeignKey(p => p.RouteId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}