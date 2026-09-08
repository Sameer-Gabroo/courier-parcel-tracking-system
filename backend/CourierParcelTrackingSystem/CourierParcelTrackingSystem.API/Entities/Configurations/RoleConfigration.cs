using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            // Table Name
            builder.ToTable("Roles");

            // Primary Key
            builder.HasKey(r => r.RoleId);

            // Role Name
            builder.Property(r => r.RoleName)
                   .IsRequired()
                   .HasMaxLength(50);

            // RoleName must be unique
            builder.HasIndex(r => r.RoleName)
                   .IsUnique();

            // Description
            builder.Property(r => r.Description)
                   .HasMaxLength(500);

            // IsActive
            builder.Property(r => r.IsActive)
                   .IsRequired()
                   .HasDefaultValue(true);

            // CreatedAt
            builder.Property(r => r.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(r => r.CreatedBy);

            // UpdatedAt
            builder.Property(r => r.UpdatedAt);

            // UpdatedBy
            builder.Property(r => r.UpdatedBy);

            // IsDeleted
            builder.Property(r => r.IsDeleted)
                   .IsRequired()
                   .HasDefaultValue(false);

            // One Role -> Many UserRoles
            builder.HasMany(r => r.UserRoles)
                   .WithOne(ur => ur.Role)
                   .HasForeignKey(ur => ur.RoleId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}