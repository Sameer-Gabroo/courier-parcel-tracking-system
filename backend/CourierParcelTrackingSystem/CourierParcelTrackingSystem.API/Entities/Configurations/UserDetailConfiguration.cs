using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class UserDetailConfiguration
        : IEntityTypeConfiguration<UserDetail>
    {
        public void Configure(EntityTypeBuilder<UserDetail> builder)
        {
            // Table Name
            builder.ToTable("UserDetails");

            // Primary Key
            builder.HasKey(ud => ud.UserDetailId);

            // UserId
            builder.Property(ud => ud.UserId)
                   .IsRequired();

            // UserId must be unique for one-to-one relationship
            builder.HasIndex(ud => ud.UserId)
                   .IsUnique();

            // FirstName
            builder.Property(ud => ud.FirstName)
                   .IsRequired()
                   .HasMaxLength(100);

            // LastName
            builder.Property(ud => ud.LastName)
                   .IsRequired()
                   .HasMaxLength(100);

            // Phone
            builder.Property(ud => ud.Phone)
                   .HasMaxLength(20);

            // Address
            builder.Property(ud => ud.Address)
                   .HasMaxLength(500);

            // City
            builder.Property(ud => ud.City)
                   .HasMaxLength(100);

            // CreatedAt
            builder.Property(ud => ud.CreatedAt)
                   .IsRequired();

            // CreatedBy
            builder.Property(ud => ud.CreatedBy);

            // UpdatedAt
            builder.Property(ud => ud.UpdatedAt);

            // UpdatedBy
            builder.Property(ud => ud.UpdatedBy);

            // One User -> One UserDetail
            builder.HasOne(ud => ud.User)
                   .WithOne(u => u.UserDetail)
                   .HasForeignKey<UserDetail>(ud => ud.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}