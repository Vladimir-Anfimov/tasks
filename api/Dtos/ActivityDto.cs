using api.Common;

namespace api.Dtos;

public record ActivityDto(
    Guid Id,
    string Title,
    Day Day,
    DateTime StartTime,
    DateTime EndTime);


