using Application.Core;
using Application.Interfaces;
using MediatR;

namespace Application.Test;

public class TestDelete
{
    public class Command : IRequest<Result<Unit>>
    {
        public string FileId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly ICloudStorageAccessor _cloudStorage;

        public Handler(ICloudStorageAccessor cloudStorage)
        {
            _cloudStorage = cloudStorage;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var result = await _cloudStorage.DeleteFileAsync(request.FileId, cancellationToken);
            if (!result)
                return Result<Unit>.Failure("Failed to delete file");
            return Result<Unit>.Success(Unit.Value);
        }
    }
}