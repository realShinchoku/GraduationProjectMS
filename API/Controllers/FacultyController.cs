using Application.Faculties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class FacultyController : BaseApiController
{
    [HttpPost("lecturer/assign")] //api/lecturer
    public async Task<IActionResult> AssignLecturer(string studentId, string lecturerId)
    {
        return HandleResult(await Mediator.Send(new AssignLecturer.Command{StudentId = studentId, LecturerId = lecturerId}));
    }
    [HttpPost("lecturer/confirm")] //api/lecturer
    public async Task<IActionResult> ConfirmLecturer(string studentId, string lecturerId)
    {
        return HandleResult(await Mediator.Send(new ConfirmLecturer.Command{StudentId = studentId, LecturerId = lecturerId}));
    }
}