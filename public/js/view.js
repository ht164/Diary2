/**
 * front-end side view.
 */

define(["util", "view.comment", "view.monthlydiary", "jquery", "underscore", "jquery_inview"],
    function(Util, ViewComment, ViewMonthlyDiary, $, _){
    var _c = {
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

        INFINITE_SCROLL_TRIGGER_ID: "infiniteScrollTrigger",
        INFINITE_SCROLL_LOADINGIMG_ID: "loadingImage",

        BUTTON_SCROLL_TO_TOP_CLASS: "scroll-to-top",
        BUTTON_SCROLL_TO_TOP_DISPLAYING_THRESHOLD: 100,

        /**
         * properties
         */
        _displayingScrollToTopButton: false,


        /**
         * initialize.
         *
         * set infinite scroll event.
         * set scroll-to-top button.
         */
        _initialize: function() {
            var me = this;

            $("div#" + me.INFINITE_SCROLL_TRIGGER_ID)
            .on("inview", function(event, isInView, visiblePartX, visiblePartY){
                if (visiblePartX == "both" && visiblePartY == "both") {
                    $("div#" + me.INFINITE_SCROLL_LOADINGIMG_ID).css("visibility", "visible");
                    me.onFireLoadingNextData();
                }
            });

            // if touch device (ontouchstart event exists), use toucnend event.
            // otherwise, use click event.
            var evtClick = ("ontouchstart" in window) ? "touchend" : "click";
            $("div." + me.BUTTON_SCROLL_TO_TOP_CLASS).on(evtClick, function(event){
                event.preventDefault();
                $("html").animate({
                    scrollTop: 0
                }, "fast");
            });

            var displayScrollToTopButton = function(){
                var button = $("div." + me.BUTTON_SCROLL_TO_TOP_CLASS);
                if ($("html").scrollTop() > me.BUTTON_SCROLL_TO_TOP_DISPLAYING_THRESHOLD){
                    if (!me._displayingScrollToTopButton) {
                        button.css("visibility", "visible");
                        button.animate({
                            opacity: 1.0
                        }, "slow");
                        me._displayingScrollToTopButton = true;
                    }
                } else {
                    if (me._displayingScrollToTopButton) {
                        button.animate({
                            opacity: 0.0
                        }, "slow", function(){
                            button.css("visibility", "hidden");
                        });
                        me._displayingScrollToTopButton = false;
                    }
                }
            };
            $(window).scroll(function(event){
                displayScrollToTopButton();
            });

            displayScrollToTopButton();
        },

        /**
         * show diaries newly.
         */
        showDiaries: function(diaries){
            var me = this;
            var diaryBlock = $("#" + me.DIARY_SHOWING_BLOCK_ID);
            _.each(diaries, function(diary) {
                var diaryElement = $("<div class='" + me.DIARY_CLASS + "'></div>");
                diaryElement.appendTo(diaryBlock);
                $(me.createDiaryFragment(diary)).appendTo(diaryElement);
                ViewComment.createElement(diary.comments, diary.date).appendTo(diaryElement);
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
            fragment += "<div class='" + me.DIARY_TITLE_CLASS + "'>";
            fragment += "<h2>";
            fragment += "<a href='" + Util.generateDiaryPermalinkUrl(diary.date) + "'>";
            fragment += diary.title;
            fragment += "</a>";
            fragment += "</h2>";
            fragment += "</div>";
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
         * set infinite scroll.
         * 
         * trigger is div#infinite-scroll-trigger.
         * when div appeares, fire onFireLoadingNextData event.
         */
        setInfiniteScroll: function() {
            var me = this;
            $("div#" + me.INFINITE_SCROLL_TRIGGER_ID).css("display", "block");
        },

        /**
         * set infinite scroll disabled.
         *
         * let trigger div be invisible (display: hidden).
         */
        disableInfiniteScroll: function() {
            var me = this;
            $("div#" + me.INFINITE_SCROLL_TRIGGER_ID).css("display", "none");
        },

        /**
         * notify the end of loading to view after onFireLoadingNextData event.
         */
        notifyEndOfLoading: function() {
            var me = this;
            $("div#" + me.INFINITE_SCROLL_LOADINGIMG_ID).css("visibility", "hidden");
        },

        /**
         * show recent diary list.
         */
        getRecentDiaryList: function(diaryList) {
            var me = this;
            if (diaryList.length > 0) {
                // create html fragment.
                var fragment = "<ul class='list-unstyled'>";
                _.each(diaryList, function(diary){
                    var _date = new Date(diary.date)
                    var year = _date.getFullYear();
                    var month = "" + ((_date.getMonth() + 1) < 10 ? "0" : "") + (_date.getMonth() + 1)
                    var date = "" + (_date.getDate() < 10 ? "0" : "") + _date.getDate();
                    var dateStr = year + "/" + month + "/" + date;
                    var href = "/diary/" + year + "/" + month + "/" + date;
                    fragment += "<li>"
                        + "<a href='" + href + "'>"
                        + diary.title + " (" + dateStr + ")"
                        + "</a></li>";
                });
                fragment += "</ul>";
                $("div#recentDiaryBlock").html(fragment);
            }
        },

        /**
         * show monthly diary.
         */
        showMonthlyDiaries: function(monthlydiaries){
            ViewMonthlyDiary.showMonthlyDiaries(monthlydiaries);
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

    // initialize.
    _c._initialize();

    return _c;
});