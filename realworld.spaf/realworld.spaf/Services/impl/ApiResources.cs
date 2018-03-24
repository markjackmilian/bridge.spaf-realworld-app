using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.jQuery2;
using realworld.spaf.Models;

namespace realworld.spaf.Services.impl
{
    class ApiResources : IApiResources
    {
        private readonly ISettings _settings;

        public ApiResources(ISettings settings)
        {
            _settings = settings;
        }

        public Task<ArticleResponse> GetArticles()
        {
            return Task.FromPromise<ArticleResponse>(jQuery.Ajax(new AjaxOptions
                {
                    Url = $"{this._settings.ApiUri}/articles",
                    Type = "GET",
                    DataType = "json",
                    CrossDomain = true
                })
                , (Func<object, string, jqXHR, ArticleResponse>) ((resObj, success, jqXhr) =>
                {
                    var json = JSON.Stringify(resObj);
                    var obj = JSON.Parse<ArticleResponse>(json);
                    return obj;
                }));
           
        }
    }
}