/**
 * Diary Model
 */

define(["jquery"], function($){
    /**
     * private class
     */
    function Diary(){
        this.title = "";
        this.content = "";
        this.date = null;
    };

    return {
        /**
         * return empty diary instance.
         */
        getEmptyDiary: function(){
            return new Diary();
        },

        /**
         * get diaries and call when loaded or failed.
         *
         * @param [cond] condition.
         *   @param cond.num number of diaries.
         *   @param cond.year year.
         *   @param cond.month month.
         *   @param cond.date date.
         * @param callback callback function if success.
         * @param errCallback callback function if failure.
         */
        getDiaries: function(cond, callback, errCallback){
            var me = this;
            me.getDiariesFromServer(cond, callback, errCallback);
        },

        /**
         * get diary data from web server.
         *
         * @param cond condition.
         *   @param cond.num number of diaries.
         *   @param cond.year diary date range (year).
         *   @param cond.month diary date range (month).
         *   @param cond.date diary date range (date).
         *   @param cond.startDate start date.
         * @param callback callback function if success.
         * @param errCallback callback function if failure.
         */
        getDiariesFromServer: function(cond, callback, errCallback){
            var condition = {};
            if (cond.num) condition.num = cond.num;
            if (cond.year) {
                condition.date = "" + cond.year;
                if (cond.month) {
                    condition.date += cond.month;
                    if (cond.date) {
                        condition.date += cond.date;
                    }
                }
            }
            if (cond.startDate) {
                condition.startDate = (function(){
                    var y = cond.startDate.getFullYear();
                    var m = cond.startDate.getMonth() + 1;
                    var d = cond.startDate.getDate();

                    return "" + y + (m < 10 ? "0" + m : m) + (d < 10 ? "0" + d : d);
                })();
            }

            $.ajax({
                type: "GET",
                url: "/get",
                data: condition
            }).done(function(data){
                callback(data);
            }).fail(function(){
                errCallback();
            });
        },

        /**
         * get recent diary list from web server.
         *
         * @param callback callback function if success.
         * @param errCallback callback function if failure.
         */
        getRecentDiaryList: function(callback, errCallback){
            $.ajax({
                type: "GET",
                url: "/recent/diary"
            }).done(function(data){
                callback(data);
            }).fail(function(){
                errCallback();
            });
        },

        /**
         * get diary-having date list from web server.
         *
         * @param cond
         * @param callback callback function is success.
         * @param errCallback callback function if failure.
         */
        getDiaryHavingDateList: function(cond, callback, errCallback){
            var strYM = "" + cond.year
                + (cond.month 
                    ? "/" + (cond.month < 10 ? "0" + cond.month : cond.month)
                    : "");

            $.ajax({
                type: "GET",
                url: "/get/dateonly/" + strYM
            }).done(function(data){
                callback(data)
            }).fail(function(){
                errCallback();
            });
        },

        /**
         * get monthly diary from web server.
         *
         * @param callback callback function if success.
         * @param errCallback callback function if failure.
         */
        getMonthlyDiaries: function(callback, errCallback){
            $.ajax({
                type: "GET",
                url: "/monthlydiary"
            }).done(function(data){
                callback(data);
            }).fail(function(){
                errCallback();
            });
        }
    };
});