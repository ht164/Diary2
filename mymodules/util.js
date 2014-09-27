/**
 * utility functions.
 */

var moment = require('moment');

var util = {
  /**
   * generate condition of startDate and endDate
   *
   * @param year
   * @param [month]
   * @param [date]
   * @return object
   */
  generateDateCondition: function(year, month, date) {
    var _year = parseInt(year, 10);
    var _month = parseInt(month, 10) - 1;
    var _date = parseInt(date, 10);
    var start = end = null;

    if (isNaN(_month)) {
      // year only.
      end = new moment([_year]);
      start = (new moment([_year + 1])).subtract(1, "days");
    } else if (isNaN(_date)) {
      // year and month.
      end = new moment([_year, _month]);
      start = new moment([_year, _month, end.daysInMonth()]);

    } else {
      // year, month and date.
      // don't know why, but moment is not work. use Date object.
      end = start = new moment(new Date(year + "-" + month + "-" + date));
    }

    return {
      startDate: start.toDate(),
      endDate: end.toDate()
    };
  }

}

module.exports = util;
