using System.Threading.Tasks;
using Bridge.jQuery2;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class ProfileResources : AuthorizedResourceBase, IProfileResources
    {
        private readonly ISettings _settings;

        public ProfileResources(ISettings settings, IUserService userService): base(userService)
        {
            this._settings = settings;
        }

        public Task<ProfileResponse> Get(string username)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/profiles/{username}",
                Type = "GET",
                DataType = "json",
                ContentType = "application/json",
            };

            return base.MakeAuthorizedCall<ProfileResponse>(options);
        }
    }
}
