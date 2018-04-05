using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge.Navigation;
using realworld.spaf.Models;
using realworld.spaf.Models.Request;
using realworld.spaf.Models.Response;
using realworld.spaf.Services;

namespace realworld.spaf.test
{
    class FakeNavigator : INavigator
    {
        /// <summary>
        /// Is Navigated Called?
        /// </summary>
        public bool NavigateCalled { get; private set; }

        public void InitNavigation()
        {
            
        }

        public void EnableSpafAnchors()
        {
        }

        public void Navigate(string pageId, Dictionary<string, object> parameters = null)
        {
            this.NavigateCalled = true;
        }

        public IAmLoadable LastNavigateController { get; }
        public event EventHandler<IAmLoadable> OnNavigated;
    }
    
    class FakeUserService : IUserService
    {
        /// <summary>
        /// Is Login Called?
        /// </summary>
        public bool LoginCalled { get; private set; }

        
        public User LoggedUser { get; }
        public bool IsLogged { get; } 
        public Task Login(string mail, string password)
        {
            this.LoginCalled = true;
            return Task.FromResult(0);
        }


        public Task Register(string username, string mail, string password)
        {
            throw new System.NotImplementedException();
        }

        public Task TryAutoLoginWithStoredToken()
        {
            throw new System.NotImplementedException();
        }
    }

    class FakeUserResource : IUserResources
    {
        public bool LoginCalled { get; private set; }

        public Task<SignResponse> Login(SignRequest loginRequest)
        {
            this.LoginCalled = true;

            return Task.FromResult(new SignResponse
            {
                User = new User
                {
                    Token = "123",
                    Email = "me@markjackmilian.com",
                    Id = 1,
                    Username = "markjackmilian"
                }
            });
        }

        public Task<SignResponse> Register(SignRequest loginRequest)
        {
            throw new NotImplementedException();
        }

        public Task<SignResponse> GetCurrentUser(string token)
        {
            throw new NotImplementedException();
        }
    }

    class FakeRepository : IRepository
    {
        public bool SaveTokenCalled { get; private set; }

        public void SaveToken(string token)
        {
            this.SaveTokenCalled = true;
        }

        public string GetTokenIfExist()
        {
            throw new NotImplementedException();
        }

        public void DeleteToken()
        {
            throw new NotImplementedException();
        }
    }
    

}