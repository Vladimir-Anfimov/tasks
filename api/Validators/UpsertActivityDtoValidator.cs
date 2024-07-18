using api.Constants;
using api.Dtos;
using FluentValidation;

namespace api.Validators;

public class UpsertActivityDtoValidator : AbstractValidator<UpsertActivityDto>
{
    public UpsertActivityDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("{PropertyName} is required")
            .MaximumLength(ActivityConstants.TitleMaxLength).WithMessage("{PropertyName} must be less than {MaxLength} characters")
            .MinimumLength(ActivityConstants.TitleMinLength).WithMessage("{PropertyName} must be greater than {MinLength} characters");

        RuleFor(x => x.Day)
                .NotNull().WithMessage("{PropertyName} is required");

        RuleFor(x => x.StartTime)
            .NotEmpty().WithMessage("{PropertyName} is required")
            .LessThan(x => x.EndTime).WithMessage("{PropertyName} cannot be greater than End Date");

        RuleFor(x => x.EndTime)
            .NotEmpty().WithMessage("{PropertyName} is required");
    }
}
