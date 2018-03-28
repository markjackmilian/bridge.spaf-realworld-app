using System.Threading.Tasks;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models.Request;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Services.impl
{
    class UserResources : ResourceBase, IUserResources
    {
        private readonly ISettings _settings;

        public UserResources(ISettings settings)
        {
            _settings = settings;
        }
        
        public Task<SignResponse> Login(SignRequest loginRequest)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/users/login",
                Type = "POST",
                DataType = "json",
                ContentType = "application/json",
                Data = JsonConvert.SerializeObject(loginRequest)
            };

            return base.MakeCall<SignResponse>(options);
        }

        public Task<SignResponse> Register(SignRequest loginRequest)
        {
            var options = new AjaxOptions
            {
                Url = $"{this._settings.ApiUri}/users",
                Type = "POST",
                DataType = "json",
                ContentType = "application/json",
                Data = JsonConvert.SerializeObject(loginRequest)
            };

            return base.MakeCall<SignResponse>(options);
        }
    }
}