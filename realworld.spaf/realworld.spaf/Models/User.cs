using Newtonsoft.Json;

namespace realworld.spaf.Models
{
    public class User
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("bio")]
        public string Bio { get; set; }

        [JsonProperty("image")]
        public object Image { get; set; }
    }
}