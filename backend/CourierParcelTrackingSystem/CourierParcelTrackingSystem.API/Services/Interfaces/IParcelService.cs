using CourierParcelTrackingSystem.API.DTOs;
using CourierParcelTrackingSystem.API.Entities;

namespace CourierParcelTrackingSystem.API.Services.Interfaces
{
    public interface IParcelService
    {
        Task<PagedParcelResponseDto> GetParcelsAsync(int page,int pageSize,string? search,string? status);

        Task<List<ParcelResponseDto>> GetCustomerParcelsAsync(int customerId);

        Task<ParcelResponseDto?> GetParcelByIdAsync(int parcelId);
        Task<ParcelResponseDto> AddParcelAsync(CreateParcelRequestDto createParcelRequest);

        Task<ParcelResponseDto?> UpdateParcelAsync( int parcelId, UpdateParcelRequestDto updateParcelRequest);

        Task<ParcelResponseDto?> GetParcelByTrackingNumberAsync(string trackingNumber);

        Task<List<ParcelResponseDto>> GetPendingParcelsAsync();

        Task<ParcelResponseDto?> AssignParcelAsync(int parcelId, AssignParcelRequestDto assignParcelRequest);

        Task<List<ParcelResponseDto>> GetCourierAssignedParcelsAsync(int courierId);

        Task<ParcelResponseDto?> UpdateCourierParcelStatusAsync(
    int parcelId,
    int courierId,
    UpdateCourierParcelStatusRequestDto updateStatusRequest);

        Task<bool> DeleteParcelAsync(int parcelId);



    }
}
