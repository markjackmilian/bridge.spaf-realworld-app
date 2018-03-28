using System.Threading.Tasks;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models.Request;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class SettingsResources: AuthorizedResourceBase, ISettingsResources
    {
        private readonly ISettings _settings;

        public SettingsResources(ISettings settings, IUserService userService) : base(userService)
        {
            this._settings = settings;
        }

        public Task<SettingsResponse> UpdateSettings(SettingsRequest settingsRequest)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/user",
                Type = "PUT",
                DataType = "json",
                ContentType = "application/json",
                Data = JsonConvert.SerializeObject(settingsRequest)
            };

            return base.MakeAuthorizedCall<SettingsResponse>(options);
        }
    }
}
