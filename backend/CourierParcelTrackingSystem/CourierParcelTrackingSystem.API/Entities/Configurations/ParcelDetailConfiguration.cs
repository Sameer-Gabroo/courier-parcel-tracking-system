using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class ParcelDetailConfiguration
        : IEntityTypeConfiguration<ParcelDetail>
    {
        public void Configure(EntityTypeBuilder<ParcelDetail> builder)
        {
            // Table Name
            builder.ToTable("ParcelDetails");

            // Primary Key
            builder.HasKey(pd => pd.ParcelDetailId);

            // ParcelId
            builder.Property(pd => pd.ParcelId)
                   .IsRequired();

            // Item Name
            builder.Property(pd => pd.ItemName)
                   .IsRequired()
                   .HasMaxLength(100);

            // Description
            builder.Property(pd => pd.Description)
                   .HasMaxLength(500);

            // Quantity
            builder.Property(pd => pd.Quantity)
                   .IsRequired();

            // Weight in KG
            builder.Property(pd => pd.WeightKg)
                   .HasPrecision(10, 2);

            // CreatedAt
            builder.Property(pd => pd.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(pd => pd.CreatedBy);

            // UpdatedAt
            builder.Property(pd => pd.UpdatedAt);

            // UpdatedBy
            builder.Property(pd => pd.UpdatedBy);

            // One Parcel -> Many ParcelDetails
            builder.HasOne(pd => pd.Parcel)
                   .WithMany(p => p.ParcelDetails)
                   .HasForeignKey(pd => pd.ParcelId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}