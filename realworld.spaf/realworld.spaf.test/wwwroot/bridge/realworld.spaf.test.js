/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("realworld.spaf.test", function ($asm, globals) {
    "use strict";

    Bridge.define("realworld.spaf.test.FakeNavigator", {
        inherits: [Bridge.Navigation.INavigator],
        fields: {
            /**
             * Is Navigated Called?
             *
             * @instance
             * @public
             * @memberof realworld.spaf.test.FakeNavigator
             * @function NavigateCalled
             * @type boolean
             */
            NavigateCalled: false,
            LastNavigateController: null
        },
        events: {
            OnNavigated: null
        },
        alias: [
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation",
            "EnableSpafAnchors", "Bridge$Navigation$INavigator$EnableSpafAnchors",
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "LastNavigateController", "Bridge$Navigation$INavigator$LastNavigateController",
            "addOnNavigated", "Bridge$Navigation$INavigator$addOnNavigated",
            "removeOnNavigated", "Bridge$Navigation$INavigator$removeOnNavigated"
        ],
        methods: {
            InitNavigation: function () {

            },
            EnableSpafAnchors: function () { },
            Navigate: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                this.NavigateCalled = true;
            }
        }
    });

    Bridge.define("realworld.spaf.test.FakeRepository", {
        inherits: [realworld.spaf.Services.IRepository],
        fields: {
            SaveTokenCalled: false
        },
        alias: [
            "SaveToken", "realworld$spaf$Services$IRepository$SaveToken",
            "GetTokenIfExist", "realworld$spaf$Services$IRepository$GetTokenIfExist",
            "DeleteToken", "realworld$spaf$Services$IRepository$DeleteToken"
        ],
        methods: {
            SaveToken: function (token) {
                this.SaveTokenCalled = true;
            },
            GetTokenIfExist: function () {
                throw new System.NotImplementedException();
            },
            DeleteToken: function () {
                throw new System.NotImplementedException();
            }
        }
    });

    Bridge.define("realworld.spaf.test.FakeUserResource", {
        inherits: [realworld.spaf.Services.IUserResources],
        fields: {
            LoginCalled: false
        },
        alias: [
            "Login", "realworld$spaf$Services$IUserResources$Login",
            "Register", "realworld$spaf$Services$IUserResources$Register",
            "GetCurrentUser", "realworld$spaf$Services$IUserResources$GetCurrentUser"
        ],
        methods: {
            Login: function (loginRequest) {
                var $t, $t1;
                this.LoginCalled = true;

                return System.Threading.Tasks.Task.fromResult(($t = new realworld.spaf.Models.Response.SignResponse(), $t.User = ($t1 = new realworld.spaf.Models.User(), $t1.Token = "123", $t1.Email = "me@markjackmilian.com", $t1.Id = 1, $t1.Username = "markjackmilian", $t1), $t), Bridge.global.realworld.spaf.Models.Response.SignResponse);
            },
            Register: function (loginRequest) {
                throw new System.NotImplementedException();
            },
            GetCurrentUser: function (token) {
                throw new System.NotImplementedException();
            }
        }
    });

    Bridge.define("realworld.spaf.test.FakeUserService", {
        inherits: [realworld.spaf.Services.IUserService],
        fields: {
            /**
             * Is Login Called?
             *
             * @instance
             * @public
             * @memberof realworld.spaf.test.FakeUserService
             * @function LoginCalled
             * @type boolean
             */
            LoginCalled: false,
            LoggedUser: null,
            IsLogged: false
        },
        alias: [
            "LoggedUser", "realworld$spaf$Services$IUserService$LoggedUser",
            "IsLogged", "realworld$spaf$Services$IUserService$IsLogged",
            "Login", "realworld$spaf$Services$IUserService$Login",
            "Register", "realworld$spaf$Services$IUserService$Register",
            "TryAutoLoginWithStoredToken", "realworld$spaf$Services$IUserService$TryAutoLoginWithStoredToken"
        ],
        methods: {
            Login: function (mail, password) {
                this.LoginCalled = true;
                return System.Threading.Tasks.Task.fromResult(0, System.Int32);
            },
            Register: function (username, mail, password) {
                throw new System.NotImplementedException();
            },
            TryAutoLoginWithStoredToken: function () {
                throw new System.NotImplementedException();
            }
        }
    });

    Bridge.define("realworld.spaf.test.LoginViewModelTest", {
        methods: {
            WhenLoginIsCalled_LoginOnUserServiceIsCalled: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    fakeNavigator, 
                    fakeUSerService, 
                    loginVm, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        fakeNavigator = new realworld.spaf.test.FakeNavigator();
                                        fakeUSerService = new realworld.spaf.test.FakeUserService();
                                        loginVm = new realworld.spaf.ViewModels.LoginViewModel(fakeNavigator, fakeUSerService);
                                        $task1 = loginVm.Login();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Boolean, fakeUSerService.LoginCalled, true);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            WhenLoginIsCalled_NavigateIsCalled: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    fakeNavigator, 
                    fakeUSerService, 
                    loginVm, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        fakeNavigator = new realworld.spaf.test.FakeNavigator();
                                        fakeUSerService = new realworld.spaf.test.FakeUserService();
                                        loginVm = new realworld.spaf.ViewModels.LoginViewModel(fakeNavigator, fakeUSerService);
                                        $task1 = loginVm.Login();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Boolean, fakeNavigator.NavigateCalled, true);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.test.UserServiceTest", {
        methods: {
            WhenLoginDone_RepoSaveTokenIsCalled: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    repo, 
                    userService, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        repo = new realworld.spaf.test.FakeRepository();
                                        userService = new realworld.spaf.Services.impl.UserService(new realworld.spaf.test.FakeUserResource(), new Bridge.Messenger.Messenger(), repo);
                                        $task1 = userService.Login("fake", "fakse");
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.Boolean, repo.SaveTokenCalled, true);
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            WhenLoginDone_LoggedUserIsSetted: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    repo, 
                    userService, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        repo = new realworld.spaf.test.FakeRepository();
                                        userService = new realworld.spaf.Services.impl.UserService(new realworld.spaf.test.FakeUserResource(), new Bridge.Messenger.Messenger(), repo);
                                        $task1 = userService.Login("fake", "fakse");
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeNotEquals(Bridge.global.realworld.spaf.Models.User, userService.LoggedUser, null);
                                        Bridge.EasyTests.Asserts.ShouldExtensions.ShouldBeEquals(System.String, userService.LoggedUser.Username, "markjackmilian");
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi50ZXN0LmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJGYWtlcy5jcyIsIkxvZ2luVmlld01vZGVsVGVzdC5jcyIsIlVzZXJTZXJ2aWNlVGVzdC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQTJCNkJBLFFBQWVBOztnQkFFaENBOzs7Ozs7Ozs7Ozs7Ozs7O2lDQXNFa0JBO2dCQUVsQkE7OztnQkFLQUEsTUFBTUEsSUFBSUE7OztnQkFLVkEsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBM0NrQkE7O2dCQUU1QkE7O2dCQUVBQSxPQUFPQSx1Q0FBcUVBLFVBQUlBLHlEQUVyRUEsV0FBSUEsOElBRlFBOztnQ0FZUUE7Z0JBRS9CQSxNQUFNQSxJQUFJQTs7c0NBRzJCQTtnQkFFckNBLE1BQU1BLElBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkE3Q0lBLE1BQWFBO2dCQUUzQkE7Z0JBQ0FBLE9BQU9BLDBDQUFnQkE7O2dDQUlOQSxVQUFpQkEsTUFBYUE7Z0JBRS9DQSxNQUFNQSxJQUFJQTs7O2dCQUtWQSxNQUFNQSxJQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NDL0NWQSxnQkFBb0JBLElBQUlBO3dDQUN4QkEsa0JBQXNCQSxJQUFJQTt3Q0FDMUJBLFVBQWNBLElBQUlBLHlDQUFlQSxlQUFlQTt3Q0FDaERBLFNBQU1BOzs7Ozs7O3dDQUNsQkEseUVBQTJFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NBTS9EQSxnQkFBb0JBLElBQUlBO3dDQUN4QkEsa0JBQXNCQSxJQUFJQTt3Q0FDMUJBLFVBQWNBLElBQUlBLHlDQUFlQSxlQUFlQTt3Q0FDaERBLFNBQU1BOzs7Ozs7O3dDQUNsQkEseUVBQTJFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQ2IvREEsT0FBV0EsSUFBSUE7d0NBQ2ZBLGNBQWtCQSxJQUFJQSx5Q0FBWUEsSUFBSUEsd0NBQW9CQSxJQUFJQSw4QkFBYUE7d0NBQzNFQSxTQUFNQTs7Ozs7Ozt3Q0FDbEJBLHlFQUNZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3Q0FNQUEsT0FBV0EsSUFBSUE7d0NBQ2ZBLGNBQWtCQSxJQUFJQSx5Q0FBWUEsSUFBSUEsd0NBQW9CQSxJQUFJQSw4QkFBYUE7d0NBQzNFQSxTQUFNQTs7Ozs7Ozt3Q0FDbEJBLHNHQUNZQSx3QkFBdUJBO3dDQUNuQ0Esd0VBQTZFQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi50ZXN0XG57XG4gICAgY2xhc3MgRmFrZU5hdmlnYXRvciA6IElOYXZpZ2F0b3JcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIElzIE5hdmlnYXRlZCBDYWxsZWQ/XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBib29sIE5hdmlnYXRlQ2FsbGVkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXROYXZpZ2F0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBFbmFibGVTcGFmQW5jaG9ycygpXG4gICAgICAgIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIE5hdmlnYXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLk5hdmlnYXRlQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBJQW1Mb2FkYWJsZSBMYXN0TmF2aWdhdGVDb250cm9sbGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuICAgICAgICBwdWJsaWMgZXZlbnQgRXZlbnRIYW5kbGVyPElBbUxvYWRhYmxlPiBPbk5hdmlnYXRlZDtcbiAgICB9XG4gICAgXG4gICAgY2xhc3MgRmFrZVVzZXJTZXJ2aWNlIDogSVVzZXJTZXJ2aWNlXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBJcyBMb2dpbiBDYWxsZWQ/XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBib29sIExvZ2luQ2FsbGVkIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuXG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgVXNlciBMb2dnZWRVc2VyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBJc0xvZ2dlZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH0gXG4gICAgICAgIHB1YmxpYyBUYXNrIExvZ2luKHN0cmluZyBtYWlsLCBzdHJpbmcgcGFzc3dvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuTG9naW5DYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIFRhc2suRnJvbVJlc3VsdDxpbnQ+KDApO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgVGFzayBSZWdpc3RlcihzdHJpbmcgdXNlcm5hbWUsIHN0cmluZyBtYWlsLCBzdHJpbmcgcGFzc3dvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeXN0ZW0uTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrIFRyeUF1dG9Mb2dpbldpdGhTdG9yZWRUb2tlbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTeXN0ZW0uTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEZha2VVc2VyUmVzb3VyY2UgOiBJVXNlclJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHVibGljIGJvb2wgTG9naW5DYWxsZWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBMb2dpbihTaWduUmVxdWVzdCBsb2dpblJlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuTG9naW5DYWxsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gVGFzay5Gcm9tUmVzdWx0PGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlLlNpZ25SZXNwb25zZT4obmV3IFNpZ25SZXNwb25zZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVzZXIgPSBuZXcgVXNlclxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4gPSBcIjEyM1wiLFxuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IFwibWVAbWFya2phY2ttaWxpYW4uY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIElkID0gMSxcbiAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWUgPSBcIm1hcmtqYWNrbWlsaWFuXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gUmVnaXN0ZXIoU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gR2V0Q3VycmVudFVzZXIoc3RyaW5nIHRva2VuKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEZha2VSZXBvc2l0b3J5IDogSVJlcG9zaXRvcnlcbiAgICB7XG4gICAgICAgIHB1YmxpYyBib29sIFNhdmVUb2tlbkNhbGxlZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBTYXZlVG9rZW4oc3RyaW5nIHRva2VuKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLlNhdmVUb2tlbkNhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFRva2VuSWZFeGlzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHM7XG51c2luZyBCcmlkZ2UuRWFzeVRlc3RzLkF0dHJpYnV0ZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYudGVzdFxue1xuICAgIFtUZXN0XVxuICAgIHB1YmxpYyBjbGFzcyBMb2dpblZpZXdNb2RlbFRlc3RcbiAgICB7XG4gICAgICAgIFtUZXN0TWV0aG9kXVxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBXaGVuTG9naW5Jc0NhbGxlZF9Mb2dpbk9uVXNlclNlcnZpY2VJc0NhbGxlZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBmYWtlTmF2aWdhdG9yID0gbmV3IEZha2VOYXZpZ2F0b3IoKTtcbiAgICAgICAgICAgIHZhciBmYWtlVVNlclNlcnZpY2UgPSBuZXcgRmFrZVVzZXJTZXJ2aWNlKCk7XG4gICAgICAgICAgICB2YXIgbG9naW5WbSA9IG5ldyBMb2dpblZpZXdNb2RlbChmYWtlTmF2aWdhdG9yLCBmYWtlVVNlclNlcnZpY2UpO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5WbS5Mb2dpbigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Ym9vbD4oICAgICAgICAgICAgZmFrZVVTZXJTZXJ2aWNlLkxvZ2luQ2FsbGVkLHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgV2hlbkxvZ2luSXNDYWxsZWRfTmF2aWdhdGVJc0NhbGxlZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBmYWtlTmF2aWdhdG9yID0gbmV3IEZha2VOYXZpZ2F0b3IoKTtcbiAgICAgICAgICAgIHZhciBmYWtlVVNlclNlcnZpY2UgPSBuZXcgRmFrZVVzZXJTZXJ2aWNlKCk7XG4gICAgICAgICAgICB2YXIgbG9naW5WbSA9IG5ldyBMb2dpblZpZXdNb2RlbChmYWtlTmF2aWdhdG9yLCBmYWtlVVNlclNlcnZpY2UpO1xuICAgICAgICAgICAgYXdhaXQgbG9naW5WbS5Mb2dpbigpO1xuQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzLlNob3VsZEV4dGVuc2lvbnMuU2hvdWxkQmVFcXVhbHM8Ym9vbD4oICAgICAgICAgICAgZmFrZU5hdmlnYXRvci5OYXZpZ2F0ZUNhbGxlZCx0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5Bc3NlcnRzO1xudXNpbmcgQnJpZGdlLkVhc3lUZXN0cy5BdHRyaWJ1dGVzO1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi50ZXN0XG57XG4gICAgW1Rlc3RdXG4gICAgcHVibGljIGNsYXNzIFVzZXJTZXJ2aWNlVGVzdFxuICAgIHtcbiAgICAgICAgW1Rlc3RNZXRob2RdXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFdoZW5Mb2dpbkRvbmVfUmVwb1NhdmVUb2tlbklzQ2FsbGVkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlcG8gPSBuZXcgRmFrZVJlcG9zaXRvcnkoKTtcbiAgICAgICAgICAgIHZhciB1c2VyU2VydmljZSA9IG5ldyBVc2VyU2VydmljZShuZXcgRmFrZVVzZXJSZXNvdXJjZSgpLCBuZXcgTWVzc2VuZ2VyKCksIHJlcG8pO1xuICAgICAgICAgICAgYXdhaXQgdXNlclNlcnZpY2UuTG9naW4oXCJmYWtlXCIsIFwiZmFrc2VcIik7XG5CcmlkZ2UuRWFzeVRlc3RzLkFzc2VydHMuU2hvdWxkRXh0ZW5zaW9ucy5TaG91bGRCZUVxdWFsczxib29sPiggICAgICAgICAgICBcbiAgICAgICAgICAgIHJlcG8uU2F2ZVRva2VuQ2FsbGVkLHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbVGVzdE1ldGhvZF1cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgV2hlbkxvZ2luRG9uZV9Mb2dnZWRVc2VySXNTZXR0ZWQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVwbyA9IG5ldyBGYWtlUmVwb3NpdG9yeSgpO1xuICAgICAgICAgICAgdmFyIHVzZXJTZXJ2aWNlID0gbmV3IFVzZXJTZXJ2aWNlKG5ldyBGYWtlVXNlclJlc291cmNlKCksIG5ldyBNZXNzZW5nZXIoKSwgcmVwbyk7XG4gICAgICAgICAgICBhd2FpdCB1c2VyU2VydmljZS5Mb2dpbihcImZha2VcIiwgXCJmYWtzZVwiKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlTm90RXF1YWxzPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlVzZXI+KCAgICAgICAgICAgIFxuICAgICAgICAgICAgdXNlclNlcnZpY2UuTG9nZ2VkVXNlcixudWxsKTtcbkJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cy5TaG91bGRFeHRlbnNpb25zLlNob3VsZEJlRXF1YWxzPHN0cmluZz4oICAgICAgICAgICAgdXNlclNlcnZpY2UuTG9nZ2VkVXNlci5Vc2VybmFtZSxcIm1hcmtqYWNrbWlsaWFuXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgICAgIFtUZXN0TWV0aG9kXVxuLy8gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEp1c3RTZWVBRmFpbFRlc3QoKVxuLy8gICAgICAgIHtcbi8vICAgICAgICAgICAgdmFyIHJlcG8gPSBuZXcgRmFrZVJlcG9zaXRvcnkoKTtcbi8vICAgICAgICAgICAgdmFyIHVzZXJTZXJ2aWNlID0gbmV3IFVzZXJTZXJ2aWNlKG5ldyBGYWtlVXNlclJlc291cmNlKCksIG5ldyBNZXNzZW5nZXIoKSwgcmVwbyk7XG4vLyAgICAgICAgICAgIGF3YWl0IHVzZXJTZXJ2aWNlLkxvZ2luKFwiZmFrZVwiLCBcImZha3NlXCIpO1xuLy8gICAgICAgICAgICBcbi8vICAgICAgICAgICAgdXNlclNlcnZpY2UuTG9nZ2VkVXNlci5Vc2VybmFtZS5TaG91bGRCZUVxdWFscyhcImZhaWxfdGVzdFwiKTtcbi8vICAgICAgICB9XG4gICAgfVxufSJdCn0K
