using System.Text;

namespace realworld.spaf.Services.impl
{
    public class ArticleRequestBuilder
    {
        private string _tag;
        private string _author;
        private int _offset;
        private int _limit;
        private string _user;


        private ArticleRequestBuilder()
        {
            this._limit = 20;
            this._offset = 0;
        }

        public static ArticleRequestBuilder Default()
        {
            return new ArticleRequestBuilder();
        }

        public ArticleRequestBuilder WithOffSet(int offset)
        {
            this._offset = offset;
            return this;
        }

        public ArticleRequestBuilder WithLimit(int limit)
        {
            this._limit = limit;
            return this;
        }

        public ArticleRequestBuilder OfAuthor(string author)
        {
            this._author = author;
            return this;
        }

        public ArticleRequestBuilder WithTag(string tag)
        {
            this._tag = tag;
            return this;
        }
        
        public ArticleRequestBuilder OfFavorite(string user)
        {
            this._user = user;
            return this;
        }


        public string Build()
        {
            var stringBuilder = new StringBuilder("articles");

            stringBuilder.Append($"?limit={this._limit}");
            stringBuilder.Append($"&&offset={this._offset}");

            if (!string.IsNullOrEmpty(this._tag))
                stringBuilder.Append($"&&tag={this._tag}");
            
            if (!string.IsNullOrEmpty(this._author))
                stringBuilder.Append($"&&author={this._author}");
            
            if (!string.IsNullOrEmpty(this._user))
                stringBuilder.Append($"&&favorited={this._user}");

            return stringBuilder.ToString();

        }
        
    }
}