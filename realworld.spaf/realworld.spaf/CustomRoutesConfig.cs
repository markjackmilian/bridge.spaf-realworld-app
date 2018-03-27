using System.Collections.Generic;
using Bridge.jQuery2;
using Bridge.Navigation;
using realworld.spaf.ViewModels;

namespace Bridge.Spaf
{
    class CustomRoutesConfig : BridgeNavigatorConfigBase
    {
        public override IList<IPageDescriptor> CreateRoutes()
        {
            return new List<IPageDescriptor>
            {
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>"pages/home.html", // yout html location
                    Key = SpafApp.HomeId,
                    PageController = () => SpafApp.Container.Resolve<HomeViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>"pages/login.html", // yout html location
                    Key = SpafApp.LoginId,
                    PageController = () => SpafApp.Container.Resolve<LoginViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>"pages/register.html", // yout html location
                    Key = SpafApp.RegisterId,
                    PageController = () => SpafApp.Container.Resolve<RegisterViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>"pages/profile.html", // yout html location
                    Key = SpafApp.ProfileId,
                    //PageController = () => SpafApp.Container.Resolve<HomeViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>"pages/settings.html", // yout html location
                    Key = SpafApp.SettingsId,
                    //PageController = () => SpafApp.Container.Resolve<HomeViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>"pages/editArticle.html", // yout html location
                    Key = SpafApp.EditArticleId,
                    //PageController = () => SpafApp.Container.Resolve<HomeViewModel>()
                },
                new PageDescriptor
                {
                    CanBeDirectLoad = ()=>true,
                    HtmlLocation = ()=>"pages/article.html", // yout html location
                    Key = SpafApp.ArticleId,
                    PageController = () => SpafApp.Container.Resolve<ArticleViewModel>()
                },
            };
        }

        public override jQuery Body { get; } = jQuery.Select("#pageBody");
        public override string HomeId { get; } = SpafApp.HomeId;
    }
}
