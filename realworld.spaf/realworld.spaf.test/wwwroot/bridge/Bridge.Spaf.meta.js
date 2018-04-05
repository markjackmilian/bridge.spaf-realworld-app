Bridge.assembly("Bridge.Spaf", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,System.Collections.Generic,Bridge.Spaf,Bridge.Spaf.Attributes];
    $m($n[2].LoadableViewModel, function () { return {"att":1048705,"a":2,"m":[{"a":3,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"v":true,"a":2,"n":"OnLeave","t":8,"sn":"OnLeave","rt":$n[0].Void},{"v":true,"a":2,"n":"OnLoad","t":8,"pi":[{"n":"parameters","pt":$n[1].Dictionary$2(System.String,System.Object),"ps":0}],"sn":"OnLoad","rt":$n[0].Void,"p":[$n[1].Dictionary$2(System.String,System.Object)]}]}; });
    $m($n[2].ViewModelBase, function () { return {"att":1048705,"a":2,"m":[{"a":3,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ApplyBindings","t":8,"sn":"ApplyBindings","rt":$n[0].Void},{"ab":true,"a":2,"n":"ElementId","t":8,"sn":"ElementId","rt":$n[0].String},{"a":2,"n":"RemoveBindings","t":8,"sn":"RemoveBindings","rt":$n[0].Void},{"a":3,"n":"PageNode","t":16,"rt":HTMLElement,"g":{"a":3,"n":"get_PageNode","t":8,"rt":HTMLElement,"fg":"PageNode"},"fn":"PageNode"},{"a":1,"n":"_pageNode","t":4,"rt":HTMLElement,"sn":"_pageNode"}]}; });
    $m($n[3].SingleInstanceAttribute, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"}]}; });
});
