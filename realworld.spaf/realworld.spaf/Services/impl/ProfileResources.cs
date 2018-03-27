using System.Threading.Tasks;
using Bridge.jQuery2;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class ProfileResources : AuthorizedResourceBase, IProfileResources
    {
        private readonly ISettings _settings;

        public ProfileResources(IUserService userService, ISettings settings) : base(userService)
        {
            _settings = settings;
        }
        
        public Task<FollowResponse> Follow(string username)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/profiles/{username}/follow",
                Type = "POST",
                DataType = "json",
                ContentType = "application/json",
            };

            return base.MakeAuthorizedCall<FollowResponse>(options);
        }
    }
}