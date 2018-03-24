using System.Collections.Generic;
using System.Threading.Tasks;
using realworld.spaf.Models;

namespace realworld.spaf.Services
{
    public interface IApiResources
    {
        Task<ArticleResponse> GetArticles();
    }
}