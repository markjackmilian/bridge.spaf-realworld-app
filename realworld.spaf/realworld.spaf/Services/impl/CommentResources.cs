using System.Threading.Tasks;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class CommentResources : AuthorizedResourceBase,ICommentResources
    {
        private readonly ISettings _settings;

        public CommentResources(ISettings settings, IUserService userService) : base(userService)
        {
            _settings = settings;
        }
        
        public Task<CommentsResponse> GetArticleComments(string slug)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/articles/{slug}/comments",
                Type = "GET",
                DataType = "json"
            };
            
            return base.MakeCall<CommentsResponse>(options);
        }

        public Task AddComment(string slug, string comment)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/articles/{slug}/comments",
                Type = "POST",
                DataType = "json",
                ContentType = "application/json",
                Data = JsonConvert.SerializeObject(new Comment
                {
                    Body = comment
                })
            };
            
            return base.MakeAuthorizedCall<SingleCommentResponse>(options);
        }

    }
}