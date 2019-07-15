/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.9.0
 */
Bridge.assembly("realworld.spaf", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.Ioc.IIoc", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Ioc.IResolver", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Messenger.IMessenger", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.INavigator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.INavigatorConfigurator", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IBrowserHistoryManager", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IAmLoadable", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.IPageDescriptor", {
        $kind: "interface"
    });

    Bridge.define("Bridge.Navigation.Model.UrlDescriptor", {
        fields: {
            PageId: null,
            Parameters: null
        }
    });

    Bridge.define("Bridge.Navigation.NavigationUtility", {
        statics: {
            fields: {
                /**
                 * Define virtual directory for something like:
                 protocol://awesomesite.io/somedirectory
                 *
                 * @static
                 * @public
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @type string
                 */
                VirtualDirectory: null
            },
            methods: {
                /**
                 * Get parameter key from parameters dictionary
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {Function}                                   T             
                 * @param   {System.Collections.Generic.Dictionary$2}    parameters    
                 * @param   {string}                                     paramKey
                 * @return  {T}
                 */
                GetParameter: function (T, parameters, paramKey) {
                    if (parameters == null) {
                        throw new System.Exception("Parameters is null!");
                    }

                    if (!parameters.containsKey(paramKey)) {
                        throw new System.Exception(System.String.format("No parameter with key {0} found!", [paramKey]));
                    }

                    var value = parameters.getItem(paramKey);

                    var parseMethod = Bridge.Reflection.getMembers(T, 8, 284, "Parse", System.Array.init([System.String], System.Type));

                    if (parseMethod != null) {
                        return Bridge.cast(Bridge.unbox(Bridge.Reflection.midel(parseMethod, null).apply(null, Bridge.unbox(System.Array.init([value], System.Object))), T), T);
                    }

                    return Bridge.cast(Bridge.unbox(value, T), T);
                },
                /**
                 * Build base url using page id and virtual directory
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.NavigationUtility
                 * @memberof Bridge.Navigation.NavigationUtility
                 * @param   {string}    pageId
                 * @return  {string}
                 */
                BuildBaseUrl: function (pageId) {
                    var baseUrl = System.String.format("{0}//{1}", window.location.protocol, window.location.host);
                    baseUrl = System.String.isNullOrEmpty(Bridge.Navigation.NavigationUtility.VirtualDirectory) ? System.String.format("{0}#{1}", baseUrl, pageId) : System.String.format("{0}/{1}#{2}", baseUrl, Bridge.Navigation.NavigationUtility.VirtualDirectory, pageId);
                    return baseUrl;
                }
            }
        }
    });

    Bridge.define("Bridge.Navigation.Utility", {
        statics: {
            methods: {
                /**
                 * Load script sequentially
                 *
                 * @static
                 * @public
                 * @this Bridge.Navigation.Utility
                 * @memberof Bridge.Navigation.Utility
                 * @param   {System.Collections.Generic.List$1}    scripts
                 * @return  {void}
                 */
                SequentialScriptLoad: function (scripts) {
                    if (!System.Linq.Enumerable.from(scripts, System.String).any()) {
                        return;
                    }
                    var toLoad = System.Linq.Enumerable.from(scripts, System.String).first();
                    $.getScript(toLoad, function (o, s, arg3) {
                        scripts.remove(toLoad);
                        Bridge.Navigation.Utility.SequentialScriptLoad(scripts);
                    });
                }
            }
        }
    });

    Bridge.define("Bridge.Spaf.Attributes.SingleInstanceAttribute", {
        inherits: [System.Attribute]
    });

    Bridge.define("Bridge.Spaf.IViewModelLifeCycle", {
        $kind: "interface"
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

    Bridge.define("Bridge.Spaf.SpafApp", {
        main: function Main () {
            var $step = 0,
                $task1, 
                $jumpFromFinally, 
                mainVm, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1], $step);
                        switch ($step) {
                            case 0: {
                                Bridge.Navigation.NavigationUtility.VirtualDirectory = "realworld.spaf"; //  virtual dir for release environment

                                Bridge.Spaf.SpafApp.Container = new Bridge.Ioc.BridgeIoc();
                                Bridge.Spaf.SpafApp.ContainerConfig(); // config container
                                mainVm = Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(realworld.spaf.ViewModels.MainViewModel);
                                $task1 = mainVm.Start();
                                $step = 1;
                                if ($task1.isCompleted()) {
                                    continue;
                                }
                                $task1.continue($asyncBody);
                                return;
                            }
                            case 1: {
                                $task1.getAwaitedResult();
                                Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$Resolve(Bridge.Navigation.INavigator).Bridge$Navigation$INavigator$InitNavigation(); // init navigation
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
                    Bridge.Spaf.SpafApp.Container.Bridge$Ioc$IIoc$RegisterSingleInstance$3(Bridge.Navigation.IBrowserHistoryManager, Bridge.Navigation.QueryParameterNavigationHistory);
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
                    var types = System.Linq.Enumerable.from(System.AppDomain.getAssemblies(), System.Reflection.Assembly).selectMany(function (s) {
                            return Bridge.Reflection.getAssemblyTypes(s);
                        }).where(function (w) {
                        return System.String.endsWith(Bridge.Reflection.getTypeName(w).toLowerCase(), "viewmodel");
                    }).toList(System.Type);

                    types.ForEach(function (f) {
                        var attributes = Bridge.Reflection.getAttributes(f, Bridge.Spaf.Attributes.SingleInstanceAttribute, true);

                        if (System.Linq.Enumerable.from(attributes, System.Object).any()) {
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                var $t;
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, ($t = realworld.spaf.Models.Article, System.Linq.Enumerable.from(this.UserArticles, $t).ToArray($t)));
            },
            ShowFavourites: function () {
                var $t;
                this.Articles.removeAll();
                this.Articles.push.apply(this.Articles, ($t = realworld.spaf.Models.Article, System.Linq.Enumerable.from(this.Favourtites, $t).ToArray($t)));
            }
        }
    });

    /** @namespace Bridge.Ioc */

    /**
     * Implementation of IIoc
     *
     * @public
     * @class Bridge.Ioc.BridgeIoc
     * @implements  Bridge.Ioc.IIoc
     */
    Bridge.define("Bridge.Ioc.BridgeIoc", {
        inherits: [Bridge.Ioc.IIoc],
        fields: {
            _resolvers: null
        },
        alias: [
            "Register$1", "Bridge$Ioc$IIoc$Register$1",
            "Register$2", "Bridge$Ioc$IIoc$Register$2",
            "Register$4", "Bridge$Ioc$IIoc$Register$4",
            "Register", "Bridge$Ioc$IIoc$Register",
            "Register$3", "Bridge$Ioc$IIoc$Register$3",
            "RegisterSingleInstance$1", "Bridge$Ioc$IIoc$RegisterSingleInstance$1",
            "RegisterSingleInstance$3", "Bridge$Ioc$IIoc$RegisterSingleInstance$3",
            "RegisterSingleInstance", "Bridge$Ioc$IIoc$RegisterSingleInstance",
            "RegisterSingleInstance$2", "Bridge$Ioc$IIoc$RegisterSingleInstance$2",
            "RegisterFunc", "Bridge$Ioc$IIoc$RegisterFunc",
            "RegisterInstance$1", "Bridge$Ioc$IIoc$RegisterInstance$1",
            "RegisterInstance", "Bridge$Ioc$IIoc$RegisterInstance",
            "RegisterInstance$2", "Bridge$Ioc$IIoc$RegisterInstance$2",
            "Resolve", "Bridge$Ioc$IIoc$Resolve",
            "Resolve$1", "Bridge$Ioc$IIoc$Resolve$1"
        ],
        ctors: {
            init: function () {
                this._resolvers = new (System.Collections.Generic.Dictionary$2(System.Type,Bridge.Ioc.IResolver)).ctor();
            }
        },
        methods: {
            Register$1: function (type, resolver) {
                this.CheckAlreadyAdded(type);
                this._resolvers.add(type, resolver);
            },
            Register$2: function (type, impl) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.TransientResolver(this, impl);
                this._resolvers.add(type, resolver);
            },
            Register$4: function (TType, TImplementation) {
                this.Register$2(TType, TImplementation);
            },
            Register: function (type) {
                this.Register$2(type, type);
            },
            Register$3: function (TType) {
                this.Register(TType);
            },
            RegisterSingleInstance$1: function (type, impl) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.SingleInstanceResolver(this, impl);
                this._resolvers.add(type, resolver);
            },
            RegisterSingleInstance$3: function (TType, TImplementation) {
                this.RegisterSingleInstance$1(TType, TImplementation);
            },
            RegisterSingleInstance: function (type) {
                this.RegisterSingleInstance$1(type, type);
            },
            RegisterSingleInstance$2: function (TType) {
                this.RegisterSingleInstance(TType);
            },
            RegisterFunc: function (TType, func) {
                this.CheckAlreadyAdded$1(TType);

                var resolver = new (Bridge.Ioc.FuncResolver$1(TType))(func);
                this._resolvers.add(TType, resolver);
            },
            RegisterInstance$1: function (type, instance) {
                this.CheckAlreadyAdded(type);

                var resolver = new Bridge.Ioc.InstanceResolver(instance);
                this._resolvers.add(type, resolver);
            },
            RegisterInstance: function (instance) {
                this.RegisterInstance$1(Bridge.getType(instance), instance);
            },
            RegisterInstance$2: function (TType, instance) {
                this.RegisterInstance$1(TType, instance);
            },
            Resolve: function (TType) {
                this.CheckNotRegistered$1(TType);

                var resolver = this._resolvers.getItem(TType);
                return Bridge.cast(resolver.Bridge$Ioc$IResolver$Resolve(), TType);
            },
            Resolve$1: function (type) {
                this.CheckNotRegistered(type);

                var resolver = this._resolvers.getItem(type);
                return resolver.Bridge$Ioc$IResolver$Resolve();
            },
            CheckAlreadyAdded: function (type) {
                if (this._resolvers.containsKey(type)) {
                    throw new System.Exception(System.String.format("{0} is already registered!", [Bridge.Reflection.getTypeFullName(type)]));
                }
            },
            CheckAlreadyAdded$1: function (TType) {
                this.CheckAlreadyAdded(TType);
            },
            CheckNotRegistered: function (type) {
                if (!this._resolvers.containsKey(type)) {
                    throw new System.Exception(System.String.format("Cannot resolve {0}, it's not registered!", [Bridge.Reflection.getTypeFullName(type)]));
                }
            },
            CheckNotRegistered$1: function (TType) {
                this.CheckNotRegistered(TType);
            }
        }
    });

    Bridge.define("Bridge.Ioc.FuncResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolveFunc) {
                this.$initialize();
                this.Resolve = function () {
                    return resolveFunc();
                };
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.InstanceResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (resolvedObj) {
                this.$initialize();
                this.Resolve = function () {
                    return resolvedObj;
                };
            }
        }
    });

    Bridge.define("Bridge.Ioc.SingleInstanceResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            _singleInstance: null,
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc, type) {
                this.$initialize();
                this.Resolve = Bridge.fn.bind(this, function () {
                    // first resolve. Using transient resolver
                    if (this._singleInstance == null) {
                        var transientResolver = new Bridge.Ioc.TransientResolver(ioc, type);
                        this._singleInstance = transientResolver.Resolve();
                    }

                    return this._singleInstance;
                });
            }
        }
    });

    Bridge.define("Bridge.Ioc.TransientResolver", {
        inherits: [Bridge.Ioc.IResolver],
        fields: {
            Resolve: null
        },
        alias: ["Resolve", "Bridge$Ioc$IResolver$Resolve"],
        ctors: {
            ctor: function (ioc, toresolveType) {
                this.$initialize();
                this.Resolve = function () {
                    var $t;
                    // get ctor
                    var $ctor = System.Linq.Enumerable.from(Bridge.Reflection.getMembers(toresolveType, 1, 28), System.Reflection.ConstructorInfo).firstOrDefault(null, null);
                    if ($ctor == null) {
                        throw new System.Exception(System.String.format("No ctor found for type {0}!", [Bridge.Reflection.getTypeFullName(toresolveType)]));
                    }

                    // get ctor params
                    var ctorParams = ($ctor.pi || []);
                    if (!System.Linq.Enumerable.from(ctorParams, System.Object).any()) {
                        return Bridge.createInstance(toresolveType);
                    } else {
                        // recursive resolve
                        var parameters = new (System.Collections.Generic.List$1(System.Object)).$ctor2(ctorParams.length);

                        $t = Bridge.getEnumerator(ctorParams);
                        try {
                            while ($t.moveNext()) {
                                var parameterInfo = $t.Current;
                                parameters.add(ioc.Bridge$Ioc$IIoc$Resolve$1(parameterInfo.pt));
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$Dispose();
                            }
                        }

                        return Bridge.Reflection.invokeCI($ctor, Bridge.unbox(parameters.ToArray()));
                    }
                };
            }
        }
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @param   {TSender}    arg1    
     * @param   {TArgs}      arg2
     * @return  {void}
     */

    Bridge.define("Bridge.Messenger.Messenger", {
        inherits: [Bridge.Messenger.IMessenger],
        fields: {
            _calls: null
        },
        alias: [
            "Send$1", "Bridge$Messenger$IMessenger$Send$1",
            "Send", "Bridge$Messenger$IMessenger$Send",
            "Subscribe$1", "Bridge$Messenger$IMessenger$Subscribe$1",
            "Subscribe", "Bridge$Messenger$IMessenger$Subscribe",
            "Unsubscribe$1", "Bridge$Messenger$IMessenger$Unsubscribe$1",
            "Unsubscribe", "Bridge$Messenger$IMessenger$Unsubscribe",
            "ResetMessenger", "Bridge$Messenger$IMessenger$ResetMessenger"
        ],
        ctors: {
            init: function () {
                this._calls = new (System.Collections.Generic.Dictionary$2(System.Tuple$3(System.String,System.Type,System.Type),System.Collections.Generic.List$1(System.Tuple$2(System.Object,Function)))).ctor();
            }
        },
        methods: {
            /**
             * Send Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {Function}    TArgs      TMessageArgs
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @param   {TArgs}       args       Args
             * @return  {void}
             */
            Send$1: function (TSender, TArgs, sender, message, args) {
                if (sender == null) {
                    throw new System.ArgumentNullException.$ctor1("sender");
                }
                this.InnerSend(message, TSender, TArgs, sender, args);
            },
            /**
             * Send Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}    TSender    TSender
             * @param   {TSender}     sender     Sender
             * @param   {string}      message    Message
             * @return  {void}
             */
            Send: function (TSender, sender, message) {
                if (sender == null) {
                    throw new System.ArgumentNullException.$ctor1("sender");
                }
                this.InnerSend(message, TSender, null, sender, null);
            },
            /**
             * Subscribe Message with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe$1: function (TSender, TArgs, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException.$ctor1("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender), Bridge.cast(Bridge.unbox(args, TArgs), TArgs));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, TArgs, wrap);
            },
            /**
             * Subscribe Message without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @param   {System.Action}    callback      Action
             * @param   {TSender}          source        source
             * @return  {void}
             */
            Subscribe: function (TSender, subscriber, message, callback, source) {
                if (source === void 0) { source = Bridge.getDefaultValue(TSender); }
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (Bridge.staticEquals(callback, null)) {
                    throw new System.ArgumentNullException.$ctor1("callback");
                }

                var wrap = function (sender, args) {
                    var send = Bridge.cast(sender, TSender);
                    if (source == null || Bridge.referenceEquals(send, source)) {
                        callback(Bridge.cast(sender, TSender));
                    }
                };

                this.InnerSubscribe(subscriber, message, TSender, null, wrap);
            },
            /**
             * Unsubscribe action with args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {Function}         TArgs         TArgs
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe$1: function (TSender, TArgs, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, TArgs, subscriber);
            },
            /**
             * Unsubscribe action without args
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @param   {Function}         TSender       TSender
             * @param   {System.Object}    subscriber    Subscriber
             * @param   {string}           message       Message
             * @return  {void}
             */
            Unsubscribe: function (TSender, subscriber, message) {
                this.InnerUnsubscribe(message, TSender, null, subscriber);
            },
            /**
             * Remove all callbacks
             *
             * @instance
             * @public
             * @this Bridge.Messenger.Messenger
             * @memberof Bridge.Messenger.Messenger
             * @return  {void}
             */
            ResetMessenger: function () {
                this._calls.clear();
            },
            InnerSend: function (message, senderType, argType, sender, args) {
                var $t, $t1;
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }
                var key = { Item1: message, Item2: senderType, Item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }
                var actions = this._calls.getItem(key);
                if (actions == null || !System.Linq.Enumerable.from(actions, System.Tuple$2(System.Object,Function)).any()) {
                    return;
                }

                var actionsCopy = ($t = System.Tuple$2(System.Object,Function), System.Linq.Enumerable.from(actions, $t).toList($t));
                $t1 = Bridge.getEnumerator(actionsCopy);
                try {
                    while ($t1.moveNext()) {
                        var action = $t1.Current;
                        if (actions.contains(action)) {
                            action.Item2(sender, args);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
            },
            InnerSubscribe: function (subscriber, message, senderType, argType, callback) {
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }
                var key = { Item1: message, Item2: senderType, Item3: argType };
                var value = { Item1: subscriber, Item2: callback };
                if (this._calls.containsKey(key)) {
                    this._calls.getItem(key).add(value);
                } else {
                    var list = function (_o1) {
                            _o1.add(value);
                            return _o1;
                        }(new (System.Collections.Generic.List$1(System.Tuple$2(System.Object,Function))).ctor());
                    this._calls.setItem(key, list);
                }
            },
            InnerUnsubscribe: function (message, senderType, argType, subscriber) {
                var $t;
                if (subscriber == null) {
                    throw new System.ArgumentNullException.$ctor1("subscriber");
                }
                if (message == null) {
                    throw new System.ArgumentNullException.$ctor1("message");
                }

                var key = { Item1: message, Item2: senderType, Item3: argType };
                if (!this._calls.containsKey(key)) {
                    return;
                }

                var toremove = System.Linq.Enumerable.from(this._calls.getItem(key), System.Tuple$2(System.Object,Function)).where(function (tuple) {
                        return Bridge.referenceEquals(tuple.Item1, subscriber);
                    }).toList(System.Tuple$2(System.Object,Function));

                $t = Bridge.getEnumerator(toremove);
                try {
                    while ($t.moveNext()) {
                        var tuple = $t.Current;
                        this._calls.getItem(key).remove(tuple);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                if (!System.Linq.Enumerable.from(this._calls.getItem(key), System.Tuple$2(System.Object,Function)).any()) {
                    this._calls.remove(key);
                }
            }
        }
    });

    /** @namespace Bridge.Navigation */

    /**
     * INavigator implementation
     *
     * @public
     * @class Bridge.Navigation.BridgeNavigator
     * @implements  Bridge.Navigation.INavigator
     */
    Bridge.define("Bridge.Navigation.BridgeNavigator", {
        inherits: [Bridge.Navigation.INavigator],
        statics: {
            fields: {
                _actualController: null
            }
        },
        fields: {
            Configuration: null
        },
        events: {
            OnNavigated: null
        },
        props: {
            LastNavigateController: {
                get: function () {
                    return Bridge.Navigation.BridgeNavigator._actualController;
                }
            }
        },
        alias: [
            "EnableSpafAnchors", "Bridge$Navigation$INavigator$EnableSpafAnchors",
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "addOnNavigated", "Bridge$Navigation$INavigator$addOnNavigated",
            "removeOnNavigated", "Bridge$Navigation$INavigator$removeOnNavigated",
            "LastNavigateController", "Bridge$Navigation$INavigator$LastNavigateController",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation"
        ],
        ctors: {
            ctor: function (configuration) {
                this.$initialize();
                this.Configuration = configuration;
            }
        },
        methods: {
            EnableSpafAnchors: function () {
                var allAnchors = $("a");
                allAnchors.off(System.Enum.toString(System.String, "click"));
                allAnchors.click(Bridge.fn.bind(this, function (ev) {
                    var clickedElement = ev.target;

                    if (!Bridge.referenceEquals(Bridge.getType(clickedElement), HTMLAnchorElement)) {
                        clickedElement = $(ev.target).parents("a").get(0);
                    }

                    var href = clickedElement.getAttribute("href");

                    if (System.String.isNullOrEmpty(href)) {
                        return;
                    }

                    var isMyHref = System.String.startsWith(href, "spaf:");

                    // if is my href
                    if (isMyHref) {
                        ev.preventDefault();
                        var pageId = System.String.replaceAll(href, "spaf:", "");
                        this.Navigate(pageId);
                    }

                    // anchor default behaviour
                }));
            },
            /**
             * Navigate to a page ID.
             The ID must be registered.
             *
             * @instance
             * @public
             * @this Bridge.Navigation.BridgeNavigator
             * @memberof Bridge.Navigation.BridgeNavigator
             * @param   {string}                                     pageId        
             * @param   {System.Collections.Generic.Dictionary$2}    parameters
             * @return  {void}
             */
            Navigate: function (pageId, parameters) {
                var $t;
                if (parameters === void 0) { parameters = null; }
                var page = this.Configuration.Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey(pageId);
                if (page == null) {
                    throw new System.Exception(System.String.format("Page not found with ID {0}", [pageId]));
                }

                // check redirect rule
                var redirectKey = !Bridge.staticEquals(($t = page.Bridge$Navigation$IPageDescriptor$RedirectRules), null) ? $t() : null;
                if (!System.String.isNullOrEmpty(redirectKey)) {
                    this.Navigate(redirectKey, parameters);
                    return;
                }

                var body = this.Configuration.Bridge$Navigation$INavigatorConfigurator$Body;
                if (body == null) {
                    throw new System.Exception("Cannot find navigation body element.");
                }

                // leave actual controlelr
                if (this.LastNavigateController != null) {
                    this.LastNavigateController.Bridge$Navigation$IAmLoadable$OnLeave();
                }

                this.Configuration.Bridge$Navigation$INavigatorConfigurator$Body.load(page.Bridge$Navigation$IPageDescriptor$HtmlLocation(), null, Bridge.fn.bind(this, function (o, s, a) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        scripts, 
                        $t1, 
                        scriptsTask, 
                        $t2, 
                        enableAnchors, 
                        $t3, 
                        controller, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3], $step);
                                switch ($step) {
                                    case 0: {
                                        // load dependencies
                                        if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$DependenciesScripts, null)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                    }
                                    case 1: {
                                        scripts = ($t1 = System.String, System.Linq.Enumerable.from((page.Bridge$Navigation$IPageDescriptor$DependenciesScripts()), $t1).toList($t1));
                                        if (page.Bridge$Navigation$IPageDescriptor$SequentialDependenciesScriptLoad) {
                                            Bridge.Navigation.Utility.SequentialScriptLoad(scripts);
                                        }
                                        // parallel load
                                        scriptsTask = System.Linq.Enumerable.from(scripts, System.String).select(function (url) {
                                            return System.Threading.Tasks.Task.fromPromise($.getScript(url));
                                        });
                                        $task1 = System.Threading.Tasks.Task.whenAll(scriptsTask);
                                        $step = 2;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $step = 3;
                                        continue;
                                    }
                                    case 3: {
                                        // prepare page
                                        !Bridge.staticEquals(($t2 = page.Bridge$Navigation$IPageDescriptor$PreparePage), null) ? $t2() : null;

                                        // auto enable spaf anchors
                                        if (!this.Configuration.Bridge$Navigation$INavigatorConfigurator$DisableAutoSpafAnchorsOnNavigate) {
                                            enableAnchors = !Bridge.staticEquals(($t3 = page.Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors), null) ? $t3() : null;
                                            if (System.Nullable.hasValue(enableAnchors) && System.Nullable.getValue(enableAnchors)) {
                                                this.EnableSpafAnchors();
                                            }
                                        }

                                        if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$PageController, null)) {
                                            // load new controller
                                            controller = page.Bridge$Navigation$IPageDescriptor$PageController();
                                            controller.Bridge$Navigation$IAmLoadable$OnLoad(parameters);

                                            Bridge.Navigation.BridgeNavigator._actualController = controller;

                                            !Bridge.staticEquals(this.OnNavigated, null) ? this.OnNavigated(this, controller) : null;
                                        }
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                }));
            },
            /**
             * Subscribe to anchors click
             *
             * @instance
             * @public
             * @this Bridge.Navigation.BridgeNavigator
             * @memberof Bridge.Navigation.BridgeNavigator
             * @return  {void}
             */
            InitNavigation: function () {
                this.EnableSpafAnchors();

                // go home
                this.Navigate(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
            }
        }
    });

    /**
     * INavigatorConfigurator Implementation. Must be extended.
     *
     * @abstract
     * @public
     * @class Bridge.Navigation.BridgeNavigatorConfigBase
     * @implements  Bridge.Navigation.INavigatorConfigurator
     */
    Bridge.define("Bridge.Navigation.BridgeNavigatorConfigBase", {
        inherits: [Bridge.Navigation.INavigatorConfigurator],
        fields: {
            _routes: null
        },
        alias: ["GetPageDescriptorByKey", "Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey"],
        ctors: {
            ctor: function () {
                this.$initialize();
                this._routes = this.CreateRoutes();
            }
        },
        methods: {
            GetPageDescriptorByKey: function (key) {
                return System.Linq.Enumerable.from(this._routes, Bridge.Navigation.IPageDescriptor).singleOrDefault(function (s) {
                        return System.String.equals(s.Bridge$Navigation$IPageDescriptor$Key, key, 1);
                    }, null);
            }
        }
    });

    Bridge.define("Bridge.Navigation.ComplexObjectNavigationHistory", {
        inherits: [Bridge.Navigation.IBrowserHistoryManager],
        alias: [
            "PushState", "Bridge$Navigation$IBrowserHistoryManager$PushState",
            "ParseUrl", "Bridge$Navigation$IBrowserHistoryManager$ParseUrl"
        ],
        methods: {
            PushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                var baseUrl = Bridge.Navigation.NavigationUtility.BuildBaseUrl(pageId);

                window.history.pushState(null, "", parameters != null ? System.String.format("{0}={1}", baseUrl, Bridge.global.btoa(JSON.stringify(parameters))) : baseUrl);
            },
            ParseUrl: function () {
                var res = new Bridge.Navigation.Model.UrlDescriptor();

                var hash = window.location.hash;
                hash = System.String.replaceAll(hash, "#", "");

                if (System.String.isNullOrEmpty(hash)) {
                    return res;
                }

                var equalIndex = System.String.indexOf(hash, String.fromCharCode(61));
                if (equalIndex === -1) {
                    res.PageId = hash;
                    return res;
                }

                res.PageId = hash.substr(0, equalIndex);

                var doublePointsIndx = (equalIndex + 1) | 0;
                var parameters = hash.substr(doublePointsIndx, ((hash.length - doublePointsIndx) | 0));

                if (System.String.isNullOrEmpty(parameters)) {
                    return res;
                } // no parameters

                var decoded = Bridge.global.atob(parameters);
                var deserialized = Bridge.merge(Bridge.createInstance(System.Collections.Generic.Dictionary$2(System.String,System.Object)), JSON.parse(decoded));

                res.Parameters = deserialized;

                return res;
            }
        }
    });

    Bridge.define("Bridge.Navigation.PageDescriptor", {
        inherits: [Bridge.Navigation.IPageDescriptor],
        fields: {
            Key: null,
            HtmlLocation: null,
            PageController: null,
            CanBeDirectLoad: null,
            PreparePage: null,
            SequentialDependenciesScriptLoad: false,
            RedirectRules: null,
            AutoEnableSpafAnchors: null,
            DependenciesScripts: null
        },
        alias: [
            "Key", "Bridge$Navigation$IPageDescriptor$Key",
            "HtmlLocation", "Bridge$Navigation$IPageDescriptor$HtmlLocation",
            "PageController", "Bridge$Navigation$IPageDescriptor$PageController",
            "CanBeDirectLoad", "Bridge$Navigation$IPageDescriptor$CanBeDirectLoad",
            "PreparePage", "Bridge$Navigation$IPageDescriptor$PreparePage",
            "SequentialDependenciesScriptLoad", "Bridge$Navigation$IPageDescriptor$SequentialDependenciesScriptLoad",
            "RedirectRules", "Bridge$Navigation$IPageDescriptor$RedirectRules",
            "AutoEnableSpafAnchors", "Bridge$Navigation$IPageDescriptor$AutoEnableSpafAnchors",
            "DependenciesScripts", "Bridge$Navigation$IPageDescriptor$DependenciesScripts"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                this.AutoEnableSpafAnchors = function () {
                    return true;
                };
            }
        }
    });

    Bridge.define("Bridge.Navigation.QueryParameterNavigationHistory", {
        inherits: [Bridge.Navigation.IBrowserHistoryManager],
        alias: [
            "PushState", "Bridge$Navigation$IBrowserHistoryManager$PushState",
            "ParseUrl", "Bridge$Navigation$IBrowserHistoryManager$ParseUrl"
        ],
        methods: {
            PushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                var baseUrl = Bridge.Navigation.NavigationUtility.BuildBaseUrl(pageId);

                window.history.pushState(null, "", parameters != null ? System.String.format("{0}{1}", baseUrl, this.BuildQueryParameter(parameters)) : baseUrl);
            },
            ParseUrl: function () {
                var $t;
                var res = new Bridge.Navigation.Model.UrlDescriptor();
                res.Parameters = new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor();

                var hash = window.location.hash;
                hash = System.String.replaceAll(hash, "#", "");

                if (System.String.isNullOrEmpty(hash)) {
                    return res;
                }

                var equalIndex = System.String.indexOf(hash, String.fromCharCode(63));
                if (equalIndex === -1) {
                    res.PageId = hash;
                    return res;
                }

                res.PageId = hash.substr(0, equalIndex);

                var doublePointsIndx = (equalIndex + 1) | 0;
                var parameters = hash.substr(doublePointsIndx, ((hash.length - doublePointsIndx) | 0));

                if (System.String.isNullOrEmpty(parameters)) {
                    return res;
                } // no parameters


                var splittedByDoubleAnd = ($t = System.String, System.Linq.Enumerable.from(parameters.split("&"), $t).toList($t));
                splittedByDoubleAnd.ForEach(function (f) {
                    var splitted = f.split("=");
                    res.Parameters.add(splitted[System.Array.index(0, splitted)], decodeURIComponent(splitted[System.Array.index(1, splitted)]));
                });

                return res;
            },
            BuildQueryParameter: function (parameters) {
                var $t;
                if (parameters == null || !System.Linq.Enumerable.from(parameters, System.Collections.Generic.KeyValuePair$2(System.String,System.Object)).any()) {
                    return "";
                }

                var strBuilder = new System.Text.StringBuilder("?");
                $t = Bridge.getEnumerator(parameters);
                try {
                    while ($t.moveNext()) {
                        var keyValuePair = $t.Current;
                        strBuilder.append(encodeURIComponent(keyValuePair.key));
                        strBuilder.append("=");
                        strBuilder.append(encodeURIComponent(Bridge.toString(keyValuePair.value)));
                        strBuilder.append("&");
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                var res = System.String.trimEnd(strBuilder.toString(), [38]);

                return res;

            }
        }
    });

    Bridge.define("Bridge.Spaf.LoadableViewModel", {
        inherits: [Bridge.Spaf.ViewModelBase,Bridge.Navigation.IAmLoadable],
        fields: {
            Partials: null
        },
        alias: [
            "OnLoad", "Bridge$Navigation$IAmLoadable$OnLoad",
            "OnLeave", "Bridge$Navigation$IAmLoadable$OnLeave"
        ],
        ctors: {
            init: function () {
                this.Partials = new (System.Collections.Generic.List$1(Bridge.Spaf.IViewModelLifeCycle)).ctor();
            }
        },
        methods: {
            OnLoad: function (parameters) {
                var $t;
                this.ApplyBindings();
                ($t = this.Partials) != null ? $t.ForEach(function (f) {
                        f.Bridge$Spaf$IViewModelLifeCycle$Init(parameters);
                    }) : null;
            },
            OnLeave: function () {
                var $t;
                ($t = this.Partials) != null ? $t.ForEach(function (f) {
                        f.Bridge$Spaf$IViewModelLifeCycle$DeInit();
                    }) : null;
                this.RemoveBindings();
            }
        }
    });

    Bridge.define("Bridge.Spaf.PartialModel", {
        inherits: [Bridge.Spaf.IViewModelLifeCycle],
        fields: {
            _partialElement: null
        },
        alias: [
            "Init", "Bridge$Spaf$IViewModelLifeCycle$Init",
            "DeInit", "Bridge$Spaf$IViewModelLifeCycle$DeInit"
        ],
        methods: {
            /**
             * Init partial
             *
             * @instance
             * @public
             * @this Bridge.Spaf.PartialModel
             * @memberof Bridge.Spaf.PartialModel
             * @param   {System.Collections.Generic.Dictionary$2}    parameters    data for init the partials
             * @return  {void}
             */
            Init: function (parameters) {

                $.get(this.HtmlUrl, null, Bridge.fn.bind(this, function (o, s, arg3) {
                    var $t;
                    this._partialElement = ($t = document.createElement("div"), $t.innerHTML = Bridge.toString(o), $t);
                    var node = document.getElementById(this.ElementId());
                    node.appendChild(this._partialElement);
                    ko.applyBindings(this, this._partialElement);
                }));
            },
            DeInit: function () {
                // check if ko contains this node
                if (this._partialElement == null) {
                    return;
                }
                var data = ko.dataFor(this._partialElement);
                if (data == null) {
                    return;
                }

                ko.removeNode(this._partialElement);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;

                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        loginResponse = $taskResult1;
                                        this.LoggedUser = loginResponse.User;
                                        this._repository.realworld$spaf$Services$IRepository$SaveToken(loginResponse.User.Token);
                                        this._messenger.Bridge$Messenger$IMessenger$Send(realworld.spaf.Services.impl.UserService, this, Bridge.Spaf.SpafApp.Messages.LoginDone);
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

    Bridge.define("Bridge.Ioc.InstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.InstanceResolver],
        ctors: {
            ctor: function (resolvedObj) {
                this.$initialize();
                Bridge.Ioc.InstanceResolver.ctor.call(this, resolvedObj);

            }
        }
    }; });

    Bridge.define("Bridge.Ioc.SingleInstanceResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.SingleInstanceResolver],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                Bridge.Ioc.SingleInstanceResolver.ctor.call(this, ioc, T);
            }
        }
    }; });

    Bridge.define("Bridge.Ioc.TransientResolver$1", function (T) { return {
        inherits: [Bridge.Ioc.TransientResolver],
        ctors: {
            ctor: function (ioc) {
                this.$initialize();
                Bridge.Ioc.TransientResolver.ctor.call(this, ioc, T);

            }
        }
    }; });

    Bridge.define("Bridge.Navigation.BridgeNavigatorWithRouting", {
        inherits: [Bridge.Navigation.BridgeNavigator],
        fields: {
            _browserHistoryManager: null
        },
        alias: [
            "Navigate", "Bridge$Navigation$INavigator$Navigate",
            "InitNavigation", "Bridge$Navigation$INavigator$InitNavigation"
        ],
        ctors: {
            ctor: function (configuration, browserHistoryManager) {
                this.$initialize();
                Bridge.Navigation.BridgeNavigator.ctor.call(this, configuration);
                this._browserHistoryManager = browserHistoryManager;
                window.onpopstate = Bridge.fn.combine(window.onpopstate, Bridge.fn.bind(this, function (e) {
                    var urlInfo = this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$ParseUrl();
                    this.NavigateWithoutPushState(System.String.isNullOrEmpty(urlInfo.PageId) ? configuration.Bridge$Navigation$INavigatorConfigurator$HomeId : urlInfo.PageId, urlInfo.Parameters);
                }));
            }
        },
        methods: {
            NavigateWithoutPushState: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
            },
            Navigate: function (pageId, parameters) {
                if (parameters === void 0) { parameters = null; }
                this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$PushState(pageId, parameters);
                Bridge.Navigation.BridgeNavigator.prototype.Navigate.call(this, pageId, parameters);
            },
            InitNavigation: function () {
                var parsed = this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$ParseUrl();

                if (System.String.isNullOrEmpty(parsed.PageId)) {
                    Bridge.Navigation.BridgeNavigator.prototype.InitNavigation.call(this);
                } else {
                    this.EnableSpafAnchors();

                    var page = this.Configuration.Bridge$Navigation$INavigatorConfigurator$GetPageDescriptorByKey(parsed.PageId);
                    if (page == null) {
                        throw new System.Exception(System.String.format("Page not found with ID {0}", [parsed.PageId]));
                    }

                    // if not null and evaluation is false fallback to home
                    if (!Bridge.staticEquals(page.Bridge$Navigation$IPageDescriptor$CanBeDirectLoad, null) && !page.Bridge$Navigation$IPageDescriptor$CanBeDirectLoad()) {
                        this._browserHistoryManager.Bridge$Navigation$IBrowserHistoryManager$PushState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId, void 0);
                        this.NavigateWithoutPushState(this.Configuration.Bridge$Navigation$INavigatorConfigurator$HomeId);
                    } else {
                        this.Navigate(parsed.PageId, parsed.Parameters);
                    }
                }
            }
        }
    });

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
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                    $t2, 
                    article, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        // todo validations
                                        newArticel = ($t = new realworld.spaf.Models.Request.NewArticleRequest(), $t.Article = ($t1 = new realworld.spaf.Models.NewArticle(), $t1.Title = this.Title(), $t1.Body = this.Body(), $t1.Description = this.Description(), $t1.TagList = ($t2 = System.String, System.Linq.Enumerable.from(System.String.split(this.Tags(), [44].map(function (i) {{ return String.fromCharCode(i); }})), $t2).ToArray($t2)), $t1), $t);

                                        $task1 = this._articleResources.realworld$spaf$Services$IArticleResources$Create(newArticel);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        article = $taskResult1;
                                        this._navigator.Bridge$Navigation$INavigator$Navigate(Bridge.Spaf.SpafApp.ArticleId, function (_o1) {
                                            _o1.add("slug", article.Article.Slug);
                                            return _o1;
                                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
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
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
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
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
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
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        System.Linq.Enumerable.from(this.Pages(), realworld.spaf.Models.Paginator).single(function (s) {
                                            return s.Active();
                                        }).Active(false);
                                        paginator.Active(true);

                                        request = realworld.spaf.Services.impl.ArticleRequestBuilder.Default().WithOffSet(Bridge.Int.mul((((paginator.Page - 1) | 0)), this._settings.realworld$spaf$Services$ISettings$ArticleInPage)).WithLimit(this._settings.realworld$spaf$Services$ISettings$ArticleInPage);

                                        if (!System.String.isNullOrEmpty(this._tagFilter)) {
                                            request = request.WithTag(this._tagFilter);
                                        }

                                        $task1 = this.LoadArticles(request);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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

                if (!System.Linq.Enumerable.from(articleResoResponse.Articles, realworld.spaf.Models.Article).any()) {
                    return;
                } // no articles

                var pagesCount = System.Int64.clip32(articleResoResponse.ArticlesCount.div(System.Int64(articleResoResponse.Articles.length)));
                var range = System.Linq.Enumerable.range(1, pagesCount);
                var pages = range.select(function (s) {
                    var $t;
                    return ($t = new realworld.spaf.Models.Paginator(), $t.Page = s, $t);
                }).ToArray(realworld.spaf.Models.Paginator);
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
                    var $t;
                    this.IsBusy(false);

                    if (c.isFaulted()) {
                        var firstException = System.Linq.Enumerable.from(c.getException().innerExceptions, System.Exception).first();

                        if (Bridge.is(firstException, Bridge.PromiseException)) {
                            var e = Bridge.cast(System.Linq.Enumerable.from(c.getException().innerExceptions, System.Exception).first(), Bridge.PromiseException);
                            var errors = realworld.spaf.Classes.Extensions.GetValidationErrors(e);
                            this.Errors.push.apply(this.Errors, ($t = System.String, System.Linq.Enumerable.from(errors, $t).ToArray($t)));
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
                                    } catch ($e1) {
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
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
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
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
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
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
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
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
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
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
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
                    }(new (System.Collections.Generic.Dictionary$2(System.String,System.Object)).ctor()));
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                    $t, 
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        this.Errors.push.apply(this.Errors, ($t = System.String, System.Linq.Enumerable.from(errors, $t).ToArray($t)));
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
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
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
                                        this.Errors.push.apply(this.Errors, ($t = System.String, System.Linq.Enumerable.from(errors, $t).ToArray($t)));
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJyZWFsd29ybGQuc3BhZi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiU3BhZi9OYXZpZ2F0aW9uL05hdmlnYXRpb25VdGlsaXR5LmNzIiwiU3BhZi9OYXZpZ2F0aW9uL1V0aWxpdHkuY3MiLCJTcGFmL1ZpZXdNb2RlbEJhc2UuY3MiLCJTcGFmQXBwLmNzIiwiQ2xhc3Nlcy9FeHRlbnNpb25zLmNzIiwiQ2xhc3Nlcy9GZWVkUmVxdWVzdEJ1aWxkZXIuY3MiLCJNb2RlbHMvQXJ0aWNsZS5jcyIsIk1vZGVscy9Db21tZW50LmNzIiwiTW9kZWxzL1BhZ2luYXRvci5jcyIsIkNsYXNzZXMvQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLmNzIiwiU2VydmljZXMvaW1wbC9SZXNvdXJjZUJhc2UuY3MiLCJWaWV3TW9kZWxzL01haW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1Byb2ZpbGVWaWV3TW9kZWwuY3MiLCJTcGFmL0lvYy9CcmlkZ2VJb2MuY3MiLCJTcGFmL0lvYy9SZXNvbHZlcnMvRnVuY1Jlc29sdmVyLmNzIiwiU3BhZi9Jb2MvUmVzb2x2ZXJzL0luc3RhbmNlUmVzb2x2ZXIuY3MiLCJTcGFmL0lvYy9SZXNvbHZlcnMvU2luZ2xlSW5zdGFuY2VSZXNvbHZlci5jcyIsIlNwYWYvSW9jL1Jlc29sdmVycy9UcmFuc2llbnRSZXNvbHZlci5jcyIsIlNwYWYvTWVzc2VuZ2VyL01lc3Nlbmdlci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL0JyaWRnZU5hdmlnYXRvci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL0JyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UuY3MiLCJTcGFmL05hdmlnYXRpb24vSW1wbC9Db21wbGV4T2JqZWN0TmF2aWdhdGlvbkhpc3RvcnkuY3MiLCJTcGFmL05hdmlnYXRpb24vSW1wbC9QYWdlRGVzY3JpcHRvci5jcyIsIlNwYWYvTmF2aWdhdGlvbi9JbXBsL1F1ZXJ5UGFyYW1ldGVyTmF2aWdhdGlvbkhpc3RvcnkuY3MiLCJTcGFmL0xvYWRhYmxlVmlld01vZGVsLmNzIiwiU3BhZi9QYXJ0aWFsTW9kZWwuY3MiLCJTZXJ2aWNlcy9pbXBsL0F1dGhvcml6ZWRSZXNvdXJjZUJhc2UuY3MiLCJTZXJ2aWNlcy9pbXBsL0xvY2FsU3RvcmFnZVJlcG9zaXRvcnkuY3MiLCJTZXJ2aWNlcy9pbXBsL1VzZXJSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1VzZXJTZXJ2aWNlLmNzIiwiU3BhZi9OYXZpZ2F0aW9uL0ltcGwvQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcuY3MiLCJDdXN0b21Sb3V0ZXNDb25maWcuY3MiLCJTZXJ2aWNlcy9pbXBsL0FydGljbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL0ZlZWRSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1Byb2ZpbGVSZXNvdXJjZXMuY3MiLCJTZXJ2aWNlcy9pbXBsL1NldHRpbmdzUmVzb3VyY2VzLmNzIiwiVmlld01vZGVscy9BcnRpY2xlVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9FZGl0QXJ0aWNsZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvSG9tZVZpZXdNb2RlbC5jcyIsIlZpZXdNb2RlbHMvTG9naW5WaWV3TW9kZWwuY3MiLCJWaWV3TW9kZWxzL1JlZ2lzdGVyVmlld01vZGVsLmNzIiwiVmlld01vZGVscy9TZXR0aW5nc1ZpZXdNb2RlbC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBWWdEQTs7Ozs7Ozs7Ozs7Ozs7O3dDQVVYQSxHQUFHQSxZQUE0Q0E7b0JBRXhFQSxJQUFJQSxjQUFjQTt3QkFDZEEsTUFBTUEsSUFBSUE7OztvQkFFZEEsSUFBSUEsQ0FBQ0EsdUJBQXVCQTt3QkFDeEJBLE1BQU1BLElBQUlBLGlCQUFVQSwwREFBaURBOzs7b0JBRXpFQSxZQUFZQSxtQkFBV0E7O29CQUV2QkEsa0JBQWtC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Ozs7O3dDQUt6QkEsU0FBYUE7d0NBQ2JBLG9DQUFpQkEsTUFBK0JBLDJDQUFRQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBOYXZpZ2F0aW9uVXRpbGl0eVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRGVmaW5lIHZpcnR1YWwgZGlyZWN0b3J5IGZvciBzb21ldGhpbmcgbGlrZTpcbiAgICAgICAgLy8vIHByb3RvY29sOi8vYXdlc29tZXNpdGUuaW8vc29tZWRpcmVjdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBWaXJ0dWFsRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgcGFyYW1ldGVyIGtleSBmcm9tIHBhcmFtZXRlcnMgZGljdGlvbmFyeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbWV0ZXJzXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1LZXlcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgR2V0UGFyYW1ldGVyPFQ+KHRoaXMgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycywgc3RyaW5nIHBhcmFtS2V5KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJQYXJhbWV0ZXJzIGlzIG51bGwhXCIpO1xuXG4gICAgICAgICAgICBpZiAoIXBhcmFtZXRlcnMuQ29udGFpbnNLZXkocGFyYW1LZXkpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIk5vIHBhcmFtZXRlciB3aXRoIGtleSB7MH0gZm91bmQhXCIscGFyYW1LZXkpKTtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFyYW1ldGVyc1twYXJhbUtleV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwYXJzZU1ldGhvZCA9IHR5cGVvZihUKS5HZXRNZXRob2QoXCJQYXJzZVwiLCBuZXcgVHlwZVtdIHsgdHlwZW9mKHN0cmluZykgfSApO1xuXG4gICAgICAgICAgICBpZiAocGFyc2VNZXRob2QgIT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFQpcGFyc2VNZXRob2QuSW52b2tlKG51bGwsIG5ldyBvYmplY3RbXSB7IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFQpIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBCdWlsZCBiYXNlIHVybCB1c2luZyBwYWdlIGlkIGFuZCB2aXJ0dWFsIGRpcmVjdG9yeVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYWdlSWRcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBCdWlsZEJhc2VVcmwoc3RyaW5nIHBhZ2VJZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9Ly97MX1cIixXaW5kb3cuTG9jYXRpb24uUHJvdG9jb2wsV2luZG93LkxvY2F0aW9uLkhvc3QpO1xuICAgICAgICAgICAgYmFzZVVybCA9IHN0cmluZy5Jc051bGxPckVtcHR5KFZpcnR1YWxEaXJlY3RvcnkpXG4gICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9I3sxfVwiLGJhc2VVcmwscGFnZUlkKSAgICAgICAgICAgICAgICA6IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9I3syfVwiLGJhc2VVcmwsVmlydHVhbERpcmVjdG9yeSxwYWdlSWQpO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgVXRpbGl0eVxuICAgIHtcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBzY3JpcHQgc2VxdWVudGlhbGx5XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNjcmlwdHNcIj48L3BhcmFtPlxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2VxdWVudGlhbFNjcmlwdExvYWQoTGlzdDxzdHJpbmc+IHNjcmlwdHMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8c3RyaW5nPihzY3JpcHRzKSkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHRvTG9hZCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8c3RyaW5nPihzY3JpcHRzKTtcbiAgICAgICAgICAgIGpRdWVyeS5HZXRTY3JpcHQodG9Mb2FkLCAoU3lzdGVtLkFjdGlvbjxvYmplY3Qsc3RyaW5nLGpxWEhSPikoKG8sIHMsIGFyZzMpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2NyaXB0cy5SZW1vdmUodG9Mb2FkKTtcbiAgICAgICAgICAgICAgICBTZXF1ZW50aWFsU2NyaXB0TG9hZChzY3JpcHRzKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVmlld01vZGVsQmFzZVxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBkb20uSFRNTEVsZW1lbnQgX3BhZ2VOb2RlO1xuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEVsZW1lbnQgaWQgb2YgdGhlIHBhZ2UgXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgRWxlbWVudElkKCk7XG5wdWJsaWMgZG9tLkhUTUxFbGVtZW50IFBhZ2VOb2RlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfcGFnZU5vZGUgPz8gKHRoaXMuX3BhZ2VOb2RlID0gZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEVsZW1lbnRJZCgpKSk7XHJcbiAgICB9XHJcbn1cbiAgICAgICAgcHVibGljIHZvaWQgQXBwbHlCaW5kaW5ncygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtub2Nrb3V0LmtvLmFwcGx5QmluZGluZ3ModGhpcywgdGhpcy5QYWdlTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVCaW5kaW5ncygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtub2Nrb3V0LmtvLnJlbW92ZU5vZGUodGhpcy5QYWdlTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCcmlkZ2UuSW9jO1xyXG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgQnJpZGdlLlNwYWYuQXR0cmlidXRlcztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHM7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNwYWZBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIElJb2MgQ29udGFpbmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAjaWYgVEVTVFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICNlbmRpZlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgI2lmICFERUJVR1xyXG4gICAgICAgICAgICBOYXZpZ2F0aW9uVXRpbGl0eS5WaXJ0dWFsRGlyZWN0b3J5ID0gXCJyZWFsd29ybGQuc3BhZlwiOyAvLyAgdmlydHVhbCBkaXIgZm9yIHJlbGVhc2UgZW52aXJvbm1lbnRcclxuICAgICAgICAgICAgI2VuZGlmXHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIgPSBuZXcgQnJpZGdlSW9jKCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lckNvbmZpZygpOyAvLyBjb25maWcgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciBtYWluVm0gPSBDb250YWluZXIuUmVzb2x2ZTxNYWluVmlld01vZGVsPigpO1xyXG4gICAgICAgICAgICBhd2FpdCBtYWluVm0uU3RhcnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZXNvbHZlPElOYXZpZ2F0b3I+KCkuSW5pdE5hdmlnYXRpb24oKTsgLy8gaW5pdCBuYXZpZ2F0aW9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIENvbnRhaW5lckNvbmZpZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBuYXZpZ2F0b3JcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8SU5hdmlnYXRvciwgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmc+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElCcm93c2VySGlzdG9yeU1hbmFnZXIsIFF1ZXJ5UGFyYW1ldGVyTmF2aWdhdGlvbkhpc3Rvcnk+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJTmF2aWdhdG9yQ29uZmlndXJhdG9yLCBDdXN0b21Sb3V0ZXNDb25maWc+KCk7IFxyXG5cclxuICAgICAgICAgICAgLy8gbWVzc2VuZ2VyXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElNZXNzZW5nZXIsIE1lc3Nlbmdlci5NZXNzZW5nZXI+KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2aWV3bW9kZWxzXHJcbiAgICAgICAgICAgIFJlZ2lzdGVyQWxsVmlld01vZGVscygpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgY3VzdG9tIHJlc291cmNlLCBzZXJ2aWNlcy4uXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElTZXR0aW5ncywgU2V0dGluZ3M+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlclNpbmdsZUluc3RhbmNlPElVc2VyU2VydmljZSwgVXNlclNlcnZpY2U+KCk7XHJcblxyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SUFydGljbGVSZXNvdXJjZXMsQXJ0aWNsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyPElVc2VyUmVzb3VyY2VzLFVzZXJSZXNvdXJjZXM+KCk7XHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJRmVlZFJlc291cmNlcyxGZWVkUmVzb3VyY2VzPigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVByb2ZpbGVSZXNvdXJjZXMsUHJvZmlsZVJlc291cmNlcz4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5SZWdpc3RlcjxJUmVwb3NpdG9yeSxMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5PigpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuUmVnaXN0ZXI8SVNldHRpbmdzUmVzb3VyY2VzLFNldHRpbmdzUmVzb3VyY2VzPigpO1xyXG5cclxuICAgICAgICB9XHJcbiNyZWdpb24gUEFHRVMgSURTXHJcbi8vIHN0YXRpYyBwYWdlcyBpZFxyXG5wdWJsaWMgc3RhdGljIHN0cmluZyBIb21lSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiaG9tZVwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgTG9naW5JZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJsb2dpblwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgUmVnaXN0ZXJJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJyZWdpc3RlclwiO1xyXG4gICAgfVxyXG59cHVibGljIHN0YXRpYyBzdHJpbmcgUHJvZmlsZUlkXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcInByb2ZpbGVcIjtcclxuICAgIH1cclxufXB1YmxpYyBzdGF0aWMgc3RyaW5nIFNldHRpbmdzSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwic2V0dGluZ3NcIjtcclxuICAgIH1cclxufXB1YmxpYyBzdGF0aWMgc3RyaW5nIEVkaXRBcnRpY2xlSWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiZWRpdEFydGljbGVcIjtcclxuICAgIH1cclxufXB1YmxpYyBzdGF0aWMgc3RyaW5nIEFydGljbGVJZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJhcnRpY2xlXCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gTUVTU0FHRVNcclxuICAgICAgICAvLyBtZXNzZW5nZXIgaGVscGVyIGZvciBnbG9iYWwgbWVzc2FnZXMgYW5kIG1lc3NhZ2VzIGlkc1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE1lc3NhZ2VzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgR2xvYmFsU2VuZGVyIHsgfTtcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0aWMgR2xvYmFsU2VuZGVyIFNlbmRlciA9IG5ldyBHbG9iYWxTZW5kZXIoKTtcclxucHVibGljIHN0YXRpYyBzdHJpbmcgTG9naW5Eb25lXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkxvZ2luRG9uZVwiO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlZ2lzdGVyIGFsbCB0eXBlcyB0aGF0IGVuZCB3aXRoIFwidmlld21vZGVsXCIuXHJcbiAgICAgICAgLy8vIFlvdSBjYW4gcmVnaXN0ZXIgYSB2aWV3bW9kZSBhcyBTaW5nbHIgSW5zdGFuY2UgYWRkaW5nIFwiU2luZ2xlSW5zdGFuY2VBdHRyaWJ1dGVcIiB0byB0aGUgY2xhc3NcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVnaXN0ZXJBbGxWaWV3TW9kZWxzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0TWFueTxBc3NlbWJseSxUeXBlPihBcHBEb21haW4uQ3VycmVudERvbWFpbi5HZXRBc3NlbWJsaWVzKCksKEZ1bmM8QXNzZW1ibHksU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8VHlwZT4+KShzID0+IHMuR2V0VHlwZXMoKSkpXHJcbiAgICAgICAgICAgICAgICAuV2hlcmUoKEZ1bmM8VHlwZSxib29sPikodyA9PiB3Lk5hbWUuVG9Mb3dlcigpLkVuZHNXaXRoKFwidmlld21vZGVsXCIpKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICB0eXBlcy5Gb3JFYWNoKChBY3Rpb248VHlwZT4pKGYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBmLkdldEN1c3RvbUF0dHJpYnV0ZXModHlwZW9mKFNpbmdsZUluc3RhbmNlQXR0cmlidXRlKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PG9iamVjdD4oYXR0cmlidXRlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UoZik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGFpbmVyLlJlZ2lzdGVyKGYpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLkNsYXNzZXNcbntcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEV4dGVuc2lvbnNcbiAgICB7XG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIERlc2VyaWFsaXplIHJlYWx3b3JsZCBwcm9taXNlIGV4Y2VwdGlvbiB0byBnZXQgZXJyb3JzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRGljdGlvbmFyeTxzdHJpbmcsc3RyaW5nW10+IEdldFZhbGlkYXRpb25FcnJvclJlc3BvbnNlKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSAoRXJyb3JSZXNwb25zZSlKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxFcnJvclJlc3BvbnNlPihleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLkVycm9ycztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEdldCByZWFkYWJsZSBlcnJvciBsaXN0XG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSUVudW1lcmFibGU8c3RyaW5nPiBHZXRWYWxpZGF0aW9uRXJyb3JzKHRoaXMgUHJvbWlzZUV4Y2VwdGlvbiBleGNlcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBleGNlcHRpb24uR2V0VmFsaWRhdGlvbkVycm9yUmVzcG9uc2UoKTtcblxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGVycm9yIGluIGVycm9ycylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZXJyb3JEZXNjcmlwdGlvbiBpbiBlcnJvci5WYWx1ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiezB9IHsxfVwiLGVycm9yLktleSxlcnJvckRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZXQgZXJyb3IgZm9yIGh0bWxlcnJvcmNvZGVcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXJyb3JDb2RlXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgR2V0RXJyb3JGb3JDb2RlKGludCBlcnJvckNvZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyb3JDb2RlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJVbmF1dGhvcml6ZWRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRm9yYmlkZGVuXCI7XG4gICAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5vdCBGb3VuZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgNDIyOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJWYWxpZGF0aW9uIEVycm9yXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiR2VuZXJpYyBFcnJvclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2V0IGVycm9yIGNvZGUgZm9yIHByb21pc2UgZXhjZXB0aW9uXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImV4Y2VwdGlvblwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEVycm9yQ29kZSh0aGlzIFByb21pc2VFeGNlcHRpb24gZXhjZXB0aW9uKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyb3JDb2RlID0gKGludClleGNlcHRpb24uQXJndW1lbnRzWzBdLlRvRHluYW1pYygpLnN0YXR1cztcbiAgICAgICAgICAgIHJldHVybiBlcnJvckNvZGU7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRleHQ7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5DbGFzc2VzXG57XG4gICAgcHVibGljIGNsYXNzIEZlZWRSZXF1ZXN0QnVpbGRlclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX29mZnNldDtcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2xpbWl0O1xuXG5cbiAgICAgICAgcHJpdmF0ZSBGZWVkUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IDIwO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRmVlZFJlcXVlc3RCdWlsZGVyIERlZmF1bHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZlZWRSZXF1ZXN0QnVpbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoT2ZmU2V0KGludCBvZmZzZXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEZlZWRSZXF1ZXN0QnVpbGRlciBXaXRoTGltaXQoaW50IGxpbWl0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnVpbGQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiYXJ0aWNsZXMvZmVlZFwiKTtcblxuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIj9saW1pdD17MH1cIix0aGlzLl9saW1pdCkpO1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5BcHBlbmQoc3RyaW5nLkZvcm1hdChcIiYmb2Zmc2V0PXswfVwiLHRoaXMuX29mZnNldCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuTW9kZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFydGljbGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5BdXRob3IgPSBuZXcgQXV0aG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ0aXRsZVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRpdGxlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcInNsdWdcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTbHVnIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImJvZHlcIildXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImNyZWF0ZWRBdFwiKV1cclxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWU/IENyZWF0ZWRBdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJ1cGRhdGVkQXRcIildXHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lPyBVcGRhdGVkQXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBbSnNvblByb3BlcnR5KFwidGFnTGlzdFwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nW10gVGFnTGlzdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJkZXNjcmlwdGlvblwiKV1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlc2NyaXB0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImF1dGhvclwiKV1cclxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIFtKc29uUHJvcGVydHkoXCJmYXZvcml0ZWRcIildXHJcbiAgICAgICAgcHVibGljIGJvb2wgRmF2b3JpdGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgW0pzb25Qcm9wZXJ0eShcImZhdm9yaXRlc0NvdW50XCIpXVxyXG4gICAgICAgIHB1YmxpYyBsb25nIEZhdm9yaXRlc0NvdW50IHsgZ2V0OyBzZXQ7IH1cclxucHVibGljIHN0cmluZyBDcmVhdGVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsdGhpcy5DcmVhdGVkQXQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxEYXRlVGltZT4oXCJrZXkxXCIpLlRvU3RyaW5nKFwiTU1NTSBkZFwiKTooc3RyaW5nKW51bGw7XHJcbiAgICB9XHJcbn0gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xue1xuICAgIHB1YmxpYyBjbGFzcyBDb21tZW50XG4gICAge1xuICAgICAgICBwdWJsaWMgQ29tbWVudCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQXV0aG9yID0gbmV3IEF1dGhvcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBbSnNvblByb3BlcnR5KFwiaWRcIildXG4gICAgICAgIHB1YmxpYyBsb25nIElkIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiY3JlYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgQ3JlYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwidXBkYXRlZEF0XCIpXVxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgVXBkYXRlZEF0IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYm9keVwiKV1cbiAgICAgICAgcHVibGljIHN0cmluZyBCb2R5IHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBbSnNvblByb3BlcnR5KFwiYXV0aG9yXCIpXVxuICAgICAgICBwdWJsaWMgQXV0aG9yIEF1dGhvciB7IGdldDsgc2V0OyB9XG5wdWJsaWMgc3RyaW5nIENyZWF0ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DcmVhdGVkQXQuVG9TdHJpbmcoXCJNTU1NIGRkXCIpO1xyXG4gICAgfVxyXG59XG4gICAgfVxufSIsIlxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLk1vZGVsc1xue1xuICAgIHB1YmxpYyBjbGFzcyBQYWdpbmF0b3JcbiAgICB7XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5BY3RpdmUgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgaW50IFBhZ2UgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBQYWdpbmF0b3IoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFjdGl2ZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uVGV4dDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBwdWJsaWMgY2xhc3MgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0cmluZyBfdGFnO1xuICAgICAgICBwcml2YXRlIHN0cmluZyBfYXV0aG9yO1xuICAgICAgICBwcml2YXRlIGludCBfb2Zmc2V0O1xuICAgICAgICBwcml2YXRlIGludCBfbGltaXQ7XG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF91c2VyO1xuXG5cbiAgICAgICAgcHJpdmF0ZSBBcnRpY2xlUmVxdWVzdEJ1aWxkZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IDIwO1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIERlZmF1bHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFydGljbGVSZXF1ZXN0QnVpbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBXaXRoT2ZmU2V0KGludCBvZmZzZXQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBXaXRoTGltaXQoaW50IGxpbWl0KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIE9mQXV0aG9yKHN0cmluZyBhdXRob3IpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2F1dGhvciA9IGF1dGhvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEFydGljbGVSZXF1ZXN0QnVpbGRlciBXaXRoVGFnKHN0cmluZyB0YWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIE9mRmF2b3JpdGUoc3RyaW5nIHVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXIgPSB1c2VyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQnVpbGQoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgc3RyaW5nQnVpbGRlciA9IG5ldyBTdHJpbmdCdWlsZGVyKFwiYXJ0aWNsZXNcIik7XG5cbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCI/bGltaXQ9ezB9XCIsdGhpcy5fbGltaXQpKTtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJm9mZnNldD17MH1cIix0aGlzLl9vZmZzZXQpKTtcblxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl90YWcpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJnRhZz17MH1cIix0aGlzLl90YWcpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl9hdXRob3IpKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIuQXBwZW5kKHN0cmluZy5Gb3JtYXQoXCImJmF1dGhvcj17MH1cIix0aGlzLl9hdXRob3IpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JFbXB0eSh0aGlzLl91c2VyKSlcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLkFwcGVuZChzdHJpbmcuRm9ybWF0KFwiJiZmYXZvcml0ZWQ9ezB9XCIsdGhpcy5fdXNlcikpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgUmVzb3VyY2VCYXNlXG4gICAge1xuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBHZW5lcmljIEF3YWl0YWJsZSBhamF4IGNhbGxcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3B0aW9uc1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+PC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIFRhc2s8VD4gTWFrZUNhbGw8VD4oQWpheE9wdGlvbnMgb3B0aW9ucykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBUYXNrLkZyb21Qcm9taXNlPFQ+KGpRdWVyeS5BamF4KG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLCAoRnVuYzxvYmplY3QsIHN0cmluZywganFYSFIsIFQ+KSAoKHJlc09iaiwgc3VjY2VzcywganFYaHIpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04uU3RyaW5naWZ5KHJlc09iaik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxUPihqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XG51c2luZyBCcmlkZ2UuU3BhZjtcbnVzaW5nIEJyaWRnZS5TcGFmLkF0dHJpYnV0ZXM7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgW1NpbmdsZUluc3RhbmNlXVxuICAgIHB1YmxpYyBjbGFzcyBNYWluVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkFjdHVhbFBhZ2VJZCB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIE1haW5WaWV3TW9kZWwoSU1lc3NlbmdlciBtZXNzZW5nZXIsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSxJTmF2aWdhdG9yIG5hdmlnYXRvcilcbiAgICAgICAge1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5BY3R1YWxQYWdlSWQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc3Vic2NyaWJlIHRvIGxvZ2luZG9uZSBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoQWN0aW9uPFVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0xvZ2dlZC5TZWxmKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgbmF2aWdhdG9yLk9uTmF2aWdhdGVkICs9IChzZW5kZXIsIGxvYWRhYmxlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB2bSA9IChMb2FkYWJsZVZpZXdNb2RlbCkgbG9hZGFibGU7XG4gICAgICAgICAgICAgICAgdGhpcy5BY3R1YWxQYWdlSWQuU2VsZih2bS5FbGVtZW50SWQoKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gQXBwbHkgYmluZGluZyB0byBtYWlubW9kZWxcbiAgICAgICAgLy8vIHRyeSBhdXRvIGxvZ2luXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFN0YXJ0KClcbiAgICAgICAge1xuICAgICAgICAgICAgUmV0eXBlZC5rbm9ja291dC5rby5hcHBseUJpbmRpbmdzKHRoaXMpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuVHJ5QXV0b0xvZ2luV2l0aFN0b3JlZFRva2VuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgIFxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5NZXNzZW5nZXI7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgY2xhc3MgUHJvZmlsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5Qcm9maWxlSWQ7XHJcbn1cbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUHJvZmlsZVJlc291cmNlcyBfcHJvZmlsZVJlc291cmNlO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcblxuICAgICAgICBwdWJsaWMgUHJvZmlsZU1vZGVsIFByb2ZpbGVNb2RlbCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8aW50PkFjdGl2ZVRhYkluZGV4OyAvLyB0YWIgYWN0aXZlIGluZGV4XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0xvZ2dlZCB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICBwdWJsaWMgUHJvZmlsZVZpZXdNb2RlbChJUHJvZmlsZVJlc291cmNlcyBwcm9maWxlUmVzb3VyY2UsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgXG4gICAgICAgICAgICBJQXJ0aWNsZVJlc291cmNlcyBhcnRpY2xlUmVzb3VyY2VzLCBJTmF2aWdhdG9yIG5hdmlnYXRvciwgSU1lc3NlbmdlciBtZXNzZW5nZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsID0gbmV3IFByb2ZpbGVNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZmlsZVJlc291cmNlID0gcHJvZmlsZVJlc291cmNlO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX21lc3NlbmdlciA9IG1lc3NlbmdlcjtcblxuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGludD4oMCk7XG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuU3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lLCAoQWN0aW9uPFVzZXJTZXJ2aWNlPikoc2VydmljZSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuSXNMb2dnZWQuU2VsZih0cnVlKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25Mb2FkKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gc3RyaW5nLkVtcHR5O1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSBwYXJhbWV0ZXJzLkdldFBhcmFtZXRlcjxzdHJpbmc+KFwidXNlcm5hbWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk5vIHVzZXJuYW1lIHBhc3NlZCBhbmQgeW91IGFyZSBub3QgbG9nZ2VkIVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9IHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXIuVXNlcm5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB1c2VyVGFzayA9IHRoaXMuTG9hZFVzZXIodXNlcm5hbWUpO1xuICAgICAgICAgICAgdmFyIGFydGljbGVUYXNrID0gdGhpcy5Mb2FkQXJ0aWNsZXModXNlcm5hbWUpO1xuICAgICAgICAgICAgdmFyIGZhdm91cml0ZVRhc2sgPSB0aGlzLkxvYWRGYXZvdXJpdGVzQXJ0aWNsZXModXNlcm5hbWUpO1xuXG4gICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGwodXNlclRhc2ssIGFydGljbGVUYXNrLCBmYXZvdXJpdGVUYXNrKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dBcnRpY2xlcygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgT25MZWF2ZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJhc2UuT25MZWF2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlVuc3Vic2NyaWJlPFVzZXJTZXJ2aWNlPih0aGlzLCBTcGFmQXBwLkxvZ2luSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFkZCBwYXNzZWQgYXJ0aWNsZSB0byBmYXZcbiAgICAgICAgLy8vIE9ubHkgZm9yIGF1dGggdXNlcnNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJ0aWNsZVwiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZFRvRmF2b3VyaXRlKEFydGljbGUgYXJ0aWNsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCF0aGlzLklzTG9nZ2VkLlNlbGYoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgc2luZ2xlQXJ0aWNsZSA9IGFydGljbGUuRmF2b3JpdGVkID8gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5VbkZhdm9yaXRlKGFydGljbGUuU2x1ZykgOiBcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkZhdm9yaXRlKGFydGljbGUuU2x1Zyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLkFydGljbGVzLnJlcGxhY2UoYXJ0aWNsZSxzaW5nbGVBcnRpY2xlLkFydGljbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRm9sbG93IC8gdW5mb2xsb3dcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRm9sbG93KClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gdGhpcy5Qcm9maWxlTW9kZWwuVXNlcm5hbWUuU2VsZigpO1xuICAgICAgICAgICAgdmFyIGZvbGxvdyA9IHRoaXMuUHJvZmlsZU1vZGVsLkZvbGxvd2luZy5TZWxmKCkgPyBhd2FpdCB0aGlzLl9wcm9maWxlUmVzb3VyY2UuVW5Gb2xsb3codXNlcm5hbWUpIFxuICAgICAgICAgICAgICAgIDogYXdhaXQgdGhpcy5fcHJvZmlsZVJlc291cmNlLkZvbGxvdyh1c2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5Gb2xsb3dpbmcuU2VsZihmb2xsb3cuUHJvZmlsZS5Gb2xsb3dpbmcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byB1c2VyIGRldGFpbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgR29Ub1VzZXIoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQsIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpLChfbzEpPT57X28xLkFkZChcInVzZXJuYW1lXCIsYXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO3JldHVybiBfbzE7fSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBOYXZpZ2F0ZSB0byBhcnRpY2xlIGRldGFpbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgR29Ub0FydGljbGUoQXJ0aWNsZSBhcnRpY2xlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuU2x1Zyk7cmV0dXJuIF9vMTt9KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU2hvdyB1c2VyIGFydGljbGVzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dBcnRpY2xlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigwKTtcbiAgICAgICAgICAgIHRoaXMuUHJvZmlsZU1vZGVsLlNob3dBcnRpY2xlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU2hvdyBmYXZzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIHB1YmxpYyB2b2lkIFNob3dGYXZvdXJpdGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BY3RpdmVUYWJJbmRleC5TZWxmKDEpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuU2hvd0Zhdm91cml0ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgdXNlciBkYXRhXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInVzZXJuYW1lXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRVc2VyKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHByb2ZpbGVSZXNwb25zZSA9IGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZS5HZXQodXNlcm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuTWFwTWUocHJvZmlsZVJlc3BvbnNlLlByb2ZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZEFydGljbGVzKHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlcyhBcnRpY2xlUmVxdWVzdEJ1aWxkZXIuRGVmYXVsdCgpLldpdGhMaW1pdCg1KVxuICAgICAgICAgICAgICAgIC5PZkF1dGhvcih1c2VybmFtZSkpO1xuXG4gICAgICAgICAgICB0aGlzLlByb2ZpbGVNb2RlbC5Vc2VyQXJ0aWNsZXMgPSBhcnRpY2xlcy5BcnRpY2xlcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gTG9hZCBBcnRpY2xlcyBGYXZvcml0ZXNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRGYXZvdXJpdGVzQXJ0aWNsZXMoc3RyaW5nIHVzZXJuYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZXMgPSBhd2FpdCB0aGlzLl9hcnRpY2xlUmVzb3VyY2VzLkdldEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KDUpXG4gICAgICAgICAgICAgICAgLk9mRmF2b3JpdGUodXNlcm5hbWUpKTtcblxuICAgICAgICAgICAgdGhpcy5Qcm9maWxlTW9kZWwuRmF2b3VydGl0ZXMgPSBhcnRpY2xlcy5BcnRpY2xlcztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIGNsYXNzIFByb2ZpbGVNb2RlbFxuICAgIHtcbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+SW1hZ2UgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Vc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkJpbyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Gb2xsb3dpbmcgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxBcnRpY2xlPkFydGljbGVzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgSUVudW1lcmFibGU8QXJ0aWNsZT4gVXNlckFydGljbGVzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIElFbnVtZXJhYmxlPEFydGljbGU+IEZhdm91cnRpdGVzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUHJvZmlsZU1vZGVsKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5JbWFnZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkJpbyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRm9sbG93aW5nID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4oKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPEFydGljbGU+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBNYXBNZSAoUHJvZmlsZSBwcm9maWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkltYWdlLlNlbGYocHJvZmlsZS5JbWFnZSk7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lLlNlbGYocHJvZmlsZS5Vc2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLkJpby5TZWxmKHByb2ZpbGUuQmlvKTtcbiAgICAgICAgICAgIHRoaXMuRm9sbG93aW5nLlNlbGYocHJvZmlsZS5Gb2xsb3dpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0FydGljbGVzKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8QXJ0aWNsZT4odGhpcy5Vc2VyQXJ0aWNsZXMpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0Zhdm91cml0ZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkFydGljbGVzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy5BcnRpY2xlcy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxBcnRpY2xlPih0aGlzLkZhdm91cnRpdGVzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcblxubmFtZXNwYWNlIEJyaWRnZS5Jb2NcbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIEltcGxlbWVudGF0aW9uIG9mIElJb2NcbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VJb2MgOiBJSW9jXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IERpY3Rpb25hcnk8VHlwZSwgSVJlc29sdmVyPiBfcmVzb2x2ZXJzID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgSVJlc29sdmVyPigpO1xuXG4gICAgICAgICNyZWdpb24gUkVHSVNUUkFUSU9OXG5cbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXIoVHlwZSB0eXBlLCBJUmVzb2x2ZXIgcmVzb2x2ZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGUpO1xuICAgICAgICAgICAgX3Jlc29sdmVycy5BZGQodHlwZSwgcmVzb2x2ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXIoVHlwZSB0eXBlLCBUeXBlIGltcGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGUpO1xuXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgVHJhbnNpZW50UmVzb2x2ZXIodGhpcywgaW1wbCk7XG4gICAgICAgICAgICBfcmVzb2x2ZXJzLkFkZCh0eXBlLCByZXNvbHZlcik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlcjxUVHlwZSwgVEltcGxlbWVudGF0aW9uPigpIHdoZXJlIFRJbXBsZW1lbnRhdGlvbiA6IGNsYXNzLCBUVHlwZVxuICAgICAgICB7XG4gICAgICAgICAgICBSZWdpc3Rlcih0eXBlb2YoVFR5cGUpLCB0eXBlb2YoVEltcGxlbWVudGF0aW9uKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlcihUeXBlIHR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJlZ2lzdGVyKHR5cGUsIHR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXI8VFR5cGU+KCkgd2hlcmUgVFR5cGUgOiBjbGFzc1xuICAgICAgICB7XG4gICAgICAgICAgICBSZWdpc3Rlcih0eXBlb2YoVFR5cGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2UoVHlwZSB0eXBlLCBUeXBlIGltcGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGUpO1xuXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBuZXcgU2luZ2xlSW5zdGFuY2VSZXNvbHZlcih0aGlzLCBpbXBsKTtcbiAgICAgICAgICAgIF9yZXNvbHZlcnMuQWRkKHR5cGUsIHJlc29sdmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VFR5cGUsIFRJbXBsZW1lbnRhdGlvbj4oKSB3aGVyZSBUSW1wbGVtZW50YXRpb24gOiBjbGFzcywgVFR5cGVcbiAgICAgICAge1xuICAgICAgICAgICAgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZSh0eXBlb2YoVFR5cGUpLCB0eXBlb2YoVEltcGxlbWVudGF0aW9uKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlclNpbmdsZUluc3RhbmNlKFR5cGUgdHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgUmVnaXN0ZXJTaW5nbGVJbnN0YW5jZSh0eXBlLCB0eXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZ2lzdGVyU2luZ2xlSW5zdGFuY2U8VFR5cGU+KCkgd2hlcmUgVFR5cGUgOiBjbGFzc1xuICAgICAgICB7XG4gICAgICAgICAgICBSZWdpc3RlclNpbmdsZUluc3RhbmNlKHR5cGVvZihUVHlwZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJGdW5jPFRUeXBlPihGdW5jPFRUeXBlPiBmdW5jKVxuICAgICAgICB7XG4gICAgICAgICAgICBDaGVja0FscmVhZHlBZGRlZDxUVHlwZT4oKTtcblxuICAgICAgICAgICAgdmFyIHJlc29sdmVyID0gbmV3IEZ1bmNSZXNvbHZlcjxUVHlwZT4oZnVuYyk7XG4gICAgICAgICAgICBfcmVzb2x2ZXJzLkFkZCh0eXBlb2YoVFR5cGUpLCByZXNvbHZlcik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckluc3RhbmNlKFR5cGUgdHlwZSwgb2JqZWN0IGluc3RhbmNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBDaGVja0FscmVhZHlBZGRlZCh0eXBlKTtcblxuICAgICAgICAgICAgdmFyIHJlc29sdmVyID0gbmV3IEluc3RhbmNlUmVzb2x2ZXIoaW5zdGFuY2UpO1xuICAgICAgICAgICAgX3Jlc29sdmVycy5BZGQodHlwZSwgcmVzb2x2ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJJbnN0YW5jZShvYmplY3QgaW5zdGFuY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UuR2V0VHlwZSgpLCBpbnN0YW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3Rlckluc3RhbmNlPFRUeXBlPihUVHlwZSBpbnN0YW5jZSlcbiAgICAgICAge1xuICAgICAgICAgICAgUmVnaXN0ZXJJbnN0YW5jZSh0eXBlb2YoVFR5cGUpLCBpbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgI2VuZHJlZ2lvblxuXG5cbiAgICAgICAgI3JlZ2lvbiBSRVNPTFZFXG4gICAgICAgIHB1YmxpYyBUVHlwZSBSZXNvbHZlPFRUeXBlPigpIHdoZXJlIFRUeXBlIDogY2xhc3NcbiAgICAgICAge1xuICAgICAgICAgICAgQ2hlY2tOb3RSZWdpc3RlcmVkPFRUeXBlPigpO1xuXG4gICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSBfcmVzb2x2ZXJzW3R5cGVvZihUVHlwZSldO1xuICAgICAgICAgICAgcmV0dXJuIChUVHlwZSlyZXNvbHZlci5SZXNvbHZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb2JqZWN0IFJlc29sdmUoVHlwZSB0eXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICBDaGVja05vdFJlZ2lzdGVyZWQodHlwZSk7XG5cbiAgICAgICAgICAgIHZhciByZXNvbHZlciA9IF9yZXNvbHZlcnNbdHlwZV07XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZXIuUmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgICNlbmRyZWdpb25cblxuXG4gICAgICAgICNyZWdpb24gUFJJVkFURVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBDaGVja0FscmVhZHlBZGRlZChUeXBlIHR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChfcmVzb2x2ZXJzLkNvbnRhaW5zS2V5KHR5cGUpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcInswfSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQhXCIsdHlwZS5GdWxsTmFtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrQWxyZWFkeUFkZGVkPFRUeXBlPigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIENoZWNrQWxyZWFkeUFkZGVkKHR5cGVvZihUVHlwZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrTm90UmVnaXN0ZXJlZChUeXBlIHR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghX3Jlc29sdmVycy5Db250YWluc0tleSh0eXBlKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJDYW5ub3QgcmVzb2x2ZSB7MH0sIGl0J3Mgbm90IHJlZ2lzdGVyZWQhXCIsdHlwZS5GdWxsTmFtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIENoZWNrTm90UmVnaXN0ZXJlZDxUVHlwZT4oKVxuICAgICAgICB7XG4gICAgICAgICAgICBDaGVja05vdFJlZ2lzdGVyZWQodHlwZW9mKFRUeXBlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAjZW5kcmVnaW9uXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcblxubmFtZXNwYWNlIEJyaWRnZS5Jb2NcbntcbiAgICBwdWJsaWMgY2xhc3MgRnVuY1Jlc29sdmVyPFQ+IDogSVJlc29sdmVyXG4gICAge1xuICAgICAgICBwdWJsaWMgRnVuYzxvYmplY3Q+IFJlc29sdmUgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBGdW5jUmVzb2x2ZXIoRnVuYzxUPiByZXNvbHZlRnVuYylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5SZXNvbHZlID0gKCkgPT4gcmVzb2x2ZUZ1bmMoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuSW9jXG57XG4gICAgcHVibGljIGNsYXNzIEluc3RhbmNlUmVzb2x2ZXIgOiBJUmVzb2x2ZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyBGdW5jPG9iamVjdD4gUmVzb2x2ZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIEluc3RhbmNlUmVzb2x2ZXIob2JqZWN0IHJlc29sdmVkT2JqKVxuICAgICAgICB7XG4gICAgICAgICAgICBSZXNvbHZlID0gKCkgPT4gcmVzb2x2ZWRPYmo7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3MgSW5zdGFuY2VSZXNvbHZlcjxUPiA6IEluc3RhbmNlUmVzb2x2ZXJcbiAgICB7XG5cbiAgICAgICAgcHVibGljIEluc3RhbmNlUmVzb2x2ZXIoVCByZXNvbHZlZE9iaikgOiBiYXNlKHJlc29sdmVkT2JqKVxuICAgICAgICB7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG5cbm5hbWVzcGFjZSBCcmlkZ2UuSW9jXG57XG4gICAgcHVibGljIGNsYXNzIFNpbmdsZUluc3RhbmNlUmVzb2x2ZXIgOiBJUmVzb2x2ZXJcbiAgICB7XG4gICAgICAgIHByaXZhdGUgb2JqZWN0IF9zaW5nbGVJbnN0YW5jZTtcblxuICAgICAgICBwdWJsaWMgRnVuYzxvYmplY3Q+IFJlc29sdmUgeyBnZXQ7IHNldDsgfVxuXG4gICAgICAgIHB1YmxpYyBTaW5nbGVJbnN0YW5jZVJlc29sdmVyKElJb2MgaW9jLCBUeXBlIHR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFJlc29sdmUgPSAoKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGZpcnN0IHJlc29sdmUuIFVzaW5nIHRyYW5zaWVudCByZXNvbHZlclxuICAgICAgICAgICAgICAgIGlmIChfc2luZ2xlSW5zdGFuY2UgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2llbnRSZXNvbHZlciA9IG5ldyBUcmFuc2llbnRSZXNvbHZlcihpb2MsIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBfc2luZ2xlSW5zdGFuY2UgPSB0cmFuc2llbnRSZXNvbHZlci5SZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zaW5nbGVJbnN0YW5jZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3MgU2luZ2xlSW5zdGFuY2VSZXNvbHZlcjxUPiA6IFNpbmdsZUluc3RhbmNlUmVzb2x2ZXJcbiAgICB7XG5cbiAgICAgICAgcHVibGljIFNpbmdsZUluc3RhbmNlUmVzb2x2ZXIoSUlvYyBpb2MpIDogYmFzZShpb2MsIHR5cGVvZihUKSlcbiAgICAgICAge1xuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcblxubmFtZXNwYWNlIEJyaWRnZS5Jb2NcbntcbiAgICBwdWJsaWMgY2xhc3MgVHJhbnNpZW50UmVzb2x2ZXIgOiBJUmVzb2x2ZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyBGdW5jPG9iamVjdD4gUmVzb2x2ZSB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIFRyYW5zaWVudFJlc29sdmVyKElJb2MgaW9jLCBUeXBlIHRvcmVzb2x2ZVR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuUmVzb2x2ZSA9ICgpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGN0b3JcbiAgICAgICAgICAgICAgICB2YXIgY3RvciA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8U3lzdGVtLlJlZmxlY3Rpb24uQ29uc3RydWN0b3JJbmZvPih0b3Jlc29sdmVUeXBlLkdldENvbnN0cnVjdG9ycygpKTtcbiAgICAgICAgICAgICAgICBpZiAoY3RvciA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJObyBjdG9yIGZvdW5kIGZvciB0eXBlIHswfSFcIix0b3Jlc29sdmVUeXBlLkZ1bGxOYW1lKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgY3RvciBwYXJhbXNcbiAgICAgICAgICAgICAgICB2YXIgY3RvclBhcmFtcyA9IGN0b3IuR2V0UGFyYW1ldGVycygpO1xuICAgICAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8U3lzdGVtLlJlZmxlY3Rpb24uUGFyYW1ldGVySW5mbz4oY3RvclBhcmFtcykpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBY3RpdmF0b3IuQ3JlYXRlSW5zdGFuY2UodG9yZXNvbHZlVHlwZSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlIHJlc29sdmVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBuZXcgTGlzdDxvYmplY3Q+KGN0b3JQYXJhbXMuTGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgcGFyYW1ldGVySW5mbyBpbiBjdG9yUGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5BZGQoaW9jLlJlc29sdmUocGFyYW1ldGVySW5mby5QYXJhbWV0ZXJUeXBlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0b3IuSW52b2tlKHBhcmFtZXRlcnMuVG9BcnJheSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsYXNzIFRyYW5zaWVudFJlc29sdmVyPFQ+IDogVHJhbnNpZW50UmVzb2x2ZXJcbiAgICB7XG5cbiAgICAgICAgcHVibGljIFRyYW5zaWVudFJlc29sdmVyKElJb2MgaW9jKSA6IGJhc2UoaW9jLCB0eXBlb2YoVCkpXG4gICAgICAgIHtcblxuICAgICAgICB9XG4gICAgfVxuXG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UZXh0O1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcblxubmFtZXNwYWNlIEJyaWRnZS5NZXNzZW5nZXJcbntcbiAgICBwdWJsaWMgY2xhc3MgTWVzc2VuZ2VyIDogSU1lc3NlbmdlclxuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seVxuICAgICAgICAgICAgRGljdGlvbmFyeTxUdXBsZTxzdHJpbmcsIFR5cGUsIFR5cGU+LCBMaXN0PFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+PiBfY2FsbHMgPVxuICAgICAgICAgICAgICAgIG5ldyBEaWN0aW9uYXJ5PFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4sIExpc3Q8VHVwbGU8b2JqZWN0LCBBY3Rpb248b2JqZWN0LCBvYmplY3Q+Pj4+KCk7XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU2VuZCBNZXNzYWdlIHdpdGggYXJnc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRBcmdzXCI+VE1lc3NhZ2VBcmdzPC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlbmRlclwiPlNlbmRlcjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXJnc1wiPkFyZ3M8L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdm9pZCBTZW5kPFRTZW5kZXIsIFRBcmdzPihUU2VuZGVyIHNlbmRlciwgc3RyaW5nIG1lc3NhZ2UsIFRBcmdzIGFyZ3MpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoc2VuZGVyID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbmRlclwiKTtcbiAgICAgICAgICAgIHRoaXMuSW5uZXJTZW5kKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgdHlwZW9mKFRBcmdzKSwgc2VuZGVyLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFNlbmQgTWVzc2FnZSB3aXRob3V0IGFyZ3NcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNlbmRlclwiPlNlbmRlcjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgU2VuZDxUU2VuZGVyPihUU2VuZGVyIHNlbmRlciwgc3RyaW5nIG1lc3NhZ2UpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoc2VuZGVyID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcInNlbmRlclwiKTtcbiAgICAgICAgICAgIHRoaXMuSW5uZXJTZW5kKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgbnVsbCwgc2VuZGVyLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFN1YnNjcmliZSBNZXNzYWdlIHdpdGggYXJnc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRBcmdzXCI+VEFyZ3M8L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCI+QWN0aW9uPC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic291cmNlXCI+c291cmNlPC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgU3Vic2NyaWJlPFRTZW5kZXIsIFRBcmdzPihvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UsIEFjdGlvbjxUU2VuZGVyLCBUQXJncz4gY2FsbGJhY2ssXG4gICAgICAgICAgICBUU2VuZGVyIHNvdXJjZSA9IG51bGwpIHdoZXJlIFRTZW5kZXIgOiBjbGFzc1xuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlciA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJzdWJzY3JpYmVyXCIpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNhbGxiYWNrXCIpO1xuXG4gICAgICAgICAgICBBY3Rpb248b2JqZWN0LCBvYmplY3Q+IHdyYXAgPSAoc2VuZGVyLCBhcmdzKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzZW5kID0gKFRTZW5kZXIpc2VuZGVyO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgPT0gbnVsbCB8fCBzZW5kID09IHNvdXJjZSlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKFRTZW5kZXIpc2VuZGVyLCAoVEFyZ3MpYXJncyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLklubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIsIG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgdHlwZW9mKFRBcmdzKSwgKEFjdGlvbjxvYmplY3Qsb2JqZWN0Pil3cmFwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFN1YnNjcmliZSBNZXNzYWdlIHdpdGhvdXQgYXJnc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFNlbmRlclwiPlRTZW5kZXI8L3R5cGVwYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic3Vic2NyaWJlclwiPlN1YnNjcmliZXI8L3BhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbGxiYWNrXCI+QWN0aW9uPC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic291cmNlXCI+c291cmNlPC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgU3Vic2NyaWJlPFRTZW5kZXI+KG9iamVjdCBzdWJzY3JpYmVyLCBzdHJpbmcgbWVzc2FnZSwgQWN0aW9uPFRTZW5kZXI+IGNhbGxiYWNrLFxuICAgICAgICAgICAgVFNlbmRlciBzb3VyY2UgPSBudWxsKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic3Vic2NyaWJlclwiKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjYWxsYmFja1wiKTtcblxuICAgICAgICAgICAgQWN0aW9uPG9iamVjdCwgb2JqZWN0PiB3cmFwID0gKHNlbmRlciwgYXJncykgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VuZCA9IChUU2VuZGVyKXNlbmRlcjtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09IG51bGwgfHwgc2VuZCA9PSBzb3VyY2UpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKChUU2VuZGVyKXNlbmRlcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLklubmVyU3Vic2NyaWJlKHN1YnNjcmliZXIsIG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgbnVsbCwgKEFjdGlvbjxvYmplY3Qsb2JqZWN0Pil3cmFwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIFVuc3Vic2NyaWJlIGFjdGlvbiB3aXRoIGFyZ3NcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRTZW5kZXJcIj5UU2VuZGVyPC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUQXJnc1wiPlRBcmdzPC90eXBlcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN1YnNjcmliZXJcIj5TdWJzY3JpYmVyPC9wYXJhbT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWVzc2FnZVwiPk1lc3NhZ2U8L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdm9pZCBVbnN1YnNjcmliZTxUU2VuZGVyLCBUQXJncz4ob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5Jbm5lclVuc3Vic2NyaWJlKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgdHlwZW9mKFRBcmdzKSwgc3Vic2NyaWJlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBVbnN1YnNjcmliZSBhY3Rpb24gd2l0aG91dCBhcmdzXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUU2VuZGVyXCI+VFNlbmRlcjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdWJzY3JpYmVyXCI+U3Vic2NyaWJlcjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1lc3NhZ2VcIj5NZXNzYWdlPC9wYXJhbT5cbiAgICAgICAgcHVibGljIHZvaWQgVW5zdWJzY3JpYmU8VFNlbmRlcj4ob2JqZWN0IHN1YnNjcmliZXIsIHN0cmluZyBtZXNzYWdlKSB3aGVyZSBUU2VuZGVyIDogY2xhc3NcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5Jbm5lclVuc3Vic2NyaWJlKG1lc3NhZ2UsIHR5cGVvZihUU2VuZGVyKSwgbnVsbCwgc3Vic2NyaWJlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBSZW1vdmUgYWxsIGNhbGxiYWNrc1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldE1lc3NlbmdlcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxzLkNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZvaWQgSW5uZXJTZW5kKHN0cmluZyBtZXNzYWdlLCBUeXBlIHNlbmRlclR5cGUsIFR5cGUgYXJnVHlwZSwgb2JqZWN0IHNlbmRlciwgb2JqZWN0IGFyZ3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIm1lc3NhZ2VcIik7XG4gICAgICAgICAgICB2YXIga2V5ID0gbmV3IFR1cGxlPHN0cmluZywgVHlwZSwgVHlwZT4obWVzc2FnZSwgc2VuZGVyVHlwZSwgYXJnVHlwZSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxzLkNvbnRhaW5zS2V5KGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLl9jYWxsc1trZXldO1xuICAgICAgICAgICAgaWYgKGFjdGlvbnMgPT0gbnVsbCB8fCAhU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8VHVwbGU8b2JqZWN0LEFjdGlvbjxvYmplY3Qsb2JqZWN0Pj4+KGFjdGlvbnMpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGFjdGlvbnNDb3B5ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8VHVwbGU8b2JqZWN0LEFjdGlvbjxvYmplY3Qsb2JqZWN0Pj4+KGFjdGlvbnMpO1xuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGFjdGlvbiBpbiBhY3Rpb25zQ29weSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9ucy5Db250YWlucyhhY3Rpb24pKVxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uSXRlbTIoc2VuZGVyLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBJbm5lclN1YnNjcmliZShvYmplY3Qgc3Vic2NyaWJlciwgc3RyaW5nIG1lc3NhZ2UsIFR5cGUgc2VuZGVyVHlwZSwgVHlwZSBhcmdUeXBlLFxuICAgICAgICAgICAgQWN0aW9uPG9iamVjdCwgb2JqZWN0PiBjYWxsYmFjaylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwibWVzc2FnZVwiKTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBuZXcgVHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPihtZXNzYWdlLCBzZW5kZXJUeXBlLCBhcmdUeXBlKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG5ldyBUdXBsZTxvYmplY3QsIEFjdGlvbjxvYmplY3QsIG9iamVjdD4+KHN1YnNjcmliZXIsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWxscy5Db250YWluc0tleShrZXkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzW2tleV0uQWRkKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PFR1cGxlPG9iamVjdCwgQWN0aW9uPG9iamVjdCwgb2JqZWN0Pj4+KCksKF9vMSk9PntfbzEuQWRkKHZhbHVlKTtyZXR1cm4gX28xO30pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzW2tleV0gPSBsaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIElubmVyVW5zdWJzY3JpYmUoc3RyaW5nIG1lc3NhZ2UsIFR5cGUgc2VuZGVyVHlwZSwgVHlwZSBhcmdUeXBlLCBvYmplY3Qgc3Vic2NyaWJlcilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwic3Vic2NyaWJlclwiKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcIm1lc3NhZ2VcIik7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSBuZXcgVHVwbGU8c3RyaW5nLCBUeXBlLCBUeXBlPihtZXNzYWdlLCBzZW5kZXJUeXBlLCBhcmdUeXBlKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbHMuQ29udGFpbnNLZXkoa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciB0b3JlbW92ZSA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8VHVwbGU8b2JqZWN0LEFjdGlvbjxvYmplY3Qsb2JqZWN0Pj4+KHRoaXMuX2NhbGxzW2tleV0sKEZ1bmM8VHVwbGU8b2JqZWN0LEFjdGlvbjxvYmplY3Qsb2JqZWN0Pj4sYm9vbD4pKHR1cGxlID0+IHR1cGxlLkl0ZW0xID09IHN1YnNjcmliZXIpKS5Ub0xpc3QoKTtcblxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHR1cGxlIGluIHRvcmVtb3ZlKVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxzW2tleV0uUmVtb3ZlKHR1cGxlKTtcblxuICAgICAgICAgICAgaWYgKCFTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkFueTxUdXBsZTxvYmplY3QsQWN0aW9uPG9iamVjdCxvYmplY3Q+Pj4odGhpcy5fY2FsbHNba2V5XSkpXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbHMuUmVtb3ZlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIElOYXZpZ2F0b3IgaW1wbGVtZW50YXRpb25cbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyBjbGFzcyBCcmlkZ2VOYXZpZ2F0b3IgOiBJTmF2aWdhdG9yXG4gICAge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBJQW1Mb2FkYWJsZSBfYWN0dWFsQ29udHJvbGxlcjtcblxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBDb25maWd1cmF0aW9uO1xuICAgICAgICBwdWJsaWMgQnJpZGdlTmF2aWdhdG9yKElOYXZpZ2F0b3JDb25maWd1cmF0b3IgY29uZmlndXJhdGlvbilcbiAgICAgICAge1xuICAgICAgICAgICAgQ29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBFbmFibGVTcGFmQW5jaG9ycygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhbGxBbmNob3JzID0galF1ZXJ5LlNlbGVjdChcImFcIik7XG4gICAgICAgICAgICBhbGxBbmNob3JzLk9mZihFdmVudFR5cGUuQ2xpY2suVG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBhbGxBbmNob3JzLkNsaWNrKChBY3Rpb248alF1ZXJ5TW91c2VFdmVudD4pKGV2ID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWNrZWRFbGVtZW50ID0gZXYuVGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRFbGVtZW50LkdldFR5cGUoKSAhPSB0eXBlb2YoSFRNTEFuY2hvckVsZW1lbnQpKVxuICAgICAgICAgICAgICAgICAgICBjbGlja2VkRWxlbWVudCA9IGpRdWVyeS5FbGVtZW50KGV2LlRhcmdldCkuUGFyZW50cyhcImFcIikuR2V0KDApO1xuXG4gICAgICAgICAgICAgICAgdmFyIGhyZWYgPSBjbGlja2VkRWxlbWVudC5HZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KGhyZWYpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNNeUhyZWYgPSBocmVmLlN0YXJ0c1dpdGgoXCJzcGFmOlwiKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGlzIG15IGhyZWZcbiAgICAgICAgICAgICAgICBpZiAoaXNNeUhyZWYpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBldi5QcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFnZUlkID0gaHJlZi5SZXBsYWNlKFwic3BhZjpcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTmF2aWdhdGUocGFnZUlkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhbmNob3IgZGVmYXVsdCBiZWhhdmlvdXJcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIE5hdmlnYXRlIHRvIGEgcGFnZSBJRC5cbiAgICAgICAgLy8vIFRoZSBJRCBtdXN0IGJlIHJlZ2lzdGVyZWQuXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2VJZFwiPjwvcGFyYW0+XG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgTmF2aWdhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLkNvbmZpZ3VyYXRpb24uR2V0UGFnZURlc2NyaXB0b3JCeUtleShwYWdlSWQpO1xuICAgICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiUGFnZSBub3QgZm91bmQgd2l0aCBJRCB7MH1cIixwYWdlSWQpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3QgcnVsZVxuICAgICAgICAgICAgdmFyIHJlZGlyZWN0S2V5ID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixwYWdlLlJlZGlyZWN0UnVsZXMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxGdW5jPHN0cmluZz4+KFwia2V5MVwiKS5JbnZva2UoKTooc3RyaW5nKW51bGw7XG4gICAgICAgICAgICBpZiAoIXN0cmluZy5Jc051bGxPckVtcHR5KHJlZGlyZWN0S2V5KSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHJlZGlyZWN0S2V5LHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGJvZHkgPSB0aGlzLkNvbmZpZ3VyYXRpb24uQm9keTtcbiAgICAgICAgICAgIGlmKGJvZHkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiQ2Fubm90IGZpbmQgbmF2aWdhdGlvbiBib2R5IGVsZW1lbnQuXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBsZWF2ZSBhY3R1YWwgY29udHJvbGVsclxuICAgICAgICAgICAgaWYgKHRoaXMuTGFzdE5hdmlnYXRlQ29udHJvbGxlciAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHRoaXMuTGFzdE5hdmlnYXRlQ29udHJvbGxlci5PbkxlYXZlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuQ29uZmlndXJhdGlvbi5Cb2R5LkxvYWQocGFnZS5IdG1sTG9jYXRpb24uSW52b2tlKCksbnVsbCwgKEFjdGlvbjxzdHJpbmcsc3RyaW5nLGpxWEhSPikoYXN5bmMgKG8scyxhKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGxvYWQgZGVwZW5kZW5jaWVzXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UuRGVwZW5kZW5jaWVzU2NyaXB0cyAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdHMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxzdHJpbmc+KChwYWdlLkRlcGVuZGVuY2llc1NjcmlwdHMuSW52b2tlKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocGFnZS5TZXF1ZW50aWFsRGVwZW5kZW5jaWVzU2NyaXB0TG9hZClcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxpdHkuU2VxdWVudGlhbFNjcmlwdExvYWQoc2NyaXB0cyk7XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmFsbGVsIGxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JpcHRzVGFzayA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PHN0cmluZyxUYXNrPG9iamVjdFtdPj4oc2NyaXB0cywoRnVuYzxzdHJpbmcsVGFzazxvYmplY3RbXT4+KSh1cmwgPT4gVGFzay5Gcm9tUHJvbWlzZShqUXVlcnkuR2V0U2NyaXB0KHVybCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBUYXNrLldoZW5BbGw8b2JqZWN0W10+KHNjcmlwdHNUYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBwYWdlXG4gICAgICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixwYWdlLlByZXBhcmVQYWdlKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPEFjdGlvbj4oXCJrZXkyXCIpLkludm9rZSgpKTpudWxsO1xuXG4gICAgICAgICAgICAgICAgLy8gYXV0byBlbmFibGUgc3BhZiBhbmNob3JzXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLkNvbmZpZ3VyYXRpb24uRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5hYmxlQW5jaG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkzXCIscGFnZS5BdXRvRW5hYmxlU3BhZkFuY2hvcnMpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxGdW5jPGJvb2w+PihcImtleTNcIikuSW52b2tlKCk6KGJvb2w/KW51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVuYWJsZUFuY2hvcnMuSGFzVmFsdWUgJiYgZW5hYmxlQW5jaG9ycy5WYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5hYmxlU3BhZkFuY2hvcnMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGFnZS5QYWdlQ29udHJvbGxlciAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbG9hZCBuZXcgY29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IHBhZ2UuUGFnZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5PbkxvYWQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgX2FjdHVhbENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Pbk5hdmlnYXRlZCE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+dGhpcy5Pbk5hdmlnYXRlZC5JbnZva2UodGhpcyxjb250cm9sbGVyKSk6bnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KSk7IFxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlcjxJQW1Mb2FkYWJsZT4gT25OYXZpZ2F0ZWQ7XG5wdWJsaWMgSUFtTG9hZGFibGUgTGFzdE5hdmlnYXRlQ29udHJvbGxlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX2FjdHVhbENvbnRyb2xsZXI7XHJcbiAgICB9XHJcbn1cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gU3Vic2NyaWJlIHRvIGFuY2hvcnMgY2xpY2tcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBJbml0TmF2aWdhdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuRW5hYmxlU3BhZkFuY2hvcnMoKTtcblxuICAgICAgICAgICAgLy8gZ28gaG9tZVxuICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBJTmF2aWdhdG9yQ29uZmlndXJhdG9yIEltcGxlbWVudGF0aW9uLiBNdXN0IGJlIGV4dGVuZGVkLlxuICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIEJyaWRnZU5hdmlnYXRvckNvbmZpZ0Jhc2UgOiBJTmF2aWdhdG9yQ29uZmlndXJhdG9yXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElMaXN0PElQYWdlRGVzY3JpcHRvcj4gX3JvdXRlcztcblxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgSUxpc3Q8SVBhZ2VEZXNjcmlwdG9yPiBDcmVhdGVSb3V0ZXMoKTtcbiAgICAgICAgcHVibGljIGFic3RyYWN0IGpRdWVyeSBCb2R5IHsgZ2V0OyB9XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgSG9tZUlkIHsgZ2V0OyB9XG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBib29sIERpc2FibGVBdXRvU3BhZkFuY2hvcnNPbk5hdmlnYXRlIHsgZ2V0OyB9XG5cblxuXG4gICAgICAgIHByb3RlY3RlZCBCcmlkZ2VOYXZpZ2F0b3JDb25maWdCYXNlKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzID0gdGhpcy5DcmVhdGVSb3V0ZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBJUGFnZURlc2NyaXB0b3IgR2V0UGFnZURlc2NyaXB0b3JCeUtleShzdHJpbmcga2V5KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TaW5nbGVPckRlZmF1bHQ8SVBhZ2VEZXNjcmlwdG9yPih0aGlzLl9yb3V0ZXMsKEZ1bmM8SVBhZ2VEZXNjcmlwdG9yLGJvb2w+KShzPT4gc3RyaW5nLkVxdWFscyhzLktleSwga2V5LCBTdHJpbmdDb21wYXJpc29uLkN1cnJlbnRDdWx0dXJlSWdub3JlQ2FzZSkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgQnJpZGdlLkh0bWw1O1xudXNpbmcgQnJpZGdlLk5hdmlnYXRpb24uTW9kZWw7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBjbGFzcyBDb21wbGV4T2JqZWN0TmF2aWdhdGlvbkhpc3RvcnkgOiBJQnJvd3Nlckhpc3RvcnlNYW5hZ2VyXG4gICAge1xuICAgICAgICBwdWJsaWMgdm9pZCBQdXNoU3RhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBiYXNlVXJsID0gTmF2aWdhdGlvblV0aWxpdHkuQnVpbGRCYXNlVXJsKHBhZ2VJZCk7XG5cbiAgICAgICAgICAgIFdpbmRvdy5IaXN0b3J5LlB1c2hTdGF0ZShudWxsLCBzdHJpbmcuRW1wdHksXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gc3RyaW5nLkZvcm1hdChcInswfT17MX1cIixiYXNlVXJsLEdsb2JhbC5CdG9hKEpTT04uU3RyaW5naWZ5KHBhcmFtZXRlcnMpKSk6IGJhc2VVcmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFVybERlc2NyaXB0b3IgUGFyc2VVcmwoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVzID0gbmV3IFVybERlc2NyaXB0b3IoKTtcblxuICAgICAgICAgICAgdmFyIGhhc2ggPSBXaW5kb3cuTG9jYXRpb24uSGFzaDtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLlJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaGFzaCkpIHJldHVybiByZXM7XG5cbiAgICAgICAgICAgIHZhciBlcXVhbEluZGV4ID0gaGFzaC5JbmRleE9mKCc9Jyk7XG4gICAgICAgICAgICBpZiAoZXF1YWxJbmRleCA9PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaC5TdWJzdHJpbmcoMCwgZXF1YWxJbmRleCk7ICBcblxuICAgICAgICAgICAgdmFyIGRvdWJsZVBvaW50c0luZHggPSBlcXVhbEluZGV4ICsgMTtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gaGFzaC5TdWJzdHJpbmcoZG91YmxlUG9pbnRzSW5keCwgaGFzaC5MZW5ndGggLSBkb3VibGVQb2ludHNJbmR4KTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KHBhcmFtZXRlcnMpKSByZXR1cm4gcmVzOyAvLyBubyBwYXJhbWV0ZXJzXG5cbiAgICAgICAgICAgIHZhciBkZWNvZGVkID0gR2xvYmFsLkF0b2IocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB2YXIgZGVzZXJpYWxpemVkID0gSlNPTi5QYXJzZTxEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0Pj4oZGVjb2RlZCk7XG5cbiAgICAgICAgICAgIHJlcy5QYXJhbWV0ZXJzID0gZGVzZXJpYWxpemVkO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xudXNpbmcgQnJpZGdlLmpRdWVyeTI7XG5cbm5hbWVzcGFjZSBCcmlkZ2UuTmF2aWdhdGlvblxue1xuICAgIHB1YmxpYyBjbGFzcyBQYWdlRGVzY3JpcHRvciA6IElQYWdlRGVzY3JpcHRvclxuICAgIHtcbiAgICAgICAgcHVibGljIFBhZ2VEZXNjcmlwdG9yKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5BdXRvRW5hYmxlU3BhZkFuY2hvcnMgPSAoKSA9PiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0cmluZyBLZXkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgRnVuYzxzdHJpbmc+IEh0bWxMb2NhdGlvbiB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPElBbUxvYWRhYmxlPiBQYWdlQ29udHJvbGxlciB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPGJvb2w+IENhbkJlRGlyZWN0TG9hZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBBY3Rpb24gUHJlcGFyZVBhZ2UgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgYm9vbCBTZXF1ZW50aWFsRGVwZW5kZW5jaWVzU2NyaXB0TG9hZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPHN0cmluZz4gUmVkaXJlY3RSdWxlcyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPGJvb2w+IEF1dG9FbmFibGVTcGFmQW5jaG9ycyB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBGdW5jPElFbnVtZXJhYmxlPHN0cmluZz4+IERlcGVuZGVuY2llc1NjcmlwdHMgeyBnZXQ7IHNldDsgfVxuICAgIH1cblxuICAgIFxufSIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xudXNpbmcgU3lzdGVtLkxpbnE7XG51c2luZyBTeXN0ZW0uVGV4dDtcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uLk1vZGVsO1xuXG5uYW1lc3BhY2UgQnJpZGdlLk5hdmlnYXRpb25cbntcbiAgICBwdWJsaWMgY2xhc3MgUXVlcnlQYXJhbWV0ZXJOYXZpZ2F0aW9uSGlzdG9yeSA6IElCcm93c2VySGlzdG9yeU1hbmFnZXJcbiAgICB7XG4gICAgICAgIHB1YmxpYyB2b2lkIFB1c2hTdGF0ZShzdHJpbmcgcGFnZUlkLCBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzID0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGJhc2VVcmwgPSBOYXZpZ2F0aW9uVXRpbGl0eS5CdWlsZEJhc2VVcmwocGFnZUlkKTtcblxuICAgICAgICAgICAgV2luZG93Lkhpc3RvcnkuUHVzaFN0YXRlKG51bGwsIHN0cmluZy5FbXB0eSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgPyBzdHJpbmcuRm9ybWF0KFwiezB9ezF9XCIsYmFzZVVybCxCdWlsZFF1ZXJ5UGFyYW1ldGVyKHBhcmFtZXRlcnMpKTogYmFzZVVybCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVXJsRGVzY3JpcHRvciBQYXJzZVVybCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBuZXcgVXJsRGVzY3JpcHRvcigpO1xuICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKTtcblxuICAgICAgICAgICAgdmFyIGhhc2ggPSBXaW5kb3cuTG9jYXRpb24uSGFzaDtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLlJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoaGFzaCkpIHJldHVybiByZXM7XG5cbiAgICAgICAgICAgIHZhciBlcXVhbEluZGV4ID0gaGFzaC5JbmRleE9mKCc/Jyk7XG4gICAgICAgICAgICBpZiAoZXF1YWxJbmRleCA9PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXMuUGFnZUlkID0gaGFzaC5TdWJzdHJpbmcoMCwgZXF1YWxJbmRleCk7ICBcblxuICAgICAgICAgICAgdmFyIGRvdWJsZVBvaW50c0luZHggPSBlcXVhbEluZGV4ICsgMTtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gaGFzaC5TdWJzdHJpbmcoZG91YmxlUG9pbnRzSW5keCwgaGFzaC5MZW5ndGggLSBkb3VibGVQb2ludHNJbmR4KTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KHBhcmFtZXRlcnMpKSByZXR1cm4gcmVzOyAvLyBubyBwYXJhbWV0ZXJzXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNwbGl0dGVkQnlEb3VibGVBbmQgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxzdHJpbmc+KHBhcmFtZXRlcnMuU3BsaXQoXCImXCIpKTtcbiAgICAgICAgICAgIHNwbGl0dGVkQnlEb3VibGVBbmQuRm9yRWFjaCgoU3lzdGVtLkFjdGlvbjxzdHJpbmc+KShmID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0dGVkID0gZi5TcGxpdChcIj1cIik7XG4gICAgICAgICAgICAgICAgcmVzLlBhcmFtZXRlcnMuQWRkKHNwbGl0dGVkWzBdLEdsb2JhbC5EZWNvZGVVUklDb21wb25lbnQoc3BsaXR0ZWRbMV0pKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEJ1aWxkUXVlcnlQYXJhbWV0ZXIoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMgPT0gbnVsbCB8fCAhU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8S2V5VmFsdWVQYWlyPHN0cmluZyxvYmplY3Q+PihwYXJhbWV0ZXJzKSkgcmV0dXJuIHN0cmluZy5FbXB0eTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHN0ckJ1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcihcIj9cIik7XG4gICAgICAgICAgICBmb3JlYWNoICh2YXIga2V5VmFsdWVQYWlyIGluIHBhcmFtZXRlcnMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RyQnVpbGRlci5BcHBlbmQoR2xvYmFsLkVuY29kZVVSSUNvbXBvbmVudChrZXlWYWx1ZVBhaXIuS2V5KSk7XG4gICAgICAgICAgICAgICAgc3RyQnVpbGRlci5BcHBlbmQoXCI9XCIpO1xuICAgICAgICAgICAgICAgIHN0ckJ1aWxkZXIuQXBwZW5kKEdsb2JhbC5FbmNvZGVVUklDb21wb25lbnQoa2V5VmFsdWVQYWlyLlZhbHVlLlRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICBzdHJCdWlsZGVyLkFwcGVuZChcIiZcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXMgPSBzdHJCdWlsZGVyLlRvU3RyaW5nKCkuVHJpbUVuZCgnJicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuXG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xuXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcbntcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgTG9hZGFibGVWaWV3TW9kZWwgOiBWaWV3TW9kZWxCYXNlLCBJQW1Mb2FkYWJsZVxuICAgIHtcbiAgICAgICAgcHJvdGVjdGVkIExpc3Q8SVZpZXdNb2RlbExpZmVDeWNsZT4gUGFydGlhbHMgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XG5cblxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLkFwcGx5QmluZGluZ3MoKTtcbiAgICAgICAgICAgIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsdGhpcy5QYXJ0aWFscykhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21MYW1iZGEoKCk9Pmdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxMaXN0PElWaWV3TW9kZWxMaWZlQ3ljbGU+PihcImtleTFcIikuRm9yRWFjaCgoU3lzdGVtLkFjdGlvbjxJVmlld01vZGVsTGlmZUN5Y2xlPikoZj0+IGYuSW5pdChwYXJhbWV0ZXJzKSkpKTpudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBPbkxlYXZlKClcbiAgICAgICAge1xuICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIix0aGlzLlBhcnRpYWxzKSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbUxhbWJkYSgoKT0+Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPExpc3Q8SVZpZXdNb2RlbExpZmVDeWNsZT4+KFwia2V5MlwiKS5Gb3JFYWNoKChTeXN0ZW0uQWN0aW9uPElWaWV3TW9kZWxMaWZlQ3ljbGU+KShmPT5mLkRlSW5pdCgpKSkpOm51bGw7XG4gICAgICAgICAgICBiYXNlLlJlbW92ZUJpbmRpbmdzKCk7XG4gICAgICAgIH1cblxuICAgIFxucHJpdmF0ZSBMaXN0PElWaWV3TW9kZWxMaWZlQ3ljbGU+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19QYXJ0aWFscz1uZXcgTGlzdDxJVmlld01vZGVsTGlmZUN5Y2xlPigpO31cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIEJyaWRnZS5TcGFmXG57XG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFBhcnRpYWxNb2RlbCA6ICBJVmlld01vZGVsTGlmZUN5Y2xlXG4gICAge1xuICAgICAgICBwcml2YXRlIGRvbS5IVE1MRGl2RWxlbWVudCBfcGFydGlhbEVsZW1lbnQ7XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRWxlbWVudCBpZCBvZiB0aGUgcGFnZSBcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBFbGVtZW50SWQoKTtcbiAgICAgICAgXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEh0bWxMb2NhdGlvblxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc3RyaW5nIEh0bWxVcmwgeyBnZXQ7IH1cblxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEluaXQgcGFydGlhbFxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXJhbWV0ZXJzXCI+ZGF0YSBmb3IgaW5pdCB0aGUgcGFydGlhbHM8L3BhcmFtPlxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEluaXQoRGljdGlvbmFyeTxzdHJpbmcsb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGpRdWVyeS5HZXQodGhpcy5IdG1sVXJsLCBudWxsLCAoQWN0aW9uPG9iamVjdCxzdHJpbmcsanFYSFI+KSgobywgcywgYXJnMykgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWFsRWxlbWVudCA9IG5ldyBkb20uSFRNTERpdkVsZW1lbnRcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTCA9IG8uVG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoRWxlbWVudElkKCkpO1xuICAgICAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQ8ZG9tLkhUTUxEaXZFbGVtZW50Pih0aGlzLl9wYXJ0aWFsRWxlbWVudCk7XG4gICAgICAgICAgICAgICAga25vY2tvdXQua28uYXBwbHlCaW5kaW5ncyh0aGlzLCB0aGlzLl9wYXJ0aWFsRWxlbWVudCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIERlSW5pdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGtvIGNvbnRhaW5zIHRoaXMgbm9kZVxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpYWxFbGVtZW50ID09IG51bGwpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBkYXRhID0ga25vY2tvdXQua28uZGF0YUZvcih0aGlzLl9wYXJ0aWFsRWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGtub2Nrb3V0LmtvLnJlbW92ZU5vZGUodGhpcy5fcGFydGlhbEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGludGVyZmFjZSBJVmlld01vZGVsTGlmZUN5Y2xlXG4gICAge1xuICAgICAgICB2b2lkIEluaXQoRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyk7XG4gICAgICAgIHZvaWQgRGVJbml0KCk7XG4gICAgfVxufVxuXG5cblxuIiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBBdXRob3JpemVkUmVzb3VyY2VCYXNlIDogUmVzb3VyY2VCYXNlXG4gICAge1xuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIFVzZXJTZXJ2aWNlO1xuXG4gICAgICAgIHByb3RlY3RlZCBBdXRob3JpemVkUmVzb3VyY2VCYXNlKElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgVXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gR2VuZXJpYyBBd2FpdGFibGUgYWpheCBjYWxsXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9wdGlvbnNcIj48L3BhcmFtPlxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPjwvdHlwZXBhcmFtPlxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxuICAgICAgICBwcm90ZWN0ZWQgVGFzazxUPiBNYWtlQXV0aG9yaXplZENhbGw8VD4oQWpheE9wdGlvbnMgb3B0aW9ucykgXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLlVzZXJTZXJ2aWNlLklzTG9nZ2VkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJZb3UgbXVzdCBiZSBsb2dnZWQgdG8gdXNlIHRoaXMgcmVzb3VyY2VcIik7XG5cbiAgICAgICAgICAgIG9wdGlvbnMuQmVmb3JlU2VuZCA9ICh4aHIsIG8pID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeGhyLlNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIHN0cmluZy5Gb3JtYXQoXCJUb2tlbiB7MH1cIix0aGlzLlVzZXJTZXJ2aWNlLkxvZ2dlZFVzZXIuVG9rZW4pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxUPihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgTG9jYWxTdG9yYWdlUmVwb3NpdG9yeSA6IElSZXBvc2l0b3J5XG4gICAge1xuICAgICAgICBwcml2YXRlIGNvbnN0IHN0cmluZyBUb2tlbktleSA9IFwidG9rZW5cIjtcbiAgICAgICAgcHJpdmF0ZSBTdG9yYWdlIF9zdG9yYWdlO1xuXG4gICAgICAgIHB1YmxpYyBMb2NhbFN0b3JhZ2VSZXBvc2l0b3J5KClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZSA9IFdpbmRvdy5Mb2NhbFN0b3JhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyB2b2lkIFNhdmVUb2tlbihzdHJpbmcgdG9rZW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UuU2V0SXRlbShUb2tlbktleSx0b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFRva2VuSWZFeGlzdCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuX3N0b3JhZ2UuR2V0SXRlbShUb2tlbktleSk7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4hPW51bGw/dG9rZW4uVG9TdHJpbmcoKTooc3RyaW5nKW51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdm9pZCBEZWxldGVUb2tlbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2UuUmVtb3ZlSXRlbShUb2tlbktleSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVzcG9uc2U7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgY2xhc3MgVXNlclJlc291cmNlcyA6IFJlc291cmNlQmFzZSwgSVVzZXJSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgVXNlclJlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MpIFxuICAgICAgICB7XG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIFRhc2s8U2lnblJlc3BvbnNlPiBMb2dpbihTaWduUmVxdWVzdCBsb2dpblJlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2Vycy9sb2dpblwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICBEYXRhID0gSnNvbkNvbnZlcnQuU2VyaWFsaXplT2JqZWN0KGxvZ2luUmVxdWVzdClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VDYWxsPFNpZ25SZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVGFzazxTaWduUmVzcG9uc2U+IFJlZ2lzdGVyKFNpZ25SZXF1ZXN0IGxvZ2luUmVxdWVzdClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3VzZXJzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobG9naW5SZXF1ZXN0KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2lnblJlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpZ25SZXNwb25zZT4gR2V0Q3VycmVudFVzZXIoc3RyaW5nIHRva2VuKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vdXNlclwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBCZWZvcmVTZW5kID0gKHhociwgbykgPT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5TZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBzdHJpbmcuRm9ybWF0KFwiVG9rZW4gezB9XCIsdG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8U2lnblJlc3BvbnNlPihvcHRpb25zKTtcblxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuTWVzc2VuZ2VyO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXG57XG4gICAgcHVibGljIGNsYXNzIFVzZXJTZXJ2aWNlIDogSVVzZXJTZXJ2aWNlXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyUmVzb3VyY2VzIF91c2VyUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElNZXNzZW5nZXIgX21lc3NlbmdlcjtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJUmVwb3NpdG9yeSBfcmVwb3NpdG9yeTtcblxuICAgICAgICBwdWJsaWMgVXNlclNlcnZpY2UoSVVzZXJSZXNvdXJjZXMgdXNlclJlc291cmNlcywgSU1lc3NlbmdlciBtZXNzZW5nZXIsIElSZXBvc2l0b3J5IHJlcG9zaXRvcnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF91c2VyUmVzb3VyY2VzID0gdXNlclJlc291cmNlcztcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XG4gICAgICAgICAgICBfcmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgVXNlciBMb2dnZWRVc2VyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxucHVibGljIGJvb2wgSXNMb2dnZWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTG9nZ2VkVXNlciAhPSBudWxsO1xyXG4gICAgfVxyXG59XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIExvZ2luKHN0cmluZyBtYWlsLCBzdHJpbmcgcGFzc3dvcmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5Mb2dpbihuZXcgU2lnblJlcXVlc3RcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVc2VyID0gbmV3IFVzZXJSZXF1ZXN0XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBFbWFpbCA9IG1haWwsXG4gICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkID0gcGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgdGhpcy5fcmVwb3NpdG9yeS5TYXZlVG9rZW4obG9naW5SZXNwb25zZS5Vc2VyLlRva2VuKTtcbiAgICAgICAgICAgIHRoaXMuX21lc3Nlbmdlci5TZW5kPFVzZXJTZXJ2aWNlPih0aGlzLFNwYWZBcHAuTWVzc2FnZXMuTG9naW5Eb25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIFJlZ2lzdGVyKHN0cmluZyB1c2VybmFtZSwgc3RyaW5nIG1haWwsIHN0cmluZyBwYXNzd29yZClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxvZ2luUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl91c2VyUmVzb3VyY2VzLlJlZ2lzdGVyKG5ldyBTaWduUmVxdWVzdFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVzZXIgPSBuZXcgVXNlclJlcXVlc3RcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEVtYWlsID0gbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgUGFzc3dvcmQgPSBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWUgPSB1c2VybmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBsb2dpblJlc3BvbnNlLlVzZXI7XG4gICAgICAgICAgICB0aGlzLl9yZXBvc2l0b3J5LlNhdmVUb2tlbihsb2dpblJlc3BvbnNlLlVzZXIuVG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgVHJ5QXV0b0xvZ2luV2l0aFN0b3JlZFRva2VuKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHN0b3JlZFRva2VuID0gdGhpcy5fcmVwb3NpdG9yeS5HZXRUb2tlbklmRXhpc3QoKTtcbiAgICAgICAgICAgIGlmIChzdG9yZWRUb2tlbiA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBsb2dpblJlc3BvbnNlID0gYXdhaXQgdGhpcy5fdXNlclJlc291cmNlcy5HZXRDdXJyZW50VXNlcihzdG9yZWRUb2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5Mb2dnZWRVc2VyID0gbG9naW5SZXNwb25zZS5Vc2VyO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuU2F2ZVRva2VuKGxvZ2luUmVzcG9uc2UuVXNlci5Ub2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzc2VuZ2VyLlNlbmQ8VXNlclNlcnZpY2U+KHRoaXMsU3BhZkFwcC5NZXNzYWdlcy5Mb2dpbkRvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKFByb21pc2VFeGNlcHRpb24gKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9zaXRvcnkuRGVsZXRlVG9rZW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLkxvZ2dlZFVzZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtO1xudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBCcmlkZ2UuSHRtbDU7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbi5Nb2RlbDtcblxubmFtZXNwYWNlIEJyaWRnZS5OYXZpZ2F0aW9uXG57XG4gICAgcHVibGljIGNsYXNzIEJyaWRnZU5hdmlnYXRvcldpdGhSb3V0aW5nIDogQnJpZGdlTmF2aWdhdG9yXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElCcm93c2VySGlzdG9yeU1hbmFnZXIgX2Jyb3dzZXJIaXN0b3J5TWFuYWdlcjtcblxuICAgICAgICBwdWJsaWMgQnJpZGdlTmF2aWdhdG9yV2l0aFJvdXRpbmcoSU5hdmlnYXRvckNvbmZpZ3VyYXRvciBjb25maWd1cmF0aW9uLCBJQnJvd3Nlckhpc3RvcnlNYW5hZ2VyIGJyb3dzZXJIaXN0b3J5TWFuYWdlcikgOiBiYXNlKGNvbmZpZ3VyYXRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9icm93c2VySGlzdG9yeU1hbmFnZXIgPSBicm93c2VySGlzdG9yeU1hbmFnZXI7XG4gICAgICAgICAgICBXaW5kb3cuT25Qb3BTdGF0ZSArPSBlID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIHVybEluZm8gPSBfYnJvd3Nlckhpc3RvcnlNYW5hZ2VyLlBhcnNlVXJsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5OYXZpZ2F0ZVdpdGhvdXRQdXNoU3RhdGUoc3RyaW5nLklzTnVsbE9yRW1wdHkodXJsSW5mby5QYWdlSWQpID8gY29uZmlndXJhdGlvbi5Ib21lSWQgOiB1cmxJbmZvLlBhZ2VJZCwgdXJsSW5mby5QYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZvaWQgTmF2aWdhdGVXaXRob3V0UHVzaFN0YXRlKHN0cmluZyBwYWdlSWQsIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMgPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk5hdmlnYXRlKHBhZ2VJZCwgcGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTmF2aWdhdGUoc3RyaW5nIHBhZ2VJZCwgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4gcGFyYW1ldGVycyA9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9icm93c2VySGlzdG9yeU1hbmFnZXIuUHVzaFN0YXRlKHBhZ2VJZCxwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIGJhc2UuTmF2aWdhdGUocGFnZUlkLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXROYXZpZ2F0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHBhcnNlZCA9IF9icm93c2VySGlzdG9yeU1hbmFnZXIuUGFyc2VVcmwoKTtcblxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPckVtcHR5KHBhcnNlZC5QYWdlSWQpKVxuICAgICAgICAgICAgICAgIGJhc2UuSW5pdE5hdmlnYXRpb24oKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiYXNlLkVuYWJsZVNwYWZBbmNob3JzKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMuQ29uZmlndXJhdGlvbi5HZXRQYWdlRGVzY3JpcHRvckJ5S2V5KHBhcnNlZC5QYWdlSWQpO1xuICAgICAgICAgICAgICAgIGlmIChwYWdlID09IG51bGwpIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcIlBhZ2Ugbm90IGZvdW5kIHdpdGggSUQgezB9XCIscGFyc2VkLlBhZ2VJZCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgbm90IG51bGwgYW5kIGV2YWx1YXRpb24gaXMgZmFsc2UgZmFsbGJhY2sgdG8gaG9tZVxuICAgICAgICAgICAgICAgIGlmIChwYWdlLkNhbkJlRGlyZWN0TG9hZCAhPSBudWxsICYmICFwYWdlLkNhbkJlRGlyZWN0TG9hZC5JbnZva2UoKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIF9icm93c2VySGlzdG9yeU1hbmFnZXIuUHVzaFN0YXRlKHRoaXMuQ29uZmlndXJhdGlvbi5Ib21lSWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlV2l0aG91dFB1c2hTdGF0ZSh0aGlzLkNvbmZpZ3VyYXRpb24uSG9tZUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5hdmlnYXRlKHBhcnNlZC5QYWdlSWQscGFyc2VkLlBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgIFxuICAgICAgICBcbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHM7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlLlNwYWZcclxue1xyXG4gICAgY2xhc3MgQ3VzdG9tUm91dGVzQ29uZmlnIDogQnJpZGdlTmF2aWdhdG9yQ29uZmlnQmFzZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcclxuICAgICAgICBwdWJsaWMgQ3VzdG9tUm91dGVzQ29uZmlnKElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBEaXNhYmxlQXV0b1NwYWZBbmNob3JzT25OYXZpZ2F0ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBJTGlzdDxJUGFnZURlc2NyaXB0b3I+IENyZWF0ZVJvdXRlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IExpc3Q8SVBhZ2VEZXNjcmlwdG9yPigpLChfbzEpPT57X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2hvbWUuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuSG9tZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxIb21lVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEh0bWxMb2NhdGlvbiA9ICgpPT5zdHJpbmcuRm9ybWF0KFwiezB9cGFnZXMvbG9naW4uaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuTG9naW5JZCxcclxuICAgICAgICAgICAgICAgICAgICBQYWdlQ29udHJvbGxlciA9ICgpID0+IFNwYWZBcHAuQ29udGFpbmVyLlJlc29sdmU8TG9naW5WaWV3TW9kZWw+KClcclxuICAgICAgICAgICAgICAgIH0pO19vMS5BZGQobmV3IFBhZ2VEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuQmVEaXJlY3RMb2FkID0gKCk9PnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9yZWdpc3Rlci5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5SZWdpc3RlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxSZWdpc3RlclZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL3Byb2ZpbGUuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuUHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxQcm9maWxlVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtfbzEuQWRkKG5ldyBQYWdlRGVzY3JpcHRvclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbkJlRGlyZWN0TG9hZCA9ICgpPT50aGlzLl91c2VyU2VydmljZS5Jc0xvZ2dlZCxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL3NldHRpbmdzLmh0bWxcIix0aGlzLlZpcnR1YWxEaXJlY3RvcnkpLCAvLyB5b3V0IGh0bWwgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBLZXkgPSBTcGFmQXBwLlNldHRpbmdzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiBTcGFmQXBwLkNvbnRhaW5lci5SZXNvbHZlPFNldHRpbmdzVmlld01vZGVsPigpLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgSHRtbExvY2F0aW9uID0gKCk9PnN0cmluZy5Gb3JtYXQoXCJ7MH1wYWdlcy9lZGl0QXJ0aWNsZS5odG1sXCIsdGhpcy5WaXJ0dWFsRGlyZWN0b3J5KSwgLy8geW91dCBodG1sIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgS2V5ID0gU3BhZkFwcC5FZGl0QXJ0aWNsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxFZGl0QXJ0aWNsZVZpZXdNb2RlbD4oKVxyXG4gICAgICAgICAgICAgICAgfSk7X28xLkFkZChuZXcgUGFnZURlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW5CZURpcmVjdExvYWQgPSAoKT0+dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBIdG1sTG9jYXRpb24gPSAoKT0+c3RyaW5nLkZvcm1hdChcInswfXBhZ2VzL2FydGljbGUuaHRtbFwiLHRoaXMuVmlydHVhbERpcmVjdG9yeSksIC8vIHlvdXQgaHRtbCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIEtleSA9IFNwYWZBcHAuQXJ0aWNsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2VDb250cm9sbGVyID0gKCkgPT4gU3BhZkFwcC5Db250YWluZXIuUmVzb2x2ZTxBcnRpY2xlVmlld01vZGVsPigpXHJcbiAgICAgICAgICAgICAgICB9KTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGpRdWVyeSBCb2R5IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEhvbWVJZCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cbnByaXZhdGUgc3RyaW5nIFZpcnR1YWxEaXJlY3Rvcnlcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5Jc051bGxPckVtcHR5KE5hdmlnYXRpb25VdGlsaXR5LlZpcnR1YWxEaXJlY3RvcnkpID8gc3RyaW5nLkVtcHR5IDogc3RyaW5nLkZvcm1hdChcInswfS9cIixOYXZpZ2F0aW9uVXRpbGl0eS5WaXJ0dWFsRGlyZWN0b3J5KTtcclxuICAgIH1cclxufVxuXHJcbiAgICBcbnByaXZhdGUgYm9vbCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fRGlzYWJsZUF1dG9TcGFmQW5jaG9yc09uTmF2aWdhdGU9ZmFsc2U7cHJpdmF0ZSBqUXVlcnkgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0JvZHk9alF1ZXJ5LlNlbGVjdChcIiNwYWdlQm9keVwiKTtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fSG9tZUlkPVNwYWZBcHAuSG9tZUlkO31cclxuXHJcbiAgIFxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscztcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcclxuXHJcbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcy5pbXBsXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcnRpY2xlUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSUFydGljbGVSZXNvdXJjZXNcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcnRpY2xlUmVzb3VyY2VzKElTZXR0aW5ncyBzZXR0aW5ncywgSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlKSA6IGJhc2UodXNlclNlcnZpY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPEFydGljbGVSZXNwb25zZT4gR2V0QXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyIGJ1aWxkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxidWlsZGVyLkJ1aWxkKCkpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVXNlclNlcnZpY2UuSXNMb2dnZWRcclxuICAgICAgICAgICAgICAgID8gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8QXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLk1ha2VDYWxsPEFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxUYWdzUmVzcG9uc2U+IEdldFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS90YWdzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8VGFnc1Jlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gR2V0QXJ0aWNsZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBGYXZvcml0ZShzdHJpbmcgc2x1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vYXJ0aWNsZXMvezF9L2Zhdm9yaXRlXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHNsdWcpLFxyXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2s8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPiBVbkZhdm9yaXRlKHN0cmluZyBzbHVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vZmF2b3JpdGVcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJERUxFVEVcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2luZ2xlQXJ0aWNsZVJlc3BvbnNlPihvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrPFNpbmdsZUFydGljbGVSZXNwb25zZT4gQ3JlYXRlKE5ld0FydGljbGVSZXF1ZXN0IG5ld0FydGljbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChuZXdBcnRpY2xlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPFNpbmdsZUFydGljbGVSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxDb21tZW50c1Jlc3BvbnNlPiBHZXRBcnRpY2xlQ29tbWVudHMoc3RyaW5nIHNsdWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L2FydGljbGVzL3sxfS9jb21tZW50c1wiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSxzbHVnKSxcclxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUNhbGw8Q29tbWVudHNSZXNwb25zZT4ob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGFzazxTaW5nbGVDb21tZW50UmVzcG9uc2U+IEFkZENvbW1lbnQoc3RyaW5nIHNsdWcsIHN0cmluZyBjb21tZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9hcnRpY2xlcy97MX0vY29tbWVudHNcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksc2x1ZyksXHJcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIERhdGEgPSBKc29uQ29udmVydC5TZXJpYWxpemVPYmplY3QobmV3IENvbW1lbnRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5ID0gY29tbWVudFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxTaW5nbGVDb21tZW50UmVzcG9uc2U+KG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGxcbntcbiAgICBjbGFzcyBGZWVkUmVzb3VyY2VzIDogQXV0aG9yaXplZFJlc291cmNlQmFzZSwgSUZlZWRSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgRmVlZFJlc291cmNlcyhJU2V0dGluZ3Mgc2V0dGluZ3MsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSkgOiBiYXNlKHVzZXJTZXJ2aWNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBfc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBHZXRGZWVkKEZlZWRSZXF1ZXN0QnVpbGRlciBidWlsZGVyKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBamF4T3B0aW9uc1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0vezF9XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLGJ1aWxkZXIuQnVpbGQoKSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxBcnRpY2xlUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5qUXVlcnkyO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFByb2ZpbGVSZXNvdXJjZXMgOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJUHJvZmlsZVJlc291cmNlc1xuICAgIHtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJU2V0dGluZ3MgX3NldHRpbmdzO1xuXG4gICAgICAgIHB1YmxpYyBQcm9maWxlUmVzb3VyY2VzKElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgSVNldHRpbmdzIHNldHRpbmdzKSA6IGJhc2UodXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8Rm9sbG93UmVzcG9uc2U+IEZvbGxvdyhzdHJpbmcgdXNlcm5hbWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS9wcm9maWxlcy97MX0vZm9sbG93XCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpLHVzZXJuYW1lKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8Rm9sbG93UmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIFRhc2s8Rm9sbG93UmVzcG9uc2U+IFVuRm9sbG93KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfS9mb2xsb3dcIix0aGlzLl9zZXR0aW5ncy5BcGlVcmksdXNlcm5hbWUpLFxuICAgICAgICAgICAgICAgIFR5cGUgPSBcIkRFTEVURVwiLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlID0gXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgQ29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuTWFrZUF1dGhvcml6ZWRDYWxsPEZvbGxvd1Jlc3BvbnNlPihvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFByb2ZpbGVSZXNwb25zZT4gR2V0KHN0cmluZyB1c2VybmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgQWpheE9wdGlvbnNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBVcmwgPSBzdHJpbmcuRm9ybWF0KFwiezB9L3Byb2ZpbGVzL3sxfVwiLHRoaXMuX3NldHRpbmdzLkFwaVVyaSx1c2VybmFtZSksXG4gICAgICAgICAgICAgICAgVHlwZSA9IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGUgPSBcImpzb25cIixcbiAgICAgICAgICAgICAgICBDb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJhc2UuVXNlclNlcnZpY2UuSXNMb2dnZWQgPyBiYXNlLk1ha2VBdXRob3JpemVkQ2FsbDxQcm9maWxlUmVzcG9uc2U+KG9wdGlvbnMpIDogYmFzZS5NYWtlQ2FsbDxQcm9maWxlUmVzcG9uc2U+KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxufVxuICIsInVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UualF1ZXJ5MjtcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlc3BvbnNlO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuU2VydmljZXMuaW1wbFxue1xuICAgIGNsYXNzIFNldHRpbmdzUmVzb3VyY2VzOiBBdXRob3JpemVkUmVzb3VyY2VCYXNlLCBJU2V0dGluZ3NSZXNvdXJjZXNcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzIF9zZXR0aW5ncztcblxuICAgICAgICBwdWJsaWMgU2V0dGluZ3NSZXNvdXJjZXMoSVNldHRpbmdzIHNldHRpbmdzLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpIDogYmFzZSh1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBUYXNrPFNldHRpbmdzUmVzcG9uc2U+IFVwZGF0ZVNldHRpbmdzKFNldHRpbmdzUmVxdWVzdCBzZXR0aW5nc1JlcXVlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gbmV3IEFqYXhPcHRpb25zXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVXJsID0gc3RyaW5nLkZvcm1hdChcInswfS91c2VyXCIsdGhpcy5fc2V0dGluZ3MuQXBpVXJpKSxcbiAgICAgICAgICAgICAgICBUeXBlID0gXCJQVVRcIixcbiAgICAgICAgICAgICAgICBEYXRhVHlwZSA9IFwianNvblwiLFxuICAgICAgICAgICAgICAgIENvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgRGF0YSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChzZXR0aW5nc1JlcXVlc3QpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmFzZS5NYWtlQXV0aG9yaXplZENhbGw8U2V0dGluZ3NSZXNwb25zZT4ob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5IdG1sNTtcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xudXNpbmcgQ29tbWVudCA9IHJlYWx3b3JsZC5zcGFmLk1vZGVscy5Db21tZW50O1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIEFydGljbGVWaWV3TW9kZWwgOiBMb2FkYWJsZVZpZXdNb2RlbFxuICAgIHtcbnB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKClcclxue1xyXG4gICAgcmV0dXJuIFNwYWZBcHAuQXJ0aWNsZUlkO1xyXG59XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX2FydGljbGVSZXNvdXJjZXM7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVVzZXJTZXJ2aWNlIF91c2VyU2VydmljZTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVByb2ZpbGVSZXNvdXJjZXMgX3Byb2ZpbGVSZXNvdXJjZXM7XG5cbiAgICAgICAgcHVibGljIEFydGljbGUgQXJ0aWNsZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxDb21tZW50PkNvbW1lbnRzIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+Q29tbWVudCB7IGdldDsgc2V0OyB9XG5wdWJsaWMgYm9vbCBJc0xvZ2dlZFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQ7XHJcbiAgICB9XHJcbn1wdWJsaWMgVXNlciBMb2dnZWRVc2VyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyU2VydmljZS5Mb2dnZWRVc2VyO1xyXG4gICAgfVxyXG59XG4gICAgICAgIHB1YmxpYyBBcnRpY2xlVmlld01vZGVsKElBcnRpY2xlUmVzb3VyY2VzIGFydGljbGVSZXNvdXJjZXMsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSwgXG4gICAgICAgICAgICBJTmF2aWdhdG9yIG5hdmlnYXRvciwgSVByb2ZpbGVSZXNvdXJjZXMgcHJvZmlsZVJlc291cmNlcylcbiAgICAgICAge1xuICAgICAgICAgICAgX2FydGljbGVSZXNvdXJjZXMgPSBhcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICAgICAgX3VzZXJTZXJ2aWNlID0gdXNlclNlcnZpY2U7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgX3Byb2ZpbGVSZXNvdXJjZXMgPSBwcm9maWxlUmVzb3VyY2VzO1xuXG4gICAgICAgICAgICB0aGlzLkFydGljbGUgPSBuZXcgQXJ0aWNsZSgpO1xuICAgICAgICAgICAgdGhpcy5Db21tZW50cyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8Q29tbWVudD4oKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTtcblxuICAgICAgICAgICAgdmFyIHNsdWcgPSBwYXJhbWV0ZXJzLkdldFBhcmFtZXRlcjxzdHJpbmc+KFwic2x1Z1wiKTtcbiAgICAgICAgICAgIGlmKHN0cmluZy5Jc051bGxPckVtcHR5KHNsdWcpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJBcnRpY2xlIHBhZ2UgbmVlZCBzbHVnIHBhcmFtZXRlclwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGFydGljbGVUYXNrID0gdGhpcy5Mb2FkQXJ0aWNsZShzbHVnKTtcbiAgICAgICAgICAgIHZhciBjb21tZW50c1Rhc2sgPSB0aGlzLkxvYWRDb21tZW50cyhzbHVnKTtcbiAgICAgICAgICAgIGF3YWl0IFRhc2suV2hlbkFsbChhcnRpY2xlVGFzayxjb21tZW50c1Rhc2spO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hCaW5kaW5nKCk7IC8vIG1hbnVhbCByZWZyZXNoIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLkVuYWJsZVNwYWZBbmNob3JzKCk7IC8vIHRvZG8gY2hlY2sgd2h5IG5vdCBhdXRvIGVuYWJsZWRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEFkZCBjb21tZW50IHRvIGFydGljbGVcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQWRkQ29tbWVudCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0xvZ2dlZCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29tbWVudFJlc3BvbnNlID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5BZGRDb21tZW50KHRoaXMuQXJ0aWNsZS5TbHVnLCB0aGlzLkNvbW1lbnQuU2VsZigpKTtcbiAgICAgICAgICAgIHRoaXMuQ29tbWVudC5TZWxmKHN0cmluZy5FbXB0eSk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnRzLnB1c2goY29tbWVudFJlc3BvbnNlLkNvbW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gRm9sbG93IEFydGljbGUgQXV0aG9yXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEZvbGxvd0F1dGhvcigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3Byb2ZpbGVSZXNvdXJjZXMuRm9sbG93KHRoaXMuQXJ0aWNsZS5BdXRob3IuVXNlcm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBNYW51YWwgcmV2YWx1YXRlIGJpbmRpbmdcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlZnJlc2hCaW5kaW5nKClcbiAgICAgICAge1xuICAgICAgICAgICAgUmV0eXBlZC5rbm9ja291dC5rby5jbGVhbk5vZGUodGhpcy5QYWdlTm9kZSk7XG4gICAgICAgICAgICBiYXNlLkFwcGx5QmluZGluZ3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIExvYWQgY29tbWVudHNcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2x1Z1wiPjwvcGFyYW0+XG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBMb2FkQ29tbWVudHMoc3RyaW5nIHNsdWcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50ID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5HZXRBcnRpY2xlQ29tbWVudHMoc2x1Zyk7XG4gICAgICAgICAgICB0aGlzLkNvbW1lbnRzLnB1c2goY29tbWVudC5Db21tZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBMb2FkIEFydGljbGUgaW5mb1xuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzbHVnXCI+PC9wYXJhbT5cbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrIExvYWRBcnRpY2xlKHN0cmluZyBzbHVnKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYXJ0aWNsZSA9IGF3YWl0IHRoaXMuX2FydGljbGVSZXNvdXJjZXMuR2V0QXJ0aWNsZShzbHVnKTtcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZSA9IGFydGljbGUuQXJ0aWNsZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHMuUmVxdWVzdDtcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzO1xudXNpbmcgUmV0eXBlZDtcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBFZGl0QXJ0aWNsZVZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElBcnRpY2xlUmVzb3VyY2VzIF9hcnRpY2xlUmVzb3VyY2VzO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElOYXZpZ2F0b3IgX25hdmlnYXRvcjtcbnB1YmxpYyBvdmVycmlkZSBzdHJpbmcgRWxlbWVudElkKClcclxue1xyXG4gICAgcmV0dXJuIFNwYWZBcHAuRWRpdEFydGljbGVJZDtcclxufVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5UaXRsZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkJvZHkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5EZXNjcmlwdGlvbiB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPlRhZ3MgeyBnZXQ7IHNldDsgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIEVkaXRBcnRpY2xlVmlld01vZGVsKElBcnRpY2xlUmVzb3VyY2VzIGFydGljbGVSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICBfYXJ0aWNsZVJlc291cmNlcyA9IGFydGljbGVSZXNvdXJjZXM7XG4gICAgICAgICAgICBfbmF2aWdhdG9yID0gbmF2aWdhdG9yO1xuICAgICAgICAgICAgdGhpcy5UaXRsZSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuQm9keSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRGVzY3JpcHRpb24gPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLlRhZ3MgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIE9uTG9hZChEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PiBwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTtcblxuLy8gICAgICAgICAgICB2YXIgYXJ0aWNsZVNsdWcgPSBwYXJhbWV0ZXJzLkdldFBhcmFtZXRlcjxzdHJpbmc+KFwic2x1Z1wiKTtcbi8vICAgICAgICAgICAgaWYoc3RyaW5nLklzTnVsbE9yRW1wdHkoYXJ0aWNsZVNsdWcpKVxuLy8gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlNsdWcgbWlzc2luZyFcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQ3JlYXRlKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gdG9kbyB2YWxpZGF0aW9uc1xuICAgICAgICAgICAgdmFyIG5ld0FydGljZWwgPSBuZXcgTmV3QXJ0aWNsZVJlcXVlc3RcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBBcnRpY2xlID0gbmV3IE5ld0FydGljbGVcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFRpdGxlID0gdGhpcy5UaXRsZS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEJvZHkgPSB0aGlzLkJvZHkuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbiA9IHRoaXMuRGVzY3JpcHRpb24uU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBUYWdMaXN0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4odGhpcy5UYWdzLlNlbGYoKS5TcGxpdCgnLCcpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBhcnRpY2xlID0gYXdhaXQgdGhpcy5fYXJ0aWNsZVJlc291cmNlcy5DcmVhdGUobmV3QXJ0aWNlbCk7XG4gICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5BcnRpY2xlSWQsZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwic2x1Z1wiLGFydGljbGUuQXJ0aWNsZS5TbHVnKTtyZXR1cm4gX28xO30pKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLk1lc3NlbmdlcjtcclxudXNpbmcgQnJpZGdlLk5hdmlnYXRpb247XHJcbnVzaW5nIEJyaWRnZS5TcGFmO1xyXG51c2luZyBCcmlkZ2UuU3BhZi5BdHRyaWJ1dGVzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xyXG51c2luZyByZWFsd29ybGQuc3BhZi5Nb2RlbHM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXNwb25zZTtcclxudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XHJcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLlNlcnZpY2VzLmltcGw7XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xyXG57XHJcbiAgICBjbGFzcyBIb21lVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcclxuICAgIHtcclxucHVibGljIG92ZXJyaWRlIHN0cmluZyBFbGVtZW50SWQoKVxyXG57XHJcbiAgICByZXR1cm4gU3BhZkFwcC5Ib21lSWQ7XHJcbn1cclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfdGFnRmlsdGVyID0gbnVsbDsgLy8gdGFnIGZpbHRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUFydGljbGVSZXNvdXJjZXMgX3Jlc291cmNlcztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElTZXR0aW5ncyBfc2V0dGluZ3M7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTWVzc2VuZ2VyIF9tZXNzZW5nZXI7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVXNlclNlcnZpY2UgX3VzZXJTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSUZlZWRSZXNvdXJjZXMgX2ZlZWRSZXNvdXJjZXM7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XHJcblxyXG4gICAgICAgICNyZWdpb24gS05PQ0tPVVRKU1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxBcnRpY2xlPkFydGljbGVzOyAvLyBhcnRpY2xlc1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxQYWdpbmF0b3I+UGFnZXM7IC8vIHBhZ2luYXRvciBoZWxwZXJcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPlRhZ3M7IC8vIHRhZ3NcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGludD5BY3RpdmVUYWJJbmRleDsgLy8gdGFiIGFjdGl2ZSBpbmRleFxyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5IDxzdHJpbmc+VGFicztcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPGJvb2w+SXNMb2dnZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG4gICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIEhvbWVWaWV3TW9kZWwoSUFydGljbGVSZXNvdXJjZXMgcmVzb3VyY2VzLCBJU2V0dGluZ3Mgc2V0dGluZ3MsIElNZXNzZW5nZXIgbWVzc2VuZ2VyLFxyXG4gICAgICAgICAgICBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UsIElGZWVkUmVzb3VyY2VzIGZlZWRSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jlc291cmNlcyA9IHJlc291cmNlcztcclxuICAgICAgICAgICAgX3NldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIF9tZXNzZW5nZXIgPSBtZXNzZW5nZXI7XHJcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xyXG4gICAgICAgICAgICBfZmVlZFJlc291cmNlcyA9IGZlZWRSZXNvdXJjZXM7XHJcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPEFydGljbGU+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGFnZXMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPFBhZ2luYXRvcj4oKTtcclxuICAgICAgICAgICAgdGhpcy5UYWdzID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlQXJyYXkuU2VsZjxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFicyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICB0aGlzLklzTG9nZ2VkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8Ym9vbD4odGhpcy5fdXNlclNlcnZpY2UuSXNMb2dnZWQpO1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4ID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8aW50PigtMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIHZvaWQgT25Mb2FkKERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IHBhcmFtZXRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uTG9hZChwYXJhbWV0ZXJzKTsgLy8gYWx3YXlzIGNhbGwgYmFzZSAod2hlcmUgYXBwbHliaW5kaW5nKVxyXG5cclxuICAgICAgICAgICAgdmFyIGFydGljbGVzVGFzayA9IHRoaXMuTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTsgLy8gbG9hZCBhcnRpY2xlIHRhc2tcclxuICAgICAgICAgICAgdmFyIGxvYWRUYWdzVGFzayA9IHRoaXMuTG9hZFRhZ3MoKTtcclxuICAgICAgICAgICAgYXdhaXQgVGFzay5XaGVuQWxsKGFydGljbGVzVGFzayxsb2FkVGFnc1Rhc2spO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZXNUYXNrLlJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBPbkxlYXZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25MZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzZW5nZXIuVW5zdWJzY3JpYmU8VXNlclNlcnZpY2U+KHRoaXMsIFNwYWZBcHAuTG9naW5JZCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBLTk9DS09VVCBNRVRIT0RTXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gdXNlciBkZXRhaWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9Vc2VyKEFydGljbGUgYXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLlByb2ZpbGVJZCwgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+KCksKF9vMSk9PntfbzEuQWRkKFwidXNlcm5hbWVcIixhcnRpY2xlLkF1dGhvci5Vc2VybmFtZSk7cmV0dXJuIF9vMTt9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTmF2aWdhdGUgdG8gYXJ0aWNsZSBkZXRhaWxcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVcIj48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdvVG9BcnRpY2xlKEFydGljbGUgYXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkFydGljbGVJZCxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIG9iamVjdD4oKSwoX28xKT0+e19vMS5BZGQoXCJzbHVnXCIsYXJ0aWNsZS5TbHVnKTtyZXR1cm4gX28xO30pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWRkIHBhc3NlZCBhcnRpY2xlIHRvIGZhdlxyXG4gICAgICAgIC8vLyBPbmx5IGZvciBhdXRoIHVzZXJzXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhcnRpY2xlXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBUYXNrIEFkZFRvRmF2b3VyaXRlKEFydGljbGUgYXJ0aWNsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc0xvZ2dlZC5TZWxmKCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBzaW5nbGVBcnRpY2xlID0gYXJ0aWNsZS5GYXZvcml0ZWQgPyBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuVW5GYXZvcml0ZShhcnRpY2xlLlNsdWcpIDogXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuRmF2b3JpdGUoYXJ0aWNsZS5TbHVnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVwbGFjZShhcnRpY2xlLHNpbmdsZUFydGljbGUuQXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdvIHRvIHVzZXIgZmVlZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBSZXNldFRhYnNGb3JGZWVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigtMik7XHJcbiAgICAgICAgICAgIHRoaXMuVGFicy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5fdGFnRmlsdGVyID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGFydGljbGVSZXNwb25zZSA9IGF3YWl0IHRoaXMuTG9hZEZlZWQoRmVlZFJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKS5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZVJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZXNldCBUYWJcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVzZXRUYWJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aXZlVGFiSW5kZXguU2VsZigtMSk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFicy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5fdGFnRmlsdGVyID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGFydGljbGVSZXNwb25zZSA9IGF3YWl0IHRoaXMuTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KCkuV2l0aExpbWl0KHRoaXMuX3NldHRpbmdzLkFydGljbGVJblBhZ2UpKTtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoUGFnaW5hdG9yKGFydGljbGVSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdvIHRvIHBhZ2VcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhZ2luYXRvclwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgVGFzayBHb1RvUGFnZShQYWdpbmF0b3IgcGFnaW5hdG9yKVxyXG4gICAgICAgIHtcclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TaW5nbGU8UGFnaW5hdG9yPiggICAgICAgICAgICB0aGlzLlBhZ2VzLlNlbGYoKSwoRnVuYzxQYWdpbmF0b3IsYm9vbD4pKHMgPT4gcy5BY3RpdmUuU2VsZigpKSkuQWN0aXZlLlNlbGYoZmFsc2UpO1xyXG4gICAgICAgICAgICBwYWdpbmF0b3IuQWN0aXZlLlNlbGYodHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IEFydGljbGVSZXF1ZXN0QnVpbGRlci5EZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIC5XaXRoT2ZmU2V0KChwYWdpbmF0b3IuUGFnZS0xKSp0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKVxyXG4gICAgICAgICAgICAgICAgLldpdGhMaW1pdCh0aGlzLl9zZXR0aW5ncy5BcnRpY2xlSW5QYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc3RyaW5nLklzTnVsbE9yRW1wdHkodGhpcy5fdGFnRmlsdGVyKSlcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LldpdGhUYWcodGhpcy5fdGFnRmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuTG9hZEFydGljbGVzKHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBGaWx0ZXIgYXJ0aWNsZXMgYnkgdGFnXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0YWdcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgRmlsdGVyQnlUYWcoc3RyaW5nIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWJOYW1lID0gc3RyaW5nLkZvcm1hdChcIiN7MH1cIix0YWcpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLkFydGljbGVzRm9yVGFiKHRhYk5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkIGFydGljbGVzIGZvciBwYXNzZWQgdGFiXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0YWJcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgQXJ0aWNsZXNGb3JUYWIoc3RyaW5nIHRhYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YWdOYW1lID0gdGFiLlRyaW1TdGFydCgnIycpO1xyXG4gICAgICAgICAgICB0aGlzLl90YWdGaWx0ZXIgPSB0YWdOYW1lO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdHVhbEluZGV4ID0gdGhpcy5UYWJzLlNlbGYoKS5JbmRleE9mKHRhYik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihhY3R1YWxJbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuVGFicy5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVRhYkluZGV4LlNlbGYodGhpcy5UYWJzLlNlbGYoKS5JbmRleE9mKHRhYikpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFydGljbGVzID0gYXdhaXQgdGhpcy5Mb2FkQXJ0aWNsZXMoQXJ0aWNsZVJlcXVlc3RCdWlsZGVyLkRlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgLldpdGhUYWcodGFnTmFtZSlcclxuICAgICAgICAgICAgICAgIC5XaXRoTGltaXQodGhpcy5fc2V0dGluZ3MuQXJ0aWNsZUluUGFnZSkpO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2hQYWdpbmF0b3IoYXJ0aWNsZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gUFJJVkFURSBNRVRIT0RTXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBhcnRpY2xlc1xyXG4gICAgICAgIC8vLyBDbGVhciBsaXN0IGFuZCByZWxvYWRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBhc3luYyBUYXNrPEFydGljbGVSZXNwb25zZT4gTG9hZEFydGljbGVzKEFydGljbGVSZXF1ZXN0QnVpbGRlciByZXF1ZXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFydGljbGVSZXNvUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuR2V0QXJ0aWNsZXMocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChhcnRpY2xlUmVzb1Jlc3BvbnNlLkFydGljbGVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGVSZXNvUmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBmZWVkXHJcbiAgICAgICAgLy8vIENsZWFyIGxpc3QgYW5kIHJlbG9hZFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2s8QXJ0aWNsZVJlc3BvbnNlPiBMb2FkRmVlZChGZWVkUmVxdWVzdEJ1aWxkZXIgcmVxdWVzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmZWVkUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9mZWVkUmVzb3VyY2VzLkdldEZlZWQocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQXJ0aWNsZXMucHVzaChmZWVkUmVzcG9uc2UuQXJ0aWNsZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmVlZFJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWxvYWQgdGFnc1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIFRhc2sgTG9hZFRhZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhZ3MgPSBhd2FpdCB0aGlzLl9yZXNvdXJjZXMuR2V0VGFncygpO1xyXG4gICAgICAgICAgICB0aGlzLlRhZ3MucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGFncy5wdXNoKHRhZ3MuVGFncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gV2hlbiB1cGRhdGUgYXJ0aWNsZXMgcmVidWlsZCBwYWdpbmF0b3JcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFydGljbGVSZXNvUmVzcG9uc2VcIj48L3BhcmFtPlxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSZWZyZXNoUGFnaW5hdG9yKEFydGljbGVSZXNwb25zZSBhcnRpY2xlUmVzb1Jlc3BvbnNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcy5yZW1vdmVBbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Bbnk8QXJ0aWNsZT4oYXJ0aWNsZVJlc29SZXNwb25zZS5BcnRpY2xlcykpIHJldHVybjsgLy8gbm8gYXJ0aWNsZXNcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBwYWdlc0NvdW50ID0gKGludCkgKGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXNDb3VudCAvIGFydGljbGVSZXNvUmVzcG9uc2UuQXJ0aWNsZXMuTGVuZ3RoKTtcclxuICAgICAgICAgICAgdmFyIHJhbmdlID0gRW51bWVyYWJsZS5SYW5nZSgxLCBwYWdlc0NvdW50KTtcclxuICAgICAgICAgICAgdmFyIHBhZ2VzID0gcmFuZ2UuU2VsZWN0PFBhZ2luYXRvcj4oKEZ1bmM8aW50LFBhZ2luYXRvcj4pKHMgPT4gbmV3IFBhZ2luYXRvclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQYWdlID0gc1xyXG4gICAgICAgICAgICB9KSkuVG9BcnJheSgpO1xyXG4gICAgICAgICAgICBwYWdlc1swXS5BY3RpdmUuU2VsZih0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5QYWdlcy5wdXNoKHBhZ2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG5cbm5hbWVzcGFjZSByZWFsd29ybGQuc3BhZi5WaWV3TW9kZWxzXG57XG4gICAgcHVibGljIGNsYXNzIExvZ2luVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpXHJcbntcclxuICAgIHJldHVybiBTcGFmQXBwLkxvZ2luSWQ7XHJcbn1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+RW1haWwgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5QYXNzd29yZCB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8Ym9vbD5Jc0J1c3kgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPkVycm9ycyB7IGdldDsgc2V0OyB9XG5cbiAgICAgICAgcHVibGljIExvZ2luVmlld01vZGVsKElOYXZpZ2F0b3IgbmF2aWdhdG9yLCBJVXNlclNlcnZpY2UgdXNlclNlcnZpY2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9uYXZpZ2F0b3IgPSBuYXZpZ2F0b3I7XG4gICAgICAgICAgICBfdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcblxuICAgICAgICAgICAgdGhpcy5FbWFpbCA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuUGFzc3dvcmQgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLklzQnVzeSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPGJvb2w+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZUFycmF5LlNlbGY8c3RyaW5nPigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBwdWJsaWMgVGFzayBMb2dpbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuSXNCdXN5LlNlbGYodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyU2VydmljZS5Mb2dpbih0aGlzLkVtYWlsLlNlbGYoKSwgdGhpcy5QYXNzd29yZC5TZWxmKCkpLkNvbnRpbnVlV2l0aCgoQWN0aW9uPFRhc2s+KShjID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5Jc0J1c3kuU2VsZihmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYy5Jc0ZhdWx0ZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3RFeGNlcHRpb24gPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PEV4Y2VwdGlvbj4oYy5FeGNlcHRpb24uSW5uZXJFeGNlcHRpb25zKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RFeGNlcHRpb24gaXMgUHJvbWlzZUV4Y2VwdGlvbilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSAoUHJvbWlzZUV4Y2VwdGlvbilTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PEV4Y2VwdGlvbj4oYy5FeGNlcHRpb24uSW5uZXJFeGNlcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldFZhbGlkYXRpb25FcnJvcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRXJyb3JzLnB1c2goU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2llbnQgXCJub3QgY29tcGxldGVkIHRhc2tcIiBjYXVzZWQgYnkgYnJpZGdlIHZlcnNpb24gKGluIGZpeClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvci5OYXZpZ2F0ZShTcGFmQXBwLkhvbWVJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF2aWdhdG9yLk5hdmlnYXRlKFNwYWZBcHAuSG9tZUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XG51c2luZyBTeXN0ZW0uTGlucTtcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XG51c2luZyBCcmlkZ2UuTmF2aWdhdGlvbjtcbnVzaW5nIEJyaWRnZS5TcGFmO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuQ2xhc3NlcztcbnVzaW5nIHJlYWx3b3JsZC5zcGFmLk1vZGVscy5SZXF1ZXN0O1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuU2VydmljZXM7XG51c2luZyBSZXR5cGVkO1xuXG5uYW1lc3BhY2UgcmVhbHdvcmxkLnNwYWYuVmlld01vZGVsc1xue1xuICAgIGNsYXNzIFJlZ2lzdGVyVmlld01vZGVsIDogTG9hZGFibGVWaWV3TW9kZWxcbiAgICB7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSU5hdmlnYXRvciBfbmF2aWdhdG9yO1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpXHJcbntcclxuICAgIHJldHVybiBTcGFmQXBwLlJlZ2lzdGVySWQ7XHJcbn1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IFVzZXJuYW1lIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IEVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZTxzdHJpbmc+IFBhc3N3b3JkIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIGtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZUFycmF5PHN0cmluZz4gRXJyb3JzIHsgZ2V0OyBzZXQ7IH1cblxuICAgICAgICBwdWJsaWMgUmVnaXN0ZXJWaWV3TW9kZWwoSU5hdmlnYXRvciBuYXZpZ2F0b3IsIElVc2VyU2VydmljZSB1c2VyU2VydmljZSlcbiAgICAgICAge1xuICAgICAgICAgICAgX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcbiAgICAgICAgICAgIF91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lID0ga25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBrbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5QYXNzd29yZCA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkVycm9ycyA9IGtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHVibGljIGFzeW5jIFRhc2sgUmVnaXN0ZXIoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5SZWdpc3Rlcih0aGlzLlVzZXJuYW1lLlNlbGYoKSwgdGhpcy5FbWFpbC5TZWxmKCksIHRoaXMuUGFzc3dvcmQuU2VsZigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Ib21lSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldFZhbGlkYXRpb25FcnJvcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KGVycm9ycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsInVzaW5nIFN5c3RlbS5MaW5xO1xudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcbnVzaW5nIEJyaWRnZS5OYXZpZ2F0aW9uO1xudXNpbmcgQnJpZGdlLlNwYWY7XG51c2luZyByZWFsd29ybGQuc3BhZi5DbGFzc2VzO1xudXNpbmcgcmVhbHdvcmxkLnNwYWYuTW9kZWxzLlJlcXVlc3Q7XG51c2luZyByZWFsd29ybGQuc3BhZi5TZXJ2aWNlcztcblxubmFtZXNwYWNlIHJlYWx3b3JsZC5zcGFmLlZpZXdNb2RlbHNcbntcbiAgICBjbGFzcyBTZXR0aW5nc1ZpZXdNb2RlbCA6IExvYWRhYmxlVmlld01vZGVsXG4gICAge1xuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElVc2VyU2VydmljZSBfdXNlclNlcnZpY2U7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSVNldHRpbmdzUmVzb3VyY2VzIF9zZXR0aW5nc1Jlc291cmNlcztcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJTmF2aWdhdG9yIF9uYXZpZ2F0b3I7XG5wdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEVsZW1lbnRJZCgpXHJcbntcclxuICAgIHJldHVybiBTcGFmQXBwLlNldHRpbmdzSWQ7XHJcbn1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+SW1hZ2VVcmkgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGUgPHN0cmluZz5Vc2VybmFtZSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkJpb2dyYXBoeSB7IGdldDsgc2V0OyB9XG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmtub2Nrb3V0Lktub2Nrb3V0T2JzZXJ2YWJsZSA8c3RyaW5nPkVtYWlsIHsgZ2V0OyBzZXQ7IH1cbiAgICAgICAgcHVibGljIFJldHlwZWQua25vY2tvdXQuS25vY2tvdXRPYnNlcnZhYmxlIDxzdHJpbmc+TmV3UGFzc3dvcmQgeyBnZXQ7IHNldDsgfVxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5rbm9ja291dC5Lbm9ja291dE9ic2VydmFibGVBcnJheSA8c3RyaW5nPkVycm9ycyB7IGdldDsgc2V0OyB9XG5cblxuICAgICAgICBwdWJsaWMgU2V0dGluZ3NWaWV3TW9kZWwoSVVzZXJTZXJ2aWNlIHVzZXJTZXJ2aWNlLCBJU2V0dGluZ3NSZXNvdXJjZXMgc2V0dGluZ3NSZXNvdXJjZXMsIElOYXZpZ2F0b3IgbmF2aWdhdG9yKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NSZXNvdXJjZXMgPSBzZXR0aW5nc1Jlc291cmNlcztcbiAgICAgICAgICAgIHRoaXMuX25hdmlnYXRvciA9IG5hdmlnYXRvcjtcblxuICAgICAgICAgICAgdGhpcy5JbWFnZVVyaSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuVXNlcm5hbWUgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLkJpb2dyYXBoeSA9IFJldHlwZWQua25vY2tvdXQua28ub2JzZXJ2YWJsZS5TZWxmPHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMuRW1haWwgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGUuU2VsZjxzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLk5ld1Bhc3N3b3JkID0gUmV0eXBlZC5rbm9ja291dC5rby5vYnNlcnZhYmxlLlNlbGY8c3RyaW5nPigpO1xuICAgICAgICAgICAgdGhpcy5FcnJvcnMgPSBSZXR5cGVkLmtub2Nrb3V0LmtvLm9ic2VydmFibGVBcnJheS5TZWxmPHN0cmluZz4oKTtcblxuICAgICAgICAgICAgdGhpcy5Qb3B1bGF0ZUVudHJpZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBQb3B1bGF0ZUVudHJpZXMoKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHRoaXMuX3VzZXJTZXJ2aWNlLkxvZ2dlZFVzZXI7XG4gICAgICAgICAgICB0aGlzLlVzZXJuYW1lLlNlbGYodXNlci5Vc2VybmFtZSk7XG4gICAgICAgICAgICB0aGlzLkVtYWlsLlNlbGYodXNlci5FbWFpbCk7XG4gICAgICAgICAgICB0aGlzLkltYWdlVXJpLlNlbGYodXNlci5JbWFnZSk7XG4gICAgICAgICAgICB0aGlzLkJpb2dyYXBoeS5TZWxmKHVzZXIuQmlvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgYXN5bmMgVGFzayBVcGRhdGVTZXR0aW5ncygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nc1JlcXVlc3QgPSBuZXcgU2V0dGluZ3NSZXF1ZXN0XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBVc2VybmFtZSA9IHRoaXMuVXNlcm5hbWUuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBOZXdQYXNzd29yZCA9IHRoaXMuTmV3UGFzc3dvcmQuU2VsZigpLFxuICAgICAgICAgICAgICAgICAgICBCaW9ncmFwaHkgPSB0aGlzLkJpb2dyYXBoeS5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEVtYWlsID0gdGhpcy5FbWFpbC5TZWxmKCksXG4gICAgICAgICAgICAgICAgICAgIEltYWdlVXJpID0gdGhpcy5JbWFnZVVyaS5TZWxmKClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJVcGRhdGVkID0gYXdhaXQgdGhpcy5fc2V0dGluZ3NSZXNvdXJjZXMuVXBkYXRlU2V0dGluZ3Moc2V0dGluZ3NSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXZpZ2F0b3IuTmF2aWdhdGUoU3BhZkFwcC5Qcm9maWxlSWQpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoUHJvbWlzZUV4Y2VwdGlvbiBlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBlLkdldFZhbGlkYXRpb25FcnJvcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVycm9ycy5wdXNoKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuVG9BcnJheTxzdHJpbmc+KGVycm9ycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl0KfQo=
