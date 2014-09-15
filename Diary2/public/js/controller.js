/**
 * front-end side controller.
 */

define(["view", "diary", "calendar", "underscore"], 
    function(view, diary, Calendar, _){
    return {
        // loading date.
        _loadingDate: null,
        // last loaded diary's date.
        _lastDiaryDate: null,
        // end date.
        _endDate: null,

        /**
         * show recent diaries.
         */
        showRecentDiaries: function(){
            var me = this;
            me.showDiaries();
        },

        /**
         * show specified diaries.
         *
         * @param restUrl
         */
        showSpecifiedDiaries: function(restUrl) {
            var me = this;
            // get year, month and date from url.
            var ret = restUrl.match(/\/([0-9]{4})($|\/([0-9]{2})($|\/([0-9]{2})))/);
            if (!ret) return;
            var cond = {
                year: ret[1],
                month: ret[3],
                date: ret[5]
            };
            me.showDiaries(cond);

            // set loading date.
            me._loadingDate = {
                year: ret[1],
                month: ret[3],
                date: ret[5]
            };
            // set end date.
            var endYear = ret[1];
            var endMonth = ret[3] || "01";
            var endDate = ret[5] || "01";
            me._endDate = new Date(endYear + "-" + endMonth + "-" + endDate);
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
                    // if loaded diary comes to endDate, disable infinite scroll.
                    if (me._endDate && me._endDate >= new Date(diaries[diaries.length - 1].date)) {
                        view.disableInfiniteScroll();
                    }
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
                me.showDiaries(_.extend({
                    startDate: startDate
                }, me._loadingDate));
            };
        },

        /**
         * show recent diary list.
         */
        showRecentDiaryList: function(){
            var me = this;
            diary.getRecentDiaryList(function(diaryList){
                view.getRecentDiaryList(diaryList);
            }, function(){
                // do nothing.
            });
        },

        /**
         * show calendar.
         */
        showCalendar: function(){
            var me = this;
            var calendar = new Calendar();

            // function that create diary link array.
            var createDiaryLinkArray = function(dateList){
                var ar = [];
                _.each(dateList, function(date){
                    var d = new Date(date);
                    ar[d.getDate()] = true;
                });
                return ar;
            };

            // onClickPrevNextMonth
            var onClickPrevNextMonth = function(arg) {
                // get date list.
                diary.getDiaryHavingDateList({
                    year: arg.year,
                    month: arg.month
                }, function(dateList){
                    arg.setDates(createDiaryLinkArray(dateList));
                });
            }

            // get date list of this month.
            var date = new Date();
            diary.getDiaryHavingDateList({
                year: date.getFullYear(),
                month: date.getMonth() + 1
            }, function(dateList){
                // show calendar.
                calendar.show({
                    elementId: "calendar",
                    dates: createDiaryLinkArray(dateList),
                    onClickPrevMonth: onClickPrevNextMonth,
                    onClickNextMonth: onClickPrevNextMonth
                });
            });
        }
    };
});
