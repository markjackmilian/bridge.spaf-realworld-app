using System.Linq;
using System.Threading.Tasks;
using Bridge.Navigation;
using Bridge.Spaf;
using realworld.spaf.Classes;
using realworld.spaf.Services;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    class LoginViewModel : LoadableViewModel
    {
        private readonly INavigator _navigator;
        private readonly IUserService _userService;
        protected override string ElementId() => SpafApp.LoginId;

        public KnockoutObservable<string> Email { get; set; }
        public KnockoutObservable<string> Password { get; set; }
        public KnockoutObservableArray<string> Errors { get; set; }

        public LoginViewModel(INavigator navigator, IUserService userService)
        {
            _navigator = navigator;
            _userService = userService;

            this.Email = ko.observable.Self<string>();
            this.Password = ko.observable.Self<string>();
            this.Errors = ko.observableArray.Self<string>();
        }


        public async Task Login()
        {
            try
            {
                this.Errors.removeAll();
                await this._userService.Login(this.Email.Self(), this.Password.Self());
                this._navigator.Navigate(SpafApp.HomeId);   
            }
            
            catch (PromiseException e)
            {
                var errors = e.GetErrorList();
                this.Errors.push(errors.ToArray());
            }
        }
    }
}