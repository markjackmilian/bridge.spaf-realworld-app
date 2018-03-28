using Bridge.Messenger;
using Bridge.Spaf;
using Bridge.Spaf.Attributes;
using realworld.spaf.Services;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    [SingleInstance]
    public class MainViewModel
    {
        private readonly IMessenger _messenger;

        public KnockoutObservable<bool> IsLogged { get; set; }

        public MainViewModel(IMessenger messenger)
        {
            _messenger = messenger;

            this.IsLogged = ko.observable.Self<bool>(false);
            
            this._messenger.Subscribe<IUserService>(this,SpafApp.Messages.LoginDone, service =>
                {
                    this.IsLogged.Self(true);
                });
            
        }
        

        /// <summary>
        /// Apply binding to mainmodel
        /// </summary>
        public void Start()
        {
            ko.applyBindings(this);
        }
    }
}