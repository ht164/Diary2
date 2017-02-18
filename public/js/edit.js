/**
 * edit page.
 */

// configure require.js
requirejs.config({
    baseUrl: "/js/",
    paths: {
        jquery: [
            "/components/jquery/dist/jquery.min"
        ],
        marked: [
            "/components/marked/marked.min"
        ]
    }
});

require(["jquery", "marked"]);
