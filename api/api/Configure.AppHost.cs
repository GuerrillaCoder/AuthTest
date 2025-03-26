[assembly: HostingStartup(typeof(api.AppHost))]

namespace api;

public class AppHost() : AppHostBase("api"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            // Configure ASP.NET Core IOC Dependencies
        });

    public override void Configure()
    {
        // Configure ServiceStack, Run custom logic after ASP.NET Core Startup
        SetConfig(new HostConfig {
        });
    }
}