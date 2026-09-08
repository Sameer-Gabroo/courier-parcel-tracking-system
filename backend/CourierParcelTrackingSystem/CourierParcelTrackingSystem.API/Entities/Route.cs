using System;
using System.Collections.Generic;

namespace CourierParcelTrackingSystem.API.Entities;

public partial class Route
{
    public int RouteId { get; set; }

    public string RouteCode { get; set; } = null!;

    public int OriginHubId { get; set; }

    public int DestinationHubId { get; set; }

    public decimal DistanceKm { get; set; }

    public decimal? EstimatedHours { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Hub DestinationHub { get; set; } = null!;

    public virtual Hub OriginHub { get; set; } = null!;

    public virtual ICollection<Parcel> Parcels { get; set; } = new List<Parcel>();
}
