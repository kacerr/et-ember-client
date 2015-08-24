import DS from 'ember-data';
import config from './config/environment';


export default DS.RESTAdapter.extend({
  host: config.APP.ET_API_BASE_URL,
  namespace: 'api/v1',
});
