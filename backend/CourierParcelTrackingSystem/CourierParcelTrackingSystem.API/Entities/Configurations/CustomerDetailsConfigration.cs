using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class CustomerDetailConfiguration
        : IEntityTypeConfiguration<CustomerDetail>
    {
        public void Configure(EntityTypeBuilder<CustomerDetail> builder)
        {
            // Table Name
            builder.ToTable("CustomerDetails");

            // Primary Key
            builder.HasKey(cd => cd.CustomerDetailId);

            // CustomerId
            builder.Property(cd => cd.CustomerId)
                   .IsRequired();

            // Phone
            builder.Property(cd => cd.Phone)
                   .HasMaxLength(20);

            // Address
            builder.Property(cd => cd.Address)
                   .HasMaxLength(500);

            // City
            builder.Property(cd => cd.City)
                   .HasMaxLength(100);

            // Postal Code
            builder.Property(cd => cd.PostalCode)
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

            // One-to-One Relationship with Customer
            builder.HasOne(cd => cd.Customer)
                   .WithOne(c => c.CustomerDetail)
                   .HasForeignKey<CustomerDetail>(cd => cd.CustomerId)
                   .OnDelete(DeleteBehavior.Cascade);

            // CustomerId must be unique for one-to-one relationship
            builder.HasIndex(cd => cd.CustomerId)
                   .IsUnique();
        }
    }
}