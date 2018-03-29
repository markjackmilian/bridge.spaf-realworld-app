using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models;

namespace realworld.spaf.Services.impl
{
    class ProfileResources : AuthorizedResourceBase, IProfileResources
    {
        private readonly ISettings _settings;

        public ProfileResources(ISettings settings, IUserService userService): base(userService)
        {
            this._settings = settings;
        }

        public Task<Profile> Get(string username)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/profiles/:{username.ToLower()}",
                Type = "GET",
                DataType = "json",
                ContentType = "application/json",
            };

            return base.MakeAuthorizedCall<Profile>(options);
        }
    }
}
