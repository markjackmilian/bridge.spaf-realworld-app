using System.Collections.Generic;
using System.Threading.Tasks;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;
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

        /// <summary>
        /// Get Single Article
        /// </summary>
        /// <param name="slug"></param>
        /// <returns></returns>
        Task<SingleArticleResponse> GetArticle(string slug);

        /// <summary>
        /// Favourite article
        /// </summary>
        /// <param name="slug"></param>
        /// <returns></returns>
        Task<SingleArticleResponse> Favorite(string slug);
        
        /// <summary>
        /// Unfavourite article
        /// </summary>
        /// <param name="slug"></param>
        /// <returns></returns>
        Task<SingleArticleResponse> UnFavorite(string slug);

        /// <summary>
        /// Create a new Article
        /// </summary>
        /// <param name="newArticle"></param>
        /// <returns></returns>
        Task<SingleArticleResponse> Create(NewArticleRequest newArticle);
        
        /// <summary>
        /// Get comments for article
        /// </summary>
        /// <param name="slug"></param>
        /// <returns></returns>
        Task<CommentsResponse> GetArticleComments(string slug);

        /// <summary>
        /// Add a comment to a article
        /// </summary>
        /// <param name="slug"></param>
        /// <param name="comment"></param>
        /// <returns></returns>
        Task<SingleCommentResponse> AddComment(string slug, string comment);
        

    }
}