using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            // Table Name
            builder.ToTable("Customers");

            // Primary Key
            builder.HasKey(c => c.CustomerId);

            // Customer Code
            builder.Property(c => c.CustomerCode)
                   .IsRequired()
                   .HasMaxLength(20);

            builder.HasIndex(c => c.CustomerCode)
                   .IsUnique();

            // Customer Name
            builder.Property(c => c.CustomerName)
                   .IsRequired()
                   .HasMaxLength(100);

            // Email
            builder.Property(c => c.Email)
                   .IsRequired()
                   .HasMaxLength(100);

            // IsActive
            builder.Property(c => c.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            // CreatedAt
            builder.Property(c => c.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(c => c.CreatedBy);

            // UpdatedAt
            builder.Property(c => c.UpdatedAt);

            // UpdatedBy
            builder.Property(c => c.UpdatedBy);

            // IsDeleted
            builder.Property(c => c.IsDeleted)
                   .IsRequired()
                   .HasDefaultValue(false);

            // One-to-One Relationship with CustomerDetail
            builder.HasOne(c => c.CustomerDetail)
                   .WithOne(cd => cd.Customer)
                   .HasForeignKey<CustomerDetail>(cd => cd.CustomerId)
                   .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many Relationship with Parcels
            builder.HasMany(c => c.Parcels)
                   .WithOne(p => p.Customer)
                   .HasForeignKey(p => p.CustomerId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}