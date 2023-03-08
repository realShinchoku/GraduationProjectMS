using Application.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Download;
using Google.Apis.Services;
using Google.Apis.Storage.v1;
using Google.Apis.Storage.v1.Data;
using Google.Apis.Upload;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Files;

public class CloudStorageAccessor : ICloudStorageAccessor
{
    private readonly StorageClient _storageClient;
    private readonly Google.Apis.Storage.v1.Data.Object _destination;

    public CloudStorageAccessor(IOptions<GoogleCredentialSettings> config)
    {
        _destination = new Google.Apis.Storage.v1.Data.Object
        {
            Bucket = config.Value.BucketName,
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
    public async Task<string> UploadFileAsync(IFormFile file)
    {
        _destination.Name = file.FileName;
        _destination.ContentType = file.ContentType;
        await using var stream = file.OpenReadStream();
        var request = await _storageClient.UploadObjectAsync(_destination, stream, new UploadObjectOptions{PredefinedAcl = PredefinedObjectAcl.PublicRead});
        
        return request.MediaLink;
    }

    public async Task DeleteFileAsync(string fileId)
    {
        _destination.Id = fileId;
        await _storageClient.DeleteObjectAsync(_destination);
    }
}