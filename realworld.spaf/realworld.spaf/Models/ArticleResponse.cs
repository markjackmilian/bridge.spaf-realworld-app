using Bridge;
using Newtonsoft.Json;

namespace realworld.spaf.Models
{
    [Convention(Target = ConventionTarget.All, Notation = Notation.LowerCamelCase)]
    public class ArticleResponse
    {
        [JsonProperty("articles")]
        public Article[] Articles { get; set; }

        [JsonProperty("articlesCount")]
        public long ArticlesCount { get; set; }
    }
}