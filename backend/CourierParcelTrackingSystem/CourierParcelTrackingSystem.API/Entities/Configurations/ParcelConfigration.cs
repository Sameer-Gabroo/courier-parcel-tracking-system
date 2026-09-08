using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class ParcelConfiguration : IEntityTypeConfiguration<Parcel>
    {
        public void Configure(EntityTypeBuilder<Parcel> builder)
        {
            // Table Name
            builder.ToTable("Parcels");

            // Primary Key
            builder.HasKey(p => p.ParcelId);

            // Tracking Number
            builder.Property(p => p.TrackingNumber)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.HasIndex(p => p.TrackingNumber)
                   .IsUnique();

            // CustomerId
            builder.Property(p => p.CustomerId)
                   .IsRequired();

            // CourierId
            builder.Property(p => p.CourierId)
                   .IsRequired(false);

            // RouteId
            builder.Property(p => p.RouteId)
                   .IsRequired(false);

            // Current Status
            builder.Property(p => p.CurrentStatus)
                   .IsRequired()
                   .HasMaxLength(50);

            // Booked At
            builder.Property(p => p.BookedAt)
                   .IsRequired();

            // Expected Delivery Date
            builder.Property(p => p.ExpectedDeliveryDate);

            // Actual Delivery Date
            builder.Property(p => p.ActualDeliveryDate);

            // Created At
            builder.Property(p => p.CreatedAt)
                   .IsRequired();

            // Created By
            builder.Property(p => p.CreatedBy);

            // Updated At
            builder.Property(p => p.UpdatedAt);

            // Updated By
            builder.Property(p => p.UpdatedBy);

            // Is Active
            builder.Property(p => p.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            // Is Deleted
            builder.Property(p => p.IsDeleted)
                   .IsRequired()
                   .HasDefaultValue(false);

            // Customer -> Parcels
            builder.HasOne(p => p.Customer)
                   .WithMany(c => c.Parcels)
                   .HasForeignKey(p => p.CustomerId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Courier -> Parcels
            builder.HasOne(p => p.Courier)
                   .WithMany(c => c.Parcels)
                   .HasForeignKey(p => p.CourierId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Route -> Parcels
            builder.HasOne(p => p.Route)
                   .WithMany(r => r.Parcels)
                   .HasForeignKey(p => p.RouteId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Parcel -> ParcelRecipient
            builder.HasOne(p => p.ParcelRecipient)
                   .WithOne(pr => pr.Parcel)
                   .HasForeignKey<ParcelRecipient>(pr => pr.ParcelId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Parcel -> ParcelDetails
            builder.HasMany(p => p.ParcelDetails)
                   .WithOne(pd => pd.Parcel)
                   .HasForeignKey(pd => pd.ParcelId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Parcel -> StatusEvents
            builder.HasMany(p => p.StatusEvents)
                   .WithOne(se => se.Parcel)
                   .HasForeignKey(se => se.ParcelId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
