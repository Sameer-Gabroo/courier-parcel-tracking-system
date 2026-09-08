namespace CourierParcelTrackingSystem.API.DTOs.DashboardDTO
{
    public class DashboardResponseDto
    {
        public ParcelSummaryDto Summary { get; set; }

        public List<ParcelStatusDto> StatusOverview { get; set; }

        public List<RecentParcelDto> RecentParcels { get; set; }
    }

    public class ParcelSummaryDto
    {
        public int TotalParcels { get; set; }

        public int InTransit { get; set; }

        public int Delivered { get; set; }

        public int Delayed { get; set; }
    }
    public class ParcelStatusDto
    {
        public string Status { get; set; }

        public int Count { get; set; }
    }

    public class RecentParcelDto
    {
        public string TrackingNumber { get; set; }

        public string Customer { get; set; }

        public string Destination { get; set; }

        public string Status { get; set; }

        public DateTime Date { get; set; }
    }
}
