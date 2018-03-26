using System.Linq;
using System.Threading.Tasks;
using Bridge.Spaf;
using realworld.spaf.Classes;
using realworld.spaf.Models.Request;
using realworld.spaf.Services;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    class LoginViewModel : LoadableViewModel
    {
        private readonly IUserResources _userResources;
        protected override string ElementId() => SpafApp.LoginId;

        public KnockoutObservable<string> UserName { get; set; }
        public KnockoutObservable<string> Password { get; set; }
        public KnockoutObservableArray<string> Errors { get; set; }

        public LoginViewModel(IUserResources userResources)
        {
            _userResources = userResources;

            this.UserName = ko.observable.Self<string>();
            this.Password = ko.observable.Self<string>();
            this.Errors = ko.observableArray.Self<string>();
        }

        public async Task Login()
        {
            try
            {
                this.Errors.removeAll();
                var loginResponse = await this._userResources.Login(new Loginrequest
                {
                    User = new UserRequest
                    {
                        Email = this.UserName.Self(),
                        Password = this.Password.Self()
                    }
                });
            }
            
            catch (PromiseException e)
            {
                var errors = e.GetErrorList();
                this.Errors.push(errors.ToArray());
            }
        }
    }
}