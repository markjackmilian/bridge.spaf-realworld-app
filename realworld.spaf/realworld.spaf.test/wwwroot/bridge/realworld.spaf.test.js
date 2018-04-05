/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("realworld.spaf.test", function ($asm, globals) {
    "use strict";

    Bridge.define("realworld.spaf.test.ArticleResourceTest", {
        methods: {
            GetArticleReturnArticles: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    userService, 
                    articleResource, 
                    articles, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        userService = new realworld.spaf.test.FakeUserService();

                                        articleResource = new realworld.spaf.Services.impl.ArticleResources(new realworld.spaf.Services.impl.Settings(), userService);
                                        $task1 = articleResource.GetArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default());
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articles = $taskResult1;
                                        Bridge.EasyTests.Asserts.EasyAsserts.ShouldBeTrue(function () {
                                            return System.Linq.Enumerable.from(articles.Articles).any();
                                        });
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

    Bridge.define("realworld.spaf.test.FakeUserService", {
        inherits: [realworld.spaf.Services.IUserService],
        fields: {
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
                throw new System.NotImplementedException();
            },
            Register: function (username, mail, password) {
                throw new System.NotImplementedException();
            },
            TryAutoLoginWithStoredToken: function () {
                throw new System.NotImplementedException();
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi50ZXN0LmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcnRpY2xlUmVzb3VyY2VUZXN0LmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NBaUJZQSxjQUFrQkEsSUFBSUE7O3dDQUV0QkEsa0JBQXNCQSxJQUFJQSw4Q0FBaUJBLElBQUlBLHlDQUFZQTt3Q0FDM0RBLFNBQXFCQSw0QkFBNEJBOzs7Ozs7O21EQUFsQ0E7d0NBQ2ZBLGtEQUF5QkEsQUFBNEJBO21EQUFNQSw0QkFBa0VBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQVMvR0EsTUFBYUE7Z0JBRTNCQSxNQUFNQSxJQUFJQTs7Z0NBR09BLFVBQWlCQSxNQUFhQTtnQkFFL0NBLE1BQU1BLElBQUlBOzs7Z0JBS1ZBLE1BQU1BLElBQUlBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXNzZXJ0cztcbnVzaW5nIEJyaWRnZS5FYXN5VGVzdHMuQXR0cmlidXRlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLnRlc3RcbntcbiAgICBbVGVzdF1cbiAgICBwdWJsaWMgY2xhc3MgQXJ0aWNsZVJlc291cmNlVGVzdFxuICAgIHtcblxuICAgICAgICBbVGVzdE1ldGhvZCgpXVxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBHZXRBcnRpY2xlUmV0dXJuQXJ0aWNsZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdXNlclNlcnZpY2UgPSBuZXcgRmFrZVVzZXJTZXJ2aWNlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzb3VyY2UgPSBuZXcgQXJ0aWNsZVJlc291cmNlcyhuZXcgU2V0dGluZ3MoKSwgdXNlclNlcnZpY2UpO1xuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgYXJ0aWNsZVJlc291cmNlLkdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkpO1xuICAgICAgICAgICAgRWFzeUFzc2VydHMuU2hvdWxkQmVUcnVlKChnbG9iYWw6OlN5c3RlbS5GdW5jPGJvb2w+KSgoKSA9PiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPihhcnRpY2xlcy5BcnRpY2xlcykpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICBjbGFzcyBGYWtlVXNlclNlcnZpY2UgOiBJVXNlclNlcnZpY2VcbiAgICB7XG4gICAgICAgIHB1YmxpYyBVc2VyIExvZ2dlZFVzZXIgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBib29sIElzTG9nZ2VkIHsgZ2V0OyBwcml2YXRlIHNldDsgfSBcbiAgICAgICAgcHVibGljIFRhc2sgTG9naW4oc3RyaW5nIG1haWwsIHN0cmluZyBwYXNzd29yZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFN5c3RlbS5Ob3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2sgUmVnaXN0ZXIoc3RyaW5nIHVzZXJuYW1lLCBzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3lzdGVtLk5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzayBUcnlBdXRvTG9naW5XaXRoU3RvcmVkVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3lzdGVtLk5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59Il0KfQo=
