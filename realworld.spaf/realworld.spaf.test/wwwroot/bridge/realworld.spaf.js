/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("realworld.spaf", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Spaf.CustomRoutesConfig", {
        inherits: [Bridge.Navigation.BridgeNavigatorConfigBase],
        fields: {
            _userService: null,
            DisableAutoSpafAnchorsOnNavigate: false,
            Body: null,
            HomeId: null
        },
        props: {
            VirtualDirectory: {
                get: function () {
                    return System.String.isNullOrEmpty(Bridge.Navigation.NavigationUtility.VirtualDirectory) ? "" : System.String.format("{0}/", [Bridge.Navigation.NavigationUtility.VirtualDirectory]);
                }
            }
        },
        alias: [
            "DisableAutoSpafAnchorsOnNavigate", "Bridge$Navigation$INavigatorConfigurator$DisableAutoSpafAnchorsOnNavigate",
            "CreateRoutes", "Bridge$Navigation$INavigatorConfigurator$CreateRoutes",
            "Body", "Bridge$Navigation$INavigatorConfigurator$Body",
            "HomeId", "Bridge$Navigation$INavigatorConfigurator$HomeId"
        ],
        ctors: {
            init: function () {
                this.DisableAutoSpafAnchorsOnNavigate = false;
                this.Body = $("#pageBody");
                this.HomeId = Bridge.Spaf.SpafApp.HomeId;
            },
            ctor: function (userService) {
                this.$initialize();
                Bridge.Navigation.BridgeNavigatorConfigBase.ctor.call(this);
                this._userService = userService;
            }
        },
        methods: {
            CreateRoutes: function () {
                return Bridge.fn.bind(this, function (_o1) {
                        var $t;
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/home.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.HomeId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.HomeViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/login.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.LoginId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.LoginViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/register.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.RegisterId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.RegisterViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/profile.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.ProfileId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.ProfileViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = Bridge.fn.bind(this, function () {
                            return this._userService.realworld$spaf$Services$IUserService$IsLogged;
                        }), $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/settings.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.SettingsId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.SettingsViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return false;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/editArticle.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.EditArticleId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.EditArticleViewModel);
                        }, $t));
                        _o1.add(($t = new Bridge.Navigation.PageDescriptor(), $t.CanBeDirectLoad = function () {
                            return true;
                        }, $t.HtmlLocation = Bridge.fn.bind(this, function () {
                            return System.String.format("{0}pages/article.html", [this.VirtualDirectory]);
                        }), $t.Key = Bridge.Spaf.SpafApp.ArticleId, $t.PageController = function () {
                            return Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.ArticleViewModel);
                        }, $t));
                        return _o1;
                    })(new (System.Collections.Generic.List$1(Bridge.Navigation.IPageDescriptor)).ctor());
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp", {
        main: function Main () {
            var $step = 0,
                $task1, 
                $jumpFromFinally, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0], $step);
                        switch ($step) {
                            case 0: {
                                return; //  virtual dit for release environment // config container // init navigation
                                return;
                            }
                            default: {
                                return;
                            }
                        }
                    }
                }, arguments);

            $asyncBody();
        },
        statics: {
            fields: {
                Container: null
            },
            props: {
                HomeId: {
                    get: function () {
                        return "home";
                    }
                },
                LoginId: {
                    get: function () {
                        return "login";
                    }
                },
                RegisterId: {
                    get: function () {
                        return "register";
                    }
                },
                ProfileId: {
                    get: function () {
                        return "profile";
                    }
                },
                SettingsId: {
                    get: function () {
                        return "settings";
                    }
                },
                EditArticleId: {
                    get: function () {
                        return "editArticle";
                    }
                },
                ArticleId: {
                    get: function () {
                        return "article";
                    }
                }
            },
            methods: {
                ContainerConfig: function () {
                    // navigator
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Navigation.INavigator, Bridge.Navigation.BridgeNavigatorWithRouting);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(Bridge.Navigation.INavigatorConfigurator, Bridge.Spaf.CustomRoutesConfig);

                    // messenger
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Messenger.IMessenger, Bridge.Messenger.Messenger);

                    // viewmodels
                    Bridge.Spaf.SpafApp.RegisterAllViewModels();

                    // register custom resource, services..
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(realworld.spaf.Services.ISettings, realworld.spaf.Services.impl.Settings);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(realworld.spaf.Services.IUserService, realworld.spaf.Services.impl.UserService);

                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IArticleResources, realworld.spaf.Services.impl.ArticleResources);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IUserResources, realworld.spaf.Services.impl.UserResources);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IFeedResources, realworld.spaf.Services.impl.FeedResources);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IProfileResources, realworld.spaf.Services.impl.ProfileResources);

                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.IRepository, realworld.spaf.Services.impl.LocalStorageRepository);
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register$4(realworld.spaf.Services.ISettingsResources, realworld.spaf.Services.impl.SettingsResources);

                },
                /**
                 * Register all types that end with "viewmodel".
                 You can register a viewmode as Singlr Instance adding "SingleInstanceAttribute" to the class
                 *
                 * @static
                 * @private
                 * @this Bridge.Spaf.SpafApp
                 * @memberof Bridge.Spaf.SpafApp
                 * @return  {void}
                 */
                RegisterAllViewModels: function () {
                    var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies()).selectMany(function (s) {
                            return Bridge.Reflection.getAssemblyTypes(s);
                        }).where(function (w) {
                        return System.String.endsWith(Bridge.Reflection.getTypeName(w).toLowerCase(), "viewmodel");
                    }).toList(Function);

                    types.forEach(function (f) {
                        var attributes = Bridge.Reflection.getAttributes(f, Bridge.Spaf.Attributes.SingleInstanceAttribute, true);

                        if (System.Linq.Enumerable.from(attributes).any()) {
                            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance(f);
                        } else {
                            Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Register(f);
                        }
                    });

                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp.Messages", {
        $kind: "nested class",
        statics: {
            fields: {
                Sender: null
            },
            props: {
                LoginDone: {
                    get: function () {
                        return "LoginDone";
                    }
                }
            },
            ctors: {
                init: function () {
                    this.Sender = new Bridge.Spaf.SpafApp.Messages.GlobalSender();
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.SpafApp.Messages.GlobalSender", {
        $kind: "nested class"
    });

    Bridge.define("realworld.spaf.Classes.Extensions", {
        statics: {
            methods: {
                /**
                 * Deserialize realworld promise exception to get errors
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {Bridge.PromiseException}                    exception
                 * @return  {System.Collections.Generic.Dictionary$2}
                 */
                GetValidationErrorResponse: function (exception) {
                    var $t;
                    var errors = Bridge.cast(Newtonsoft.Json.JsonConvert.DeserializeObject(($t = exception.arguments)[System.Array.index(0, $t)].responseJSON, realworld.spaf.Models.Response.ErrorResponse), realworld.spaf.Models.Response.ErrorResponse);
                    return errors.Errors;
                },
                /**
                 * Get readable error list
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {Bridge.PromiseException}                     exception
                 * @return  {System.Collections.Generic.IEnumerable$1}
                 */
                GetValidationErrors: function (exception) {
                    return new (Bridge.GeneratorEnumerable$1(System.String))(Bridge.fn.bind(this, function (exception) {
                        var $step = 0,
                            $jumpFromFinally,
                            $returnValue,
                            errors,
                            $t,
                            error,
                            $t1,
                            errorDescription,
                            $async_e;

                        var $enumerator = new (Bridge.GeneratorEnumerator$1(System.String))(Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    switch ($step) {
                                        case 0: {
                                            errors = realworld.spaf.Classes.Extensions.GetValidationErrorResponse(exception);

                                                $t = Bridge.getEnumerator(errors);
                                                $step = 1;
                                                continue;
                                        }
                                        case 1: {
                                            if ($t.moveNext()) {
                                                    error = $t.Current;
                                                    $step = 2;
                                                    continue;
                                                }
                                            $step = 7;
                                            continue;
                                        }
                                        case 2: {
                                            $t1 = Bridge.getEnumerator(error.value);
                                                $step = 3;
                                                continue;
                                        }
                                        case 3: {
                                            if ($t1.moveNext()) {
                                                    errorDescription = $t1.Current;
                                                    $step = 4;
                                                    continue;
                                                }
                                            $step = 6;
                                            continue;
                                        }
                                        case 4: {
                                            $enumerator.current = System.String.format("{0} {1}", error.key, errorDescription);
                                                $step = 5;
                                                return true;
                                        }
                                        case 5: {
                                            $step = 3;
                                            continue;
                                        }
                                        case 6: {
                                            $step = 1;
                                            continue;
                                        }
                                        case 7: {

                                        }
                                        default: {
                                            return false;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                throw $async_e;
                            }
                        }));
                        return $enumerator;
                    }, arguments));
                },
                /**
                 * Get error for htmlerrorcode
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {number}    errorCode
                 * @return  {string}
                 */
                GetErrorForCode: function (errorCode) {
                    switch (errorCode) {
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
                },
                /**
                 * Get error code for promise exception
                 *
                 * @static
                 * @public
                 * @this realworld.spaf.Classes.Extensions
                 * @memberof realworld.spaf.Classes.Extensions
                 * @param   {Bridge.PromiseException}    exception
                 * @return  {number}
                 */
                ErrorCode: function (exception) {
                    var $t;
                    var errorCode = Bridge.cast(($t = exception.arguments)[System.Array.index(0, $t)].status, System.Int32);
                    return errorCode;
                }
            }
        }
    });

    Bridge.define("realworld.spaf.Classes.FeedRequestBuilder", {
        statics: {
            methods: {
                Default: function () {
                    return new realworld.spaf.Classes.FeedRequestBuilder();
                }
            }
        },
        fields: {
            _offset: 0,
            _limit: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this._limit = 20;
                this._offset = 0;
            }
        },
        methods: {
            WithOffSet: function (offset) {
                this._offset = offset;
                return this;
            },
            WithLimit: function (limit) {
                this._limit = limit;
                return this;
            },
            Build: function () {
                var stringBuilder = new System.Text.StringBuilder("articles/feed");

                stringBuilder.append(System.String.format("?limit={0}", [Bridge.box(this._limit, System.Int32)]));
                stringBuilder.append(System.String.format("&&offset={0}", [Bridge.box(this._offset, System.Int32)]));

                return stringBuilder.toString();

            }
        }
    });

    Bridge.define("realworld.spaf.Models.Article", {
        fields: {
            Title: null,
            Slug: null,
            Body: null,
            CreatedAt: null,
            UpdatedAt: null,
            TagList: null,
            Description: null,
            Author: null,
            Favorited: false,
            FavoritesCount: System.Int64(0)
        },
        props: {
            Create: {
                get: function () {
                    var $t;
                    return !Bridge.equals(($t = this.CreatedAt), null) ? System.DateTime.format($t, "MMMM dd") : null;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Author = new realworld.spaf.Models.Author();
            }
        }
    });

    Bridge.define("realworld.spaf.Models.Author", {
        fields: {
            Username: null,
            Bio: null,
            Image: null,
            Following: false
        }
    });

    Bridge.define("realworld.spaf.Models.Comment", {
        fields: {
            Id: System.Int64(0),
            CreatedAt: null,
            UpdatedAt: null,
            Body: null,
            Author: null
        },
        props: {
            Create: {
                get: function () {
                    return System.DateTime.format(this.CreatedAt, "MMMM dd");
                }
            }
        },
        ctors: {
            init: function () {
                this.CreatedAt = System.DateTime.getDefaultValue();
                this.UpdatedAt = System.DateTime.getDefaultValue();
            },
            ctor: function () {
                this.$initialize();
                this.Author = new realworld.spaf.Models.Author();
            }
        }
    });

    Bridge.define("realworld.spaf.Models.NewArticle", {
        fields: {
            Title: null,
            Description: null,
            Body: null,
            TagList: null
        }
    });

    Bridge.define("realworld.spaf.Models.Paginator", {
        fields: {
            Active: null,
            Page: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Active = ko.observable();
            }
        }
    });

    Bridge.define("realworld.spaf.Models.Profile", {
        fields: {
            Username: null,
            Bio: null,
            Image: null,
            Following: false
        }
    });

    Bridge.define("realworld.spaf.Models.Request.NewArticleRequest", {
        fields: {
            Article: null
        }
    });

    Bridge.define("realworld.spaf.Models.Request.SettingsRequest", {
        fields: {
            ImageUri: null,
            Username: null,
            Biography: null,
            Email: null,
            NewPassword: null
        }
    });

    Bridge.define("realworld.spaf.Models.Request.SignRequest", {
        fields: {
            User: null
        }
    });

    Bridge.define("realworld.spaf.Models.Request.UserRequest", {
        fields: {
            Username: null,
            Email: null,
            Password: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.ArticleResponse", {
        fields: {
            Articles: null,
            ArticlesCount: System.Int64(0)
        }
    });

    Bridge.define("realworld.spaf.Models.Response.CommentsResponse", {
        fields: {
            Comments: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.ErrorResponse", {
        fields: {
            Errors: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.FollowResponse", {
        fields: {
            Profile: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.ProfileResponse", {
        fields: {
            Profile: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SettingsResponse", {
        fields: {
            User: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SignResponse", {
        fields: {
            User: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SingleArticleResponse", {
        fields: {
            Article: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.SingleCommentResponse", {
        fields: {
            Comment: null
        }
    });

    Bridge.define("realworld.spaf.Models.Response.TagsResponse", {
        fields: {
            Tags: null
        }
    });

    Bridge.define("realworld.spaf.Models.User", {
        fields: {
            Id: 0,
            Email: null,
            Token: null,
            Username: null,
            Bio: null,
            Image: null
        }
    });

    Bridge.define("realworld.spaf.Services.IArticleResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IFeedResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.impl.ArticleRequestBuilder", {
        statics: {
            methods: {
                Default: function () {
                    return new realworld.spaf.Services.impl.ArticleRequestBuilder();
                }
            }
        },
        fields: {
            _tag: null,
            _author: null,
            _offset: 0,
            _limit: 0,
            _user: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this._limit = 20;
                this._offset = 0;
            }
        },
        methods: {
            WithOffSet: function (offset) {
                this._offset = offset;
                return this;
            },
            WithLimit: function (limit) {
                this._limit = limit;
                return this;
            },
            OfAuthor: function (author) {
                this._author = author;
                return this;
            },
            WithTag: function (tag) {
                this._tag = tag;
                return this;
            },
            OfFavorite: function (user) {
                this._user = user;
                return this;
            },
            Build: function () {
                var stringBuilder = new System.Text.StringBuilder("articles");

                stringBuilder.append(System.String.format("?limit={0}", [Bridge.box(this._limit, System.Int32)]));
                stringBuilder.append(System.String.format("&&offset={0}", [Bridge.box(this._offset, System.Int32)]));

                if (!System.String.isNullOrEmpty(this._tag)) {
                    stringBuilder.append(System.String.format("&&tag={0}", [this._tag]));
                }

                if (!System.String.isNullOrEmpty(this._author)) {
                    stringBuilder.append(System.String.format("&&author={0}", [this._author]));
                }

                if (!System.String.isNullOrEmpty(this._user)) {
                    stringBuilder.append(System.String.format("&&favorited={0}", [this._user]));
                }

                return stringBuilder.toString();

            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.ResourceBase", {
        methods: {
            /**
             * Generic Awaitable ajax call
             *
             * @instance
             * @protected
             * @this realworld.spaf.Services.impl.ResourceBase
             * @memberof realworld.spaf.Services.impl.ResourceBase
             * @param   {Function}                         T          
             * @param   {System.Object}                    options
             * @return  {System.Threading.Tasks.Task$1}
             */
            MakeCall: function (T, options) {
                return System.Threading.Tasks.Task.fromPromise($.ajax(options), function (resObj, success, jqXhr) {
                    var json = JSON.stringify(Bridge.unbox(resObj));
                    var obj = Newtonsoft.Json.JsonConvert.DeserializeObject(json, T);
                    return obj;
                });

            }
        }
    });

    Bridge.define("realworld.spaf.Services.IRepository", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IProfileResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.ISettings", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.ISettingsResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IUserResources", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.Services.IUserService", {
        $kind: "interface"
    });

    Bridge.define("realworld.spaf.ViewModels.ArticleViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _articleResources: null,
            _userService: null,
            _navigator: null,
            _profileResources: null,
            Article: null,
            Comments: null,
            Comment: null
        },
        props: {
            IsLogged: {
                get: function () {
                    return this._userService.realworld$spaf$Services$IUserService$IsLogged;
                }
            },
            LoggedUser: {
                get: function () {
                    return this._userService.realworld$spaf$Services$IUserService$LoggedUser;
                }
            }
        },
        alias: ["OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad"],
        ctors: {
            ctor: function (articleResources, userService, navigator, profileResources) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._articleResources = articleResources;
                this._userService = userService;
                this._navigator = navigator;
                this._profileResources = profileResources;

                this.Article = new realworld.spaf.Models.Article();
                this.Comments = ko.observableArray();
                this.Comment = ko.observable();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.ArticleId;
            },
            OnLoad: function (parameters) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    slug, 
                    articleTask, 
                    commentsTask, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);

                                    slug = Bridge.Navigation.NavigationUtility.GetParameter(System.String, parameters, "slug");
                                    if (System.String.isNullOrEmpty(slug)) {
                                        throw new System.Exception("Article page need slug parameter");
                                    }

                                    articleTask = this.LoadArticle(slug);
                                    commentsTask = this.LoadComments(slug);
                                    $task1 = System.Threading.Tasks.Task.whenAll(articleTask, commentsTask);
                                    $step = 1;
                                    $task1.continueWith($asyncBody, true);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    this.RefreshBinding(); // manual refresh for performance
                                    this._navigator.Bridge$Navigation$INavigator$EnableSpafAnchors(); // todo check why not auto enabled
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            /**
             * Add comment to article
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            AddComment: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    commentResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!this.IsLogged) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$AddComment(this.Article.Slug, this.Comment());
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        commentResponse = $taskResult1;
                                        this.Comment("");
                                        this.Comments.push(commentResponse.Comment);
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
            /**
             * Follow Article Author
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            FollowAuthor: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._profileResources.realworld$spaf$Services$IProfileResources$Follow(this.Article.Author.Username);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
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
            /**
             * Manual revaluate binding
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @return  {void}
             */
            RefreshBinding: function () {
                ko.cleanNode(this.PageNode);
                this.ApplyBindings();
            },
            /**
             * Load comments
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @param   {string}                         slug
             * @return  {System.Threading.Tasks.Task}
             */
            LoadComments: function (slug) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    comment, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticleComments(slug);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        comment = $taskResult1;
                                        this.Comments.push.apply(this.Comments, comment.Comments);
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
            /**
             * Load Article info
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ArticleViewModel
             * @memberof realworld.spaf.ViewModels.ArticleViewModel
             * @param   {string}                         slug
             * @return  {System.Threading.Tasks.Task}
             */
            LoadArticle: function (slug) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    article, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticle(slug);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        article = $taskResult1;
                                        this.Article = article.Article;
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

    Bridge.define("realworld.spaf.ViewModels.EditArticleViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _articleResources: null,
            _navigator: null,
            Title: null,
            Body: null,
            Description: null,
            Tags: null
        },
        alias: ["OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad"],
        ctors: {
            ctor: function (articleResources, navigator) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._articleResources = articleResources;
                this._navigator = navigator;
                this.Title = ko.observable();
                this.Body = ko.observable();
                this.Description = ko.observable();
                this.Tags = ko.observable();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.EditArticleId;
            },
            OnLoad: function (parameters) {
                Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);

                //            var articleSlug = parameters.GetParameter<string>("slug");
                //            if(string.IsNullOrEmpty(articleSlug))
                //                throw new Exception("Slug missing!");

            },
            Create: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    newArticel, 
                    $t, 
                    $t1, 
                    article, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        // todo validations
                                        newArticel = ($t = new realworld.spaf.Models.Request.NewArticleRequest(), $t.Article = ($t1 = new realworld.spaf.Models.NewArticle(), $t1.Title = this.Title(), $t1.Body = this.Body(), $t1.Description = this.Description(), $t1.TagList = System.Linq.Enumerable.from(System.String.split(this.Tags(), [44].map(function(i) {{ return String.fromCharCode(i); }}))).toArray(), $t1), $t);

                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$Create(newArticel);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        article = $taskResult1;
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                                            _o1.add("slug", article.Article.Slug);
                                            return _o1;
                                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
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

    Bridge.define("realworld.spaf.ViewModels.HomeViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _tagFilter: null,
            _resources: null,
            _settings: null,
            _messenger: null,
            _userService: null,
            _feedResources: null,
            _navigator: null,
            Articles: null,
            Pages: null,
            Tags: null,
            ActiveTabIndex: null,
            Tabs: null,
            IsLogged: null
        },
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        ctors: {
            ctor: function (resources, settings, messenger, userService, feedResources, navigator) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._resources = resources;
                this._settings = settings;
                this._messenger = messenger;
                this._userService = userService;
                this._feedResources = feedResources;
                this._navigator = navigator;
                this.Articles = ko.observableArray();
                this.Pages = ko.observableArray();
                this.Tags = ko.observableArray();
                this.Tabs = ko.observableArray();
                this.IsLogged = ko.observable(this._userService.realworld$spaf$Services$IUserService$IsLogged);
                this.ActiveTabIndex = ko.observable(-1);

            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.HomeId;
            },
            OnLoad: function (parameters) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    articlesTask, 
                    loadTagsTask, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters); // always call base (where applybinding)

                                    articlesTask = this.LoadArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage)); // load article task
                                    loadTagsTask = this.LoadTags();
                                    $task1 = System.Threading.Tasks.Task.whenAll(articlesTask, loadTagsTask);
                                    $step = 1;
                                    $task1.continueWith($asyncBody, true);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    this.RefreshPaginator(articlesTask.getResult());
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            OnLeave: function () {
                Bridge.Spaf.LoadableViewModel.prototype.OnLeave.call(this);
                this._messenger.Bridge$Messenger$IMessenger$Unsubscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.LoginId);
            },
            /**
             * Navigate to user detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToUser: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ProfileId, function (_o1) {
                        _o1.add("username", article.Author.Username);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
            },
            /**
             * Navigate to article detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToArticle: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                        _o1.add("slug", article.Slug);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
            },
            /**
             * Add passed article to fav
             Only for auth users
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {System.Threading.Tasks.Task}
             */
            AddToFavourite: function (article) {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    singleArticle, 
                    $taskResult1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!this.IsLogged()) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        if (article.Favorited) {
                                            $step = 1;
                                            continue;
                                        }  else {
                                            $step = 3;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        $task2 = this._resources.realworld$spaf$Services$IArticleResources$UnFavorite(article.Slug);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $taskResult1 = $taskResult2;
                                        $step = 5;
                                        continue;
                                    }
                                    case 3: {
                                        $task3 = this._resources.realworld$spaf$Services$IArticleResources$Favorite(article.Slug);
                                        $step = 4;
                                        $task3.continueWith($asyncBody);
                                        return;
                                    }
                                    case 4: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $taskResult1 = $taskResult3;
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        singleArticle = $taskResult1;

                                        this.Articles.replace(article, singleArticle.Article);
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
            /**
             * Go to user feed
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            ResetTabsForFeed: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articleResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.ActiveTabIndex(-2);
                                        this.Tabs.removeAll();
                                        this._tagFilter = null;
                                        $task1 = this.LoadFeed(realworld.spaf.Classes.FeedRequestBuilder.Default().WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage));
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articleResponse = $taskResult1;
                                        this.RefreshPaginator(articleResponse);
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
            /**
             * Reset Tab
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            ResetTabs: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articleResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.ActiveTabIndex(-1);
                                        this.Tabs.removeAll();
                                        this._tagFilter = null;
                                        $task1 = this.LoadArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage));
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articleResponse = $taskResult1;
                                        this.RefreshPaginator(articleResponse);
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
            /**
             * Go to page
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Paginator}    paginator
             * @return  {System.Threading.Tasks.Task}
             */
            GoToPage: function (paginator) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    request, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        System.Linq.Enumerable.from(this.Pages()).single(function (s) {
                                            return s.Active();
                                        }).Active(false);
                                        paginator.Active(true);

                                        request = realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithOffSet(Bridge.Int.mul((((paginator.Page - 1) | 0)), this._settings.realworld$spaf$Services$ISettings$ArticleInPage)).WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage);

                                        if (!System.String.isNullOrEmpty(this._tagFilter)) {
                                            request = request.WithTag(this._tagFilter);
                                        }

                                        $task1 = this.LoadArticles(request);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
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
            /**
             * Filter articles by tag
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {string}                         tag
             * @return  {System.Threading.Tasks.Task}
             */
            FilterByTag: function (tag) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    tabName, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        tabName = System.String.format("#{0}", [tag]);
                                        $task1 = this.ArticlesForTab(tabName);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
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
            /**
             * Load articles for passed tab
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {string}                         tab
             * @return  {System.Threading.Tasks.Task}
             */
            ArticlesForTab: function (tab) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    tagName, 
                    actualIndex, 
                    articles, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        tagName = System.String.trimStart(tab, [35]);
                                        this._tagFilter = tagName;

                                        actualIndex = this.Tabs().indexOf(tab);

                                        if (actualIndex === -1) {
                                            this.Tabs.push(tab);
                                        }

                                        this.ActiveTabIndex(this.Tabs().indexOf(tab));

                                        $task1 = this.LoadArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithTag(tagName).WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage));
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articles = $taskResult1;
                                        this.RefreshPaginator(articles);
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
            /**
             * Load articles
             Clear list and reload
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Services.impl.ArticleRequestBuilder}    request
             * @return  {System.Threading.Tasks.Task$1}
             */
            LoadArticles: function (request) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articleResoResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._resources.realworld$spaf$Services$IArticleResources$GetArticles(request);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articleResoResponse = $taskResult1;
                                        this.Articles.removeAll();
                                        this.Articles.push.apply(this.Articles, articleResoResponse.Articles);
                                        $tcs.setResult(articleResoResponse);
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
            /**
             * Load feed
             Clear list and reload
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Classes.FeedRequestBuilder}    request
             * @return  {System.Threading.Tasks.Task$1}
             */
            LoadFeed: function (request) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    feedResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._feedResources.realworld$spaf$Services$IFeedResources$GetFeed(request);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        feedResponse = $taskResult1;
                                        this.Articles.removeAll();
                                        this.Articles.push.apply(this.Articles, feedResponse.Articles);
                                        $tcs.setResult(feedResponse);
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
            /**
             * Reload tags
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            LoadTags: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    tags, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._resources.realworld$spaf$Services$IArticleResources$GetTags();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        tags = $taskResult1;
                                        this.Tags.removeAll();
                                        this.Tags.push.apply(this.Tags, tags.Tags);
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
            /**
             * When update articles rebuild paginator
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.HomeViewModel
             * @memberof realworld.spaf.ViewModels.HomeViewModel
             * @param   {realworld.spaf.Models.Response.ArticleResponse}    articleResoResponse
             * @return  {void}
             */
            RefreshPaginator: function (articleResoResponse) {
                this.Pages.removeAll();

                if (!System.Linq.Enumerable.from(articleResoResponse.Articles).any()) {
                    return;
                } // no articles

                var pagesCount = System.Int64.clip32(articleResoResponse.ArticlesCount.div(System.Int64(articleResoResponse.Articles.length)));
                var range = System.Linq.Enumerable.range(1, pagesCount);
                var pages = range.select(function (s) {
                    var $t;
                    return ($t = new realworld.spaf.Models.Paginator(), $t.Page = s, $t);
                }).toArray(realworld.spaf.Models.Paginator);
                pages[System.Array.index(0, pages)].Active(true);
                this.Pages.push.apply(this.Pages, pages);
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.LoginViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _navigator: null,
            _userService: null,
            Email: null,
            Password: null,
            IsBusy: null,
            Errors: null
        },
        ctors: {
            ctor: function (navigator, userService) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._navigator = navigator;
                this._userService = userService;

                this.Email = ko.observable();
                this.Password = ko.observable();
                this.IsBusy = ko.observable();
                this.Errors = ko.observableArray();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.LoginId;
            },
            Login: function () {
                this.IsBusy(true);
                this.Errors.removeAll();
                return this._userService.realworld$spaf$Services$IUserService$Login(this.Email(), this.Password()).continueWith(Bridge.fn.bind(this, function (c) {
                    this.IsBusy(false);

                    if (c.isFaulted()) {
                        var firstException = System.Linq.Enumerable.from(c.exception.innerExceptions).first();

                        if (Bridge.is(firstException, Bridge.PromiseException)) {
                            var e = Bridge.cast(System.Linq.Enumerable.from(c.exception.innerExceptions).first(), Bridge.PromiseException);
                            var errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                            this.Errors.push.apply(this.Errors, System.Linq.Enumerable.from(errors).toArray());
                        } else {
                            // transient "not completed task" caused by bridge version (in fix)
                            this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.HomeId, void 0);
                        }
                    } else {
                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.HomeId, void 0);
                    }
                }));
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.MainViewModel", {
        fields: {
            _messenger: null,
            _userService: null,
            IsLogged: null,
            ActualPageId: null
        },
        ctors: {
            ctor: function (messenger, userService, navigator) {
                this.$initialize();
                this._messenger = messenger;
                this._userService = userService;

                this.IsLogged = ko.observable(false);
                this.ActualPageId = ko.observable(Bridge.Spaf.SpafApp.HomeId);

                // subscribe to logindone message
                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
                    this.IsLogged(true);
                }), void 0);

                navigator.Bridge$Navigation$INavigator$addOnNavigated(Bridge.fn.bind(this, function (sender, loadable) {
                    var vm = Bridge.cast(loadable, Bridge.Spaf.LoadableViewModel);
                    this.ActualPageId(vm.ElementId());
                }));

            }
        },
        methods: {
            /**
             * Apply binding to mainmodel
             try auto login
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.MainViewModel
             * @memberof realworld.spaf.ViewModels.MainViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            Start: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        ko.applyBindings(this);
                                        $task1 = this._userService.realworld$spaf$Services$IUserService$TryAutoLoginWithStoredToken();
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
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

    Bridge.define("realworld.spaf.ViewModels.ProfileModel", {
        fields: {
            Image: null,
            Username: null,
            Bio: null,
            Following: null,
            Articles: null,
            UserArticles: null,
            Favourtites: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Image = ko.observable();
                this.Username = ko.observable();
                this.Bio = ko.observable();
                this.Following = ko.observable();
                this.Articles = ko.observableArray();
            }
        },
        methods: {
            MapMe: function (profile) {
                this.Image(profile.Image);
                this.Username(profile.Username);
                this.Bio(profile.Bio);
                this.Following(profile.Following);
            },
            ShowArticles: function () {
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, System.Linq.Enumerable.from(this.UserArticles).toArray());
            },
            ShowFavourites: function () {
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, System.Linq.Enumerable.from(this.Favourtites).toArray());
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.ProfileViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _profileResource: null,
            _userService: null,
            _articleResources: null,
            _navigator: null,
            _messenger: null,
            ProfileModel: null,
            ActiveTabIndex: null,
            IsLogged: null
        },
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        ctors: {
            ctor: function (profileResource, userService, articleResources, navigator, messenger) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this.ProfileModel = new realworld.spaf.ViewModels.ProfileModel();
                this._profileResource = profileResource;
                this._userService = userService;
                this._articleResources = articleResources;
                this._navigator = navigator;
                this._messenger = messenger;

                this.ActiveTabIndex = ko.observable(0);
                this.IsLogged = ko.observable(this._userService.realworld$spaf$Services$IUserService$IsLogged);

                this._messenger.Bridge$Messenger$IMessenger$Subscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone, Bridge.fn.bind(this, function (service) {
                    this.IsLogged(true);
                }), void 0);

            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.ProfileId;
            },
            OnLoad: function (parameters) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    username, 
                    $e1, 
                    userTask, 
                    articleTask, 
                    favouriteTask, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1], $step);
                            switch ($step) {
                                case 0: {
                                    Bridge.Spaf.LoadableViewModel.prototype.OnLoad.call(this, parameters);
                                    username = "";
                                    try {
                                        username = Bridge.Navigation.NavigationUtility.GetParameter(System.String, parameters, "username");
                                    }
                                    catch ($e1) {
                                        $e1 = System.Exception.create($e1);
                                        if (!this._userService.realworld$spaf$Services$IUserService$IsLogged) {
                                            throw new System.Exception("No username passed and you are not logged!");
                                        }

                                        username = this._userService.realworld$spaf$Services$IUserService$LoggedUser.Username;
                                    }

                                    userTask = this.LoadUser(username);
                                    articleTask = this.LoadArticles(username);
                                    favouriteTask = this.LoadFavouritesArticles(username);

                                    $task1 = System.Threading.Tasks.Task.whenAll(userTask, articleTask, favouriteTask);
                                    $step = 1;
                                    $task1.continueWith($asyncBody, true);
                                    return;
                                }
                                case 1: {
                                    $task1.getAwaitedResult();
                                    this.ProfileModel.ShowArticles();
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
            },
            OnLeave: function () {
                Bridge.Spaf.LoadableViewModel.prototype.OnLeave.call(this);
                this._messenger.Bridge$Messenger$IMessenger$Unsubscribe(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.LoginId);
            },
            /**
             * Add passed article to fav
             Only for auth users
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {System.Threading.Tasks.Task}
             */
            AddToFavourite: function (article) {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    singleArticle, 
                    $taskResult1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        if (!this.IsLogged()) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        if (article.Favorited) {
                                            $step = 1;
                                            continue;
                                        }  else {
                                            $step = 3;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        $task2 = this._articleResources.realworld$spaf$Services$IArticleResources$UnFavorite(article.Slug);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $taskResult1 = $taskResult2;
                                        $step = 5;
                                        continue;
                                    }
                                    case 3: {
                                        $task3 = this._articleResources.realworld$spaf$Services$IArticleResources$Favorite(article.Slug);
                                        $step = 4;
                                        $task3.continueWith($asyncBody);
                                        return;
                                    }
                                    case 4: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $taskResult1 = $taskResult3;
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        singleArticle = $taskResult1;

                                        this.ProfileModel.Articles.replace(article, singleArticle.Article);
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
            /**
             * Follow / unfollow
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @return  {System.Threading.Tasks.Task}
             */
            Follow: function () {
                var $step = 0,
                    $task1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    username, 
                    follow, 
                    $taskResult1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        username = this.ProfileModel.Username();
                                        if (this.ProfileModel.Following()) {
                                            $step = 1;
                                            continue;
                                        }  else {
                                            $step = 3;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        $task2 = this._profileResource.realworld$spaf$Services$IProfileResources$UnFollow(username);
                                        $step = 2;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $taskResult1 = $taskResult2;
                                        $step = 5;
                                        continue;
                                    }
                                    case 3: {
                                        $task3 = this._profileResource.realworld$spaf$Services$IProfileResources$Follow(username);
                                        $step = 4;
                                        $task3.continueWith($asyncBody);
                                        return;
                                    }
                                    case 4: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $taskResult1 = $taskResult3;
                                        $step = 5;
                                        continue;
                                    }
                                    case 5: {
                                        follow = $taskResult1;
                                        this.ProfileModel.Following(follow.Profile.Following);
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
            /**
             * Navigate to user detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToUser: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ProfileId, function (_o1) {
                        _o1.add("username", article.Author.Username);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
            },
            /**
             * Navigate to article detail
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {realworld.spaf.Models.Article}    article
             * @return  {void}
             */
            GoToArticle: function (article) {
                this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                        _o1.add("slug", article.Slug);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object))()));
            },
            /**
             * Show user articles
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @return  {void}
             */
            ShowArticles: function () {
                this.ActiveTabIndex(0);
                this.ProfileModel.ShowArticles();
            },
            /**
             * Show favs
             *
             * @instance
             * @public
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @return  {void}
             */
            ShowFavourites: function () {
                this.ActiveTabIndex(1);
                this.ProfileModel.ShowFavourites();
            },
            /**
             * Load user data
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {string}                         username
             * @return  {System.Threading.Tasks.Task}
             */
            LoadUser: function (username) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    profileResponse, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._profileResource.realworld$spaf$Services$IProfileResources$Get(username);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        profileResponse = $taskResult1;
                                        this.ProfileModel.MapMe(profileResponse.Profile);
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
            /**
             * Load Articles
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {string}                         username
             * @return  {System.Threading.Tasks.Task}
             */
            LoadArticles: function (username) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articles, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(5).OfAuthor(username));
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articles = $taskResult1;

                                        this.ProfileModel.UserArticles = articles.Articles;
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
            /**
             * Load Articles Favorites
             *
             * @instance
             * @private
             * @this realworld.spaf.ViewModels.ProfileViewModel
             * @memberof realworld.spaf.ViewModels.ProfileViewModel
             * @param   {string}                         username
             * @return  {System.Threading.Tasks.Task}
             */
            LoadFavouritesArticles: function (username) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    articles, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$GetArticles(realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithLimit(5).OfFavorite(username));
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        articles = $taskResult1;

                                        this.ProfileModel.Favourtites = articles.Articles;
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

    Bridge.define("realworld.spaf.ViewModels.RegisterViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _navigator: null,
            _userService: null,
            Username: null,
            Email: null,
            Password: null,
            Errors: null
        },
        ctors: {
            ctor: function (navigator, userService) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._navigator = navigator;
                this._userService = userService;

                this.Username = ko.observable();
                this.Email = ko.observable();
                this.Password = ko.observable();
                this.Errors = ko.observableArray();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.RegisterId;
            },
            Register: function () {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    e, 
                    errors, 
                    $async_e, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([1,2,3,4], $step);
                                switch ($step) {

                                    case 1: {
                                        this.Errors.removeAll();
                                        $task1 = this._userService.realworld$spaf$Services$IUserService$Register(this.Username(), this.Email(), this.Password());
                                        $step = 2;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $task1.getAwaitedResult();
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.HomeId, void 0);
                                        $step = 4;
                                        continue;
                                    }
                                    case 3: {
                                        errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                                        this.Errors.push.apply(this.Errors, System.Linq.Enumerable.from(errors).toArray());
                                        $async_e = null;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
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
                            if ( $step >= 1 && $step <= 2 ) {
                                if (Bridge.is($async_e, Bridge.PromiseException)) {
                                    e = $async_e;
                                    $step = 3;
                                    $asyncBody();
                                    return;
                                }
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.ViewModels.SettingsViewModel", {
        inherits: [Bridge.Spaf.LoadableViewModel],
        fields: {
            _userService: null,
            _settingsResources: null,
            _navigator: null,
            ImageUri: null,
            Username: null,
            Biography: null,
            Email: null,
            NewPassword: null,
            Errors: null
        },
        ctors: {
            ctor: function (userService, settingsResources, navigator) {
                this.$initialize();
                Bridge.Spaf.LoadableViewModel.ctor.call(this);
                this._userService = userService;
                this._settingsResources = settingsResources;
                this._navigator = navigator;

                this.ImageUri = ko.observable();
                this.Username = ko.observable();
                this.Biography = ko.observable();
                this.Email = ko.observable();
                this.NewPassword = ko.observable();
                this.Errors = ko.observableArray();

                this.PopulateEntries();
            }
        },
        methods: {
            ElementId: function () {
                return Bridge.Spaf.SpafApp.SettingsId;
            },
            PopulateEntries: function () {
                var user = this._userService.realworld$spaf$Services$IUserService$LoggedUser;
                this.Username(user.Username);
                this.Email(user.Email);
                this.ImageUri(user.Image);
                this.Biography(user.Bio);
            },
            UpdateSettings: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    settingsRequest, 
                    $t, 
                    userUpdated, 
                    e, 
                    errors, 
                    $async_e, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([1,2,3,4], $step);
                                switch ($step) {

                                    case 1: {
                                        settingsRequest = ($t = new realworld.spaf.Models.Request.SettingsRequest(), $t.Username = this.Username(), $t.NewPassword = this.NewPassword(), $t.Biography = this.Biography(), $t.Email = this.Email(), $t.ImageUri = this.ImageUri(), $t);

                                        $task1 = this._settingsResources.realworld$spaf$Services$ISettingsResources$UpdateSettings(settingsRequest);
                                        $step = 2;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        userUpdated = $taskResult1;
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ProfileId, void 0);
                                        $step = 4;
                                        continue;
                                    }
                                    case 3: {
                                        errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                                        this.Errors.push.apply(this.Errors, System.Linq.Enumerable.from(errors).toArray());
                                        $async_e = null;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
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
                            if ( $step >= 1 && $step <= 2 ) {
                                if (Bridge.is($async_e, Bridge.PromiseException)) {
                                    e = $async_e;
                                    $step = 3;
                                    $asyncBody();
                                    return;
                                }
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.AuthorizedResourceBase", {
        inherits: [realworld.spaf.Services.impl.ResourceBase],
        fields: {
            UserService: null
        },
        ctors: {
            ctor: function (userService) {
                this.$initialize();
                realworld.spaf.Services.impl.ResourceBase.ctor.call(this);
                this.UserService = userService;
            }
        },
        methods: {
            /**
             * Generic Awaitable ajax call
             *
             * @instance
             * @protected
             * @this realworld.spaf.Services.impl.AuthorizedResourceBase
             * @memberof realworld.spaf.Services.impl.AuthorizedResourceBase
             * @param   {Function}                         T          
             * @param   {System.Object}                    options
             * @return  {System.Threading.Tasks.Task$1}
             */
            MakeAuthorizedCall: function (T, options) {
                if (!this.UserService.realworld$spaf$Services$IUserService$IsLogged) {
                    throw new System.Exception("You must be logged to use this resource");
                }

                options.beforeSend = Bridge.fn.bind(this, function (xhr, o) {
                    xhr.setRequestHeader("Authorization", System.String.format("Token {0}", [this.UserService.realworld$spaf$Services$IUserService$LoggedUser.Token]));
                    return true;
                });
                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, T, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.LocalStorageRepository", {
        inherits: [realworld.spaf.Services.IRepository],
        statics: {
            fields: {
                TokenKey: null
            },
            ctors: {
                init: function () {
                    this.TokenKey = "token";
                }
            }
        },
        fields: {
            _storage: null
        },
        alias: [
            "SaveToken", "realworld$spaf$Services$IRepository$SaveToken",
            "GetTokenIfExist", "realworld$spaf$Services$IRepository$GetTokenIfExist",
            "DeleteToken", "realworld$spaf$Services$IRepository$DeleteToken"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this._storage = window.localStorage;
            }
        },
        methods: {
            SaveToken: function (token) {
                this._storage.setItem(realworld.spaf.Services.impl.LocalStorageRepository.TokenKey, token);
            },
            GetTokenIfExist: function () {
                var token = this._storage.getItem(realworld.spaf.Services.impl.LocalStorageRepository.TokenKey);
                return token != null ? Bridge.toString(token) : null;
            },
            DeleteToken: function () {
                this._storage.removeItem(realworld.spaf.Services.impl.LocalStorageRepository.TokenKey);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.Settings", {
        inherits: [realworld.spaf.Services.ISettings],
        fields: {
            ApiUri: null,
            ArticleInPage: 0
        },
        alias: [
            "ApiUri", "realworld$spaf$Services$ISettings$ApiUri",
            "ArticleInPage", "realworld$spaf$Services$ISettings$ArticleInPage"
        ],
        ctors: {
            init: function () {
                this.ApiUri = "https://conduit.productionready.io/api";
                this.ArticleInPage = 10;
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.UserResources", {
        inherits: [realworld.spaf.Services.impl.ResourceBase,realworld.spaf.Services.IUserResources],
        fields: {
            _settings: null
        },
        alias: [
            "Login", "realworld$spaf$Services$IUserResources$Login",
            "Register", "realworld$spaf$Services$IUserResources$Register",
            "GetCurrentUser", "realworld$spaf$Services$IUserResources$GetCurrentUser"
        ],
        ctors: {
            ctor: function (settings) {
                this.$initialize();
                realworld.spaf.Services.impl.ResourceBase.ctor.call(this);
                this._settings = settings;
            }
        },
        methods: {
            Login: function (loginRequest) {
                var options = { url: System.String.format("{0}/users/login", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(loginRequest) };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SignResponse, options);
            },
            Register: function (loginRequest) {
                var options = { url: System.String.format("{0}/users", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(loginRequest) };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SignResponse, options);
            },
            GetCurrentUser: function (token) {
                var options = { url: System.String.format("{0}/user", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "GET", dataType: "json", beforeSend: function (xhr, o) {
                    xhr.setRequestHeader("Authorization", System.String.format("Token {0}", [token]));
                    return true;
                } };

                return realworld.spaf.Services.impl.ResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SignResponse, options);

            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.UserService", {
        inherits: [realworld.spaf.Services.IUserService],
        fields: {
            _userResources: null,
            _messenger: null,
            _repository: null,
            LoggedUser: null
        },
        props: {
            IsLogged: {
                get: function () {
                    return this.LoggedUser != null;
                }
            }
        },
        alias: [
            "LoggedUser", "realworld$spaf$Services$IUserService$LoggedUser",
            "IsLogged", "realworld$spaf$Services$IUserService$IsLogged",
            "Login", "realworld$spaf$Services$IUserService$Login",
            "Register", "realworld$spaf$Services$IUserService$Register",
            "TryAutoLoginWithStoredToken", "realworld$spaf$Services$IUserService$TryAutoLoginWithStoredToken"
        ],
        ctors: {
            ctor: function (userResources, messenger, repository) {
                this.$initialize();
                this._userResources = userResources;
                this._messenger = messenger;
                this._repository = repository;
            }
        },
        methods: {
            Login: function (mail, password) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    loginResponse, 
                    $t, 
                    $t1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._userResources.realworld$spaf$Services$IUserResources$Login(($t = new realworld.spaf.Models.Request.SignRequest(), $t.User = ($t1 = new realworld.spaf.Models.Request.UserRequest(), $t1.Email = mail, $t1.Password = password, $t1), $t));
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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
            Register: function (username, mail, password) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    loginResponse, 
                    $t, 
                    $t1, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = this._userResources.realworld$spaf$Services$IUserResources$Register(($t = new realworld.spaf.Models.Request.SignRequest(), $t.User = ($t1 = new realworld.spaf.Models.Request.UserRequest(), $t1.Email = mail, $t1.Password = password, $t1.Username = username, $t1), $t));
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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
            TryAutoLoginWithStoredToken: function () {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    storedToken, 
                    loginResponse, 
                    $async_e, 
                    $async_e1, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4], $step);
                                switch ($step) {
                                    case 0: {
                                        storedToken = this._repository.realworld$spaf$Services$IRepository$GetTokenIfExist();
                                        if (storedToken == null) {
                                            $tcs.setResult(null);
                                            return;
                                        }

                                        
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        $task1 = this._userResources.realworld$spaf$Services$IUserResources$GetCurrentUser(storedToken);
                                        $step = 2;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;
                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(Bridge.global.realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
                                        $step = 4;
                                        continue;
                                    }
                                    case 3: {
                                        this._repository.realworld$spaf$Services$IRepository$DeleteToken();
                                        this.LoggedUser = null;
                                        $async_e = null;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
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
                            if ( $step >= 1 && $step <= 2 ) {
                                if (Bridge.is($async_e, Bridge.PromiseException)) {
                                    $step = 3;
                                    $asyncBody();
                                    return;
                                }
                            }
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.ArticleResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.IArticleResources],
        fields: {
            _settings: null
        },
        alias: [
            "GetArticles", "realworld$spaf$Services$IArticleResources$GetArticles",
            "GetTags", "realworld$spaf$Services$IArticleResources$GetTags",
            "GetArticle", "realworld$spaf$Services$IArticleResources$GetArticle",
            "Favorite", "realworld$spaf$Services$IArticleResources$Favorite",
            "UnFavorite", "realworld$spaf$Services$IArticleResources$UnFavorite",
            "Create", "realworld$spaf$Services$IArticleResources$Create",
            "GetArticleComments", "realworld$spaf$Services$IArticleResources$GetArticleComments",
            "AddComment", "realworld$spaf$Services$IArticleResources$AddComment"
        ],
        ctors: {
            ctor: function (settings, userService) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            GetArticles: function (builder) {
                var options = { url: System.String.format("{0}/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, builder.Build()), type: "GET", dataType: "json" };

                return this.UserService.realworld$spaf$Services$IUserService$IsLogged ? this.MakeAuthorizedCall(realworld.spaf.Models.Response.ArticleResponse, options) : this.MakeCall(realworld.spaf.Models.Response.ArticleResponse, options);
            },
            GetTags: function () {
                var options = { url: System.String.format("{0}/tags", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.TagsResponse, options);
            },
            GetArticle: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            Favorite: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}/favorite", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "POST", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            UnFavorite: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}/favorite", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "DELETE", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            Create: function (newArticle) {
                var options = { url: System.String.format("{0}/articles", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(newArticle) };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleArticleResponse, options);
            },
            GetArticleComments: function (slug) {
                var options = { url: System.String.format("{0}/articles/{1}/comments", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "GET", dataType: "json" };

                return realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.CommentsResponse, options);
            },
            AddComment: function (slug, comment) {
                var $t;
                var options = { url: System.String.format("{0}/articles/{1}/comments", this._settings.realworld$spaf$Services$ISettings$ApiUri, slug), type: "POST", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(($t = new realworld.spaf.Models.Comment(), $t.Body = comment, $t)) };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SingleCommentResponse, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.FeedResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.IFeedResources],
        fields: {
            _settings: null
        },
        alias: ["GetFeed", "realworld$spaf$Services$IFeedResources$GetFeed"],
        ctors: {
            ctor: function (settings, userService) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            GetFeed: function (builder) {
                var options = { url: System.String.format("{0}/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, builder.Build()), type: "GET", dataType: "json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.ArticleResponse, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.ProfileResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.IProfileResources],
        fields: {
            _settings: null
        },
        alias: [
            "Follow", "realworld$spaf$Services$IProfileResources$Follow",
            "UnFollow", "realworld$spaf$Services$IProfileResources$UnFollow",
            "Get", "realworld$spaf$Services$IProfileResources$Get"
        ],
        ctors: {
            ctor: function (userService, settings) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            Follow: function (username) {
                var options = { url: System.String.format("{0}/profiles/{1}/follow", this._settings.realworld$spaf$Services$ISettings$ApiUri, username), type: "POST", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.FollowResponse, options);
            },
            UnFollow: function (username) {
                var options = { url: System.String.format("{0}/profiles/{1}/follow", this._settings.realworld$spaf$Services$ISettings$ApiUri, username), type: "DELETE", dataType: "json", contentType: "application/json" };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.FollowResponse, options);
            },
            Get: function (username) {
                var options = { url: System.String.format("{0}/profiles/{1}", this._settings.realworld$spaf$Services$ISettings$ApiUri, username), type: "GET", dataType: "json", contentType: "application/json" };

                return this.UserService.realworld$spaf$Services$IUserService$IsLogged ? this.MakeAuthorizedCall(realworld.spaf.Models.Response.ProfileResponse, options) : realworld.spaf.Services.impl.AuthorizedResourceBase.prototype.MakeCall.call(this, realworld.spaf.Models.Response.ProfileResponse, options);
            }
        }
    });

    Bridge.define("realworld.spaf.Services.impl.SettingsResources", {
        inherits: [realworld.spaf.Services.impl.AuthorizedResourceBase,realworld.spaf.Services.ISettingsResources],
        fields: {
            _settings: null
        },
        alias: ["UpdateSettings", "realworld$spaf$Services$ISettingsResources$UpdateSettings"],
        ctors: {
            ctor: function (settings, userService) {
                this.$initialize();
                realworld.spaf.Services.impl.AuthorizedResourceBase.ctor.call(this, userService);
                this._settings = settings;
            }
        },
        methods: {
            UpdateSettings: function (settingsRequest) {
                var options = { url: System.String.format("{0}/user", [this._settings.realworld$spaf$Services$ISettings$ApiUri]), type: "PUT", dataType: "json", contentType: "application/json", data: Newtonsoft.Json.JsonConvert.SerializeObject(settingsRequest) };

                return this.MakeAuthorizedCall(realworld.spaf.Models.Response.SettingsResponse, options);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQ3VzdG9tUm91dGVzQ29uZmlnLmNzIiwiU3BhZkFwcC5jcyIsIkNsYXNzZXMvRXh0ZW5zaW9ucy5jcyIsIkNsYXNzZXMvRmVlZFJlcXVlc3RCdWlsZGVyLmNzIiwiTW9kZWxzL0FydGljbGUuY3MiLCJNb2RlbHMvQ29tbWVudC5jcyIsIk1vZGVscy9QYWdpbmF0b3IuY3MiLCJDbGFzc2VzL0FydGljbGVSZXF1ZXN0QnVpbGRlci5jcyIsIlNlcnZpY2VzL2ltcGwvUmVzb3VyY2VCYXNlLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9FZGl0QXJ0aWNsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvSG9tZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTG9naW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL01haW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1Byb2ZpbGVWaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1JlZ2lzdGVyVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZXR0aW5nc1ZpZXdNb2RlbC5jcyIsIlNlcnZpY2VzL2ltcGwvQXV0aG9yaXplZFJlc291cmNlQmFzZS5jcyIsIlNlcnZpY2VzL2ltcGwvTG9jYWxTdG9yYWdlUmVwb3NpdG9yeS5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclJlc291cmNlcy5jcyIsIlNlcnZpY2VzL2ltcGwvVXNlclNlcnZpY2UuY3MiLCJTZXJ2aWNlcy9pbXBsL0FydGljbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL0ZlZWRSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1Byb2ZpbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1NldHRpbmdzUmVzb3VyY2VzLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7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Q0E7OzJCQUdsQkE7Z0JBRTdCQSxjQUFjQSxPQUVKQSx5Q0FBaUNBLHlEQUFzQkE7O2dCQU1qRUEsT0FBT0EsaUVBQTRCQSx3RUFBeUNBLFdBQVdBLGtJQUErQkE7Ozs7Ozs7Ozs7Ozs0QkN2Q2pHQSxVQUFvQkE7O29GQUFpQ0E7Z0JBRTFFQSxpQkFBaUJBOzs7O3NDQUd3QkE7Z0JBRXpDQSxjQUFjQSxPQUVKQSxrQ0FBeUJBLGlJQUl4QkEsNENBQTRCQTs7Z0JBR3ZDQSxPQUFPQSx5RUFBMENBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIGNsYXNzIEN1c3RvbVJvdXRlc0NvbmZpZyA6IEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XHJcbiAgICAgICAgcHVibGljIEN1c3RvbVJvdXRlc0NvbmZpZyhJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBDcmVhdGVSb3V0ZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PElQYWdlRGVzY3JpcHRvcj4oKSwoX28xKT0+e19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9ob21lLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkhvbWVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8SG9tZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2xvZ2luLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkxvZ2luSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPExvZ2luVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvcmVnaXN0ZXIuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuUmVnaXN0ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UmVnaXN0ZXJWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9wcm9maWxlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8UHJvZmlsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9zZXR0aW5ncy5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5TZXR0aW5nc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxTZXR0aW5nc1ZpZXdNb2RlbD4oKSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvZWRpdEFydGljbGUuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuRWRpdEFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8RWRpdEFydGljbGVWaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9hcnRpY2xlLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLkFydGljbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8QXJ0aWNsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBqUXVlcnkgQm9keSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBIb21lSWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgVmlydHVhbERpcmVjdG9yeSB7Z2V0e3JldHVybiBzdHJpbmcuSXNOdWxsT3JFbXB0eShOYXZpZ2F0aW9uVXRpbGl0eS5WaXJ0dWFsRGlyZWN0b3J5KVxyXG4gICAgICAgICAgICA/IHN0cmluZy5FbXB0eVxyXG4gICAgICAgICAgICA6IHN0cmluZy5Gb3JtYXQoXCJ7MH0vXCIsTmF2aWdhdGlvblV0aWxpdHkuVmlydHVhbERpcmVjdG9yeSk7fX1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBib29sIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19EaXNhYmxlQXV0b1NwYWZBbmNob3JzT25OYXZpZ2F0ZT1mYWxzZTtwcml2YXRlIGpRdWVyeSBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQm9keT1qUXVlcnkuU2VsZWN0KFwiI3BhZ2VCb2R5XCIpO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Ib21lSWQ9U3BhZkFwcC5Ib21lSWQ7fVxyXG5cclxuICAgXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQnJpZGdlLklvYztcclxudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzO1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTcGFmQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBJSW9jIENvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhc3luYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgI2lmIFRFU1RcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAjZW5kaWZcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICNpZiAhREVCVUdcclxuICAgICAgICAgICAgTmF2aWdhdGlvblV0aWxpdHkuVmlydHVhbERpcmVjdG9yeSA9IFwicmVhbHdvcmxkLnNwYWZcIjsgLy8gIHZpcnR1YWwgZGl0IGZvciByZWxlYXNlIGVudmlyb25tZW50XHJcbiAgICAgICAgICAgICNlbmRpZlxyXG5cclxuICAgICAgICAgICAgQ29udGFpbmVyID0gbmV3IEJyaWRnZUlvYygpO1xyXG4gICAgICAgICAgICBDb250YWluZXJDb25maWcoKTsgLy8gY29uZmlnIGNvbnRhaW5lclxyXG4gICAgICAgICAgICB2YXIgbWFpblZtID0gQ29udGFpbmVyLlJlc29sdmU8TWFpblZpZXdNb2RlbD4oKTtcclxuICAgICAgICAgICAgYXdhaXQgbWFpblZtLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVzb2x2ZTxJTmF2aWdhdG9yPigpLkluaXROYXZpZ2F0aW9uKCk7IC8vIGluaXQgbmF2aWdhdGlvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBDb250YWluZXJDb25maWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbmF2aWdhdG9yXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElOYXZpZ2F0b3IsIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SU5hdmlnYXRvckNvbmZpZ3VyYXRvciwgQ3VzdG9tUm91dGVzQ29uZmlnPigpOyBcclxuXHJcbiAgICAgICAgICAgIC8vIG1lc3NlbmdlclxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJTWVzc2VuZ2VyLCBNZXNzZW5nZXIuTWVzc2VuZ2VyPigpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmlld21vZGVsc1xyXG4gICAgICAgICAgICBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGN1c3RvbSByZXNvdXJjZSwgc2VydmljZXMuLlxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJU2V0dGluZ3MsIFNldHRpbmdzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZTxJVXNlclNlcnZpY2UsIFVzZXJTZXJ2aWNlPigpO1xyXG5cclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElBcnRpY2xlUmVzb3VyY2VzLEFydGljbGVSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJVXNlclJlc291cmNlcyxVc2VyUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SUZlZWRSZXNvdXJjZXMsRmVlZFJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElQcm9maWxlUmVzb3VyY2VzLFByb2ZpbGVSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVJlcG9zaXRvcnksTG9jYWxTdG9yYWdlUmVwb3NpdG9yeT4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElTZXR0aW5nc1Jlc291cmNlcyxTZXR0aW5nc1Jlc291cmNlcz4oKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjcmVnaW9uIFBBR0VTIElEU1xyXG4gICAgICAgIC8vIHN0YXRpYyBwYWdlcyBpZFxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgSG9tZUlkIHtnZXR7cmV0dXJuIFwiaG9tZVwiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgTG9naW5JZCB7Z2V0e3JldHVybiBcImxvZ2luXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBSZWdpc3RlcklkIHtnZXR7cmV0dXJuIFwicmVnaXN0ZXJcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFByb2ZpbGVJZCB7Z2V0e3JldHVybiBcInByb2ZpbGVcIjt9fVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIFNldHRpbmdzSWQge2dldHtyZXR1cm4gXCJzZXR0aW5nc1wiO319XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgRWRpdEFydGljbGVJZCB7Z2V0e3JldHVybiBcImVkaXRBcnRpY2xlXCI7fX1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBBcnRpY2xlSWQge2dldHtyZXR1cm4gXCJhcnRpY2xlXCI7fX1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIE1FU1NBR0VTXHJcbiAgICAgICAgLy8gbWVzc2VuZ2VyIGhlbHBlciBmb3IgZ2xvYmFsIG1lc3NhZ2VzIGFuZCBtZXNzYWdlcyBpZHNcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBjbGFzcyBNZXNzYWdlc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEdsb2JhbFNlbmRlciB7IH07XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIEdsb2JhbFNlbmRlciBTZW5kZXIgPSBuZXcgR2xvYmFsU2VuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBMb2dpbkRvbmUge2dldHtyZXR1cm4gXCJMb2dpbkRvbmVcIjt9fVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVnaXN0ZXIgYWxsIHR5cGVzIHRoYXQgZW5kIHdpdGggXCJ2aWV3bW9kZWxcIi5cclxuICAgICAgICAvLy8gWW91IGNhbiByZWdpc3RlciBhIHZpZXdtb2RlIGFzIFNpbmdsciBJbnN0YW5jZSBhZGRpbmcgXCJTaW5nbGVJbnN0YW5jZUF0dHJpYnV0ZVwiIHRvIHRoZSBjbGFzc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZWdpc3RlckFsbFZpZXdNb2RlbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGVzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3RNYW55PGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksZ2xvYmFsOjpTeXN0ZW0uVHlwZT4oQXBwRG9tYWluLkN1cnJlbnREb21haW4uR2V0QXNzZW1ibGllcygpLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6U3lzdGVtLlJlZmxlY3Rpb24uQXNzZW1ibHksIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpTeXN0ZW0uVHlwZT4+KShzID0+IHMuR2V0VHlwZXMoKSkpXHJcbiAgICAgICAgICAgICAgICAuV2hlcmUoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpTeXN0ZW0uVHlwZSwgYm9vbD4pKHcgPT4gdy5OYW1lLlRvTG93ZXIoKS5FbmRzV2l0aChcInZpZXdtb2RlbFwiKSkpLlRvTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgdHlwZXMuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLlR5cGU+KShmID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gZi5HZXRDdXN0b21BdHRyaWJ1dGVzKHR5cGVvZihTaW5nbGVJbnN0YW5jZUF0dHJpYnV0ZSksIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxvYmplY3Q+KGF0dHJpYnV0ZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlKGYpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcihmKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5DbGFzc2VzXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBFeHRlbnNpb25zXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBEZXNlcmlhbGl6ZSByZWFsd29ybGQgcHJvbWlzZSBleGNlcHRpb24gdG8gZ2V0IGVycm9yc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleGNlcHRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIERpY3Rpb25hcnk8c3RyaW5nLHN0cmluZ1tdPiBHZXRWYWxpZGF0aW9uRXJyb3JSZXNwb25zZSh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gKEVycm9yUmVzcG9uc2UpSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8RXJyb3JSZXNwb25zZT4oZXhjZXB0aW9uLkFyZ3VtZW50c1swXS5Ub0R5bmFtaWMoKS5yZXNwb25zZUpTT04pO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9ycy5FcnJvcnM7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgcmVhZGFibGUgZXJyb3IgbGlzdFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleGNlcHRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIElFbnVtZXJhYmxlPHN0cmluZz4gR2V0VmFsaWRhdGlvbkVycm9ycyh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gZXhjZXB0aW9uLkdldFZhbGlkYXRpb25FcnJvclJlc3BvbnNlKCk7XG5cbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBlcnJvciBpbiBlcnJvcnMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGVycm9yRGVzY3JpcHRpb24gaW4gZXJyb3IuVmFsdWUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXR1cm4gc3RyaW5nLkZvcm1hdChcInswfSB7MX1cIixlcnJvci5LZXksZXJyb3JEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IGVycm9yIGZvciBodG1sZXJyb3Jjb2RlXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImVycm9yQ29kZVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEdldEVycm9yRm9yQ29kZShpbnQgZXJyb3JDb2RlKVxuICAgICAgICB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVycm9yQ29kZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlIDQwMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVW5hdXRob3JpemVkXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkZvcmJpZGRlblwiO1xuICAgICAgICAgICAgICAgIGNhc2UgNDA0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOb3QgRm91bmRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQyMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVmFsaWRhdGlvbiBFcnJvclwiO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkdlbmVyaWMgRXJyb3JcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCBlcnJvciBjb2RlIGZvciBwcm9taXNlIGV4Y2VwdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJleGNlcHRpb25cIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBFcnJvckNvZGUodGhpcyBQcm9taXNlRXhjZXB0aW9uIGV4Y2VwdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVycm9yQ29kZSA9IChpbnQpZXhjZXB0aW9uLkFyZ3VtZW50c1swXS5Ub0R5bmFtaWMoKS5zdGF0dXM7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JDb2RlO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuQ2xhc3Nlc1xue1xuICAgIHB1YmxpYyBjbGFzcyBGZWVkUmVxdWVzdEJ1aWxkZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgaW50IF9vZmZzZXQ7XG4gICAgICAgIHByaXZhdGUgaW50IF9saW1pdDtcblxuXG4gICAgICAgIHByaXZhdGUgRmVlZFJlcXVlc3RCdWlsZGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSAyMDtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIEZlZWRSZXF1ZXN0QnVpbGRlciBEZWZhdWx0KClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZWVkUmVxdWVzdEJ1aWxkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVxdWVzdEJ1aWxkZXIgV2l0aE9mZlNldChpbnQgb2Zmc2V0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBGZWVkUmVxdWVzdEJ1aWxkZXIgV2l0aExpbWl0KGludCBsaW1pdClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJ1aWxkKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0cmluZ0J1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcihcImFydGljbGVzL2ZlZWRcIik7XG5cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCI/bGltaXQ9ezB9XCIsdGhpcy5fbGltaXQpKTtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJm9mZnNldD17MH1cIix0aGlzLl9vZmZzZXQpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcblxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXJ0aWNsZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQXV0aG9yID0gbmV3IEF1dGhvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidGl0bGVcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUaXRsZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJzbHVnXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2x1ZyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJib2R5XCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQm9keSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJjcmVhdGVkQXRcIildXHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lPyBDcmVhdGVkQXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidXBkYXRlZEF0XCIpXVxyXG4gICAgICAgIHB1YmxpYyBEYXRlVGltZT8gVXBkYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInRhZ0xpc3RcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZ1tdIFRhZ0xpc3QgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiZGVzY3JpcHRpb25cIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBEZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJhdXRob3JcIildXHJcbiAgICAgICAgcHVibGljIEF1dGhvciBBdXRob3IgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwiZmF2b3JpdGVkXCIpXVxyXG4gICAgICAgIHB1YmxpYyBib29sIEZhdm9yaXRlZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJmYXZvcml0ZXNDb3VudFwiKV1cclxuICAgICAgICBwdWJsaWMgbG9uZyBGYXZvcml0ZXNDb3VudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ3JlYXRlIHtnZXR7cmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsdGhpcy5DcmVhdGVkQXQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxEYXRlVGltZT4oXCJrZXkxXCIpLlRvU3RyaW5nKFwiTU1NTSBkZFwiKTooc3RyaW5nKW51bGw7fX1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBOZXd0b25zb2Z0Lkpzb247XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5Nb2RlbHNcbntcbiAgICBwdWJsaWMgY2xhc3MgQ29tbWVudFxuICAgIHtcbiAgICAgICAgcHVibGljIENvbW1lbnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkF1dGhvciA9IG5ldyBBdXRob3IoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImlkXCIpXVxuICAgICAgICBwdWJsaWMgbG9uZyBJZCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImNyZWF0ZWRBdFwiKV1cbiAgICAgICAgcHVibGljIERhdGVUaW1lIENyZWF0ZWRBdCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInVwZGF0ZWRBdFwiKV1cbiAgICAgICAgcHVibGljIERhdGVUaW1lIFVwZGF0ZWRBdCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImJvZHlcIildXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQm9keSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImF1dGhvclwiKV1cbiAgICAgICAgcHVibGljIEF1dGhvciBBdXRob3IgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHN0cmluZyBDcmVhdGUge2dldHtyZXR1cm4gdGhpcy5DcmVhdGVkQXQuVG9TdHJpbmcoXCJNTU1NIGRkXCIpO319XG5cbiAgICB9XG59IiwiXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXG57XG4gICAgcHVibGljIGNsYXNzIFBhZ2luYXRvclxuICAgIHtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPkFjdGl2ZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBpbnQgUGFnZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFBhZ2luYXRvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UZXh0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90YWc7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9hdXRob3I7XG4gICAgICAgIHByaXZhdGUgaW50IF9vZmZzZXQ7XG4gICAgICAgIHByaXZhdGUgaW50IF9saW1pdDtcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3VzZXI7XG5cblxuICAgICAgICBwcml2YXRlIEFydGljbGVSZXF1ZXN0QnVpbGRlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gMjA7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgRGVmYXVsdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhPZmZTZXQoaW50IG9mZnNldClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhMaW1pdChpbnQgbGltaXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZBdXRob3Ioc3RyaW5nIGF1dGhvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYXV0aG9yID0gYXV0aG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIFdpdGhUYWcoc3RyaW5nIHRhZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdGFnID0gdGFnO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIgT2ZGYXZvcml0ZShzdHJpbmcgdXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIHN0cmluZyBCdWlsZCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzdHJpbmdCdWlsZGVyID0gbmV3IFN0cmluZ0J1aWxkZXIoXCJhcnRpY2xlc1wiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3RhZykpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmdGFnPXswfVwiLHRoaXMuX3RhZykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX2F1dGhvcikpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmYXV0aG9yPXswfVwiLHRoaXMuX2F1dGhvcikpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHRoaXMuX3VzZXIpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJmZhdm9yaXRlZD17MH1cIix0aGlzLl91c2VyKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZUJhc2VcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdlbmVyaWMgQXdhaXRhYmxlIGFqYXggY2FsbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgVGFzazxUPiBNYWtlQ2FsbDxUPihBamF4T3B0aW9ucyBvcHRpb25zKSBcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIFRhc2suRnJvbVByb21pc2U8VD4oalF1ZXJ5LkFqYXgob3B0aW9ucylcbiAgICAgICAgICAgICAgICAsIChGdW5jPG9iamVjdCwgc3RyaW5nLCBqcVhIUiwgVD4pICgocmVzT2JqLCBzdWNjZXNzLCBqcVhocikgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5TdHJpbmdpZnkocmVzT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IEpzb25Db252ZXJ0LkRlc2VyaWFsaXplT2JqZWN0PFQ+KGpzb24pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgUmV0eXBlZDtcbnVzaW5nIENvbW1lbnQgPSByZWFsd29ybGQuc3BhZi5Nb2RlbHMuQ29tbWVudDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBBcnRpY2xlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkFydGljbGVJZDt9XG5cbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJQXJ0aWNsZVJlc291cmNlcyBfYXJ0aWNsZVJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUHJvZmlsZVJlc291cmNlcyBfcHJvZmlsZVJlc291cmNlcztcblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZSBBcnRpY2xlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkNvbW1lbnQ+Q29tbWVudHMgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Db21tZW50IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBib29sIElzTG9nZ2VkIHtnZXR7cmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkO319XG4gICAgICAgIHB1YmxpYyBVc2VyIExvZ2dlZFVzZXIge2dldHtyZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UuTG9nZ2VkVXNlcjt9fVxuXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlVmlld01vZGVsKElBcnRpY2xlUmVzb3VyY2VzIGFydGljbGVSZXNvdXJjZXMsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgXG4gICAgICAgICAgICBJTmF2aWdhdG9yIG5hdmlnYXRvciwgSVByb2ZpbGVSZXNvdXJjZXMgcHJvZmlsZVJlc291cmNlcylcbiAgICAgICAge1xuICAgICAgICAgICAgX2FydGljbGVSZXNvdXJjZXMgPSBhcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX3Byb2ZpbGVSZXNvdXJjZXMgPSBwcm9maWxlUmVzb3VyY2VzO1xuXG4gICAgICAgICAgICB0aGlzLkFydGljbGUgPSBuZXcgQXJ0aWNsZSgpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8Q29tbWVudD4oKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTtcblxuICAgICAgICAgICAgdmFyIHNsdWcgPSBwYXJhbWV0ZXJzLkdldFBhcmFtZXRlcjxzdHJpbmc+KFwic2x1Z1wiKTtcbiAgICAgICAgICAgIGlmKHN0cmluZy5Jc051bGxPckVtcHR5KHNsdWcpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJBcnRpY2xlIHBhZ2UgbmVlZCBzbHVnIHBhcmFtZXRlclwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGFydGljbGVUYXNrID0gdGhpcy5Mb2FkQXJ0aWNsZShzbHVnKTtcbiAgICAgICAgICAgIHZhciBjb21tZW50c1Rhc2sgPSB0aGlzLkxvYWRDb21tZW50cyhzbHVnKTtcbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbChhcnRpY2xlVGFzayxjb21tZW50c1Rhc2spO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hCaW5kaW5nKCk7IC8vIG1hbnVhbCByZWZyZXNoIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLkVuYWJsZVNwYWZBbmNob3JzKCk7IC8vIHRvZG8gY2hlY2sgd2h5IG5vdCBhdXRvIGVuYWJsZWRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFkZCBjb21tZW50IHRvIGFydGljbGVcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQWRkQ29tbWVudCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0xvZ2dlZCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29tbWVudFJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5BZGRDb21tZW50KHRoaXMuQXJ0aWNsZS5TbHVnLCB0aGlzLkNvbW1lbnQuU2VsZigpKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudC5TZWxmKHN0cmluZy5FbXB0eSk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnRzLnB1c2goY29tbWVudFJlc3BvbnNlLkNvbW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRm9sbG93IEFydGljbGUgQXV0aG9yXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEZvbGxvd0F1dGhvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZXMuRm9sbG93KHRoaXMuQXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBNYW51YWwgcmV2YWx1YXRlIGJpbmRpbmdcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlZnJlc2hCaW5kaW5nKClcbiAgICAgICAge1xuICAgICAgICAgICAgUmV0eXBlZC5rbm9ja291dC5rby5jbGVhbk5vZGUodGhpcy5QYWdlTm9kZSk7XG4gICAgICAgICAgICBiYXNlLkFwcGx5QmluZGluZ3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgY29tbWVudHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2x1Z1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkQ29tbWVudHMoc3RyaW5nIHNsdWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50ID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlQ29tbWVudHMoc2x1Zyk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnRzLnB1c2goY29tbWVudC5Db21tZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIEFydGljbGUgaW5mb1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzbHVnXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRBcnRpY2xlKHN0cmluZyBzbHVnKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZSA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZShzbHVnKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZSA9IGFydGljbGUuQXJ0aWNsZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBFZGl0QXJ0aWNsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9hcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuRWRpdEFydGljbGVJZDt9XG5cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VGl0bGUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Cb2R5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RGVzY3JpcHRpb24geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5UYWdzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBFZGl0QXJ0aWNsZVZpZXdNb2RlbChJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgX2FydGljbGVSZXNvdXJjZXMgPSBhcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIHRoaXMuVGl0bGUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkJvZHkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkRlc2NyaXB0aW9uID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5UYWdzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxvYWQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7XG5cbi8vICAgICAgICAgICAgdmFyIGFydGljbGVTbHVnID0gcGFyYW1ldGVycy5HZXRQYXJhbWV0ZXI8c3RyaW5nPihcInNsdWdcIik7XG4vLyAgICAgICAgICAgIGlmKHN0cmluZy5Jc051bGxPckVtcHR5KGFydGljbGVTbHVnKSlcbi8vICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJTbHVnIG1pc3NpbmchXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIENyZWF0ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIHRvZG8gdmFsaWRhdGlvbnNcbiAgICAgICAgICAgIHZhciBuZXdBcnRpY2VsID0gbmV3IE5ld0FydGljbGVSZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgQXJ0aWNsZSA9IG5ldyBOZXdBcnRpY2xlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBUaXRsZSA9IHRoaXMuVGl0bGUuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBCb2R5ID0gdGhpcy5Cb2R5LlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb24gPSB0aGlzLkRlc2NyaXB0aW9uLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgVGFnTGlzdCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KHRoaXMuVGFncy5TZWxmKCkuU3BsaXQoJywnKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZSA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuQ3JlYXRlKG5ld0FydGljZWwpO1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuQXJ0aWNsZUlkLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInNsdWdcIixhcnRpY2xlLkFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XHJcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xyXG51c2luZyBCcmlkZ2UuU3BhZjtcclxudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcclxue1xyXG4gICAgY2xhc3MgSG9tZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKSB7cmV0dXJuIFNwYWZBcHAuSG9tZUlkO31cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3RhZ0ZpbHRlciA9IG51bGw7IC8vIHRhZyBmaWx0ZXJcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9yZXNvdXJjZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU1lc3NlbmdlciBfbWVzc2VuZ2VyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElGZWVkUmVzb3VyY2VzIF9mZWVkUmVzb3VyY2VzO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xyXG5cclxuICAgICAgICAjcmVnaW9uIEtOT0NLT1VUSlNcclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQXJ0aWNsZT5BcnRpY2xlczsgLy8gYXJ0aWNsZXNcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yPlBhZ2VzOyAvLyBwYWdpbmF0b3IgaGVscGVyXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5UYWdzOyAvLyB0YWdzXHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxpbnQ+QWN0aXZlVGFiSW5kZXg7IC8vIHRhYiBhY3RpdmUgaW5kZXhcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPlRhYnM7XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxib29sPklzTG9nZ2VkO1xyXG4gICAgICAgIFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBIb21lVmlld01vZGVsKElBcnRpY2xlUmVzb3VyY2VzIHJlc291cmNlcywgSVNldHRpbmdzIHNldHRpbmdzLCBJTWVzc2VuZ2VyIG1lc3NlbmdlcixcclxuICAgICAgICAgICAgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBJRmVlZFJlc291cmNlcyBmZWVkUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXNvdXJjZXMgPSByZXNvdXJjZXM7XHJcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xyXG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcclxuICAgICAgICAgICAgX2ZlZWRSZXNvdXJjZXMgPSBmZWVkUmVzb3VyY2VzO1xyXG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxBcnRpY2xlPigpO1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxQYWdpbmF0b3I+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcclxuICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KHRoaXMuX3VzZXJTZXJ2aWNlLklzTG9nZ2VkKTtcclxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oLTEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5PbkxvYWQocGFyYW1ldGVycyk7IC8vIGFsd2F5cyBjYWxsIGJhc2UgKHdoZXJlIGFwcGx5YmluZGluZylcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlc1Rhc2sgPSB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7IC8vIGxvYWQgYXJ0aWNsZSB0YXNrXHJcbiAgICAgICAgICAgIHZhciBsb2FkVGFnc1Rhc2sgPSB0aGlzLkxvYWRUYWdzKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbChhcnRpY2xlc1Rhc2ssbG9hZFRhZ3NUYXNrKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVzVGFzay5SZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25MZWF2ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uTGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlVuc3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLCBTcGFmQXBwLkxvZ2luSWQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICNyZWdpb24gS05PQ0tPVVQgTUVUSE9EU1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIHVzZXIgZGV0YWlsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvVXNlcihBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQsIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInVzZXJuYW1lXCIsYXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO3JldHVybiBfbzE7fSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGFydGljbGUgZGV0YWlsXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHb1RvQXJ0aWNsZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFkZCBwYXNzZWQgYXJ0aWNsZSB0byBmYXZcclxuICAgICAgICAvLy8gT25seSBmb3IgYXV0aCB1c2Vyc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRUb0Zhdm91cml0ZShBcnRpY2xlIGFydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuSXNMb2dnZWQuU2VsZigpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgc2luZ2xlQXJ0aWNsZSA9IGFydGljbGUuRmF2b3JpdGVkID8gYXdhaXQgdGhpcy5fcmVzb3VyY2VzLlVuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKSA6IFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVzb3VyY2VzLkZhdm9yaXRlKGFydGljbGUuU2x1Zyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlcGxhY2UoYXJ0aWNsZSxzaW5nbGVBcnRpY2xlLkFydGljbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byB1c2VyIGZlZWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVzZXRUYWJzRm9yRmVlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTIpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVzZXQgVGFiXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlc2V0VGFicygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoLTEpO1xyXG4gICAgICAgICAgICB0aGlzLlRhYnMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBhcnRpY2xlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHbyB0byBwYWdlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdpbmF0b3JcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgR29Ub1BhZ2UoUGFnaW5hdG9yIHBhZ2luYXRvcilcclxuICAgICAgICB7XHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2luZ2xlPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj4oICAgICAgICAgICAgdGhpcy5QYWdlcy5TZWxmKCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yLCBib29sPikocyA9PiBzLkFjdGl2ZS5TZWxmKCkpKS5BY3RpdmUuU2VsZihmYWxzZSk7XHJcbiAgICAgICAgICAgIHBhZ2luYXRvci5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgLldpdGhPZmZTZXQoKHBhZ2luYXRvci5QYWdlLTEpKnRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpXHJcbiAgICAgICAgICAgICAgICAuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl90YWdGaWx0ZXIpKVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuV2l0aFRhZyh0aGlzLl90YWdGaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMocmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEZpbHRlciBhcnRpY2xlcyBieSB0YWdcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhZ1wiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBGaWx0ZXJCeVRhZyhzdHJpbmcgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhYk5hbWUgPSBzdHJpbmcuRm9ybWF0KFwiI3swfVwiLHRhZyk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuQXJ0aWNsZXNGb3JUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgYXJ0aWNsZXMgZm9yIHBhc3NlZCB0YWJcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhYlwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBcnRpY2xlc0ZvclRhYihzdHJpbmcgdGFiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSB0YWIuVHJpbVN0YXJ0KCcjJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ0ZpbHRlciA9IHRhZ05hbWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0dWFsSW5kZXggPSB0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFjdHVhbEluZGV4ID09IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5UYWJzLnB1c2godGFiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZih0aGlzLlRhYnMuU2VsZigpLkluZGV4T2YodGFiKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLkxvYWRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAuV2l0aFRhZyh0YWdOYW1lKVxyXG4gICAgICAgICAgICAgICAgLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFBhZ2luYXRvcihhcnRpY2xlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBQUklWQVRFIE1FVEhPRFNcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGFydGljbGVzXHJcbiAgICAgICAgLy8vIENsZWFyIGxpc3QgYW5kIHJlbG9hZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBMb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIHJlcXVlc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYXJ0aWNsZVJlc29SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRBcnRpY2xlcyhyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZVJlc29SZXNwb25zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGZlZWRcclxuICAgICAgICAvLy8gQ2xlYXIgbGlzdCBhbmQgcmVsb2FkXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzazxBcnRpY2xlUmVzcG9uc2U+IExvYWRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlciByZXF1ZXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZlZWRSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZlZWRSZXNvdXJjZXMuR2V0RmVlZChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKGZlZWRSZXNwb25zZS5BcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmZWVkUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbG9hZCB0YWdzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkVGFncygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFncyA9IGF3YWl0IHRoaXMuX3Jlc291cmNlcy5HZXRUYWdzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzLnB1c2godGFncy5UYWdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBXaGVuIHVwZGF0ZSBhcnRpY2xlcyByZWJ1aWxkIHBhZ2luYXRvclxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVJlc29SZXNwb25zZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlZnJlc2hQYWdpbmF0b3IoQXJ0aWNsZVJlc3BvbnNlIGFydGljbGVSZXNvUmVzcG9uc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBhZ2VzLnJlbW92ZUFsbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLk1vZGVscy5BcnRpY2xlPihhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzKSkgcmV0dXJuOyAvLyBubyBhcnRpY2xlc1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHBhZ2VzQ291bnQgPSAoaW50KSAoYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlc0NvdW50IC8gYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcy5MZW5ndGgpO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBFbnVtZXJhYmxlLlJhbmdlKDEsIHBhZ2VzQ291bnQpO1xyXG4gICAgICAgICAgICB2YXIgcGFnZXMgPSByYW5nZS5TZWxlY3Q8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuUGFnaW5hdG9yPigoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxpbnQsIGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLlBhZ2luYXRvcj4pKHMgPT4gbmV3IFBhZ2luYXRvclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQYWdlID0gc1xyXG4gICAgICAgICAgICB9KSkuVG9BcnJheSgpO1xyXG4gICAgICAgICAgICBwYWdlc1swXS5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcy5wdXNoKHBhZ2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgcHVibGljIGNsYXNzIExvZ2luVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLkxvZ2luSWQ7fVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+UGFzc3dvcmQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNCdXN5IHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5FcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBMb2dpblZpZXdNb2RlbChJTmF2aWdhdG9yIG5hdmlnYXRvciwgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlBhc3N3b3JkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5Jc0J1c3kgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxib29sPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIFRhc2sgTG9naW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLklzQnVzeS5TZWxmKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UuTG9naW4odGhpcy5FbWFpbC5TZWxmKCksIHRoaXMuUGFzc3dvcmQuU2VsZigpKS5Db250aW51ZVdpdGgoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5UaHJlYWRpbmcuVGFza3MuVGFzaz4pKGMgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLklzQnVzeS5TZWxmKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjLklzRmF1bHRlZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdEV4Y2VwdGlvbiA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpTeXN0ZW0uRXhjZXB0aW9uPihjLkV4Y2VwdGlvbi5Jbm5lckV4Y2VwdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdEV4Y2VwdGlvbiBpcyBQcm9taXNlRXhjZXB0aW9uKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IChQcm9taXNlRXhjZXB0aW9uKVN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Z2xvYmFsOjpTeXN0ZW0uRXhjZXB0aW9uPihjLkV4Y2VwdGlvbi5Jbm5lckV4Y2VwdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGUuR2V0VmFsaWRhdGlvbkVycm9ycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zaWVudCBcIm5vdCBjb21wbGV0ZWQgdGFza1wiIGNhdXNlZCBieSBicmlkZ2UgdmVyc2lvbiAoaW4gZml4KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyBCcmlkZ2UuU3BhZi5BdHRyaWJ1dGVzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIFtTaW5nbGVJbnN0YW5jZV1cbiAgICBwdWJsaWMgY2xhc3MgTWFpblZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNMb2dnZWQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5BY3R1YWxQYWdlSWQgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBNYWluVmlld01vZGVsKElNZXNzZW5nZXIgbWVzc2VuZ2VyLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsSU5hdmlnYXRvciBuYXZpZ2F0b3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcblxuICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuQWN0dWFsUGFnZUlkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPihTcGFmQXBwLkhvbWVJZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHN1YnNjcmliZSB0byBsb2dpbmRvbmUgbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlN1YnNjcmliZTxVc2VyU2VydmljZT4odGhpcyxTcGFmQXBwLk1lc3NhZ2VzLkxvZ2luRG9uZSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KShzZXJ2aWNlID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLklzTG9nZ2VkLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBuYXZpZ2F0b3IuT25OYXZpZ2F0ZWQgKz0gKHNlbmRlciwgbG9hZGFibGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHZtID0gKExvYWRhYmxlVmlld01vZGVsKSBsb2FkYWJsZTtcbiAgICAgICAgICAgICAgICB0aGlzLkFjdHVhbFBhZ2VJZC5TZWxmKHZtLkVsZW1lbnRJZCgpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBcHBseSBiaW5kaW5nIHRvIG1haW5tb2RlbFxuICAgICAgICAvLy8gdHJ5IGF1dG8gbG9naW5cbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgU3RhcnQoKVxuICAgICAgICB7XG4gICAgICAgICAgICBSZXR5cGVkLmtub2Nrb3V0LmtvLmFwcGx5QmluZGluZ3ModGhpcyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5UcnlBdXRvTG9naW5XaXRoU3RvcmVkVG9rZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgXG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBQcm9maWxlVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLlByb2ZpbGVJZDt9XG5cbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUHJvZmlsZVJlc291cmNlcyBfcHJvZmlsZVJlc291cmNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcblxuICAgICAgICBwdWJsaWMgUHJvZmlsZU1vZGVsIFByb2ZpbGVNb2RlbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZCB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICBwdWJsaWMgUHJvZmlsZVZpZXdNb2RlbChJUHJvZmlsZVJlc291cmNlcyBwcm9maWxlUmVzb3VyY2UsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgXG4gICAgICAgICAgICBJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvciwgSU1lc3NlbmdlciBtZXNzZW5nZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsID0gbmV3IFByb2ZpbGVNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZmlsZVJlc291cmNlID0gcHJvZmlsZVJlc291cmNlO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcblxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oMCk7XG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbC5Vc2VyU2VydmljZT4pKHNlcnZpY2UgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLklzTG9nZ2VkLlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IHN0cmluZy5FbXB0eTtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gcGFyYW1ldGVycy5HZXRQYXJhbWV0ZXI8c3RyaW5nPihcInVzZXJuYW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2hcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJObyB1c2VybmFtZSBwYXNzZWQgYW5kIHlvdSBhcmUgbm90IGxvZ2dlZCFcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyLlVzZXJuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXNlclRhc2sgPSB0aGlzLkxvYWRVc2VyKHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlVGFzayA9IHRoaXMuTG9hZEFydGljbGVzKHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHZhciBmYXZvdXJpdGVUYXNrID0gdGhpcy5Mb2FkRmF2b3VyaXRlc0FydGljbGVzKHVzZXJuYW1lKTtcblxuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsKHVzZXJUYXNrLCBhcnRpY2xlVGFzaywgZmF2b3VyaXRlVGFzayk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5TaG93QXJ0aWNsZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uTGVhdmUoKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTGVhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5VbnN1YnNjcmliZTxVc2VyU2VydmljZT4odGhpcywgU3BhZkFwcC5Mb2dpbklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBBZGQgcGFzc2VkIGFydGljbGUgdG8gZmF2XG4gICAgICAgIC8vLyBPbmx5IGZvciBhdXRoIHVzZXJzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBBZGRUb0Zhdm91cml0ZShBcnRpY2xlIGFydGljbGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0xvZ2dlZC5TZWxmKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIHNpbmdsZUFydGljbGUgPSBhcnRpY2xlLkZhdm9yaXRlZCA/IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuVW5GYXZvcml0ZShhcnRpY2xlLlNsdWcpIDogXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5GYXZvcml0ZShhcnRpY2xlLlNsdWcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5BcnRpY2xlcy5yZXBsYWNlKGFydGljbGUsc2luZ2xlQXJ0aWNsZS5BcnRpY2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEZvbGxvdyAvIHVuZm9sbG93XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEZvbGxvdygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IHRoaXMuUHJvZmlsZU1vZGVsLlVzZXJuYW1lLlNlbGYoKTtcbiAgICAgICAgICAgIHZhciBmb2xsb3cgPSB0aGlzLlByb2ZpbGVNb2RlbC5Gb2xsb3dpbmcuU2VsZigpID8gYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlLlVuRm9sbG93KHVzZXJuYW1lKSBcbiAgICAgICAgICAgICAgICA6IGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZS5Gb2xsb3codXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuRm9sbG93aW5nLlNlbGYoZm9sbG93LlByb2ZpbGUuRm9sbG93aW5nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gdXNlciBkZXRhaWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9Vc2VyKEFydGljbGUgYXJ0aWNsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuUHJvZmlsZUlkLCBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJ1c2VybmFtZVwiLGFydGljbGUuQXV0aG9yLlVzZXJuYW1lKTtyZXR1cm4gX28xO30pKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gYXJ0aWNsZSBkZXRhaWxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9BcnRpY2xlKEFydGljbGUgYXJ0aWNsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuQXJ0aWNsZUlkLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInNsdWdcIixhcnRpY2xlLlNsdWcpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFNob3cgdXNlciBhcnRpY2xlc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93QXJ0aWNsZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYoMCk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5TaG93QXJ0aWNsZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFNob3cgZmF2c1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBTaG93RmF2b3VyaXRlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigxKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dGYXZvdXJpdGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIHVzZXIgZGF0YVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ1c2VybmFtZVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkVXNlcihzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBwcm9maWxlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2UuR2V0KHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLk1hcE1lKHByb2ZpbGVSZXNwb25zZS5Qcm9maWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgQXJ0aWNsZXNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRBcnRpY2xlcyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnRpY2xlcyA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQoNSlcbiAgICAgICAgICAgICAgICAuT2ZBdXRob3IodXNlcm5hbWUpKTtcblxuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuVXNlckFydGljbGVzID0gYXJ0aWNsZXMuQXJ0aWNsZXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgQXJ0aWNsZXMgRmF2b3JpdGVzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkRmF2b3VyaXRlc0FydGljbGVzKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCg1KVxuICAgICAgICAgICAgICAgIC5PZkZhdm9yaXRlKHVzZXJuYW1lKSk7XG5cbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLkZhdm91cnRpdGVzID0gYXJ0aWNsZXMuQXJ0aWNsZXM7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBjbGFzcyBQcm9maWxlTW9kZWxcbiAgICB7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkltYWdlIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5CaW8geyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+Rm9sbG93aW5nIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQXJ0aWNsZT5BcnRpY2xlcyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPEFydGljbGU+IFVzZXJBcnRpY2xlcyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxBcnRpY2xlPiBGYXZvdXJ0aXRlcyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFByb2ZpbGVNb2RlbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuSW1hZ2UgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5CaW8gPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkZvbGxvd2luZyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxBcnRpY2xlPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgTWFwTWUgKFByb2ZpbGUgcHJvZmlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5JbWFnZS5TZWxmKHByb2ZpbGUuSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZS5TZWxmKHByb2ZpbGUuVXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5CaW8uU2VsZihwcm9maWxlLkJpbyk7XG4gICAgICAgICAgICB0aGlzLkZvbGxvd2luZy5TZWxmKHByb2ZpbGUuRm9sbG93aW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dBcnRpY2xlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PGdsb2JhbDo6cmVhbHdvcmxkLnNwYWYuTW9kZWxzLkFydGljbGU+KHRoaXMuVXNlckFydGljbGVzKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dGYXZvdXJpdGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5Nb2RlbHMuQXJ0aWNsZT4odGhpcy5GYXZvdXJ0aXRlcykpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIFJlZ2lzdGVyVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLlJlZ2lzdGVySWQ7fVxuXG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBVc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBFbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGU8c3RyaW5nPiBQYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBrbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheTxzdHJpbmc+IEVycm9ycyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFJlZ2lzdGVyVmlld01vZGVsKElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcblxuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZSA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc3dvcmQgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlZ2lzdGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuUmVnaXN0ZXIodGhpcy5Vc2VybmFtZS5TZWxmKCksIHRoaXMuRW1haWwuU2VsZigpLCB0aGlzLlBhc3N3b3JkLlNlbGYoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgU2V0dGluZ3NWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5nc1Jlc291cmNlcyBfc2V0dGluZ3NSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKCkge3JldHVybiBTcGFmQXBwLlNldHRpbmdzSWQ7fVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkltYWdlVXJpIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+VXNlcm5hbWUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5CaW9ncmFwaHkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5FbWFpbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPk5ld1Bhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlQXJyYXkgPHN0cmluZz5FcnJvcnMgeyBnZXQ7IHNldDsgfVxuXG5cbiAgICAgICAgcHVibGljIFNldHRpbmdzVmlld01vZGVsKElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSVNldHRpbmdzUmVzb3VyY2VzIHNldHRpbmdzUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzUmVzb3VyY2VzID0gc2V0dGluZ3NSZXNvdXJjZXM7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG5cbiAgICAgICAgICAgIHRoaXMuSW1hZ2VVcmkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5OZXdQYXNzd29yZCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRXJyb3JzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XG5cbiAgICAgICAgICAgIHRoaXMuUG9wdWxhdGVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZvaWQgUG9wdWxhdGVFbnRyaWVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyO1xuICAgICAgICAgICAgdGhpcy5Vc2VybmFtZS5TZWxmKHVzZXIuVXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5FbWFpbC5TZWxmKHVzZXIuRW1haWwpO1xuICAgICAgICAgICAgdGhpcy5JbWFnZVVyaS5TZWxmKHVzZXIuSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5CaW9ncmFwaHkuU2VsZih1c2VyLkJpbyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgVXBkYXRlU2V0dGluZ3MoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZ3NSZXF1ZXN0ID0gbmV3IFNldHRpbmdzUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWUgPSB0aGlzLlVzZXJuYW1lLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgTmV3UGFzc3dvcmQgPSB0aGlzLk5ld1Bhc3N3b3JkLlNlbGYoKSxcbiAgICAgICAgICAgICAgICAgICAgQmlvZ3JhcGh5ID0gdGhpcy5CaW9ncmFwaHkuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IHRoaXMuRW1haWwuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBJbWFnZVVyaSA9IHRoaXMuSW1hZ2VVcmkuU2VsZigpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciB1c2VyVXBkYXRlZCA9IGF3YWl0IHRoaXMuX3NldHRpbmdzUmVzb3VyY2VzLlVwZGF0ZVNldHRpbmdzKHNldHRpbmdzUmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuUHJvZmlsZUlkKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gZS5HZXRWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5FcnJvcnMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihlcnJvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQXV0aG9yaXplZFJlc291cmNlQmFzZSA6IFJlc291cmNlQmFzZVxuICAgIHtcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IElVc2VyU2VydmljZSBVc2VyU2VydmljZTtcblxuICAgICAgICBwcm90ZWN0ZWQgQXV0aG9yaXplZFJlc291cmNlQmFzZShJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFVzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdlbmVyaWMgQXdhaXRhYmxlIGFqYXggY2FsbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJvcHRpb25zXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj48L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJvdGVjdGVkIFRhc2s8VD4gTWFrZUF1dGhvcml6ZWRDYWxsPFQ+KEFqYXhPcHRpb25zIG9wdGlvbnMpIFxuICAgICAgICB7XG4gICAgICAgICAgICBpZighdGhpcy5Vc2VyU2VydmljZS5Jc0xvZ2dlZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiWW91IG11c3QgYmUgbG9nZ2VkIHRvIHVzZSB0aGlzIHJlc291cmNlXCIpO1xuXG4gICAgICAgICAgICBvcHRpb25zLkJlZm9yZVNlbmQgPSAoeGhyLCBvKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHhoci5TZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBzdHJpbmcuRm9ybWF0KFwiVG9rZW4gezB9XCIsdGhpcy5Vc2VyU2VydmljZS5Mb2dnZWRVc2VyLlRva2VuKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8VD4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgQnJpZGdlLkh0bWw1O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIExvY2FsU3RvcmFnZVJlcG9zaXRvcnkgOiBJUmVwb3NpdG9yeVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBzdHJpbmcgVG9rZW5LZXkgPSBcInRva2VuXCI7XG4gICAgICAgIHByaXZhdGUgU3RvcmFnZSBfc3RvcmFnZTtcblxuICAgICAgICBwdWJsaWMgTG9jYWxTdG9yYWdlUmVwb3NpdG9yeSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UgPSBXaW5kb3cuTG9jYWxTdG9yYWdlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgdm9pZCBTYXZlVG9rZW4oc3RyaW5nIHRva2VuKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLlNldEl0ZW0oVG9rZW5LZXksdG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRUb2tlbklmRXhpc3QoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLl9zdG9yYWdlLkdldEl0ZW0oVG9rZW5LZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuIT1udWxsP3Rva2VuLlRvU3RyaW5nKCk6KHN0cmluZyludWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgRGVsZXRlVG9rZW4oKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlLlJlbW92ZUl0ZW0oVG9rZW5LZXkpO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFVzZXJSZXNvdXJjZXMgOiBSZXNvdXJjZUJhc2UsIElVc2VyUmVzb3VyY2VzXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XG5cbiAgICAgICAgcHVibGljIFVzZXJSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzKSBcbiAgICAgICAge1xuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gTG9naW4oU2lnblJlcXVlc3QgbG9naW5SZXF1ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlcnMvbG9naW5cIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChsb2dpblJlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaWduUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBSZWdpc3RlcihTaWduUmVxdWVzdCBsb2dpblJlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2Vyc1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KGxvZ2luUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IEdldEN1cnJlbnRVc2VyKHN0cmluZyB0b2tlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmkpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQmVmb3JlU2VuZCA9ICh4aHIsIG8pID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4aHIuU2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgc3RyaW5nLkZvcm1hdChcIlRva2VuIHswfVwiLHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBjbGFzcyBVc2VyU2VydmljZSA6IElVc2VyU2VydmljZVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclJlc291cmNlcyBfdXNlclJlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVJlcG9zaXRvcnkgX3JlcG9zaXRvcnk7XG5cbiAgICAgICAgcHVibGljIFVzZXJTZXJ2aWNlKElVc2VyUmVzb3VyY2VzIHVzZXJSZXNvdXJjZXMsIElNZXNzZW5nZXIgbWVzc2VuZ2VyLCBJUmVwb3NpdG9yeSByZXBvc2l0b3J5KVxuICAgICAgICB7XG4gICAgICAgICAgICBfdXNlclJlc291cmNlcyA9IHVzZXJSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbWVzc2VuZ2VyID0gbWVzc2VuZ2VyO1xuICAgICAgICAgICAgX3JlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFVzZXIgTG9nZ2VkVXNlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbiAgICAgICAgcHVibGljIGJvb2wgSXNMb2dnZWQge2dldHtyZXR1cm4gdGhpcy5Mb2dnZWRVc2VyICE9IG51bGw7fX1cblxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBMb2dpbihzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuTG9naW4obmV3IFNpZ25SZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlciA9IG5ldyBVc2VyUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBtYWlsLFxuICAgICAgICAgICAgICAgICAgICBQYXNzd29yZCA9IHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVnaXN0ZXIoc3RyaW5nIHVzZXJuYW1lLCBzdHJpbmcgbWFpbCwgc3RyaW5nIHBhc3N3b3JkKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgbG9naW5SZXNwb25zZSA9IGF3YWl0IHRoaXMuX3VzZXJSZXNvdXJjZXMuUmVnaXN0ZXIobmV3IFNpZ25SZXF1ZXN0XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXNlciA9IG5ldyBVc2VyUmVxdWVzdFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgRW1haWwgPSBtYWlsLFxuICAgICAgICAgICAgICAgICAgICBQYXNzd29yZCA9IHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICBVc2VybmFtZSA9IHVzZXJuYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuTG9nZ2VkVXNlciA9IGxvZ2luUmVzcG9uc2UuVXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU2VuZDxnbG9iYWw6OnJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGwuVXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgVHJ5QXV0b0xvZ2luV2l0aFN0b3JlZFRva2VuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0b3JlZFRva2VuID0gdGhpcy5fcmVwb3NpdG9yeS5HZXRUb2tlbklmRXhpc3QoKTtcbiAgICAgICAgICAgIGlmIChzdG9yZWRUb2tlbiA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5HZXRDdXJyZW50VXNlcihzdG9yZWRUb2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8Z2xvYmFsOjpyZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsLlVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChQcm9taXNlRXhjZXB0aW9uIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LkRlbGV0ZVRva2VuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSUFydGljbGVSZXNvdXJjZXNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPEFydGljbGVSZXNwb25zZT4gR2V0QXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIGJ1aWxkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxidWlsZGVyLkJ1aWxkKCkpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVXNlclNlcnZpY2UuSXNMb2dnZWRcclxuICAgICAgICAgICAgICAgID8gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8QXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLk1ha2VDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxUYWdzUmVzcG9uc2U+IEdldFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS90YWdzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8VGFnc1Jlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gR2V0QXJ0aWNsZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBGYXZvcml0ZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2Zhdm9yaXRlXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBVbkZhdm9yaXRlKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vZmF2b3JpdGVcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJERUxFVEVcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gQ3JlYXRlKE5ld0FydGljbGVSZXF1ZXN0IG5ld0FydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChuZXdBcnRpY2xlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxDb21tZW50c1Jlc3BvbnNlPiBHZXRBcnRpY2xlQ29tbWVudHMoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9jb21tZW50c1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8Q29tbWVudHNSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVDb21tZW50UmVzcG9uc2U+IEFkZENvbW1lbnQoc3RyaW5nIHNsdWcsIHN0cmluZyBjb21tZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vY29tbWVudHNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobmV3IENvbW1lbnRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5ID0gY29tbWVudFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVDb21tZW50UmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBGZWVkUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSUZlZWRSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgRmVlZFJlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBHZXRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlciBidWlsZGVyKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLGJ1aWxkZXIuQnVpbGQoKSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFByb2ZpbGVSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJUHJvZmlsZVJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlUmVzb3VyY2VzKElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSVNldHRpbmdzIHNldHRpbmdzKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8Rm9sbG93UmVzcG9uc2U+IEZvbGxvdyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9wcm9maWxlcy97MX0vZm9sbG93XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHVzZXJuYW1lKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8Rm9sbG93UmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8Rm9sbG93UmVzcG9uc2U+IFVuRm9sbG93KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfS9mb2xsb3dcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksdXNlcm5hbWUpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkRFTEVURVwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEZvbGxvd1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFByb2ZpbGVSZXNwb25zZT4gR2V0KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuVXNlclNlcnZpY2UuSXNMb2dnZWQgPyBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxQcm9maWxlUmVzcG9uc2U+KG9wdGlvbnMpIDogYmFzZS5NYWtlQ2FsbDxQcm9maWxlUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufVxuICIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFNldHRpbmdzUmVzb3VyY2VzOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJU2V0dGluZ3NSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgU2V0dGluZ3NSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpIDogYmFzZSh1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNldHRpbmdzUmVzcG9uc2U+IFVwZGF0ZVNldHRpbmdzKFNldHRpbmdzUmVxdWVzdCBzZXR0aW5nc1JlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2VyXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQVVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChzZXR0aW5nc1JlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2V0dGluZ3NSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXQp9Cg==
