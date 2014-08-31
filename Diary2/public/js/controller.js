/**
 * front-end side controller.
 */

define(["view", "diary"], function(view, diary){
    return {
        // last loaded diary's date.
        _lastDiaryDate: null,

        /**
         * show recent diaries.
         */
        showRecentDiaries: function(){
            var me = this;
            me.showDiaries();
        },

        /**
         * show diaries.
         */
        showDiaries: function(cond) {
            var me = this;
            var onLoad = function(diaries){
                if (diaries.length > 0) {
                    // store last loaded diary's date.
                    me._lastDiaryDate = diaries[diaries.length - 1].date;
                    view.showDiaries(diaries);
                } else {
                    // all data is loaded. disable infinite scroll.
                    view.disableInfiniteScroll();
                }
                // notify the end of loading to view.
                view.notifyEndOfLoading();
            };
            var onFail = function(){
                // notify the end of loading to view.
                view.notifyEndOfLoading();
            };
            // get recent diaryies.
            cond = cond || {};
            cond.num = 1;
            diary.getDiaries(cond, onLoad, onFail);
        },

        /**
         * set infinite scroll.
         */
        setInfiniteScroll: function(){
            var me = this;
            view.onFireLoadingNextData = function(){
                // startdate is _lastDiaryDate - 1day.
                // 1day is 86,400,000 msec.
                var startDate = new Date((new Date(me._lastDiaryDate)).getTime() - 86400000);
                me.showDiaries({
                    startDate: startDate
                });
            };
        }
    };
});
