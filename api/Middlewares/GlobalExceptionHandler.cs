using api.Common;
using api.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace api.Middlewares;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        switch (exception)
        {

            case NotValidException notValidException:
                httpContext.Response.StatusCode = (int)notValidException.StatusCode;
                await httpContext.Response.WriteAsJsonAsync(
                         new ServerErrorResponse(notValidException.Message, notValidException.Errors),
                         cancellationToken);
                break;
            case BaseException baseException:
                httpContext.Response.StatusCode = (int)baseException.StatusCode;
                await httpContext.Response.WriteAsJsonAsync(
                    new ServerErrorResponse(baseException.Message),
                    cancellationToken);
                break;
            default:
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                break;
        }

        return true;
    }
}
