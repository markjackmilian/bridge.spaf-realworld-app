using System.Collections.Generic;
using Bridge.jQuery2;
using Bridge.Navigation;
using realworld.spaf.Services;
using realworld.spaf.ViewModels;

namespace Bridge.Spaf
{
    class CustomRoutesConfig : BridgeNavigatorConfigBase
    {
        private readonly IUserService _userService;
        public CustomRoutesConfig(IUserService userService)
        {
            this._userService = userService;
        }

        public override bool DisableAutoSpafAnchorsOnNavigate { get; } = false;

        public override IList<IPageDescriptor> CreateRoutes()
        {
            return new List<IPageDescriptor>
            {
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>$"{this.VirtualDirectory}pages/home.html", // yout html location
                    Key = SpafApp.HomeId,
                    PageController = () => SpafApp.Container.Resolve<HomeViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>$"{this.VirtualDirectory}pages/login.html", // yout html location
                    Key = SpafApp.LoginId,
                    PageController = () => SpafApp.Container.Resolve<LoginViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>$"{this.VirtualDirectory}pages/register.html", // yout html location
                    Key = SpafApp.RegisterId,
                    PageController = () => SpafApp.Container.Resolve<RegisterViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>$"{this.VirtualDirectory}pages/profile.html", // yout html location
                    Key = SpafApp.ProfileId,
                    PageController = () => SpafApp.Container.Resolve<ProfileViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>this._userService.IsLogged,
                    HtmlLocation = ()=>$"{this.VirtualDirectory}pages/settings.html", // yout html location
                    Key = SpafApp.SettingsId,
                    PageController = () => SpafApp.Container.Resolve<SettingsViewModel>(),
                    
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>false,
                    HtmlLocation = ()=>$"{this.VirtualDirectory}pages/editArticle.html", // yout html location
                    Key = SpafApp.EditArticleId,
                    PageController = () => SpafApp.Container.Resolve<EditArticleViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>$"{this.VirtualDirectory}pages/article.html", // yout html location
                    Key = SpafApp.ArticleId,
                    PageController = () => SpafApp.Container.Resolve<ArticleViewModel>()
                },
            };
        }

        public override jQuery Body { get; } = jQuery.Select("#pageBody");
        public override string HomeId { get; } = SpafApp.HomeId;


        private string VirtualDirectory => string.IsNullOrEmpty(NavigationUtility.VirtualDirectory)
            ? string.Empty
            : $"{NavigationUtility.VirtualDirectory}/";

    }

   
}
