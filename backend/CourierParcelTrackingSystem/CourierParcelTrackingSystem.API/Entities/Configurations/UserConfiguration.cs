using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Table Name
            builder.ToTable("Users");

            // Primary Key
            builder.HasKey(u => u.UserId);

            // UserName
            builder.Property(u => u.UserName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.HasIndex(u => u.UserName)
                   .IsUnique();

            // Email
            builder.Property(u => u.Email)
                   .IsRequired()
                   .HasMaxLength(150);

            builder.HasIndex(u => u.Email)
                   .IsUnique();

            // PasswordHash
            builder.Property(u => u.PasswordHash)
                   .IsRequired()
                   .HasMaxLength(500);

            // IsActive
            builder.Property(u => u.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            // CreatedAt
            builder.Property(u => u.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(u => u.CreatedBy);

            // UpdatedAt
            builder.Property(u => u.UpdatedAt);

            // UpdatedBy
            builder.Property(u => u.UpdatedBy);

            // IsDeleted
            builder.Property(u => u.IsDeleted)
                   .IsRequired()
                   .HasDefaultValue(false);

            // One User -> One UserDetail
            builder.HasOne(u => u.UserDetail)
                   .WithOne(ud => ud.User)
                   .HasForeignKey<UserDetail>(ud => ud.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            // One User -> Many UserRoles
            builder.HasMany(u => u.UserRoles)
                   .WithOne(ur => ur.User)
                   .HasForeignKey(ur => ur.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One User -> One Courier
            builder.HasOne(u => u.Courier)
                   .WithOne(c => c.User)
                   .HasForeignKey<Courier>(c => c.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One Customer -> Many Users
            builder.HasOne(u => u.Customer)
                   .WithMany()
                   .HasForeignKey(u => u.CustomerId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
