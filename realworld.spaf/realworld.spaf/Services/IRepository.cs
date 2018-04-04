using Retyped;

namespace realworld.spaf.Services
{
    public interface IRepository
    {
        /// <summary>
        /// Save token
        /// </summary>
        /// <param name="token"></param>
        void SaveToken(string token);

        /// <summary>
        /// Get token if exist
        /// </summary>
        /// <returns></returns>
        string GetTokenIfExist();

        /// <summary>
        /// Remove stored token
        /// </summary>
        void DeleteToken();
    }
}