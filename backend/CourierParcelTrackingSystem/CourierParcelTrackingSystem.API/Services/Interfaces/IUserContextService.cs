public interface IUserContextService
{
    int UserId { get; }

    string UserName { get; }

    string Role { get; }

    string GetAuditUser();
}