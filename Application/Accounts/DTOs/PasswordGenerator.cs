using System.Text;
using System.Text.RegularExpressions;

namespace Application.Accounts.DTOs;

public static class PasswordGenerator
{
    private const string Chars = "0123456789ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnpqrstuvwxyz";
    private static readonly Regex PasswordRegex = new("^(?=.*[0-9]+.*)(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[!-z]{6,20}");
    public static string GeneratePassword()
    {
        while (true)
        {
            var random = new Random();
            var len = random.Next(6, 20);
            var bld = new StringBuilder();
            for (var i = 0; i < len; ++i) bld.Append(Chars[random.Next(Chars.Length)]);

            var randomStr = bld.ToString();
            if (!PasswordRegex.IsMatch(randomStr)) continue;
            return randomStr;
        }
    }
}