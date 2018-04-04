using Bridge.Html5;

namespace realworld.spaf.Services.impl
{
    class LocalStorageRepository : IRepository
    {
        private const string TokenKey = "token";
        private Storage _storage;

        public LocalStorageRepository()
        {
            this._storage = Window.LocalStorage;
        }
        
        public void SaveToken(string token)
        {
            this._storage.SetItem(TokenKey,token);
        }

        public string GetTokenIfExist()
        {
            var token = this._storage.GetItem(TokenKey);
            return token?.ToString();
        }

        public void DeleteToken()
        {
            this._storage.RemoveItem(TokenKey);
        }
    }
}