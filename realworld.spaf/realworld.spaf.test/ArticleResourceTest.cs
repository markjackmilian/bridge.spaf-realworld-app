using System.Linq;
using System.Threading.Tasks;
using Bridge.EasyTests.Asserts;
using Bridge.EasyTests.Attributes;
using realworld.spaf.Models;
using realworld.spaf.Services;
using realworld.spaf.Services.impl;

namespace realworld.spaf.test
{
    [Test]
    public class ArticleResourceTest
    {

        [TestMethod()]
        public async Task GetArticleReturnArticles()
        {
            var userService = new FakeUserService();
            
            var articleResource = new ArticleResources(new Settings(), userService);
            var articles = await articleResource.GetArticles(ArticleRequestBuilder.Default());
            EasyAsserts.ShouldBeTrue(() => articles.Articles.Any());
        }
        
    }

    class FakeUserService : IUserService
    {
        public User LoggedUser { get; }
        public bool IsLogged { get; } 
        public Task Login(string mail, string password)
        {
            throw new System.NotImplementedException();
        }

        public Task Register(string username, string mail, string password)
        {
            throw new System.NotImplementedException();
        }

        public Task TryAutoLoginWithStoredToken()
        {
            throw new System.NotImplementedException();
        }
    }
}