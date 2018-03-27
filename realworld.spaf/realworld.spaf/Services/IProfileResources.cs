using System.Threading.Tasks;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services
{
    public interface IProfileResources
    {
        /// <summary>
        /// Start follow user
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        Task<FollowResponse> Follow(string username);
    }
}