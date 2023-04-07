namespace Domain;

public class Notification
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public Student Student { get; set; }
    public string InfoTitle { get; set; }
    public List<Info> Infos { get; set; }
    public bool IsRead { get; set; }
}

public class Info
{
    public string Key { get; set; }
    public string Value { get; set; }
}