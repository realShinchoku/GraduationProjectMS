using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface ICloudStorageAccessor
{
    Task<string> UploadFileAsync(IFormFile file);
    Task DeleteFileAsync(string fileId);
}