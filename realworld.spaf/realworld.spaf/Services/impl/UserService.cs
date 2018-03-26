using System.Threading.Tasks;
using Bridge;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;

namespace realworld.spaf.Services.impl
{
    class UserService : IUserService
    {
        private readonly IUserResources _userResources;

        public UserService(IUserResources userResources)
        {
            _userResources = userResources;
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
        }
    }
}