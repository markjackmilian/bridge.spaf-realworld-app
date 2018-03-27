using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class SingleArticleResponse
    {
        [JsonProperty("article")]
        public Article Article { get; set; }
    }
}