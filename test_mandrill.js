var mandrill = require('mandrill-api/mandrill');
var m = new mandrill.Mandrill(process.env.MANDRILL_APIKEY);
m.users.info(function(info) {
    console.log('Reputation: ' + info.reputation + ', Hourly Quota: ' + info.hourly_quota);
});

var message = {
    "html": "<p>Example HTML content</p>",
    "text": "Example text content",
    "subject": "example subject",
    "from_email": "do-not-reply@tooringanalytics.com",
    "from_name": "PicSumo",
    "to" : [{
        "email": "akanetkar@acm.org",
        "name": "Anshuman",
        "type": "to"
    }],
    "headers": {
        "Reply-To": "do-not-reply@tooringanalytics.com"
    },
    "important": false
};
var async = false;
var ip_pool = "Main Pool";

m.messages.send({
                    "message": message,
                    "async": async,
                    "ip_pool": ip_pool
                }, function(result) {
                    console.log(result);
                }, function(e) {
                    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                });
