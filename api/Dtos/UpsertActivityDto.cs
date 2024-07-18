using api.Common;

namespace api.Dtos;

public record UpsertActivityDto(
    string Title,
    Day Day,
    DateTime StartTime,
    DateTime EndTime);
