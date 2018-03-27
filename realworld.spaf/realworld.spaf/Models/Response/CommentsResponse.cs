using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class CommentsResponse
    {
        [JsonProperty("comments")]
        public Comment[] Comments { get; set; }
    }
}