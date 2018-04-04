using System.Threading.Tasks;
using realworld.spaf.Models;

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


        /// <summary>
        /// Try auto login using stored token (if exist)
        /// </summary>
        /// <returns></returns>
        Task TryAutoLoginWithStoredToken();
    }
}