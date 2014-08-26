/**
 * front-end side view.
 */

define(["jquery", "underscore", "jquery_inview"], function($, _){
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

        LOADING_CLASS: "loading",
        LOADING_HIDDEN_CLASS: "loading-hidden",

        INFINITE_SCROLL_TRIGGER_ID: "infiniteScrollTrigger",

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
            fragment += "<div class='" + me.DIARY_CLASS + "'>";
            fragment += me.createDateFragment(diaryDate);
            fragment += "<h2>";
            fragment += diary.title;
            fragment += "</h2>";
            fragment += "<hr>";
            fragment += "<div class='" + me.DIARY_CONTENT_CLASS + "'>";
            fragment += diary.content;
            fragment += "</div>";
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
        },

        /**
         * start loading style.
         * show loading image.
         */
        startLoading: function() {
            var me = this;
            $("." + me.LOADING_CLASS).removeClass(me.LOADING_HIDDEN_CLASS);
        },

        /**
         * end loading style.
         * hide loading image.
         */
        endLoading: function() {
            var me = this;
            $("." + me.LOADING_CLASS).addClass(me.LOADING_HIDDEN_CLASS);
        },

        /**
         * set infinite scroll.
         * 
         * trigger is div#infinite-scroll-trigger.
         * when div appeares, fire onFireLoadingNextData event.
         */
        setInfiniteScroll: function() {
            var me = this;
            var divTrigger = $("div#" + me.INFINITE_SCROLL_TRIGGER_ID);
            divTrigger.css("display", "block")
            .on("inview", function(event, isInView, visiblePartX, visiblePartY){
                if (visiblePartX == "both" && visiblePartY == "both") {
                    divTrigger.css("display", "none");
                    me.onFireLoadingNextData();
                }
            });
        },

        /**
         * events
         */
        /**
         * onFireLoadingNextData
         * 
         * fire when infinite-scroll emelent appears.
         * after event fired, infinite-scroll element goes to be disabled.
         */
        onFireLoadingNextData: function() {
        }

    };
});