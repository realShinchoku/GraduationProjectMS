using System.Security.Claims;
using System.Text;
using API.DTOs;
using API.Services;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
public class AccountController : BaseApiController
{
    private readonly IEmailSender _emailSender;
    private readonly RoleManager<AppRole> _roleManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly TokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService,
        SignInManager<AppUser> signInManager, IEmailSender emailSender, RoleManager<AppRole> roleManager)
    {
        _tokenService = tokenService;
        _signInManager = signInManager;
        _emailSender = emailSender;
        _roleManager = roleManager;
        _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Email == loginDto.Email);

        if (user == null)
        {
            ModelState.AddModelError("email", "Email không tồn tại");
            return BadRequest(ModelState);
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
        {
            ModelState.AddModelError("password", "Sai mật khẩu");
            return BadRequest(ModelState);
        }

        await SetRefreshToken(user);
        return CreateUserObject(user);
    }

    [Authorize(Policy = "IsFacultyOffice")]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var currentUser = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Email == User.FindFirstValue(ClaimTypes.Email));

        if (currentUser.Role != Role.FacultyOffice)
            return Forbid();

        if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            return Conflict("Username is already taken");

        if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            return Conflict("Email is already taken");

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.UserName
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
            return BadRequest("Problem registering user");

        return Ok("Registration successfully");
    }

    [Authorize]
    [HttpPost("changePassword")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto passwordDto)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Email == User.FindFirstValue(ClaimTypes.Email));

        var result = await _userManager.ChangePasswordAsync(user, passwordDto.OldPassword, passwordDto.NewPassword);

        if (!result.Succeeded)
            return Conflict(result.Errors);
        return Ok("Password changed");
    }

    [AllowAnonymous]
    [HttpGet("sendResetPasswordLink")]
    public async Task<IActionResult> SendResetPassword(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return Unauthorized("Email not found");

        var origin = Request.Headers["origin"];
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var verifyUrl = $"{origin}/account/accountRecovery?token={token}&email={user.Email}";
        var message =
            $"<p>Please click the below link to change your password:</p><p><a href='{verifyUrl}'>Click to change password</a></p>";

        await _emailSender.SendEmailAsync(user.Email, "Account Recovery", message);

        return Ok("Email recovery link sent");
    }

    [AllowAnonymous]
    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
    {
        var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
        if (user == null) return Unauthorized();
        var decodedTokenByBytes = WebEncoders.Base64UrlDecode(resetPasswordDto.Token);
        var decodedToken = Encoding.UTF8.GetString(decodedTokenByBytes);
        var result = await _userManager.ResetPasswordAsync(user, decodedToken, resetPasswordDto.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        return Ok("Password changed - you can login now");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Email == User.FindFirstValue(ClaimTypes.Email));
        await SetRefreshToken(user);
        return CreateUserObject(user);
    }


    [Authorize]
    [HttpPost("refreshToken")]
    public async Task<ActionResult<UserDto>> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        var user = await _userManager.Users.Include(r => r.RefreshTokens)
            .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

        if (user == null)
            return Unauthorized();
        var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

        if (oldToken is { IsActive: false }) return Unauthorized();

        return CreateUserObject(user);
    }

    private UserDto CreateUserObject(AppUser user)
    {
        var userDto = new UserDto
        {
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user),
            UserName = user.UserName,
            Role = user.Role
        };


        return userDto;
    }

    private async Task SetRefreshToken(AppUser user)
    {
        var refreshToken = _tokenService.GenerateRefreshToken();
        user.RefreshTokens.Add(refreshToken);

        await _userManager.UpdateAsync(user);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires
        };

        Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
    }
}