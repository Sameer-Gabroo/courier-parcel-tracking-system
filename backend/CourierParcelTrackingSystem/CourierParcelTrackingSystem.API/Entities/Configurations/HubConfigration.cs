using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class HubConfiguration : IEntityTypeConfiguration<Hub>
    {
        public void Configure(EntityTypeBuilder<Hub> builder)
        {
            // Table Name
            builder.ToTable("Hubs");

            // Primary Key
            builder.HasKey(h => h.HubId);

            // Hub Code
            builder.Property(h => h.HubCode)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.HasIndex(h => h.HubCode)
                   .IsUnique();

            // Hub Name
            builder.Property(h => h.HubName)
                   .IsRequired()
                   .HasMaxLength(100);

            // City
            builder.Property(h => h.City)
                   .IsRequired()
                   .HasMaxLength(100);

            // Address
            builder.Property(h => h.Address)
                   .HasMaxLength(500);

            // Phone
            builder.Property(h => h.Phone)
                   .HasMaxLength(20);

            // IsActive
            builder.Property(h => h.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            // CreatedAt
            builder.Property(h => h.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(h => h.CreatedBy);

            // UpdatedAt
            builder.Property(h => h.UpdatedAt);

            // UpdatedBy
            builder.Property(h => h.UpdatedBy);

            // IsDeleted
            builder.Property(h => h.IsDeleted)
                   .IsRequired()
                   .HasDefaultValue(false);

            // One Hub -> Many Routes as Origin
            builder.HasMany(h => h.RouteOriginHubs)
                   .WithOne(r => r.OriginHub)
                   .HasForeignKey(r => r.OriginHubId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One Hub -> Many Routes as Destination
            builder.HasMany(h => h.RouteDestinationHubs)
                   .WithOne(r => r.DestinationHub)
                   .HasForeignKey(r => r.DestinationHubId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One Hub -> Many Status Events
            builder.HasMany(h => h.StatusEvents)
                   .WithOne(se => se.Hub)
                   .HasForeignKey(se => se.HubId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}