using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace realworld.spaf.Models
{
    public class Profile
    {
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("bio")]
        public string Bio { get; set; }
        [JsonProperty("image")]
        public string Image { get; set; }
        [JsonProperty("following")]
        public bool Following { get; set; }
    }
}
