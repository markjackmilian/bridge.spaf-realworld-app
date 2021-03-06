﻿using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.Messenger;
using Bridge.Spaf;
using realworld.spaf.Classes;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;

namespace realworld.spaf.Services.impl
{
    public class UserService : IUserService
    {
        private readonly IUserResources _userResources;
        private readonly IMessenger _messenger;
        private readonly IRepository _repository;

        public UserService(IUserResources userResources, IMessenger messenger, IRepository repository)
        {
            _userResources = userResources;
            _messenger = messenger;
            _repository = repository;
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
            this._repository.SaveToken(loginResponse.User.Token);
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
            this._repository.SaveToken(loginResponse.User.Token);
            this._messenger.Send(this,SpafApp.Messages.LoginDone);
        }

        public async Task TryAutoLoginWithStoredToken()
        {
            var storedToken = this._repository.GetTokenIfExist();
            if (storedToken == null) return;

            try
            {
                var loginResponse = await this._userResources.GetCurrentUser(storedToken);
                this.LoggedUser = loginResponse.User;
                this._repository.SaveToken(loginResponse.User.Token);
                this._messenger.Send(this,SpafApp.Messages.LoginDone);
            }
            catch (PromiseException )
            {
                this._repository.DeleteToken();
                this.LoggedUser = null;
            }
            
        }
    }
}