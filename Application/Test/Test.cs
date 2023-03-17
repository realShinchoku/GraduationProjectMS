using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Test;

public class TestUpload
{
    public class Command : IRequest<Result<string>>
    {
        public IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<string>>
    {
        private readonly ICloudStorageAccessor _cloudStorage;

        public Handler(ICloudStorageAccessor cloudStorage)
        {
            _cloudStorage = cloudStorage;
        }

        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var fileUploadResult = await _cloudStorage.UploadFileAsync(request.File, cancellationToken);
            if (fileUploadResult == null)
                return Result<string>.Failure("Error while uploading file");
            return Result<string>.Success(fileUploadResult.FileName);
        }
    }
}