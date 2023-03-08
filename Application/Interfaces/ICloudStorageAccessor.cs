using Infrastructure.Files;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface ICloudStorageAccessor
{
    Task<FileUploadResult> UploadFileAsync(IFormFile file, CancellationToken cancellationToken = default);
    Task<bool> DeleteFileAsync(string fileId, CancellationToken cancellationToken = default);
}