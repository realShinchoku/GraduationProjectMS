using Application.Faculties;
using Application.Faculties.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class FacultyController : BaseApiController
{

}