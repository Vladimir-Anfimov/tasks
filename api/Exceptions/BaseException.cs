using System.Net;

namespace api.Exceptions;

public class BaseException(string message, HttpStatusCode statusCode) : Exception(message)
{
    public HttpStatusCode StatusCode { get; } = statusCode;
}
