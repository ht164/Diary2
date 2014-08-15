/**
 * front-end side view.
 */

define(["jquery", "underscore"], function(jquery, _){
    return {
        /**
         * consts.
         */
        DIARY_CLASS: "diary",
        DIARY_TITLE_CLASS: "diary_title",
        DIARY_CONTENT_CLASS: "diary_content",
        DIARY_DATE_CLASS: "diary_date",
        DIARY_SHOWING_BLOCK_ID: "mainBlock",

        /**
         * show diaries newly.
         */
        showDiaries: function(diaries){
            var me = this;
            _.each(diaries, function(diary) {
                var fragments = "<div class='" + me.DIARY_CLASS + "'>";
                fragments += "<div class='" + me.DIARY_TITLE_CLASS + "'>";
                fragments += "<div class='" + me.DIARY_DATE_CLASS + "'>";
                fragments += diary.date.getFullYear() + "/" + (diary.date.getMonth() + 1) + "/" + diary.date.getDate();
                fragments += "</div>";
                fragments += diary.title;
                fragments += "</div>";
                fragments += "<div class='" + me.DIARY_CONTENT_CLASS + "'>";
                fragments += diary.content;
                fragments += "</div>";
                fragments += "</div>";
                $(fragments).appendTo("#" + me.DIARY_SHOWING_BLOCK_ID);
            });
        }
    };
});