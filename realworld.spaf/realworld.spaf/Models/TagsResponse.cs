using Newtonsoft.Json;

namespace realworld.spaf.Models
{
    public class TagsResponse
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }
    }

}