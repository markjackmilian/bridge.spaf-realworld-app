using System.Threading.Tasks;
using Bridge.Messenger;
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

        public MainViewModel(IMessenger messenger, IUserService userService)
        {
            _messenger = messenger;
            _userService = userService;

            this.IsLogged = ko.observable.Self<bool>(false);
            
            this._messenger.Subscribe<UserService>(this,SpafApp.Messages.LoginDone, service =>
                {
                    this.IsLogged.Self(true);
                });
            
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