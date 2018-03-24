using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;

namespace realworld.spaf.Models
{
    [Convention(Target = ConventionTarget.All, Notation = Notation.LowerCamelCase)]
    public class Article
    {
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string[] TagList { get; set; }
        public string Description { get; set; }
        public Author Author { get; set; }
        public bool Favorited { get; set; }
        public long FavoritesCount { get; set; }
    }
}
