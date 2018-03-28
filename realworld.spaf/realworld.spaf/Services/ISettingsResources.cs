using realworld.spaf.Models.Request;
using realworld.spaf.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace realworld.spaf.Services
{
    interface ISettingsResources
    {
        /// <summary>
        /// Update settings
        /// </summary>
        /// <param name="settingsRequest"></param>
        /// <returns></returns>
        Task<SettingsResponse> UpdateSettings(SettingsRequest settingsRequest);
    }
}
