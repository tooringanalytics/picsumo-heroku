var Sails = require('sails'), sails;

before(function(done) {
  Sails.lift({
      // configuration for testing purposes
      log: {
          level: 'error'
      },
      models: {
          connection: 'testDb',
          migrate: 'drop'
      }
      //,
      //policies: {
      //    '*': true
      //}
  }, function(err, server) {
      sails = server;
      if (err) {
          return done(err);
      }
      // here you can load fixtures, etc.
      // Load fixtures
      var Barrels = require('barrels');
      var barrels = new Barrels();

      // For Passport.js, we need to populate fixtures
      // gradually due to compulsory associations.
      barrels.populate(['user'], function(err) {
          if (err) {
              return done(err); // Higher level callback
          }

          // Users will already be populated here, so required associations should work
          barrels.populate(['passport'], function(err) {
            if (err) {
                return done(err); // Higher level callback
            }

            // Populate other fixtures here...

            done();
          }, false)
        }, false);
  });
});

after(function(done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});
