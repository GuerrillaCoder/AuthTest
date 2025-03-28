using api.EF;
using api.ServiceInterface;
using api.ServiceModel.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api;

public class Program
{
    public static void Main(string[] args)
    {

        ServiceStack.Licensing.RegisterLicense(@"22969-e3JlZjoyMjk2OSxuYW1lOkRpZ2l0YWwgUmVhY2ggT25saW5lIEx0ZCx0eXBlOkluZGllLG1ldGE6MCxoYXNoOllEVW50blZ4WU1GSTQ3YTdHUjMvUGovS2VuQ2pRSUVndmxuVUdKUENKenJ1WTdTNmVNOHZBNVlsc0tqQ1hpdm9tVUlrRWdXK2ZmWE81SXc1akVRL1VuTHJEMDZ4STJZMGYxZGN5SGVlRnJkWmVaTENCWHRpZEZYd2VKdWplb3l5QVBYQ3pDek9YT1pjaUNWaDNIWEs4Tm5lUDR3RjhqTjV3VWV2aHBoVmg4RT0sZXhwaXJ5OjIwMjUtMTEtMjJ9");

        var builder = WebApplication.CreateBuilder(args);
        var services = builder.Services;

        var appDataPath = Path.Combine(builder.Environment.ContentRootPath, "App_Data");
        var dbPath = Path.Combine(appDataPath, "database.sqlite");
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite($"Data Source={dbPath}"));

        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            //options.User.AllowedUserNameCharacters = null;
            //options.SignIn.RequireConfirmedAccount = true;
        })
            .AddApiEndpoints()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        services.AddAuthentication();
        services.AddAuthorization();

        services.AddHttpClient();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhost3000", builder =>
            {
                builder.WithOrigins("http://localhost:3000", "https://localhost:3001")
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials();
            });
        });

        services.AddServiceStack(typeof(MyServices).Assembly);

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Error", createScopeForErrors: true);
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseStaticFiles();

        app.UseCors("AllowLocalhost3000");

        app.UseAuthentication();
        app.UseAuthorization();

        EnsureDatabaseCreated(app.Services);

        app.UseServiceStack(new AppHost(), options => { options.MapEndpoints(); });

        app.Run();

    }

    public static void EnsureDatabaseCreated(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        // This will create the database file if it doesn't exist
        dbContext.Database.EnsureCreated();

        // // Check if migrations need to be applied and apply them
        // if (dbContext.Database.GetPendingMigrations().Any())
        // {
        //     dbContext.Database.Migrate();
        // }
    }
}