using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class SingleCommentResponse
    {
        [JsonProperty("comment")]
        public Comment Comment { get; set; }
    }
}