using Newtonsoft.Json;

namespace realworld.spaf.Models.Request
{
    public class SettingsRequestResponse
    {
        [JsonProperty("image")]
        public string ImageUri { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("bio")]
        public string Biography { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("password")]
        public string NewPassword { get; set; }
    }
}
