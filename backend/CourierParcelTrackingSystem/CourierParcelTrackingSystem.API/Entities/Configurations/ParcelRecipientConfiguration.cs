using CourierParcelTrackingSystem.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourierParcelTrackingSystem.API.Configurations
{
    public class ParcelRecipientConfiguration
        : IEntityTypeConfiguration<ParcelRecipient>
    {
        public void Configure(EntityTypeBuilder<ParcelRecipient> builder)
        {
            // Table Name
            builder.ToTable("ParcelRecipients");

            // Primary Key
            builder.HasKey(pr => pr.ParcelRecipientId);

            // ParcelId
            builder.Property(pr => pr.ParcelId)
                   .IsRequired();

            builder.HasIndex(pr => pr.ParcelId)
                   .IsUnique();

            // Receiver Name
            builder.Property(pr => pr.ReceiverName)
                   .IsRequired()
                   .HasMaxLength(100);

            // Receiver Phone
            builder.Property(pr => pr.ReceiverPhone)
                   .HasMaxLength(20);

            // Receiver Address
            builder.Property(pr => pr.ReceiverAddress)
                   .HasMaxLength(500);

            // Created At
            builder.Property(pr => pr.CreatedAt)
                   .IsRequired();
        }
    }
}
