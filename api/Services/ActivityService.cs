using api.Dtos;
using api.Exceptions;
using api.Infrastructure;
using api.Infrastructure.Entities;
using api.Validators;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class ActivityService(ApplicationDbContext context) : IActivityService
{
    private readonly ApplicationDbContext _context = context;

    public async Task<IEnumerable<ActivityDto>> GetAllAsync()
    {
        var activities = await _context.Activities.AsNoTracking().ToListAsync();
        return activities.Select(x => new ActivityDto(x.Id, x.Title, x.Day, x.StartTime, x.EndTime));
    }


    public async Task<ActivityDto> CreateAsync(UpsertActivityDto createActivityDto)
    {
        var validator = new UpsertActivityDtoValidator();
        var validatorResult = await validator.ValidateAsync(createActivityDto);

        if (!validatorResult.IsValid)
        {
            throw new NotValidException(validatorResult.ToDictionary());
        }
        
        var activity = new Activity(
            createActivityDto.Title,
            createActivityDto.Day,
            createActivityDto.StartTime,
            createActivityDto.EndTime);

        _context.Activities.Add(activity);
        await _context.SaveChangesAsync();
        
        var activityDto = new ActivityDto(activity.Id, activity.Title, activity.Day, activity.StartTime, activity.EndTime);
        return activityDto;
    }


    public async Task<ActivityDto> UpdateAsync(Guid id, UpsertActivityDto updateActivityDto)
    {
        var validator = new UpsertActivityDtoValidator();
        var validatorResult = await validator.ValidateAsync(updateActivityDto);

        if (!validatorResult.IsValid)
        {
            throw new NotValidException(validatorResult.ToDictionary());
        }

        var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == id);

        if (activity is null)
        {
            throw new NotFoundException("Activity not found");
        }

        activity.Title = updateActivityDto.Title;
        activity.Day = updateActivityDto.Day;
        activity.StartTime = updateActivityDto.StartTime;
        activity.EndTime = updateActivityDto.EndTime;

        await _context.SaveChangesAsync();

        var activityDto = new ActivityDto(activity.Id, activity.Title, activity.Day, activity.StartTime, activity.EndTime);
        return activityDto;

    }


    public Task DeleteByIdAsync(Guid id)
    {
        var activity = _context.Activities.FirstOrDefault(x => x.Id == id);

        if (activity is null)
        {
            throw new NotFoundException("Activity not found");
        }

        _context.Activities.Remove(activity);
        return _context.SaveChangesAsync();
    }
}
