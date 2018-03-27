using System.Text;

namespace realworld.spaf.Classes
{
    public class FeedRequestBuilder
    {
        private int _offset;
        private int _limit;


        private FeedRequestBuilder()
        {
            this._limit = 20;
            this._offset = 0;
        }

        public static FeedRequestBuilder Default()
        {
            return new FeedRequestBuilder();
        }

        public FeedRequestBuilder WithOffSet(int offset)
        {
            this._offset = offset;
            return this;
        }

        public FeedRequestBuilder WithLimit(int limit)
        {
            this._limit = limit;
            return this;
        }


        public string Build()
        {
            var stringBuilder = new StringBuilder("articles/feed");

            stringBuilder.Append($"?limit={this._limit}");
            stringBuilder.Append($"&&offset={this._offset}");

            return stringBuilder.ToString();

        }
        
    }
}