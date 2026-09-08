using System;
using System.Collections.Generic;

namespace CourierParcelTrackingSystem.API.Entities;

public partial class Courier
{
    public int CourierId { get; set; }

    public int? UserId { get; set; }

    public string CourierCode { get; set; } = null!;

    public string CourierName { get; set; } = null!;

    public string? Email { get; set; }

    public string? City { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public bool IsDeleted { get; set; }

    public virtual CourierDetail? CourierDetail { get; set; }

    public virtual User? User { get; set; }

    public virtual ICollection<Parcel> Parcels { get; set; } = new List<Parcel>();

    public virtual ICollection<StatusEvent> StatusEvents { get; set; } = new List<StatusEvent>();
}
