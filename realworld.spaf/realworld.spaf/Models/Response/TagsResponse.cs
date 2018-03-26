using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class TagsResponse
    {
        [JsonProperty("tags")]
        public string[] Tags { get; set; }
    }

}