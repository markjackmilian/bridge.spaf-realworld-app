using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models;

namespace realworld.spaf.Services.impl
{
    class ArticleResources : IArticleResources
    {
        private readonly ISettings _settings;

        public ArticleResources(ISettings settings)
        {
            _settings = settings;
        }

        public Task<ArticleResponse> GetArticles(ArticleRequestBuilder builder)
        {
            var url = $"{this._settings.ApiUri}/{builder.Build()}";
            
            return Task.FromPromise<ArticleResponse>(jQuery.Ajax(new AjaxOptions
                {
                    Url = url,
                    Type = "GET",
                    DataType = "json",
                    CrossDomain = true
                })
                , (Func<object, string, jqXHR, ArticleResponse>) ((resObj, success, jqXhr) =>
                {
                    var json = JSON.Stringify(resObj);
                    var obj = JsonConvert.DeserializeObject<ArticleResponse>(json);
                    return obj;
                }));
           
        }

        public Task<TagsResponse> GetTags()
        {
            var url = $"{this._settings.ApiUri}/tags";
            
            return Task.FromPromise<TagsResponse>(jQuery.Ajax(new AjaxOptions
                {
                    Url = url,
                    Type = "GET",
                    DataType = "json",
                    CrossDomain = true
                })
                , (Func<object, string, jqXHR, TagsResponse>) ((resObj, success, jqXhr) =>
                {
                    var json = JSON.Stringify(resObj);
                    var obj = JsonConvert.DeserializeObject<TagsResponse>(json);
                    return obj;
                }));
        }
    }
}