using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.Navigation;
using Bridge.Spaf;
using realworld.spaf.Models;
using realworld.spaf.Services;
using Retyped;
using static Retyped.knockout;
using Comment = realworld.spaf.Models.Comment;

namespace realworld.spaf.ViewModels
{
    class ArticleViewModel : LoadableViewModel
    {
        private readonly IArticleResources _articleResources;
        private readonly IUserService _userService;
        private readonly INavigator _navigator;
        private readonly ICommentResources _commentResources;
        private readonly IProfileResources _profileResources;
        protected override string ElementId() => SpafApp.ArticleId;

        public Article Article { get; set; }
        public KnockoutObservableArray<Comment> Comments { get; set; }
        public bool IsLogged => this._userService.IsLogged;
        public User LoggedUser => this._userService.LoggedUser;

        public ArticleViewModel(IArticleResources articleResources, IUserService userService, 
            INavigator navigator, ICommentResources commentResources, IProfileResources profileResources)
        {
            _articleResources = articleResources;
            _userService = userService;
            _navigator = navigator;
            _commentResources = commentResources;
            _profileResources = profileResources;

            this.Article = new Article();
            this.Comments = ko.observableArray.Self<Comment>();
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
            var comment = await this._commentResources.GetArticleComments(slug);
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