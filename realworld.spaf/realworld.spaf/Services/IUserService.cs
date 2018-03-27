using System.Threading.Tasks;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;

namespace realworld.spaf.Services
{
    public interface IUserService
    {
        User LoggedUser { get; }
        bool IsLogged { get; }
        
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="mail"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Task Login(string mail, string password);
        
        /// <summary>
        /// Register new user
        /// </summary>
        /// <param name="username"></param>
        /// <param name="mail"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Task Register(string username, string mail, string password);
        Task UpdateSettings(string username, string newPassword, string biography, string email, string imageUri);
    }
}