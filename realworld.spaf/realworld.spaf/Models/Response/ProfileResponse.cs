using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class ProfileResponse
    {
        [JsonProperty("profile")]
        public Profile Profile { get; set; }
    }
}
