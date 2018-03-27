using System.Threading.Tasks;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services
{
    public interface ICommentResources
    {
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