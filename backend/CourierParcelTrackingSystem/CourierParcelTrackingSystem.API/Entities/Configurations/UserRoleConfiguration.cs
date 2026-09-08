using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class UserRoleConfiguration
        : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            // Table Name
            builder.ToTable("UserRoles");

            // Composite Primary Key
            builder.HasKey(ur => new
            {
                ur.UserId,
                ur.RoleId
            });

            // UserId
            builder.Property(ur => ur.UserId)
                   .IsRequired();

            // RoleId
            builder.Property(ur => ur.RoleId)
                   .IsRequired();

            // CreatedAt
            builder.Property(ur => ur.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(ur => ur.CreatedBy);

            // Relationship with User
            builder.HasOne(ur => ur.User)
                   .WithMany(u => u.UserRoles)
                   .HasForeignKey(ur => ur.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Relationship with Role
            builder.HasOne(ur => ur.Role)
                   .WithMany(r => r.UserRoles)
                   .HasForeignKey(ur => ur.RoleId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}