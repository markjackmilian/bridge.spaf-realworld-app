using Bridge.Spaf;
using realworld.spaf.Models;
using realworld.spaf.Services;
using System.Collections.Generic;
using static Retyped.knockout;

namespace realworld.spaf.ViewModels
{
    class ProfileViewModel : LoadableViewModel
    {
        protected override string ElementId() => SpafApp.ProfileId;

        private readonly IUserService _userService;

        public UserModel User { get; set; }

        public ProfileViewModel(IUserService userService)
        {
            this.User = new UserModel();
            this._userService = userService;
        }

        public override void OnLoad(Dictionary<string, object> parameters)
        {
            this.User.MapMe(this._userService.LoggedUser);

            base.OnLoad(parameters);
        }

    }

    public class UserModel
    {
        public KnockoutObservable<string> ImageUri { get; set; }
        public KnockoutObservable<string> Username { get; set; }
        public KnockoutObservable<string> Biography { get; set; }
        public KnockoutObservable<string> Email { get; set; }

        public UserModel()
        {
            this.ImageUri = ko.observable.Self<string>();
            this.Username = ko.observable.Self<string>();
            this.Biography = ko.observable.Self<string>();
            this.Email = ko.observable.Self<string>();
        }

        public void MapMe (User user)
        {
            this.ImageUri.Self(user.Image);
            this.Username.Self(user.Username);
            this.Biography.Self(user.Bio);
            this.Email.Self(user.Email);
        }
    }
}
