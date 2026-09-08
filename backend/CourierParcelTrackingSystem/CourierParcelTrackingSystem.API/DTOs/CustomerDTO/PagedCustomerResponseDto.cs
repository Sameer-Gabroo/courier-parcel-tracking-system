using CourierParcelTrackingSystem.API.DTOs;

public class PagedCustomerResponseDto
{
    public List<CustomerResponseDto> Customers { get; set; } = new();

    public int TotalCount { get; set; }

    public int TotalPages { get; set; }
}