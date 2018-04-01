using System;
using System.Threading.Tasks;
using Bridge.Messenger;
using Bridge.Navigation;
using Bridge.Spaf;
using Bridge.Spaf.Attributes;
using realworld.spaf.Services;
using realworld.spaf.Services.impl;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    [SingleInstance]
    public class MainViewModel
    {
        private readonly IMessenger _messenger;
        private readonly IUserService _userService;

        public KnockoutObservable<bool> IsLogged { get; set; }
        public KnockoutObservable<string> ActualPageId { get; set; }

        public MainViewModel(IMessenger messenger, IUserService userService,INavigator navigator)
        {
            _messenger = messenger;
            _userService = userService;

            this.IsLogged = ko.observable.Self<bool>(false);
            this.ActualPageId = ko.observable.Self<string>(SpafApp.HomeId);
            
            // subscribe to logindone message
            this._messenger.Subscribe<UserService>(this,SpafApp.Messages.LoginDone, service =>
                {
                    this.IsLogged.Self(true);
                });

            navigator.OnNavigated += (sender, loadable) =>
            {
                var vm = (LoadableViewModel) loadable;
                this.ActualPageId.Self(vm.ElementId());
            };

        }
        

        /// <summary>
        /// Apply binding to mainmodel
        /// try auto login
        /// </summary>
        public void Start()
        {
            ko.applyBindings(this);
            this._userService.TryAutoLoginWithStoredToken();
        }
    }

   
}