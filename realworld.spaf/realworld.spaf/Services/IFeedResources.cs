using System.Threading.Tasks;
using realworld.spaf.Classes;
using realworld.spaf.Models.Response;
using realworld.spaf.Services.impl;

namespace realworld.spaf.Services
{
    public interface IFeedResources
    {
        /// <summary>
        /// Get user feed
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        Task<ArticleResponse> GetFeed(FeedRequestBuilder builder);
    }
}