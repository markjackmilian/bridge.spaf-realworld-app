using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class ArticleResources : ResourceBase, IArticleResources
    {
        private readonly ISettings _settings;

        public ArticleResources(ISettings settings)
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

            return base.MakeCall<ArticleResponse>(options);
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
       
    }
    
}