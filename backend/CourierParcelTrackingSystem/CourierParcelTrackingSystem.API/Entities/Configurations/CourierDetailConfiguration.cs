using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class CourierDetailConfiguration
        : IEntityTypeConfiguration<CourierDetail>
    {
        public void Configure(EntityTypeBuilder<CourierDetail> builder)
        {
            // Table Name
            builder.ToTable("CourierDetails");

            // Primary Key
            builder.HasKey(cd => cd.CourierDetailId);

            // CourierId
            builder.Property(cd => cd.CourierId)
                   .IsRequired();

            // Phone
            builder.Property(cd => cd.Phone)
                   .HasMaxLength(20);

            // Address
            builder.Property(cd => cd.Address)
                   .HasMaxLength(500);

            // Emergency Contact
            builder.Property(cd => cd.EmergencyContact)
                   .HasMaxLength(100);

            // Emergency Phone
            builder.Property(cd => cd.EmergencyPhone)
                   .HasMaxLength(20);

            // CreatedAt
            builder.Property(cd => cd.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(cd => cd.CreatedBy);

            // UpdatedAt
            builder.Property(cd => cd.UpdatedAt);

            // UpdatedBy
            builder.Property(cd => cd.UpdatedBy);

            // One-to-One Relationship with Courier
            builder.HasOne(cd => cd.Courier)
                   .WithOne(c => c.CourierDetail)
                   .HasForeignKey<CourierDetail>(cd => cd.CourierId)
                   .OnDelete(DeleteBehavior.Cascade);

            // CourierId must be unique
            builder.HasIndex(cd => cd.CourierId)
                   .IsUnique();
        }
    }
}