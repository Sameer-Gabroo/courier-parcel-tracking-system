using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Entities.Configurations
{
    public class CourierConfiguration : IEntityTypeConfiguration<Courier>
    {
        public void Configure(EntityTypeBuilder<Courier> builder)
        {
            // Table name
            builder.ToTable("Couriers");

            // Primary Key
            builder.HasKey(c => c.CourierId);

            // UserId
            builder.Property(c => c.UserId)
                .IsRequired(false);

            builder.HasIndex(c => c.UserId)
                .IsUnique()
                .HasFilter("[UserId] IS NOT NULL");

            // CourierCode
            builder.Property(c => c.CourierCode)
                .IsRequired()
                .HasMaxLength(50);

            // CourierName
            builder.Property(c => c.CourierName)
                .IsRequired()
                .HasMaxLength(100);

            // Email
            builder.Property(c => c.Email)
                .HasMaxLength(100);

            // City
            builder.Property(c => c.City)
                .HasMaxLength(100);

            // Default values
            builder.Property(c => c.IsActive)
                .HasDefaultValue(true);

            builder.Property(c => c.IsDeleted)
                .HasDefaultValue(false);

            builder.Property(c => c.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            // One-to-One Relationship
            builder.HasOne(c => c.CourierDetail)
                .WithOne(cd => cd.Courier)
                .HasForeignKey<CourierDetail>(cd => cd.CourierId);

            // One-to-One Relationship with User
            builder.HasOne(c => c.User)
                .WithOne(u => u.Courier)
                .HasForeignKey<Courier>(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // One-to-Many: Courier -> Parcels
            builder.HasMany(c => c.Parcels)
                .WithOne(p => p.Courier)
                .HasForeignKey(p => p.CourierId);

            // One-to-Many: Courier -> StatusEvents
            builder.HasMany(c => c.StatusEvents)
                .WithOne(se => se.Courier)
                .HasForeignKey(se => se.CourierId);
        }
    }
}
