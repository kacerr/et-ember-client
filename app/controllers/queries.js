import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({

  xmlQuery: null,
  resultCode: null,
  resultReceived: null,
  requestProcessingDuration: null,
  from: "PRG",
  to: "YYZ",
  departureDate: "10.1.2016 8:00",
  departureTimeWindow: 3,
  returnDate: "10.3.2016 8:00",
  returnTimeWindow: 3,
  adults: 3,
  children: 1,
  infants: 0,
  directFlight: true,
  cfg: config,

  amadeusEndpoints: [
    { 'title': 'Air_SellFromRecommendation',
      'url': 'http://webservices.amadeus.com/ITAREQ_05_2_IA'
    },
    { 'title': 'MasterPricer',
      'url': 'http://webservices.amadeus.com/FMPTBQ_13_1_1A'
    },
  ],

  amadeusEndpointSelected: function() {
    return this.get('amadeusEndpoints')[1]['url'];
  }.property(),

  actions: {
    sendRequest: function() {
      var result = Ember.ArrayProxy.create({content: []});
      var amadeusEndpoint = this.get('amadeusEndpointSelected');
      var amadeusPayload = $('#xmlQuery').val();

      //console.assert(false);
      $.ajax({
        url: this.get('cfg').APP.ET_API_BASE_URL + '/api/v1/amadeus/raw_query',
        type: 'POST',
        accepts: 'application/json',
        context: this,
        data: {
          amadeusEndpoint: amadeusEndpoint,
          xmlQuery: amadeusPayload
        },
        success: function(data) {
          $('#xmlQueryResult').val(data.xmlContent);
          this.set('resultCode', data.resultCode);
          this.set('resultReceived', ", <b> received: </b>" + data.timestamp);
          //result.set('content', data);
          //debugger;
          console.log('DEBUG: GET Enquiries OK');
        },
        error: function() {
           console.log('DEBUG: GET Enquiries Failed');
        }
      });      
    },

    searchFlight: function() {
      $.ajax({
        url: this.get('cfg').APP.ET_API_BASE_URL + '/api/v1/amadeus/search_flight',
        type: 'POST',
        accepts: 'application/json',
        context: this,
        data: {
          from: this.get('from'),
          to: this.get('to'),
          departureDate: this.get('departureDate'),
          departureTimeWindow: this.get('departureTimeWindow'),
          returnDate: this.get('returnDate'),
          returnTimeWindow: this.get('returnTimeWindow'),
          adults: this.get('adults'),
          children: this.get('children'),
          infants: this.get('infants'),
          directFlight: this.get('directFlight'),
        },
        success: function(data) {
          $('#xmlQueryResult').val(data.xmlContent);
          if (data.request) { 
            $('#xmlQuery').val(data.request);
            this.set('xmlQuery', data.request);
          }
          this.set('resultCode', data.resultCode);
          this.set('resultReceived', ", <b> received: </b>" + data.timestamp);
          this.set('requestProcessingDuration', data.timeToProcess);
          //result.set('content', data);
          //debugger;
          console.log('DEBUG: GET Enquiries OK');
        },
        error: function() {
           console.log('DEBUG: GET Enquiries Failed');
        }
      });      
    }
  }  
});