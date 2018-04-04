using System;
using Newtonsoft.Json;

namespace realworld.spaf.Models
{
    public class Comment
    {
        public Comment()
        {
            this.Author = new Author();
        }
        
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("updatedAt")]
        public DateTime UpdatedAt { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }

        [JsonProperty("author")]
        public Author Author { get; set; }
        
        public string Create => this.CreatedAt.ToString("MMMM dd");

    }
}