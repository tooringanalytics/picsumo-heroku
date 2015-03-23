// EmailService.js - in api/services

var mandrill = require('mandrill-api/mandrill');

sails.log.debug("Creating mandrill client");

var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_APIKEY);

var EmailService = {
    "mandrill_client": mandrill_client,
    "from_email": "do-not-reply@tooringanalytics.com",
    "reply_to_email": "do-not-reply@tooringanalytics.com"
};

// TO DO: Add a template engine for generating emails, rather than
// hard-coding them.
EmailService.sendRegistrationEmail = function(options) {

    sails.log.debug("Getting mandrill client");

    var mandrill_client = EmailService.mandrill_client;

    sails.log.debug("Creating message");

    html_body = "<h1>Welcome to PicSumo!</h1>" +
                "<p>Your account " + options.username + " is ready.</p>" +
                "<p>Your password is :'" + options.password + "'. Keep it safe.</p>";

    text_body = "Welcome to PicSumo!\n" +
                "Your account " + options.username + " is ready.\n" +
                "Your password is: '" + options.password + "'. Keep it safe.\n";

    var message = {
        "html": html_body,
        "text": text_body,
        "subject": "Welcome to PicSumo!",
        "from_email": EmailService.from_email,
        "from_name": "PicSumo",
        "to" : [{
            "email": options.to_email,
            "name": options.to_name,
            "type": "to"
        }],
        "headers": {
            "Reply-To": EmailService.reply_to_email
        },
        "important": false
    };

    var async = true;
    var ip_pool = "Main Pool";

    sails.log.debug("Sending email message");

    mandrill_client.messages.send({
        "message": message,
        "async": async,
        "ip_pool": ip_pool
    }, function(result) {
        sails.log.debug("Email send succeeded.");
        sails.log.debug(result);
    }, function(e) {
        sails.log.debug('A mandrill error occurred: ' +
                        e.name +
                        ' - ' +
                        e.message);
    });
};

EmailService.sendPasswordResetEmail = function(options) {

    sails.log.debug("Getting mandrill client");

    var mandrill_client = EmailService.mandrill_client;

    sails.log.debug("Creating message");

    html_body = "<h1>Your PicSumo Password Has Changed...</h1>" +
                "<p>The password for your account " + options.username + " has been reset.</p>" +
                "<p>Your new password is :'" + options.password + "'. Please change it as soon as possible.</p>";

    text_body = "Your PicSumo Password Has Changed...\n" +
                "The password for your account " + options.username + " has been reset.\n" +
                "Your new password is :'" + options.password + "'. Please change it as soon as possible.\n";

    var message = {
        "html": html_body,
        "text": text_body,
        "subject": "About your PicSumo Account...",
        "from_email": EmailService.from_email,
        "from_name": "PicSumo",
        "to" : [{
            "email": options.to_email,
            "name": options.to_name,
            "type": "to"
        }],
        "headers": {
            "Reply-To": EmailService.reply_to_email
        },
        "important": false
    };

    var async = true;
    var ip_pool = "Main Pool";

    sails.log.debug("Sending email message");

    mandrill_client.messages.send({
        "message": message,
        "async": async,
        "ip_pool": ip_pool
    }, function(result) {
        sails.log.debug("Email send succeeded.");
        sails.log.debug(result);
    }, function(e) {
        sails.log.debug('A mandrill error occurred: ' +
                        e.name +
                        ' - ' +
                        e.message);
    });
};

EmailService.sendPasswordChangedEmail = function(options) {

    sails.log.debug("Getting mandrill client");

    var mandrill_client = EmailService.mandrill_client;

    sails.log.debug("Creating message");

    html_body = "<h1>Your PicSumo Password Has Changed...</h1>" +
                "<p>The password for your account " + options.username + " has been changed.</p>" +
                "<p>Your new password is :'" + options.password + "'. Keep it safe.</p>";

    text_body = "Your PicSumo Password Has Changed...\n" +
                "The password for your account " + options.username + " has been changed.\n" +
                "Your new password is :'" + options.password + "'. Keep it safe.\n";

    var message = {
        "html": html_body,
        "text": text_body,
        "subject": "About your PicSumo Account...",
        "from_email": EmailService.from_email,
        "from_name": "PicSumo",
        "to" : [{
            "email": options.to_email,
            "name": options.to_name,
            "type": "to"
        }],
        "headers": {
            "Reply-To": EmailService.reply_to_email
        },
        "important": false
    };

    var async = true;
    var ip_pool = "Main Pool";

    sails.log.debug("Sending email message");

    mandrill_client.messages.send({
        "message": message,
        "async": async,
        "ip_pool": ip_pool
    }, function(result) {
        sails.log.debug("Email send succeeded.");
        sails.log.debug(result);
    }, function(e) {
        sails.log.debug('A mandrill error occurred: ' +
                        e.name +
                        ' - ' +
                        e.message);
    });
};

module.exports = EmailService;
