using System;
using System.Collections.Generic;

namespace CourierParcelTrackingSystem.API.Entities;

public partial class ParcelDetail
{
    public int ParcelDetailId { get; set; }

    public int ParcelId { get; set; }

    public string ItemName { get; set; } = null!;

    public string? Description { get; set; }

    public int Quantity { get; set; }

    public decimal? WeightKg { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual Parcel Parcel { get; set; } = null!;
}
