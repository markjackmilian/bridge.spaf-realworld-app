using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class Loginresponse 
    {
        [JsonProperty("user")]
        public User User { get; set; }
    }
    
    
}