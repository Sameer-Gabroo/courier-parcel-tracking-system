using System;
using System.Collections.Generic;

namespace CourierParcelTrackingSystem.API.Entities;

public partial class ParcelRecipient
{
    public int ParcelRecipientId { get; set; }

    public int ParcelId { get; set; }

    public string ReceiverName { get; set; } = null!;

    public string? ReceiverPhone { get; set; }

    public string? ReceiverAddress { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual Parcel Parcel { get; set; } = null!;
}
