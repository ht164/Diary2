/**
 * front-end side view.
 */

define(["jquery", "underscore"], function(jquery, _){
    return {
        /**
         * consts.
         */
        DIARY_CLASS: "diary",
        DIARY_TITLE_CLASS: "diary-title",
        DIARY_CONTENT_CLASS: "diary-content",
        DIARY_DATE_CLASS: "diary-date",
        DIARY_DATE_YEAR_CLASS: "diary-date-year",
        DIARY_DATE_MONTH_CLASS: "diary-date-month",
        DIARY_DATE_DATE_CLASS: "diary-date-date",
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
            var fragment = "";
            fragment += me.createDateFragment(diaryDate);
            fragment += "<h2>";
            fragment += diary.title;
            fragment += "</h2>";
            fragment += "<hr>";
            fragment += "<div class='" + me.DIARY_CONTENT_CLASS + "'>";
            fragment += diary.content;
            fragment += "</div>";
            return fragment;
        },

        /**
         * create date html fragment.
         *
         * @param date Date object.
         * @return html fragment.
         */
        createDateFragment: function(date) {
            var me = this;
            var monthStr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            var fragment = "";
            fragment += "<div class='" + me.DIARY_DATE_CLASS + "'>";
            fragment += "<div class='" + me.DIARY_DATE_MONTH_CLASS + "'>";
            fragment += monthStr[date.getMonth()];
            fragment += "</div>";
            fragment += "<div class='" + me.DIARY_DATE_DATE_CLASS + "'>";
            fragment += date.getDate();
            fragment += "</div>";
            fragment += "<div class='" + me.DIARY_DATE_YEAR_CLASS + "'>";
            fragment += date.getFullYear();
            fragment += "</div></div>";
            return fragment;
        }
    };
});