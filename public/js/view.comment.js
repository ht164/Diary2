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
        COMMENT_NOT_EXIST: "コメントはありません",
        COMMENT_CLASS: "comment",

        /**
         * create comment block element.
         *
         * @param comments Array<Comment> array of comment object.
         */
        createElement: function(comments) {
            var me = this;
            comments = comments || [];

            var el = $("<div class='"+ me.COMMENT_CLASS + "'>");
            $(me._createCommentFragment(comments)).appendTo(el);

            return el;
        },

        /**
         * create comment fragment.
         */
        _createCommentFragment: function(comments) {
            var me = this;
            var fragment = "";
            fragment += "<h3>" + me.COMMENT_STRING + "</h3>";
            fragment += "<ul>";
            if (comments.length > 0) {
                _.each(comments, function(comment){
                    fragment += "<li class='list-unstyled'>";
                    fragment += "<span class='comment-speaker'>";
                    fragment += comment.speaker;
                    fragment += ":</span> <span class='comment-comment'>";
                    fragment += comment.comment;
                    fragment += "</span> <span class='comment-date'>";
                    fragment += comment.date;
                    fragment += "</span>";
                    fragment += "</li>";
                });
            } else {
                fragment += "<li class='list-unstyled'>" + me.COMMENT_NOT_EXIST + "</li>";
            }
            fragment += "</ul>";
            return fragment;
        }
    };
});