/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'et-api-woth-auth',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };


  if (environment === 'development') {
    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist: ['http://localhost:3000'],    
    };

    ENV['simple-auth-devise'] = {
      serverTokenEndpoint: 'http://localhost:3000/api/v1/sessions/',
      tokenAttributeName: 'auth_token',
    }

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline'",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:3000",
      'img-src': "'self'",
      'style-src': "'self'  'unsafe-inline'",
      'media-src': "'self'"
    };  
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP["ET_API_BASE_URL"] = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist: ['http://et-api.zlutazimnice.cz'],    
    };

    ENV['simple-auth-devise'] = {
      serverTokenEndpoint: 'http://et-api.zlutazimnice.cz/api/v1/sessions/',
      tokenAttributeName: 'auth_token',
    }

    ENV.contentSecurityPolicy = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline'",
      'font-src': "'self'",
      'connect-src': "'self' http://et-api.zlutazimnice.cz",
      'img-src': "'self'",
      'style-src': "'self'  'unsafe-inline'",
      'media-src': "'self'"
    };  
    ENV.APP["ET_API_BASE_URL"] = 'http://et-api.zlutazimnice.cz';
  }

  return ENV;
};
