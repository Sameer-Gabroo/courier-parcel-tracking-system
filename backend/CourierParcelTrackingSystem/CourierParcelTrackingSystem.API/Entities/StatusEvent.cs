using System;
using System.Collections.Generic;

namespace CourierParcelTrackingSystem.API.Entities;

public partial class StatusEvent
{
    public int StatusEventId { get; set; }

    public int ParcelId { get; set; }

    public int? HubId { get; set; }

    public int? CourierId { get; set; }

    public string Status { get; set; } = null!;

    public DateTime EventTime { get; set; }

    public string? Remarks { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Courier? Courier { get; set; }

    public virtual Hub? Hub { get; set; }

    public virtual Parcel Parcel { get; set; } = null!;
}
