using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ParentsSite
{
    public class AuthOptions
    {
        public const string ISSUER = "http://localhost:64065/"; // издатель токена
        public const string AUDIENCE = "http://localhost:64065/"; // потребитель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
