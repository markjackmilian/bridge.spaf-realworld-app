using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bridge.Navigation;
using Bridge.Spaf;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;
using realworld.spaf.Services;
using Retyped;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    class EditArticleViewModel : LoadableViewModel
    {
        private readonly IArticleResources _articleResources;
        private readonly INavigator _navigator;
        public override string ElementId() => SpafApp.EditArticleId;

        public KnockoutObservable<string> Title { get; set; }
        public KnockoutObservable<string> Body { get; set; }
        public KnockoutObservable<string> Description { get; set; }
        public KnockoutObservable<string> Tags { get; set; }
        
        public EditArticleViewModel(IArticleResources articleResources, INavigator navigator)
        {
            _articleResources = articleResources;
            _navigator = navigator;
            this.Title = ko.observable.Self<string>();
            this.Body = ko.observable.Self<string>();
            this.Description = ko.observable.Self<string>();
            this.Tags = ko.observable.Self<string>();
        }


        public override void OnLoad(Dictionary<string, object> parameters)
        {
            base.OnLoad(parameters);

//            var articleSlug = parameters.GetParameter<string>("slug");
//            if(string.IsNullOrEmpty(articleSlug))
//                throw new Exception("Slug missing!");
            
        }


        public async Task Create()
        {
            // todo validations
            var newArticel = new NewArticleRequest
            {
                Article = new NewArticle
                {
                    Title = this.Title.Self(),
                    Body = this.Body.Self(),
                    Description = this.Description.Self(),
                    TagList = this.Tags.Self().Split(',').ToArray()
                }
            };

            var article = await this._articleResources.Create(newArticel);
            this._navigator.Navigate(SpafApp.ArticleId,new Dictionary<string, object>()
            {
                {"slug",article.Article.Slug}
            });
        }
    }
}