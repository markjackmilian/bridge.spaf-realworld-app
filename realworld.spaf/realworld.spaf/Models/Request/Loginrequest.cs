using Newtonsoft.Json;

namespace realworld.spaf.Models.Request
{
    public class Loginrequest
    {
        [JsonProperty("user")]
        public UserRequest User { get; set; }
    }
}