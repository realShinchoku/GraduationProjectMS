namespace Domain;

public class PopupNotification
{
    public Guid Id { get; set; }
    public string Message { get; set; }
    public AppUser TargetUser { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; }
}