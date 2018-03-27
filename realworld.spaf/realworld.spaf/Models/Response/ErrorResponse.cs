using System.Collections.Generic;
using Bridge;
using Newtonsoft.Json;

namespace realworld.spaf.Models.Response
{
    public class ErrorResponse
    {
//        [JsonProperty("errors")]
//        public Errors Errors { get; set; }
        
        [JsonProperty("errors")]
        public Dictionary<string,string[]> Errors { get; set; }
    }

   

    
}