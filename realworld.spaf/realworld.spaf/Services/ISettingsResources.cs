using realworld.spaf.Models.Request;
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
        Task UpdateSettings(SettingsRequestResponse settingsRequest);
    }
}
