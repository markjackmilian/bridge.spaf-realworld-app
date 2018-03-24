using Bridge;

namespace realworld.spaf.Models
{
    [Convention(Target = ConventionTarget.All, Notation = Notation.LowerCamelCase)]
    public class ArticleResponse
    {
        public Article[] Articles { get; set; }

        public long ArticlesCount { get; set; }
    }
}