using System.Collections.Generic;
using System.Threading.Tasks;
using realworld.spaf.Models;
using realworld.spaf.Models.Response;
using realworld.spaf.Services.impl;

namespace realworld.spaf.Services
{
    public interface IArticleResources
    {
        /// <summary>
        /// Get Articles
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        Task<ArticleResponse> GetArticles(ArticleRequestBuilder builder);
        

        /// <summary>
        /// Get popular tags
        /// </summary>
        /// <returns></returns>
        Task<TagsResponse> GetTags();
    }
}