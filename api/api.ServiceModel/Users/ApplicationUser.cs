using Microsoft.AspNetCore.Identity;

namespace api.ServiceModel.Users;

// Add profile data for application users by adding properties to the ApplicationUser class

public class ApplicationUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? DisplayName { get; set; }
    public string? ProfileUrl { get; set; }
    public string? FacebookUserId { get; set; }
    public string? GoogleUserId { get; set; }
    public string? GoogleProfilePageUrl { get; set; }
    public string? MicrosoftUserId { get; set; }
    public DateTime? CreatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? ModifiedBy { get; set; }
    public DateTime? DeletedDate { get; set; }
    public string? DeletedBy { get; set; }
    public List<string> Permissions { get; set; } = new List<string>();
}