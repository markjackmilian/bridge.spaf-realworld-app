using System.Threading.Tasks;
using Bridge.EasyTests.Asserts;
using Bridge.EasyTests.Attributes;
using realworld.spaf.ViewModels;

namespace realworld.spaf.test
{
    [Test]
    public class LoginViewModelTest
    {
        [TestMethod]
        public async Task WhenLoginIsCalled_LoginOnUserServiceIsCalled()
        {
            var fakeNavigator = new FakeNavigator();
            var fakeUSerService = new FakeUserService();
            var loginVm = new LoginViewModel(fakeNavigator, fakeUSerService);
            await loginVm.Login();
            fakeUSerService.LoginCalled.ShouldBeEquals(true);
        }
        
        [TestMethod]
        public async Task WhenLoginIsCalled_NavigateIsCalled()
        {
            var fakeNavigator = new FakeNavigator();
            var fakeUSerService = new FakeUserService();
            var loginVm = new LoginViewModel(fakeNavigator, fakeUSerService);
            await loginVm.Login();
            fakeNavigator.NavigateCalled.ShouldBeEquals(true);
        }
    }
}