using System.Threading.Tasks;
using Bridge.EasyTests.Asserts;
using Bridge.EasyTests.Attributes;
using Bridge.Messenger;
using realworld.spaf.Services.impl;

namespace realworld.spaf.test
{
    [Test]
    public class UserServiceTest
    {
        [TestMethod]
        public async Task WhenLoginDone_RepoSaveTokenIsCalled()
        {
            var repo = new FakeRepository();
            var userService = new UserService(new FakeUserResource(), new Messenger(), repo);
            await userService.Login("fake", "fakse");
            
            repo.SaveTokenCalled.ShouldBeEquals(true);
        }
        
        [TestMethod]
        public async Task WhenLoginDone_LoggedUserIsSetted()
        {
            var repo = new FakeRepository();
            var userService = new UserService(new FakeUserResource(), new Messenger(), repo);
            await userService.Login("fake", "fakse");
            
            userService.LoggedUser.ShouldBeNotEquals(null);
            userService.LoggedUser.Username.ShouldBeEquals("markjackmilian");
        }
        
//        [TestMethod]
//        public async Task JustSeeAFailTest()
//        {
//            var repo = new FakeRepository();
//            var userService = new UserService(new FakeUserResource(), new Messenger(), repo);
//            await userService.Login("fake", "fakse");
//            
//            userService.LoggedUser.Username.ShouldBeEquals("fail_test");
//        }
    }
}