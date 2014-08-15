/**
 * utility functions.
 */

var util = {
  /**
   * get last day of month.
   *
   * @param year year
   * @param month month
   * @return the last day of month.
   */
  getLastDayOfMonth: function(year, month) {
    var date = new Date(year + "-" + month + "-01 00:00:00");
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    date.setTime(date.getTime() - 1);

    return date.getDate();
  }
}

module.exports = util;
