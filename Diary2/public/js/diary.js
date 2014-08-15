/**
 * Diary Model
 */

define([], function(){
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
         * get recent diaries and call when loaded or failed.
         *
         * @param [cond] condition.
         *   @param cond.num number of diaries.
         * @param callback callback function if success.
         * @param errCallback callback function if failure.
         */
        getRecentDiaries: function(cond, callback, errCallback){
            // dummy data.
            var d1 = new Diary();
            d1.title = "title1",
            d1.content = "<p>content1.</p>";
            d1.date = new Date("2014-08-01");
            var d2 = new Diary();
            d2.title = "title2";
            d2.content = "<p>content2.</p>";
            d2.date = new Date("2014-08-02");

            callback([ d2, d1 ]);
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
                condition.startDate = cond.startDate.getFullYear()
                    + "0" + (cond.startDate.getMonth() + 1)
                    + cond.startDate.getDate();
            }

            $.ajax({
                type: "GET",
                url: "/get",
                date: condition
            }).done(function(data){
                callback(data);
            }).fail(function(){
                errCallback();
            });
        }
    };
});