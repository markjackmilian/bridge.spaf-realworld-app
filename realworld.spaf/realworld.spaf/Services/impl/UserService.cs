using System.Threading.Tasks;
using Bridge;
using Bridge.Messenger;
using Bridge.Spaf;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;

namespace realworld.spaf.Services.impl
{
    class UserService : IUserService
    {
        private readonly IUserResources _userResources;
        private readonly ISettingsResources _settingsResources;
        private readonly IMessenger _messenger;

        public UserService(IUserResources userResources, ISettingsResources settingsResources, IMessenger messenger)
        {
            _userResources = userResources;
            _settingsResources = settingsResources;
            _messenger = messenger;
        }

        public User LoggedUser { get; private set; }
        public bool IsLogged => this.LoggedUser != null;

        public async Task Login(string mail, string password)
        {
            var loginResponse = await this._userResources.Login(new SignRequest
            {
                User = new UserRequest
                {
                    Email = mail,
                    Password = password
                }
            });

            this.LoggedUser = loginResponse.User;
            this._messenger.Send(this,SpafApp.Messages.LoginDone);
        }

        public async Task Register(string username, string mail, string password)
        {
            var loginResponse = await this._userResources.Register(new SignRequest
            {
                User = new UserRequest
                {
                    Email = mail,
                    Password = password,
                    Username = username
                }
            });
            
            this.LoggedUser = loginResponse.User;
            this._messenger.Send(this,SpafApp.Messages.LoginDone);
        }
    }
}