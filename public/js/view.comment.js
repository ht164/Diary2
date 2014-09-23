/**
 * front-end side view.
 * comment for each diary entry.
 */

define(["jquery", "underscore", "moment"], function($, _, moment){
    return {
        /**
         * consts.
         */
        COMMENT_STRING: "コメント",
        COMMENT_NOT_EXIST: "コメントはありません",
        COMMENT_CLASS: "comment",
        COMMENT_HOUR_BEFORE: "時間前",
        COMMENT_MINUTE_BEFORE: "分前",

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
                    fragment += "</span> <span class='comment-date'>(";
                    fragment += me._generateDateFragment(new Date(comment.postDate));
                    fragment += ")</span>";
                    fragment += "</li>";
                });
            } else {
                fragment += "<li class='list-unstyled'>" + me.COMMENT_NOT_EXIST + "</li>";
            }
            fragment += "</ul>";
            return fragment;
        },

        /**
         * generate comment date html.
         * if date is less than 1 day before, "xx hour before".
         * if date is less than 1 hour before, "xx minute before".
         * otherwise, "yyyy-mm-dd".
         * popup "yyyy-mm-dd hh:mm".
         *
         * @param date Date object.
         * @return html fragment.
         */
        _generateDateFragment: function(date) {
            var me = this;
            var momentDate = new moment(date);
            var diffNow = (new moment()).diff(momentDate, "minutes");

            var fragment = "<span title='" + momentDate.format("YYYY-MM-DD HH:mm") + "'>";
            if (diffNow < 60) {
                fragment += diffNow + me.COMMENT_MINUTE_BEFORE;
            } else if (diffNow < 1440) {
                fragment += Math.round(diffNow / 60) + me.COMMENT_HOUR_BEFORE;
            } else {
                fragment += momentDate.format("YYYY-MM-DD");
            }
            fragment += "</span>";

            return fragment;
        }
    };
});