using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsRole : IAuthorizationRequirement
{
    public Role Role { get; set; }
    public IsRole(Role role)
    {
        Role = role;
    }
}

public class IsRoleHandler : AuthorizationHandler<IsRole>
{
    private readonly UserManager<AppUser> _userManager;
    public IsRoleHandler(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    protected override async Task<Task> HandleRequirementAsync(AuthorizationHandlerContext context, IsRole requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null) return Task.CompletedTask;

        var user = await _userManager.FindByIdAsync(userId);
        
        if (user == null) return Task.CompletedTask;

        var roles = await _userManager.GetRolesAsync(user);

        foreach (var role in roles)
            if(role == requirement.Role.ToString())
                context.Succeed(requirement);

        return Task.CompletedTask;
    }
}