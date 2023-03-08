using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface ICloudStorageAccessor
{
    Task<string> UploadFileAsync(IFormFile file, CancellationToken cancellationToken = default(CancellationToken));
    Task DeleteFileAsync(string fileId);
}