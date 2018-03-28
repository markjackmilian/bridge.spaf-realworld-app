using System.Threading.Tasks;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services
{
    public interface IUserResources
    {
        /// <summary>
        /// Request login
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        Task<SignResponse> Login(SignRequest loginRequest);
        
        /// <summary>
        /// Register User
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        Task<SignResponse> Register(SignRequest loginRequest);
    }
}