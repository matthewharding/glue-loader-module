
# glue-loader-module

Package manager for GLUE.


1.) Add jQuery and loader script on a page.

2.) Add classes on the &lt;body&gt; tag to load specific libraries (For ex - qg-glue-charts to load charts libraries ). If loader can not find any specific classes it will load common libraries (which are common to all modules) like bootstap , jquery etc
```javascript
(function($) {
    "use strict";
    qg.glue.loader.init(function () {
        // code here
    });
}(jQuery));


