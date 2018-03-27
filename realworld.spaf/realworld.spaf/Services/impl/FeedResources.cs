using System.Threading.Tasks;
using Bridge.jQuery2;
using realworld.spaf.Classes;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class FeedResources : AuthorizedResourceBase, IFeedResources
    {
        private readonly ISettings _settings;

        public FeedResources(ISettings settings, IUserService userService) : base(userService)
        {
            _settings = settings;
        }
        
        public Task<ArticleResponse> GetFeed(FeedRequestBuilder builder)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/{builder.Build()}",
                Type = "GET",
                DataType = "json",
            };

            return base.MakeCall<ArticleResponse>(options);
        }

    }
}