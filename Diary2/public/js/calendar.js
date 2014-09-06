/**
 * Calendar module.
 *
 * show calendar and link of year, month, date.
 */

define(["jquery", "underscore"], function($, _){
    /**
     * Calendar class
     *
     * @param initialDate
     */
    function Calendar(initialDate){
        initialDate = initialDate || new Date();
        this.year = initialDate.getFullYear();
        this.month = initialDate.getMonth() + 1;
        this.datesHavingLink = [];

        this.elementId = null;
    };

    /**
     * methods.
     */
    Calendar.prototype = {
        /**
         * consts.
         */
        WEEK_STRING: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],

        /**
         * show calendar in specified element.
         *
         * @param options
         *    @param options.elementId element id.
         *    @param options.dates array. each element has "link" property.
         */
        show: function(options){
            var me = this;
            if (!options || !options.elementId) return;

            me.elementId = options.elementId;
            if (options.dates) {
                me.dateHavingLink = _.clone(options.dates);
            }
            var dom = me._createDom();
            $("#" + options.elementId).append(dom);
        },

        /**
         * create calendar DOM.
         */
        _createDom: function(){
            var me = this;

            var fragment = "<table>";

            // week.
            fragment += "<tr>";
            for (var week = 0; week < 7; week++) {
                fragment += "<td"
                    + (week == 0 ? " class='week-sun'" : 
                        (week == 6 ? " class='week-sat'" : ""))
                    + ">" + me.WEEK_STRING[week] + "</td>";
            }
            fragment += "</tr>";

            // days.
            // what day is year/month/01 ?
            var day = (new Date(me.year + "-" + (me.month < 10 ? "0" + me.month : me.month) + "-01")).getDay();
            var currentDate = 0 - day + 1;
            // last date of month?
            var lastDate = me._getLastDate(me.year, me.month);

            while(currentDate <= lastDate) {
                fragment += "<tr>";
                for (var week = 0; week < 7; week++){
                    fragment += "<td"
                    + (week == 0 ? " class='week-sun'" : 
                        (week == 6 ? " class='week-sat'" : ""))
                    + ">"
                    + ((currentDate > 0 && currentDate <= lastDate) ? currentDate : "")
                    + "</td>";
                    currentDate++;
                }
                fragment += "</tr>";
            }

            fragment += "</table>";

            var dom = $(fragment);
            return dom;
        },

        /**
         * calculate last date of year/month.
         */
        _getLastDate: function(year, month) {
            var d = new Date();
            d.setYear(year);
            d.setMonth(month);
            d.setDate(1);

            // decrement 1 day (86400000msec)
            d.setTime(d.getTime() - 86400000);

            return d.getDate();
        }
    };

    return Calendar;
});
