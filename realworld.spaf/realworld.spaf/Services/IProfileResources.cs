using realworld.spaf.Models;
using realworld.spaf.Models.Response;
using System.Threading.Tasks;

namespace realworld.spaf.Services
{
    public interface IProfileResources
    {
        Task<ProfileResponse> Get(string username);
    }
}
