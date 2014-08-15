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
         * return recent diaries.
         *
         * @param [cond] condition.
         *   @param cond.num number of diaries.
         * @return Array<Diary> array of Diary instance.
         */
        getRecentDiaries: function(cond){
            // dummy data.
            var d1 = new Diary();
            d1.title = "title1",
            d1.content = "<p>content1.</p>";
            d1.date = new Date("2014-08-01");
            var d2 = new Diary();
            d2.title = "title2";
            d2.content = "<p>content2.</p>";
            d2.date = new Date("2014-08-02");

            return [ d2, d1 ];
        }
    };
});