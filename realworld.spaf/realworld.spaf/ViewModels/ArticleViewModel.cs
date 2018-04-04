using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.Navigation;
using Bridge.Spaf;
using realworld.spaf.Classes;
using realworld.spaf.Models;
using realworld.spaf.Services;
using Retyped;
using static Retyped.knockout;
using Comment = realworld.spaf.Models.Comment;

namespace realworld.spaf.ViewModels
{
    class ArticleViewModel : LoadableViewModel
    {
        public override string ElementId() => SpafApp.ArticleId;

        private readonly IArticleResources _articleResources;
        private readonly IUserService _userService;
        private readonly INavigator _navigator;
        private readonly IProfileResources _profileResources;

        public Article Article { get; set; }
        public KnockoutObservableArray<Comment> Comments { get; set; }
        public KnockoutObservable<string> Comment { get; set; }
        
        public bool IsLogged => this._userService.IsLogged;
        public User LoggedUser => this._userService.LoggedUser;

        public ArticleViewModel(IArticleResources articleResources, IUserService userService, 
            INavigator navigator, IProfileResources profileResources)
        {
            _articleResources = articleResources;
            _userService = userService;
            _navigator = navigator;
            _profileResources = profileResources;

            this.Article = new Article();
            this.Comments = ko.observableArray.Self<Comment>();
            this.Comment = ko.observable.Self<string>();
        }

        public override async void OnLoad(Dictionary<string, object> parameters)
        {
            base.OnLoad(parameters);

            var slug = parameters.GetParameter<string>("slug");
            if(string.IsNullOrEmpty(slug))
                throw new Exception("Article page need slug parameter");
            
            var articleTask = this.LoadArticle(slug);
            var commentsTask = this.LoadComments(slug);
            await Task.WhenAll(articleTask,commentsTask);
            
            this.RefreshBinding(); // manual refresh for performance
            this._navigator.EnableSpafAnchors(); // todo check why not auto enabled
        }

        /// <summary>
        /// Add comment to article
        /// </summary>
        /// <returns></returns>
        public async Task AddComment()
        {
            if (!this.IsLogged) return;
            
            var commentResponse = await this._articleResources.AddComment(this.Article.Slug, this.Comment.Self());
            this.Comment.Self(string.Empty);
            this.Comments.push(commentResponse.Comment);
        }

        /// <summary>
        /// Follow Article Author
        /// </summary>
        /// <returns></returns>
        public async Task FollowAuthor()
        {
            await this._profileResources.Follow(this.Article.Author.Username);
        }
        
        /// <summary>
        /// Manual revaluate binding
        /// </summary>
        private void RefreshBinding()
        {
            ko.cleanNode(this.PageNode);
            base.ApplyBindings();
        }

        /// <summary>
        /// Load comments
        /// </summary>
        /// <param name="slug"></param>
        /// <returns></returns>
        private async Task LoadComments(string slug)
        {
            var comment = await this._articleResources.GetArticleComments(slug);
            this.Comments.push(comment.Comments);
        }

        /// <summary>
        /// Load Article info
        /// </summary>
        /// <param name="slug"></param>
        /// <returns></returns>
        private async Task LoadArticle(string slug)
        {
            var article = await this._articleResources.GetArticle(slug);
            this.Article = article.Article;
        }
    }
}