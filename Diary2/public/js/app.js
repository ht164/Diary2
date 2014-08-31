/**
 * @file app.js
 * 
 * application class
 */

// configure require.js
requirejs.config({
    baseUrl: "/js/",
    paths: {
        jquery: [
            "/components/jquery/dist/jquery.min"
        ],
        jquery_inview: [
            "/components/jquery.inview/jquery.inview.min"
        ],
        underscore: [
            "/components/underscore/underscore"
        ],
        bootstrap: [
            "/components/bootstrap/dist/js/bootstrap.min"
        ]
    },

    shim: {
        underscore: {
            exports: "_"
        },
        bootstrap: {
            deps: [ "jquery" ]
        }
    },

    // TODO: appVer.
    urlArgs: "v=0.0.2"
});

// load bootstrap so that navbar toggle works.
require(["jquery", "bootstrap"]);

/**
 * application module
 */
define(["controller"], function(controller){
    // set infinite scroll.
    controller.setInfiniteScroll();
    // initial processing.
    var ret = location.toString().match(/diary(\/.*)/);
    if (ret) {
        controller.showSpecifiedDiaries(ret[1]);
    } else {
        controller.showRecentDiaries();
    }
});