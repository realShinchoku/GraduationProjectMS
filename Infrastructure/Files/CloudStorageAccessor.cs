using Application.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Storage.v1;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Object = Google.Apis.Storage.v1.Data.Object;

namespace Infrastructure.Files;

public class CloudStorageAccessor : ICloudStorageAccessor
{
    private readonly Object _destination;
    private readonly StorageClient _storageClient;

    public CloudStorageAccessor(IOptions<GoogleCredentialSettings> config)
    {
        _destination = new Object
        {
            Bucket = config.Value.BucketName
        };

        _storageClient = new StorageClientImpl(new StorageService(new BaseClientService.Initializer
        {
            ApplicationName = "DriveService",
            HttpClientInitializer = GoogleCredential.FromJsonParameters(new JsonCredentialParameters
                {
                    ClientSecret = config.Value.ClientSecret,
                    ClientId = config.Value.ClientId,
                    ClientEmail = config.Value.ClientEmail,
                    PrivateKey = config.Value.PrivateKey,
                    PrivateKeyId = config.Value.PrivateKeyId,
                    ProjectId = config.Value.ProjectId,
                    Type = config.Value.Type,
                    TokenUrl = config.Value.TokenUri,
                })
                .CreateScoped(StorageService.Scope.DevstorageFullControl)
        }));
    }

    public async Task<FileUploadResult> UploadFileAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        try
        {
            var fileName = Guid.NewGuid().ToString() + '_' + file.FileName;
            _destination.Name = fileName;
            _destination.ContentType = file.ContentType;
            await using var stream = file.OpenReadStream();
            var response = await _storageClient.UploadObjectAsync(_destination, stream,
                new UploadObjectOptions { PredefinedAcl = PredefinedObjectAcl.PublicRead }, cancellationToken);
            return new FileUploadResult
            {
                FileName = fileName,
                PublicUrl = response.MediaLink
            };
        }
        catch
        {
            return null;
        }
    }

    public async Task<bool> DeleteFileAsync(string fileId, CancellationToken cancellationToken = default)
    {
        try
        {
            _destination.Name = fileId;
            await _storageClient.DeleteObjectAsync(_destination, cancellationToken: cancellationToken);
            return true;
        }
        catch
        {
            return false;
        }
    }
}