/**
 * @file app.js
 * 
 * application class
 */

// configure require.js
requirejs.config({
    baseUrl: "js/",
    paths: {
        jquery: [
            "../components/jquery/dist/jquery.min"
        ],
        underscore: [
            "../components/underscore/underscore"
        ],
        bootstrap: [
            "../components/bootstrap/dist/js/bootstrap.min"
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

/**
 * application module
 */
define(["controller"], function(controller){
    // initial processing.
    controller.showRecentDiaries();
});