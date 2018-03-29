using Newtonsoft.Json;

namespace realworld.spaf.Models
{
    public class Profile
    {
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("bio")]
        public string Bio { get; set; }
        [JsonProperty("image")]
        public string Image { get; set; }
        [JsonProperty("following")]
        public bool Following { get; set; }
    }
}
