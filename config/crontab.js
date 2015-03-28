module.exports.crontab = {

  /*
   * The asterisks in the key are equivalent to the
   * schedule setting in crontab, i.e.
   * minute hour day month day-of-week year
   * so in the example below it will run every minute
   */

  '0 */10 * * * * *': function() {
      require('../crontab/DailyTasks.js').run();
  },

  '0 30 * * * * *': function() {
      require('../crontab/DailyTasks.js').sendReminderEmails();
  }

};
