using System;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.jQuery2;
using Newtonsoft.Json;
using realworld.spaf.Models;

namespace realworld.spaf.Services.impl
{
    abstract class ResourceBase
    {
        /// <summary>
        /// Generic Awaitable ajax call
        /// </summary>
        /// <param name="options"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        protected Task<T> MakeCall<T>(AjaxOptions options) 
        {
            return Task.FromPromise<T>(jQuery.Ajax(options)
                , (Func<object, string, jqXHR, T>) ((resObj, success, jqXhr) =>
                {
                    var json = JSON.Stringify(resObj);
                    var obj = JsonConvert.DeserializeObject<T>(json);
                    return obj;
                }));
        }
    }
}