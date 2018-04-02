using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.Messenger;
using Bridge.Navigation;
using Bridge.Spaf;
using Bridge.Spaf.Attributes;
using realworld.spaf.Classes;
using realworld.spaf.Models;
using realworld.spaf.Models.Response;
using realworld.spaf.Services;
using realworld.spaf.Services.impl;
using Retyped;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    class HomeViewModel : LoadableViewModel
    {
        public override string ElementId() => SpafApp.HomeId;

        private string _tagFilter = null; // tag filter
        
        private readonly IArticleResources _resources;
        private readonly ISettings _settings;
        private readonly IMessenger _messenger;
        private readonly IUserService _userService;
        private readonly IFeedResources _feedResources;
        private readonly INavigator _navigator;

        #region KNOCKOUTJS
        
        public KnockoutObservableArray<Article> Articles; // articles
        public KnockoutObservableArray<Paginator> Pages; // paginator helper
        public KnockoutObservableArray<string> Tags; // tags
        public KnockoutObservable<int> ActiveTabIndex; // tab active index
        public KnockoutObservableArray<string> Tabs;
        public KnockoutObservable<bool> IsLogged;
        
        #endregion
      

        public HomeViewModel(IArticleResources resources, ISettings settings, IMessenger messenger,
            IUserService userService, IFeedResources feedResources, INavigator navigator)
        {
            _resources = resources;
            _settings = settings;
            _messenger = messenger;
            _userService = userService;
            _feedResources = feedResources;
            _navigator = navigator;
            this.Articles = ko.observableArray.Self<Article>();
            this.Pages = ko.observableArray.Self<Paginator>();
            this.Tags = ko.observableArray.Self<string>();
            this.Tabs = ko.observableArray.Self<string>();
            this.IsLogged = ko.observable.Self<bool>(this._userService.IsLogged);
            this.ActiveTabIndex = ko.observable.Self<int>(-1);
            
        }

        public override async void OnLoad(Dictionary<string, object> parameters)
        {
            base.OnLoad(parameters); // always call base (where applybinding)

            var articlesTask = this.LoadArticles(ArticleRequestBuilder.Default().WithLimit(this._settings.ArticleInPage)); // load article task
            var loadTagsTask = this.LoadTags();
            await Task.WhenAll(articlesTask,loadTagsTask);
            this.RefreshPaginator(articlesTask.Result);
        }

        public override void OnLeave()
        {
            base.OnLeave();
            this._messenger.Unsubscribe<UserService>(this, SpafApp.LoginId);
        }


        #region KNOCKOUT METHODS

        /// <summary>
        /// Navigate to user detail
        /// </summary>
        /// <param name="article"></param>
        public void GoToUser(Article article)
        {
            this._navigator.Navigate(SpafApp.ProfileId, new Dictionary<string, object>()
            {
                {"username",article.Author.Username}
            });
        }
        
        /// <summary>
        /// Navigate to article detail
        /// </summary>
        /// <param name="article"></param>
        public void GoToArticle(Article article)
        {
            this._navigator.Navigate(SpafApp.ArticleId,new Dictionary<string, object>
            {
                {"slug",article.Slug}
            });
        }

        /// <summary>
        /// Add passed article to fav
        /// Only for auth users
        /// </summary>
        /// <param name="article"></param>
        /// <returns></returns>
        public async Task AddToFavourite(Article article)
        {
            if (!this.IsLogged.Self()) return;

            var singleArticle = article.Favorited ? await this._resources.UnFavorite(article.Slug) : 
                await this._resources.Favorite(article.Slug);
            
            this.Articles.replace(article,singleArticle.Article);
        }

        /// <summary>
        /// Go to user feed
        /// </summary>
        /// <returns></returns>
        public async Task ResetTabsForFeed()
        {
            this.ActiveTabIndex.Self(-2);
            this.Tabs.removeAll();
            this._tagFilter = null;
            var articleResponse = await this.LoadFeed(FeedRequestBuilder.Default().WithLimit(this._settings.ArticleInPage));
            this.RefreshPaginator(articleResponse);
        }
        
        /// <summary>
        /// Reset Tab
        /// </summary>
        /// <returns></returns>
        public async Task ResetTabs()
        {
            this.ActiveTabIndex.Self(-1);
            this.Tabs.removeAll();
            this._tagFilter = null;
            var articleResponse = await this.LoadArticles(ArticleRequestBuilder.Default().WithLimit(this._settings.ArticleInPage));
            this.RefreshPaginator(articleResponse);
        }

        /// <summary>
        /// Go to page
        /// </summary>
        /// <param name="paginator"></param>
        /// <returns></returns>
        public async Task GoToPage(Paginator paginator)
        {
            this.Pages.Self().Single(s => s.Active.Self()).Active.Self(false);
            paginator.Active.Self(true);
            
            var request = ArticleRequestBuilder.Default()
                .WithOffSet((paginator.Page-1)*this._settings.ArticleInPage)
                .WithLimit(this._settings.ArticleInPage);

            if (!string.IsNullOrEmpty(this._tagFilter))
                request = request.WithTag(this._tagFilter);

            await this.LoadArticles(request);
        }

        /// <summary>
        /// Filter articles by tag
        /// </summary>
        /// <param name="tag"></param>
        /// <returns></returns>
        public async Task FilterByTag(string tag)
        {
            var tabName = $"#{tag}";
            await this.ArticlesForTab(tabName);
        }

        /// <summary>
        /// Load articles for passed tab
        /// </summary>
        /// <param name="tab"></param>
        /// <returns></returns>
        public async Task ArticlesForTab(string tab)
        {
            var tagName = tab.TrimStart('#');
            this._tagFilter = tagName;

            var actualIndex = this.Tabs.Self().IndexOf(tab);
            
            if(actualIndex == -1)
                this.Tabs.push(tab);
            
            this.ActiveTabIndex.Self(this.Tabs.Self().IndexOf(tab));

            var articles = await this.LoadArticles(ArticleRequestBuilder.Default()
                .WithTag(tagName)
                .WithLimit(this._settings.ArticleInPage));
            this.RefreshPaginator(articles);
        }
        
        #endregion

        #region PRIVATE METHODS

        /// <summary>
        /// Load articles
        /// Clear list and reload
        /// </summary>
        /// <returns></returns>
        private async Task<ArticleResponse> LoadArticles(ArticleRequestBuilder request)
        {
            var articleResoResponse = await this._resources.GetArticles(request);
            this.Articles.removeAll();
            this.Articles.push(articleResoResponse.Articles);
            return articleResoResponse;
        }
        
        /// <summary>
        /// Load feed
        /// Clear list and reload
        /// </summary>
        /// <returns></returns>
        private async Task<ArticleResponse> LoadFeed(FeedRequestBuilder request)
        {
            var feedResponse = await this._feedResources.GetFeed(request);
            this.Articles.removeAll();
            this.Articles.push(feedResponse.Articles);
            return feedResponse;
        }

        /// <summary>
        /// Reload tags
        /// </summary>
        /// <returns></returns>
        private async Task LoadTags()
        {
            var tags = await this._resources.GetTags();
            this.Tags.removeAll();
            this.Tags.push(tags.Tags);
        }
        
        /// <summary>
        /// When update articles rebuild paginator
        /// </summary>
        /// <param name="articleResoResponse"></param>
        private void RefreshPaginator(ArticleResponse articleResoResponse)
        {
            this.Pages.removeAll();

            if (!articleResoResponse.Articles.Any()) return; // no articles
            
            var pagesCount = (int) (articleResoResponse.ArticlesCount / articleResoResponse.Articles.Length);
            var range = Enumerable.Range(1, pagesCount);
            var pages = range.Select(s => new Paginator
            {
                Page = s
            }).ToArray();
            pages[0].Active.Self(true);
            this.Pages.push(pages);
        }

        #endregion
       
    }
}
