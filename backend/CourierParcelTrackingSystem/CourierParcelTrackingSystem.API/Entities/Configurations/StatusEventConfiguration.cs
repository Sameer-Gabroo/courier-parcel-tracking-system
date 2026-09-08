using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class StatusEventConfiguration
        : IEntityTypeConfiguration<StatusEvent>
    {
        public void Configure(EntityTypeBuilder<StatusEvent> builder)
        {
            // Table Name
            builder.ToTable("StatusEvents");

            // Primary Key
            builder.HasKey(se => se.StatusEventId);

            // ParcelId
            builder.Property(se => se.ParcelId)
                   .IsRequired();

            // HubId - Optional
            builder.Property(se => se.HubId)
                   .IsRequired(false);

            // CourierId - Optional
            builder.Property(se => se.CourierId)
                   .IsRequired(false);

            // Status
            builder.Property(se => se.Status)
                   .IsRequired()
                   .HasMaxLength(50);

            // EventTime
            builder.Property(se => se.EventTime)
                   .IsRequired();

            // Remarks
            builder.Property(se => se.Remarks)
                   .HasMaxLength(500);

            // CreatedAt
            builder.Property(se => se.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(se => se.CreatedBy);

            // IsActive
            builder.Property(se => se.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            // IsDeleted
            builder.Property(se => se.IsDeleted)
                   .IsRequired()
                   .HasDefaultValue(false);

            // One Parcel -> Many StatusEvents
            builder.HasOne(se => se.Parcel)
                   .WithMany(p => p.StatusEvents)
                   .HasForeignKey(se => se.ParcelId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One Hub -> Many StatusEvents
            builder.HasOne(se => se.Hub)
                   .WithMany(h => h.StatusEvents)
                   .HasForeignKey(se => se.HubId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One Courier -> Many StatusEvents
            builder.HasOne(se => se.Courier)
                   .WithMany(c => c.StatusEvents)
                   .HasForeignKey(se => se.CourierId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}