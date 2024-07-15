namespace api.Common;

public class ServerErrorResponse
{
    public string Message { get; set; }
    public IDictionary<string, string[]>? Errors { get; set; }

    public ServerErrorResponse(string message, IDictionary<string, string[]>? errors = null)
    {
        Message = message;
        Errors = errors;
    }
}
