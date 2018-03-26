using Newtonsoft.Json;

namespace realworld.spaf.Models.Request
{
    public class SignRequest
    {
        [JsonProperty("user")]
        public UserRequest User { get; set; }
    }
}