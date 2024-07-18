using api.Constants;
using api.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public DbSet<Activity> Activities { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Activity>(x =>
        {
            x.HasKey(x => x.Id);
            x.Property(p =>p.Title).IsRequired().HasMaxLength(ActivityConstants.TitleMaxLength);
            x.Property(p => p.Day).IsRequired();
            x.Property(p => p.StartTime).IsRequired();
            x.Property(p => p.EndTime).IsRequired();
        });

        //base.OnModelCreating(modelBuilder);
    }

}
