using realworld.spaf.Models;
using System.Threading.Tasks;

namespace realworld.spaf.Services
{
    public interface IProfileResources
    {
        Task<Profile> Get(string username);
    }
}
