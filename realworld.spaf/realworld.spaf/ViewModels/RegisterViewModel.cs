using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bridge.Navigation;
using Bridge.Spaf;
using realworld.spaf.Classes;
using realworld.spaf.Models.Request;
using realworld.spaf.Services;
using Retyped;

namespace realworld.spaf.ViewModels
{
    class RegisterViewModel : LoadableViewModel
    {
        private readonly INavigator _navigator;
        private readonly IUserService _userService;
        protected override string ElementId() => SpafApp.RegisterId;

        public knockout.KnockoutObservable<string> Username { get; set; }
        public knockout.KnockoutObservable<string> Email { get; set; }
        public knockout.KnockoutObservable<string> Password { get; set; }
        public knockout.KnockoutObservableArray<string> Errors { get; set; }

        public RegisterViewModel(INavigator navigator, IUserService userService)
        {
            _navigator = navigator;
            _userService = userService;

            this.Username = knockout.ko.observable.Self<string>();
            this.Email = knockout.ko.observable.Self<string>();
            this.Password = knockout.ko.observable.Self<string>();
            this.Errors = knockout.ko.observableArray.Self<string>();
        }

        public override void OnLoad(Dictionary<string, object> parameters)
        {
            base.OnLoad(parameters);
            this._navigator.EnableSpafAnchors();
        }

        public async Task Register()
        {
            try
            {
                this.Errors.removeAll();
                await this._userService.Register(this.Username.Self(), this.Email.Self(), this.Password.Self());
            }
            
            catch (PromiseException e)
            {
                var errors = e.GetErrorList();
                this.Errors.push(errors.ToArray());
            }
        }
    }
}