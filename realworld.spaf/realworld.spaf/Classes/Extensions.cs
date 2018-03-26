using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using realworld.spaf.Models.Response;

namespace realworld.spaf.Classes
{
    public static class Extensions
    {
        /// <summary>
        /// Deserialize realworld promise exception to get errors
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public static Dictionary<string,string[]> GetErrors(this PromiseException exception)
        {
            var errors = (ErrorResponse)JsonConvert.DeserializeObject<ErrorResponse>(exception.Arguments[0].ToDynamic().responseJSON);
            return errors.Errors;
        }

        /// <summary>
        /// Get readable error list
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public static IEnumerable<string> GetErrorList(this PromiseException exception)
        {
            var errors = exception.GetErrors();

            foreach (var error in errors)
            {
                foreach (var errorDescription in error.Value)
                {
                    yield return $"{error.Key} {errorDescription}";
                }
            }
        }
    }
}