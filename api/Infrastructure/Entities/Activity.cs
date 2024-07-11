namespace api.Infrastructure.Entities;

public class Activity(string title, DateTime startDate, DateTime endDate)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = title;

    public DateTime StartDate { get; set; } = startDate;
    public DateTime EndDate { get; set; } = endDate;
}
