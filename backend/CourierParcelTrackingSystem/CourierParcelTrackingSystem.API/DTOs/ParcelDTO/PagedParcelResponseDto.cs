namespace CourierParcelTrackingSystem.API.DTOs
{
    public class PagedParcelResponseDto
    {
        public List<ParcelResponseDto> Parcels { get; set; }
            = new List<ParcelResponseDto>();

        public int TotalCount { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

        public int TotalPages { get; set; }
    }
}