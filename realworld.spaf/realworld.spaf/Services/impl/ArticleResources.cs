using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class ArticleResources : AuthorizedResourceBase, IArticleResources
    {
        private readonly ISettings _settings;

        public ArticleResources(ISettings settings, IUserService userService) : base(userService)
        {
            _settings = settings;
        }

        public Task<ArticleResponse> GetArticles(ArticleRequestBuilder builder)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/{builder.Build()}",
                Type = "GET",
                DataType = "json",
            };

            return this.UserService.IsLogged
                ? base.MakeAuthorizedCall<ArticleResponse>(options)
                : this.MakeCall<ArticleResponse>(options);
        }

        public Task<TagsResponse> GetTags()
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/tags",
                Type = "GET",
                DataType = "json"
            };
            
            return base.MakeCall<TagsResponse>(options);
        }

        public Task<SingleArticleResponse> GetArticle(string slug)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/articles/{slug}",
                Type = "GET",
                DataType = "json"
            };
            
            return base.MakeCall<SingleArticleResponse>(options);
        }

        public Task<SingleArticleResponse> Favorite(string slug)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/articles/{slug}/favorite",
                Type = "POST",
                DataType = "json",
                ContentType = "application/json"
            };
            
            return base.MakeAuthorizedCall<SingleArticleResponse>(options);
        }

        public Task<SingleArticleResponse> UnFavorite(string slug)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/articles/{slug}/favorite",
                Type = "DELETE",
                DataType = "json",
                ContentType = "application/json"
            };
            
            return base.MakeAuthorizedCall<SingleArticleResponse>(options);
        }
    }
    
}