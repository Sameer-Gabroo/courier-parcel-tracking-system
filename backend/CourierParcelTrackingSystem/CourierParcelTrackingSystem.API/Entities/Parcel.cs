using System;
using System.Collections.Generic;

namespace CourierParcelTrackingSystem.API.Entities;

public partial class Parcel
{
    public int ParcelId { get; set; }

    public string TrackingNumber { get; set; } = null!;

    public int CustomerId { get; set; }

    public int? CourierId { get; set; }

    public int? RouteId { get; set; }

    public string CurrentStatus { get; set; } = null!;

    public DateTime BookedAt { get; set; }

    public DateTime? ExpectedDeliveryDate { get; set; }

    public DateTime? ActualDeliveryDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Courier? Courier { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<ParcelDetail> ParcelDetails { get; set; } = new List<ParcelDetail>();

    public virtual Route? Route { get; set; }

    public virtual ParcelRecipient? ParcelRecipient { get; set; }

    public virtual ICollection<StatusEvent> StatusEvents { get; set; } = new List<StatusEvent>();
}
