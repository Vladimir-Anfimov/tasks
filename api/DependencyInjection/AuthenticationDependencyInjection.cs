using Microsoft.IdentityModel.Tokens;

namespace FSM.WebAPI.DependencyInjection;

public static class AuthenticationDependencyInjection
{
    public static IServiceCollection AddAuthenticationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication()
            .AddJwtBearer(options =>
            {
                options.MetadataAddress = $"{configuration["Identity:Issuer"]}/.well-known/openid-configuration";
                options.RequireHttpsMetadata = Convert.ToBoolean(configuration["Identity:RequireHttpsMetadata"]);
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Identity:Issuer"],
                    ValidateAudience = true,
                    ValidAudiences = configuration.GetSection("Identity:Audiences").Get<string[]>(),
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.FromSeconds(configuration.GetValue<int>("Identity:ClockSkewSeconds")),
                };
            });

        return services;
    }
}