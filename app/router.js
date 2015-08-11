import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route("secret", {path: '/'});
  this.route('users', {path: '/#users'});
  this.route('queries');
});

export default Router;
