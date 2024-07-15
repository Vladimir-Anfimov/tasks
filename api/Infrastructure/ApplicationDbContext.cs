using api.Constants;
using api.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public DbSet<Activity> Activities { get; set; }
    private readonly string _dbPath;

    public ApplicationDbContext()
    {
        _dbPath = GetDbPath();
    }

    private string GetDbPath()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        return Path.Combine(path, "tasks.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite($"Data Source={_dbPath}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Activity>(x =>
        {
            x.HasKey(x => x.Id);
            x.Property(p =>p.Title).IsRequired().HasMaxLength(ActivityConstants.TitleMaxLength);
            x.Property(p => p.StartDate).IsRequired();
            x.Property(p => p.EndDate).IsRequired();
        });

        base.OnModelCreating(modelBuilder);
    }

}
