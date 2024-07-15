using api.Constants;
using FluentValidation;

namespace api.Dtos;

public record CreateActivityDto(
    string Title,
    DateTime StartDate,
    DateTime EndDate);

public class CreateActivityDtoValidator : AbstractValidator<CreateActivityDto>
{
    public CreateActivityDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("{PropertyName} is required")
            .MaximumLength(ActivityConstants.TitleMaxLength).WithMessage("{PropertyName} must be less than {MaxLength} characters")
            .MinimumLength(ActivityConstants.TitleMinLength).WithMessage("{PropertyName} must be greater than {MinLength} characters");

        RuleFor(x => x.StartDate)
            .NotEmpty().WithMessage("{PropertyName} is required")
            .LessThan(x => x.EndDate).WithMessage("{PropertyName} cannot be greater than End Date");

        RuleFor(x => x.EndDate)
            .NotEmpty().WithMessage("{PropertyName} is required");
    }
}
