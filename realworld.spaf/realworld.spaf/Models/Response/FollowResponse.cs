using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class FollowResponse
    {
        [JsonProperty("profile")]
        public Profile Profile { get; set; }
    }
}