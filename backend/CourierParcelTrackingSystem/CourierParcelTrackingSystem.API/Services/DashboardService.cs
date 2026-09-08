using CourierParcelTrackingSystem.API.DTOs.DashboardDTO;
using CourierParcelTrackingSystem.API.Repositories.Interfaces;
using CourierParcelTrackingSystem.API.Services.Interfaces;

namespace CourierParcelTrackingSystem.API.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardService(
            IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public async Task<DashboardResponseDto> GetDashboardSummaryAsync()
        {
            var totalParcels =
                await _dashboardRepository.GetTotalParcelsAsync();

            var inTransit =
                await _dashboardRepository.GetInTransitParcelsAsync();

            var delivered =
                await _dashboardRepository.GetDeliveredParcelsAsync();

            var delayed =
                await _dashboardRepository.GetDelayedParcelsAsync();

            var statusOverview =
                await _dashboardRepository.GetStatusOverviewAsync();

            var recentParcels =
                await _dashboardRepository.GetRecentParcelsAsync(5);

            return new DashboardResponseDto
            {
                Summary = new ParcelSummaryDto
                {
                    TotalParcels = totalParcels,
                    InTransit = inTransit,
                    Delivered = delivered,
                    Delayed = delayed
                },

                StatusOverview = statusOverview
                    .Select(x => new ParcelStatusDto
                    {
                        Status = x.Status,
                        Count = x.Count
                    })
                    .ToList(),

                RecentParcels = recentParcels
                    .Select(parcel => new RecentParcelDto
                    {
                        TrackingNumber = parcel.TrackingNumber,
                        Customer = parcel.Customer.CustomerName,
                        Destination =
                            parcel.Route?.DestinationHub?.HubName ?? "-",
                        Status = parcel.CurrentStatus,
                        Date = parcel.BookedAt
                    })
                    .ToList()
            };
        }
    }
}