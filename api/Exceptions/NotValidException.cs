using System.Net;

namespace api.Exceptions;

public class NotValidException : BaseException
{
    public IDictionary<string, string[]> Errors { get; private set; }

    public NotValidException(IDictionary<string, string[]> errors) :
        base("Validation error.", HttpStatusCode.BadRequest)
    {
        Errors = errors;
    }
}
