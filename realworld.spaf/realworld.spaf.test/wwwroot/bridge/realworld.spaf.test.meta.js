Bridge.assembly("realworld.spaf.test", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System.Threading.Tasks,System,realworld.spaf.Models];
    $m("realworld.spaf.test.ArticleResourceTest", function () { return {"att":1048577,"a":2,"at":[new Bridge.EasyTests.Attributes.TestAttribute.ctor()],"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"at":[new Bridge.EasyTests.Attributes.TestMethodAttribute(null)],"a":2,"n":"GetArticleReturnArticles","t":8,"sn":"GetArticleReturnArticles","rt":$n[0].Task}]}; });
    $m("realworld.spaf.test.FakeUserService", function () { return {"att":1048576,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Login","t":8,"pi":[{"n":"mail","pt":$n[1].String,"ps":0},{"n":"password","pt":$n[1].String,"ps":1}],"sn":"Login","rt":$n[0].Task,"p":[$n[1].String,$n[1].String]},{"a":2,"n":"Register","t":8,"pi":[{"n":"username","pt":$n[1].String,"ps":0},{"n":"mail","pt":$n[1].String,"ps":1},{"n":"password","pt":$n[1].String,"ps":2}],"sn":"Register","rt":$n[0].Task,"p":[$n[1].String,$n[1].String,$n[1].String]},{"a":2,"n":"TryAutoLoginWithStoredToken","t":8,"sn":"TryAutoLoginWithStoredToken","rt":$n[0].Task},{"a":2,"n":"IsLogged","t":16,"rt":$n[1].Boolean,"g":{"a":2,"n":"get_IsLogged","t":8,"rt":$n[1].Boolean,"fg":"IsLogged","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"fn":"IsLogged"},{"a":2,"n":"LoggedUser","t":16,"rt":$n[2].User,"g":{"a":2,"n":"get_LoggedUser","t":8,"rt":$n[2].User,"fg":"LoggedUser"},"fn":"LoggedUser"}]}; });
});
