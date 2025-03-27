using System.Security.Claims;
using api.ServiceModel.Users;
using Microsoft.AspNetCore.Identity;
using ServiceStack.Auth;
using ServiceStack.Html;
using ServiceStack.Text;
using api.ServiceInterface.Users;

[assembly: HostingStartup(typeof(ConfigureAuth))]

namespace api;


public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services =>
        {
            services.AddSingleton<IAuthHttpGateway, AuthHttpGateway>();

            services.AddPlugin(new AuthFeature(IdentityAuth.For<ApplicationUser>(options =>
            {
                options.SessionFactory = () => new CustomUserSession();
                options.CredentialsAuth();

                options.AdminUsersFeature();
            })));
        });
}

