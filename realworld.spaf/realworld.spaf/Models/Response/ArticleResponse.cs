using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class ArticleResponse
    {
        [JsonProperty("articles")]
        public Article[] Articles { get; set; }

        [JsonProperty("articlesCount")]
        public long ArticlesCount { get; set; }
    }
    
}