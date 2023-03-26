using System.Security.Claims;
using System.Text;
using API.DTOs;
using API.Services;
using Application.Accounts;
using Application.Accounts.DTOs;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

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

        return CreateUserObject(user);
    }

    [Authorize(Policy = "IsFacultyOffice")]
    [HttpPost("student")]
    public async Task<IActionResult> CreateStudent([FromForm] CreateStudent.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }

    [Authorize(Policy = "IsFacultyOffice")]
    [HttpPost("lecturer")]
    public async Task<ActionResult> CreateLecture(CreateLectureDto createLectureDto)
    {
        return HandleResult(await Mediator.Send(new CreateLecture.Command { CreateLectureDto = createLectureDto }));
    }

    [Authorize(Policy = "IsFacultyOffice")]
    [HttpPost("departmentSubject")]
    public async Task<IActionResult> CreateDepartmentSubject(CreateDepartmentSubjectDto createDepartmentSubjectDto)
    {
        return HandleResult(await Mediator.Send(new CreateDepartmentSubject.Command { CreateDepartmentSubjectDto = createDepartmentSubjectDto }));
    }


    [Authorize]
    [HttpPut("changePassword")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto passwordDto)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Email == User.FindFirstValue(ClaimTypes.Email));

        var result = await _userManager.ChangePasswordAsync(user, passwordDto.OldPassword, passwordDto.NewPassword);

        if (!result.Succeeded)
            return Conflict("Sai mật khẩu");
        return Ok("Dổi mật khẩu thành công");
    }

    [AllowAnonymous]
    [HttpPost("sendResetPasswordLink")]
    public async Task<IActionResult> SendResetPassword(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return Unauthorized("Email không tồn tại");

        var origin = Request.Headers["origin"];
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        var verifyUrl = $"{origin}/account/password_reset/with?token={token}&email={user.Email}";
        var message =
            $"<p>Vui lòng ấn vào link phía dưới:</p><p><a href='{verifyUrl}'>Phục hồi</a></p>";

        await _emailSender.SendEmailAsync(user.Email, "Phục hồi tài khoản", message);

        return Ok("Email phục hồi tài khoản");
    }

    [AllowAnonymous]
    [HttpPut("resetPassword")]
    public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
    {
        var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
        if (user == null) return Unauthorized();
        var decodedTokenByBytes = WebEncoders.Base64UrlDecode(resetPasswordDto.Token);
        var decodedToken = Encoding.UTF8.GetString(decodedTokenByBytes);
        var result = await _userManager.ResetPasswordAsync(user, decodedToken, resetPasswordDto.Password);

        if (!result.Succeeded) return BadRequest("Có lỗi xảy ra vui lòng thử lại");

        return Ok("Thay đổi mật khẩu thành công, hãy đăng nhập");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(
            x => x.Email == User.FindFirstValue(ClaimTypes.Email));
        return CreateUserObject(user);
    }

    private UserDto CreateUserObject(AppUser user)
    {
        return new UserDto
        {
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user),
            UserName = user.UserName,
            Role = user.Role,
            Email = user.Email
        };
        ;
    }
}