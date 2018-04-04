namespace realworld.spaf.Services.impl
{
    public class Settings : ISettings
    {
        public string ApiUri { get; } = "https://conduit.productionready.io/api";
        public int ArticleInPage { get; } = 10;
    }
}