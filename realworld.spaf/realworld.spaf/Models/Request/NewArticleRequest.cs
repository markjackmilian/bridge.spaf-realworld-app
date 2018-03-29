using Newtonsoft.Json;

namespace realworld.spaf.Models.Request
{
    public class NewArticleRequest
    {
        [JsonProperty("article")]
        public NewArticle Article { get; set; }
    }
}