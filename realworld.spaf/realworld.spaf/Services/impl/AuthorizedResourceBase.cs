using System;
using System.Threading.Tasks;
using Bridge.jQuery2;

namespace realworld.spaf.Services.impl
{
    abstract class AuthorizedResourceBase : ResourceBase
    {
        protected readonly IUserService UserService;

        protected AuthorizedResourceBase(IUserService userService)
        {
            UserService = userService;
        }
        
        /// <summary>
        /// Generic Awaitable ajax call
        /// </summary>
        /// <param name="options"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        protected Task<T> MakeAuthorizedCall<T>(AjaxOptions options) 
        {
            if(!this.UserService.IsLogged)
                throw new Exception("You must be logged to use this resource");

            options.BeforeSend = (xhr, o) =>
            {
                xhr.SetRequestHeader("Authorization", $"Token {this.UserService.LoggedUser.Token}");
                return true;
            };
            return base.MakeCall<T>(options);
        }
    }
}