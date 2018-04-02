using System;
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
        public override string ElementId() => SpafApp.LoginId;

        public KnockoutObservable<string> Email { get; set; }
        public KnockoutObservable<string> Password { get; set; }
        public KnockoutObservable<bool> IsBusy { get; set; }
        public KnockoutObservableArray<string> Errors { get; set; }

        public LoginViewModel(INavigator navigator, IUserService userService)
        {
            _navigator = navigator;
            _userService = userService;

            this.Email = ko.observable.Self<string>();
            this.Password = ko.observable.Self<string>();
            this.IsBusy = ko.observable.Self<bool>();
            this.Errors = ko.observableArray.Self<string>();
        }


        public void Login()
        {
            this.IsBusy.Self(true);
            this.Errors.removeAll();
            this._userService.Login(this.Email.Self(), this.Password.Self()).ContinueWith(c =>
            {
                this.IsBusy.Self(false);

                if (c.IsFaulted)
                {
                    var firstException = c.Exception.InnerExceptions.First();

                    if (firstException is PromiseException)
                    {
                        var e = (PromiseException)c.Exception.InnerExceptions.First();
                        var errors = e.GetValidationErrors();
                        this.Errors.push(errors.ToArray());
                    }
                    else
                    {
                        // transient "not completed task" caused by bridge version (in fix)
                        this._navigator.Navigate(SpafApp.HomeId);
                    }
                }
                else
                {
                    this._navigator.Navigate(SpafApp.HomeId);
                }
            });
        }
    }
}