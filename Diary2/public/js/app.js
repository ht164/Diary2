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
            "components/jquery/dist/jquery.min"
        ],
        underscore: [
            "components/underscore/underscore"
        ]
    },

    shim: {
        underscore: {
            exports: "_"
        },
    }
});

/**
 * application module
 */
define();

