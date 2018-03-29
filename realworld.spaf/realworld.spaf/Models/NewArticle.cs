using Newtonsoft.Json;

namespace realworld.spaf.Models
{
    public class NewArticle
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }

        [JsonProperty("tagList")]
        public string[] TagList { get; set; }
    }

}