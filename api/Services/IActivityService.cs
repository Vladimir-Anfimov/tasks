using api.Dtos;
using api.Infrastructure.Entities;

namespace api.Services
{
    public interface IActivityService
    {
        Task<Activity> CreateAsync(CreateActivityDto createActivityDto);
        Task<IEnumerable<Activity>> GetAllAsync();
        Task<Activity> GetByIdAsync(Guid id);
    }
}