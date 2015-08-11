import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('String'),
  auth_token: DS.attr('String'),
});
