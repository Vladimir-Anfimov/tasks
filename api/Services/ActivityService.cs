using api.Dtos;
using api.Exceptions;
using api.Infrastructure;
using api.Infrastructure.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class ActivityService : IActivityService
{
    private readonly ApplicationDbContext _context;

    public ActivityService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Activity>> GetAllAsync()
    {
        return await _context.Activities.ToListAsync();
    }

    public async Task<Activity> GetByIdAsync(Guid id)
    {
        var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == id);
        if (activity is null)
        {
            throw new NotFoundException("Activity not found");
        }

        return activity;
    }

    public async Task<Activity> CreateAsync(CreateActivityDto createActivityDto)
    {
        var validator = new CreateActivityDtoValidator();
        var validatorResult = validator.Validate(createActivityDto);

        if (!validatorResult.IsValid)
        {
            throw new NotValidException(validatorResult.ToDictionary());
        }

        var activity = new Activity(createActivityDto.Title, createActivityDto.StartDate, createActivityDto.EndDate);
        _context.Activities.Add(activity);
        await _context.SaveChangesAsync();
        return activity;
    }
}
