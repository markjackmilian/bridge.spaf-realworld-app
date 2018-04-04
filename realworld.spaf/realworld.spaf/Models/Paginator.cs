using static Retyped.knockout;

namespace realworld.spaf.Models
{
    public class Paginator
    {
        public KnockoutObservable<bool> Active { get; set; }
        public int Page { get; set; }

        public Paginator()
        {
            this.Active = ko.observable.Self<bool>();
        }

    }
}