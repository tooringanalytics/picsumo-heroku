
var _ = require('sails/node_modules/lodash'),
    Waterline = require('sails/node_modules/waterline'),
    path = require('path'),
    url = require('url');

////////////////////////////////////////////////////////////////////
//// SAILS ENV
////////////////////////////////////////////////////////////////////
//resolve the sails config files required.

var config_path = path.resolve(__dirname,'../', 'config/');
console.log(config_path);

var sails = require('sails');
global['sails'] = sails;


////////////////////////////////////////////////////////////////////
//// WATERLINE CONFIG
////////////////////////////////////////////////////////////////////
var orm = new Waterline();
// Require any waterline compatible adapters here
var postgresqlAdapter = require('sails-postgresql');


// Build A Config Object
var config = {

    // Setup Adapters
    // Creates named adapters that have have been required
    adapters: {
        'sails-postgresql': postgresqlAdapter
    },

    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {
        qtPostgresqlServer: {
            adapter: 'sails-postgresql',
            host: process.env.PG_HOSTNAME,
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE
        }
    },

    defaults: {
        migrate: 'alter'
    },

    mandrill: {
        key: process.env.MANDRILL_APIKEY
    }

};

sails.config = config;

//////////////////////////////////////////////////////////////////
// WATERLINE SERVICES
//////////////////////////////////////////////////////////////////
var api_dir = path.resolve(__dirname,'../', 'api/')

// load services
var services = require('include-all')({
    dirname     :  api_dir +'/services',
    filter      :  /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    optional    :  true
});

_.forEach(services, function(service,key){
    sails.log.info("Loading service: "+key)
    global[key] = service;
});

//////////////////////////////////////////////////////////////////
// WATERLINE MODELS
//////////////////////////////////////////////////////////////////

// load models
var models = require('include-all')({
    dirname     :  api_dir +'/models',
    filter      :  /(.+)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    optional    :  true
});

_.forEach(models, function(model,key){
    sails.log.info("Register model: "+key)
    model.identity = key.toLowerCase();
    model.connection = 'qtPostgresqlServer';

    var waterline_model = Waterline.Collection.extend(model);
    orm.loadCollection(waterline_model);
});


//////////////////////////////////////////////////////////////////
// Initialization
//////////////////////////////////////////////////////////////////

function doJobs() {
    sails.log.info('Time to send reminder emails...' + (new Date()).toISOString());
    ReminderService.sendTodaysReminders();
}

function completeInit(waterline_models) {
    sails.models = waterline_models.collections;
    sails.connections = waterline_models.connections;

    _.forEach(sails.models, function(model, name){
        name = name.charAt(0).toUpperCase() + name.slice(1);
        global[name] = model;
    });

    doJobs();
}

function errorInit(err) {
    sails.log.error("Unable to start scheduler. Waterline did not initialize");
}

// We make a new promise: we promise the string 'result' (after waiting 3s)
function initWaterline() {
    orm.initialize(config, function (err, models) {
        if (err) {
            errorInit(err);
        } else {
            sails.log.info("Waterline ready");
            completeInit(models);
        }
    });
};

sails.log.debug("Scheduler Starting up...");
initWaterline();
