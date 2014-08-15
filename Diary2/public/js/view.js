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
                var fragment = me.createDiaryFragment(diary);
                $(fragment).appendTo("#" + me.DIARY_SHOWING_BLOCK_ID);
            });
        },

        /**
         * create diary html fragment.
         */
        createDiaryFragment: function(diary) {
            var me = this;
            var diaryDate = new Date(diary.date);
            var fragment = "<div class='" + me.DIARY_CLASS + "'>";
            fragment += "<div class='" + me.DIARY_TITLE_CLASS + "'>";
            fragment += "<div class='" + me.DIARY_DATE_CLASS + "'>";
            fragment += diaryDate.getFullYear() + "/" + (diaryDate.getMonth() + 1) + "/" + diaryDate.getDate();
            fragment += "</div>";
            fragment += diary.title;
            fragment += "</div>";
            fragment += "<div class='" + me.DIARY_CONTENT_CLASS + "'>";
            fragment += diary.content;
            fragment += "</div>";
            fragment += "</div>";
            return fragment;
        }
    };
});