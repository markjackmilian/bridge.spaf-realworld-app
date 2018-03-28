using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    class SettingsResponse
    {
        [JsonProperty("user")]
        public User User { get; set; }
    }
}
