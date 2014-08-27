/**
 * front-end side controller.
 */

define(["view", "diary"], function(view, diary){
    return {
        /**
         * show recent diaries.
         */
        showRecentDiaries: function(){
            var onLoad = function(diaries){
                view.showDiaries(diaries);
                view.endLoading();
            };
            var onFail = function(){
                view.endLoading();
            };
            // show loading.
            view.startLoading();
            // get recent diaryies.
            diary.getRecentDiaries({}, onLoad, onFail);
        },

        /**
         * set infinite scroll.
         */
        setInfiniteScroll: function(){
            var me = this;
            view.onFireLoadingNextData = function(){
                // TODO load next diaries.
                me.showRecentDiaries();
                // 
                view.setInfiniteScroll();
            };
            view.setInfiniteScroll();
        }
    };
});
