using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Spaf;
using realworld.spaf.Models;
using realworld.spaf.Services;
using realworld.spaf.Services.impl;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    class HomeViewModel : LoadableViewModel
    {
        private readonly IArticleResources _resources;
        protected override string ElementId() => SpafApp.HomeId;

        public KnockoutObservableArray<Article> Articles;

        public HomeViewModel(IArticleResources resources)
        {
            _resources = resources;
            this.Articles = ko.observableArray.Self<Article>();
        }

        public override async void OnLoad(Dictionary<string, object> parameters)
        {
            base.OnLoad(parameters);

            var articleResoResponse = await this._resources.GetArticles(ArticleRequestBuilder.Default());
            this.Articles.push(articleResoResponse.Articles);
        }
    }
}
