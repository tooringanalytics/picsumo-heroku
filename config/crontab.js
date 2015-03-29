module.exports.crontab = {

  /*
   * The asterisks in the key are equivalent to the
   * schedule setting in crontab, i.e.
   * minute hour day month day-of-week year
   * so in the example below it will run every minute
   */

  // Run this task every 4 hours.
  '0 0 */4 * * * *': function() {
      require('../crontab/DailyTasks.js').sendReminderEmails();
  }

};
