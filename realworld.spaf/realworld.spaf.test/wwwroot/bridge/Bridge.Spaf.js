/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("Bridge.Spaf", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Spaf.Attributes.SingleInstanceAttribute", {
        inherits: [System.Attribute]
    });

    Bridge.define("Bridge.Spaf.ViewModelBase", {
        fields: {
            _pageNode: null
        },
        props: {
            PageNode: {
                get: function () {
                    return this._pageNode || ((this._pageNode = document.getElementById(this.ElementId())));
                }
            }
        },
        methods: {
            ApplyBindings: function () {
                ko.applyBindings(this, this.PageNode);
            },
            RemoveBindings: function () {
                ko.removeNode(this.PageNode);
            }
        }
    });

    Bridge.define("Bridge.Spaf.LoadableViewModel", {
        inherits: [Bridge.Spaf.ViewModelBase,Bridge.Navigation.IAmLoadable],
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        methods: {
            OnLoad: function (parameters) {
                this.ApplyBindings();
            },
            OnLeave: function () {
                this.RemoveBindings();
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2UuU3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiVmlld01vZGVsQmFzZS5jcyIsIkxvYWRhYmxlVmlld01vZGVsLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWNnREEsT0FBT0Esa0JBQWFBLENBQUNBLGtCQUFpQkEsd0JBQTRCQTs7Ozs7O2dCQUl0R0EsaUJBQTBCQSxNQUFNQTs7O2dCQUtoQ0EsY0FBdUJBOzs7Ozs7Ozs7Ozs7OEJDaEJBQTtnQkFFdkJBOzs7Z0JBS0FBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFZpZXdNb2RlbEJhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIGRvbS5IVE1MRWxlbWVudCBfcGFnZU5vZGU7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRWxlbWVudCBpZCBvZiB0aGUgcGFnZSBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBFbGVtZW50SWQoKTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGRvbS5IVE1MRWxlbWVudCBQYWdlTm9kZSB7Z2V0e3JldHVybiBfcGFnZU5vZGUgPz8gKHRoaXMuX3BhZ2VOb2RlID0gZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEVsZW1lbnRJZCgpKSk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQXBwbHlCaW5kaW5ncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHRoaXMsIHRoaXMuUGFnZU5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQmluZGluZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga25vY2tvdXQua28ucmVtb3ZlTm9kZSh0aGlzLlBhZ2VOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBMb2FkYWJsZVZpZXdNb2RlbCA6IFZpZXdNb2RlbEJhc2UsIElBbUxvYWRhYmxlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQXBwbHlCaW5kaW5ncygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBPbkxlYXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuUmVtb3ZlQmluZGluZ3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
