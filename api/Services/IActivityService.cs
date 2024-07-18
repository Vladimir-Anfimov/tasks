using api.Dtos;
using api.Infrastructure.Entities;

namespace api.Services
{
    public interface IActivityService
    {
        Task<IEnumerable<ActivityDto>> GetAllAsync();
        Task<ActivityDto> CreateAsync(UpsertActivityDto createActivityDto);
        Task DeleteByIdAsync(Guid id);
        
        Task<ActivityDto> UpdateAsync(Guid id, UpsertActivityDto updateActivityDto);
    }
}