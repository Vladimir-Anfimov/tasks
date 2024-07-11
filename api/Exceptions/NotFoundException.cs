using System.Net;

namespace api.Exceptions;

public class NotFoundException(string message): BaseException(message, HttpStatusCode.NotFound)
{
}
