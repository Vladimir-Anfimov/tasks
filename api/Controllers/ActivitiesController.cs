using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly IActivityService _activityService;

    public ActivitiesController(IActivityService activityService)
    {
        _activityService = activityService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityDto>>> GetAll()
    {
        var activities = await _activityService.GetAllAsync();
        return Ok(activities);
    }


    [HttpPost]
    public async Task<ActionResult<ActivityDto>> Create(UpsertActivityDto createActivityDto)
    {
        var activity = await _activityService.CreateAsync(createActivityDto);
        return Ok(activity);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ActivityDto>> Update(Guid id, UpsertActivityDto updateActivityDto)
    {
        var activity = await _activityService.UpdateAsync(id, updateActivityDto);
        return Ok(activity);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _activityService.DeleteByIdAsync(id);
        return NoContent();
    }
}
