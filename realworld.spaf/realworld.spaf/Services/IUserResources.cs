using System.Threading.Tasks;
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
        Task<Loginresponse> Login(Loginrequest loginRequest);
    }
}