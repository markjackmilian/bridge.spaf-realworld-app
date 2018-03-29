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
        public static Dictionary<string,string[]> GetValidationErrorResponse(this PromiseException exception)
        {
            var errors = (ErrorResponse)JsonConvert.DeserializeObject<ErrorResponse>(exception.Arguments[0].ToDynamic().responseJSON);
            return errors.Errors;
        }

        /// <summary>
        /// Get readable error list
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public static IEnumerable<string> GetValidationErrors(this PromiseException exception)
        {
            var errors = exception.GetValidationErrorResponse();

            foreach (var error in errors)
            {
                foreach (var errorDescription in error.Value)
                {
                    yield return $"{error.Key} {errorDescription}";
                }
            }
        }

        /// <summary>
        /// Get error for htmlerrorcode
        /// </summary>
        /// <param name="errorCode"></param>
        /// <returns></returns>
        public static string GetErrorForCode(int errorCode)
        {
            switch (errorCode)
            {
                case 401:
                    return "Unauthorized";
                case 403:
                    return "Forbidden";
                case 404:
                    return "Not Found";
                case 422:
                    return "Validation Error";
                default:
                    return "Generic Error";
            }
        }

        /// <summary>
        /// Get error code for promise exception
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public static int ErrorCode(this PromiseException exception)
        {
            var errorCode = (int)exception.Arguments[0].ToDynamic().status;
            return errorCode;
        }
    }
}