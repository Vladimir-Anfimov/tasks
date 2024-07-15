using api.Dtos;
using api.Infrastructure.Entities;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ActivityController : ControllerBase
{
    private readonly IActivityService _activityService;

    public ActivityController(IActivityService activityService)
    {
        _activityService = activityService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> GetAll()
    {
        var activities = await _activityService.GetAllAsync();
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetById(Guid id)
    {
        var activity = await _activityService.GetByIdAsync(id);
        return Ok(activity);
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> Create(CreateActivityDto createActivityDto)
    {
        var activity = await _activityService.CreateAsync(createActivityDto);
        return CreatedAtAction(nameof(GetById), new { id = activity.Id }, activity);
    }
}
