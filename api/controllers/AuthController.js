/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {
  /**
   * Render the login page
   *
   * The login form itself is just a simple HTML form:
   *
      <form role="form" action="/auth/local" method="post">
        <input type="text" name="identifier" placeholder="Username or Email">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Sign in</button>
      </form>
   *
   * You could optionally add CSRF-protection as outlined in the documentation:
   * http://sailsjs.org/#!documentation/config.csrf
   *
   * A simple example of automatically listing all available providers in a
   * Handlebars template would look like this:
   *
      {{#each providers}}
        <a href="/auth/{{slug}}" role="button">{{name}}</a>
      {{/each}}
   *
   * @param {Object} req
   * @param {Object} res
   */
  login: function (req, res) {
    var strategies = sails.config.passport
      , providers  = {};

    // Get a list of available providers for use in your templates.
    Object.keys(strategies).forEach(function (key) {
      if (key === 'local') {
        return;
      }

      providers[key] = {
        name: strategies[key].name
      , slug: key
      };
    });

    // Render the `auth/login.ext` view
    res.view({
      providers : providers
    , errors    : req.flash('error')
    });
  },

  /**
   * Log out a user and return them to the homepage
   *
   * Passport exposes a logout() function on req (also aliased as logOut()) that
   * can be called from any route handler which needs to terminate a login
   * session. Invoking logout() will remove the req.user property and clear the
   * login session (if any).
   *
   * For more information on logging out users in Passport.js, check out:
   * http://passportjs.org/guide/logout/
   *
   * @param {Object} req
   * @param {Object} res
   */
  logout: function (req, res) {
    req.logout();

    // mark the user as logged out for auth purposes
    req.session.authenticated = false;

    // Merged from Ryan's picsumo app
    if(req.wantsJSON) {
      res.jsonx({success: true});
    }
    else {
      res.redirect('/');
    }
  },

  /**
   * Render the registration page
   *
   * Just like the login form, the registration form is just simple HTML:
   *
      <form role='form' action='/auth/local/register' method='post'>
        <input type='text' name='username' placeholder='Username'>
        <input type='text' name='email' placeholder='Email'>
        <input type='password' name='password' placeholder='Password'>
        <button type='submit'>Sign up</button>
      </form>
   *
   * @param {Object} req
   * @param {Object} res
   */
  register: function (req, res) {
    res.view({
      errors: req.flash('error')
    });
  },

  /**
   * Create a third-party authentication endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  provider: function (req, res) {
    passport.endpoint(req, res);
  },

  /**
   * Returns the currently logged in user in JSON
   *
   * @param {Object} req
   * @param {Object} res
   */
  user: function (req, res) {
    if (req.user) {
        sails.log.debug(req.user);
        res.jsonx({
            "error": null,
            "status": 200,
            "summary": "Found user.",
            "success": true,
            "user": req.user
        });
    } else {
        sails.log.debug("No user");
        res.jsonx({
            "error": "E_NOTFOUND",
            "status": 404,
            "summary": "No user is logged in.",
            "success": false
        });
    }
  },

  /**
   * Create a password management endpoint.
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * words
   *
   * @param {Object} req
   * @param {Object} res
   */
  password: function (req, res) {
      function getStatusCode(error) {
          switch(error) {
            case 'Error.Passport.Password.Invalid': return 400;
            case 'Error.Passport.Password.Wrong': return 401;
            case 'Error.Passport.Password.NotSet': return 400;
            case 'Error.Passport.Username.NotFound': return 404;
            case 'Error.Passport.User.Exists': return 400;
            case 'Error.Passport.Email.NotFound': return 404;
            case 'Error.Passport.Email.Missing': return 400;
            case 'Error.Passport.Email.Exists': return 400;
            case 'Error.Passport.Username.Missing': return 400;
            case 'Error.Passport.Password.Missing': return 400;
            case 'Error.Passport.Generic': return 500;
            default: return 200;
          }
      }

    function getErrorToReturn(req, err) {
        // Only certain error messages are returned via req.flash('error', someError)
        // because we shouldn't expose internal authorization errors to the user.
        // We do return a generic error and the original request body.
        var flashError = req.flash('error')[0];

        var errorToReturn = null;

        if (err && !flashError ) {
            //req.flash('error', 'Error.Passport.Generic');
            errorToReturn = 'Error.Passport.Generic';
        } else if (flashError) {
            //req.flash('error', flashError);
            errorToReturn = flashError;
        }
        //req.flash('form', req.body);
        if(!req.wantsJSON) {
            req.flash('error', errorToReturn);
            req.flash('form', req.body);
        }

        return errorToReturn;
    }

    function tryAgain (err) {

        var errorToReturn = getErrorToReturn(req, err);

        // If an error was thrown, redirect the user to the
        // login, register or disconnect action initiator view.
        // These views should take care of rendering the error messages.
        var action = req.param('action');

        switch (action) {
            case 'reset':
                if(req.wantsJSON) {
                    var status = getStatusCode(errorToReturn);
                    res.status(status);
                    res.jsonx({
                        "error": errorToReturn,
                        "status": status,
                        "summary": locale.get(errorToReturn, req.getLocale()),
                        "success": !errorToReturn
                    });
                } else {
                  res.redirect('/');
                }
                break;
            case 'change':
                if(req.wantsJSON) {
                    var status = getStatusCode(errorToReturn);
                    res.status(status);
                    res.jsonx({
                        "error": errorToReturn,
                        "status": status,
                        "summary": locale.get(errorToReturn, req.getLocale()),
                        "success": !errorToReturn
                    });
                } else {
                    res.redirect('/');
                }
                break;
          }
    }

    function onSuccess(req, err, new_password) {
        var errorToReturn = getErrorToReturn(req, err);

        // Set the response to the user
        if(req.wantsJSON) {
            var status = getStatusCode(errorToReturn);
            res.status(status);
            res.jsonx({
              "error": errorToReturn,
              "status": status,
              "summary": locale.get(errorToReturn, req.getLocale()),
              "success": !errorToReturn
            });
        } else {
            res.redirect('/');
        }

        // Now send post-password-change email
        var action = req.param('action');

        switch (action) {
        case 'reset':
            if (!errorToReturn) {
                // Registration successful send an email to the new user.
                sails.log.debug('Reset successful. Now, Post-processing...');
                sails.log.debug(req.body);
                options = {
                    "to_email": req.body.email,
                    "to_name": req.body.email,
                    "username": req.body.email,
                    "password": new_password,
                };
                EmailService.sendPasswordResetEmail(options);
            }
            break;
        case 'change':
            if (!errorToReturn) {
                // Registration successful send an email to the new user.
                sails.log.debug('Change Password successful. Now, Post-processing...');
                sails.log.debug(req.body);
                options = {
                    "to_email": req.user.email,
                    "to_name": req.user.username,
                    "username": req.user.username,
                    "password": new_password,
                };
                EmailService.sendPasswordChangedEmail(options);
            }
            break;
        }
    }

    function generateRandom(lengthOfString, charset) {
        // The scope of the character
        if(charset == null) charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

        var rand = '';

        while(lengthOfString > 0) {
            /*
            since the index of char is start from 0, so no need to +1 on the random number
            we want the range from 0 - lengthOfString
            */
            rand += charset.charAt(Math.floor(Math.random() * charset.length));
            lengthOfString--;
        }
        return rand;
    }

    function setPassword(user, new_password) {
        sails.log.debug('User: ');
        sails.log.debug(user);

        Passport.findOne({ user: user.id }, function (err, pp) {
            if (err || !pp) {
                return tryAgain(req, err);
            }

            sails.log.debug('Query result: ' + err);
            sails.log.debug(pp);

            pp.password = new_password;

            pp.save(function(err) {
                onSuccess(req, err, new_password);
            });
        });

    }

    function resetPassword() {

        var new_password = generateRandom(9, null);

        var userEmail = req.body.email.toLowerCase();
        User.findOne({ email: userEmail }, function(err, user) {
            if (!user) {
                var err = 'Error.Passport.Generic';
                return tryAgain(req, err);
            }

            sails.log.debug("Found user: " + user);

            setPassword(user, new_password);
        });
    }

    function changePassword() {

        var new_password = req.body.password;

        var user = req.user;

        if (!user) {
            var err = 'Error.Passport.Generic';
            return tryAgain(req, err);
        }

        sails.log.debug("Found user: " + user);

        setPassword(user, new_password);
    }

    var action = req.param('action');
    var new_password = "";

    switch (action) {
        case'reset':
            new_password = resetPassword();
            break;
        case 'change':
            new_password = changePassword();
            break;
    }

  },

  /**
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function (req, res) {

    function getStatusCode(error) {
      switch(error) {
        case 'Error.Passport.Password.Invalid': return 400;
        case 'Error.Passport.Password.Wrong': return 401;
        case 'Error.Passport.Password.NotSet': return 400;
        case 'Error.Passport.Username.NotFound': return 404;
        case 'Error.Passport.User.Exists': return 400;
        case 'Error.Passport.Email.NotFound': return 404;
        case 'Error.Passport.Email.Missing': return 400;
        case 'Error.Passport.Email.Exists': return 400;
        case 'Error.Passport.Username.Missing': return 400;
        case 'Error.Passport.Password.Missing': return 400;
        case 'Error.Passport.Generic': return 500;
        default: return 200;
      }
    }

    function getErrorToReturn(req, err) {
        // Only certain error messages are returned via req.flash('error', someError)
        // because we shouldn't expose internal authorization errors to the user.
        // We do return a generic error and the original request body.
        var flashError = req.flash('error')[0];

        var errorToReturn = null;

        if (err && !flashError ) {
            //req.flash('error', 'Error.Passport.Generic');
            errorToReturn = 'Error.Passport.Generic';
        } else if (flashError) {
            //req.flash('error', flashError);
            errorToReturn = flashError;
        }
        //req.flash('form', req.body);
        if(!req.wantsJSON) {
            req.flash('error', errorToReturn);
            req.flash('form', req.body);
        }

        return errorToReturn;
    }

    function tryAgain (err) {

        var errorToReturn = getErrorToReturn(req, err);

        // If an error was thrown, redirect the user to the
        // login, register or disconnect action initiator view.
        // These views should take care of rendering the error messages.
        var action = req.param('action');

        switch (action) {
            case 'register':
                if(req.wantsJSON) {
                    var status = getStatusCode(errorToReturn);
                    res.status(status);
                    res.jsonx({
                        "error": errorToReturn,
                        "status": status,
                        "summary": locale.get(errorToReturn, req.getLocale()),
                        "success": !errorToReturn
                    });
                } else {
                  res.redirect('/register');
                }
                break;
            case 'disconnect':
                res.redirect('back');
                break;
            default:
                if(req.wantsJSON) {
                    var status = getStatusCode(errorToReturn);
                    res.status(status);
                    res.jsonx({
                        "error": errorToReturn,
                        "status": status,
                        "summary": locale.get(errorToReturn, req.getLocale()),
                        "success": !errorToReturn
                    });
                } else {
                    res.redirect('/login');
                }
          }
    }

    function onSuccess(req, err) {
        var errorToReturn = getErrorToReturn(req, err);

        // Upon successful login, send the user to the homepage were req.user
        // will be available.
        if(req.wantsJSON) {
            var status = getStatusCode(errorToReturn);
            res.status(status);
            res.jsonx({
              "error": errorToReturn,
              "status": status,
              "summary": locale.get(errorToReturn, req.getLocale()),
              "success": !errorToReturn
            });
        } else {
            res.redirect('/');
        }

        var action = req.param('action');

        switch (action) {
        case 'register':
            if (!errorToReturn) {
                // Registration successful send an email to the new user.
                sails.log.debug('Registration successful. Now, Post-processing...');
                sails.log.debug(req.body);
                options = {
                    "to_email": req.user.email,
                    "to_name": req.user.username,
                    "username": req.user.username,
                    "password": req.body.password,
                };
                EmailService.sendRegistrationEmail(options);
            }
            break;
        }

    }

    sails.log.debug("Entered AuthController.callback");

    passport.callback(req, res, function (err, user, challenges, statuses) {

        if (err || !user) {
            sails.log.debug("Error: " + err);
            return tryAgain(challenges);
        }

        sails.log.debug("Logging in user: " + user);

        req.login(user, function (err) {
            if (err) {
              sails.log.debug("Login Error: " + err);
              return tryAgain(err);
            }

            // Mark the session as authenticated to work with default Sails sessionAuth.js policy
            req.session.authenticated = true

            onSuccess(req, err);
        });
    });
  },

  /**
   * Disconnect a passport from a user
   *
   * @param {Object} req
   * @param {Object} res
   */
  disconnect: function (req, res) {
    passport.disconnect(req, res);
  }
};

module.exports = AuthController;
