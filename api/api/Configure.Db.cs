using api.ServiceModel.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using System.Data;

[assembly: HostingStartup(typeof(api.ConfigureDb))]

namespace api;

public class ConfigureDb : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) =>
        {
            // Ensure App_Data directory exists
            var appDataPath = Path.Combine(context.HostingEnvironment.ContentRootPath, "App_Data");
            if (!Directory.Exists(appDataPath))
            {
                //Directory.CreateDirectory(appDataPath);
                throw new Exception("No App_Data directory found. Please create one and restart the application.");
            }


            var dbPath = Path.Combine(appDataPath, "database.sqlite");
            services.AddSingleton<IDbConnectionFactory>(new OrmLiteConnectionFactory(
                $"Data Source={dbPath};",
                SqliteDialect.Provider));
        })
        .ConfigureAppHost(appHost =>
        {
            // Enable built-in Database Admin UI at /admin-ui/database
            // appHost.Plugins.Add(new AdminDatabaseFeature());
            
            // Initialize database and tables on startup
            appHost.AfterInitCallbacks.Add(host => {
                using var db = host.Resolve<IDbConnectionFactory>().Open();
                //SeedHelper.Create(db);
                SeedHelper.SeedIdentityAsync(host.Resolve<UserManager<ApplicationUser>>(), host.Resolve<RoleManager<IdentityRole>>()).Wait();
            });
        });
}

public static class SeedHelper
{
    public static ApplicationUser SeedAudit(this ApplicationUser user)
    {
        user.CreatedDate = DateTime.UtcNow;
        user.CreatedBy = "System";
        user.ModifiedDate = DateTime.UtcNow;
        user.ModifiedBy = "System";

        return user;
    }

    public static async Task SeedIdentityAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {

        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        // Create the admin user if it doesn't exist
        var adminEmail = "admin@example.com";
        var password = "P@ssw0rd55";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser != null) return;

        adminUser = new ApplicationUser
        {
            UserName = adminEmail,
            Email = adminEmail
        }.SeedAudit();
        await userManager.CreateAsync(adminUser, password);
        await userManager.AddToRoleAsync(adminUser, "Admin");

    }

    //public static void Create(IDbConnection Db)
    //{
    //    Db.CreateTableIfNotExists<OrmLiteApplicationUser>();
    //    Db.CreateTableIfNotExists<OrmLiteIdentityRole>();
    //    Db.CreateTableIfNotExists<OrmLiteIdentityRoleClaim>();
    //    Db.CreateTableIfNotExists<OrmLiteIdentityUserRole>();
    //    Db.CreateTableIfNotExists<OrmLiteIdentityUserClaim>();
    //    Db.CreateTableIfNotExists<OrmLiteIdentityUserLogin>();
    //    Db.CreateTableIfNotExists<OrmLiteIdentityUserToken>();
    //}
}