/**
 * front-end side view.
 * comment for each diary entry.
 */

define(["jquery", "underscore"], function($, _){
    return {
        /**
         * consts.
         */
        COMMENT_STRING: "コメント",
        COMMENT_CLASS: "comment",

        /**
         * create comment block element.
         *
         * @param comments Array<Comment> array of comment object.
         */
        createCommentElement: function(comments) {
            var me = this;

            var el = $("<div class='"+ me.COMMENT_CLASS + "'>");
            el.add(me._createCommentFragment(comments));

            return el;
        },

        /**
         * create comment fragment.
         */
        _createCommentFragment: function(comments) {
            var me = this;
            var fragment = "";
            fragment += "<h3>" + me.COMMENT_STRING + "</h3>";
            if (comments.length > 0) {
                fragment += "<ul>";
                _.each(comments, function(comment){
                    fragment += "<li class='list-unstyled'>" + comment + "</li>";
                }
                fragment += "</ul>";
            }
            return fragment;
        }
    };
});