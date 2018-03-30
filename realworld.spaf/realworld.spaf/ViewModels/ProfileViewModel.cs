using System;
using Bridge.Spaf;
using realworld.spaf.Models;
using realworld.spaf.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bridge.Messenger;
using Bridge.Navigation;
using realworld.spaf.Services.impl;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    class ProfileViewModel : LoadableViewModel
    {
        protected override string ElementId() => SpafApp.ProfileId;

        private readonly IProfileResources _profileResource;
        private readonly IUserService _userService;
        private readonly IArticleResources _articleResources;
        private readonly INavigator _navigator;
        private readonly IMessenger _messenger;

        public ProfileModel ProfileModel { get; set; }
        public KnockoutObservable<int> ActiveTabIndex; // tab active index
        public KnockoutObservable<bool> IsLogged { get; set; }


        public ProfileViewModel(IProfileResources profileResource, IUserService userService, 
            IArticleResources articleResources, INavigator navigator, IMessenger messenger)
        {
            this.ProfileModel = new ProfileModel();
            this._profileResource = profileResource;
            _userService = userService;
            _articleResources = articleResources;
            _navigator = navigator;
            _messenger = messenger;

            this.ActiveTabIndex = ko.observable.Self<int>(0);
            this.IsLogged = ko.observable.Self<bool>(this._userService.IsLogged);
            
            this._messenger.Subscribe<UserService>(this,SpafApp.Messages.LoginDone, service =>
            {
                this.IsLogged.Self(true);
            });

        }

        public override async void OnLoad(Dictionary<string, object> parameters)
        {
            base.OnLoad(parameters);
            var username = string.Empty;
            try
            {
                username = parameters.GetParameter<string>("username");
            }
            catch
            {
                if(!this._userService.IsLogged)
                    throw new Exception("No username passed and you are not logged!");
                
                username = this._userService.LoggedUser.Username;
            }

            var userTask = this.LoadUser(username);
            var articleTask = this.LoadArticles(username);
            var favouriteTask = this.LoadFavouritesArticles(username);

            await Task.WhenAll(userTask, articleTask, favouriteTask);
            this.ProfileModel.ShowArticles();
        }
        
        
        public override void OnLeave()
        {
            base.OnLeave();
            this._messenger.Unsubscribe<UserService>(this, SpafApp.LoginId);
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

            var singleArticle = article.Favorited ? await this._articleResources.UnFavorite(article.Slug) : 
                await this._articleResources.Favorite(article.Slug);
            
            this.ProfileModel.Articles.replace(article,singleArticle.Article);
        }

        /// <summary>
        /// Follow / unfollow
        /// </summary>
        /// <returns></returns>
        public async Task Follow()
        {
            var username = this.ProfileModel.Username.Self();
            var follow = this.ProfileModel.Following.Self() ? await this._profileResource.UnFollow(username) 
                : await this._profileResource.Follow(username);
            this.ProfileModel.Following.Self(follow.Profile.Following);
        }
        
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
        /// Show user articles
        /// </summary>
        public void ShowArticles()
        {
            this.ActiveTabIndex.Self(0);
            this.ProfileModel.ShowArticles();
        }

        /// <summary>
        /// Show favs
        /// </summary>
        public void ShowFavourites()
        {
            this.ActiveTabIndex.Self(1);
            this.ProfileModel.ShowFavourites();
        }

        /// <summary>
        /// Load user data
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        private async Task LoadUser(string username)
        {
            var profileResponse = await this._profileResource.Get(username);
            this.ProfileModel.MapMe(profileResponse.Profile);
        }

        /// <summary>
        /// Load Articles
        /// </summary>
        /// <returns></returns>
        private async Task LoadArticles(string username)
        {
            var articles = await this._articleResources.GetArticles(ArticleRequestBuilder.Default().WithLimit(5)
                .OfAuthor(username));

            this.ProfileModel.UserArticles = articles.Articles;
        }
        
        /// <summary>
        /// Load Articles Favorites
        /// </summary>
        /// <returns></returns>
        private async Task LoadFavouritesArticles(string username)
        {
            var articles = await this._articleResources.GetArticles(ArticleRequestBuilder.Default().WithLimit(5)
                .OfFavorite(username));

            this.ProfileModel.Favourtites = articles.Articles;
        }

    }

    public class ProfileModel
    {
        public KnockoutObservable<string> Image { get; set; }
        public KnockoutObservable<string> Username { get; set; }
        public KnockoutObservable<string> Bio { get; set; }
        public KnockoutObservable<bool> Following { get; set; }

        public KnockoutObservableArray<Article> Articles { get; set; }

        public IEnumerable<Article> UserArticles { get; set; }
        public IEnumerable<Article> Favourtites { get; set; }

        public ProfileModel()
        {
            this.Image = ko.observable.Self<string>();
            this.Username = ko.observable.Self<string>();
            this.Bio = ko.observable.Self<string>();
            this.Following = ko.observable.Self<bool>();
            this.Articles = ko.observableArray.Self<Article>();
        }

        public void MapMe (Profile profile)
        {
            this.Image.Self(profile.Image);
            this.Username.Self(profile.Username);
            this.Bio.Self(profile.Bio);
            this.Following.Self(profile.Following);
        }

        public void ShowArticles()
        {
            this.Articles.removeAll();
            this.Articles.push(this.UserArticles.ToArray());
        }
        
        public void ShowFavourites()
        {
            this.Articles.removeAll();
            this.Articles.push(this.Favourtites.ToArray());
        }
    }
}
