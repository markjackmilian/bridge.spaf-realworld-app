using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class SignResponse 
    {
        [JsonProperty("user")]
        public User User { get; set; }
    }
    
    
}