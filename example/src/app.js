/* global google */

import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from '../../src/Geosuggest';

var App = React.createClass({ // eslint-disable-line
  /**
   * Render the example app
   * @return {Function} React render function
   */

  componentWillMount() {
    if (typeof window === 'undefined') {
      return;
    }

    var googleMaps = this.props.googleMaps ||
      (window.google && // eslint-disable-line no-extra-parens
        window.google.maps) ||
      this.googleMaps;

    /* istanbul ignore next */
    if (!googleMaps) {
      console.error(// eslint-disable-line no-console
        'Google map api was not found in the page.');
      return;
    }
    this.googleMaps = googleMaps;

    this.autocompleteService = new googleMaps.places.AutocompleteService();
    this.geocoder = new googleMaps.Geocoder();
  },

  render: function() {
    var fixtures = [
      {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
      {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
      {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
    ];

    return ( // eslint-disable-line
      <div>
        <Geosuggest
          fixtures={fixtures}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          onSuggestNoResults={this.onSuggestNoResults}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius="20"
          suggestItemRender={(suggest) => {
            return this.geocoder.geocode(
              suggest.placeId && !suggest.isFixture ?
                {placeId: suggest.placeId} : {address: suggest.label},
              (results, status) => {
                if (status === this.googleMaps.GeocoderStatus.OK) {
                  var gmaps = results[0],
                    location = gmaps.geometry.location;

                  suggest.gmaps = gmaps;
                  suggest.location = {
                    lat: location.lat(),
                    lng: location.lng()
                  };
                }
                return (
                  <div>adasd</div>
                );
              }
            );
            
          }}/>
      </div>
    );
  },

  /**
   * When the input receives focus
   */
  onFocus: function() {
    console.log('onFocus'); // eslint-disable-line
  },

  /**
   * When the input loses focus
   * @param {String} value The user input
   */
  onBlur: function(value) {
    console.log('onBlur', value); // eslint-disable-line
  },

  /**
   * When the input got changed
   * @param {String} value The new value
   */
  onChange: function(value) {
    console.log('input changes to :' + value); // eslint-disable-line
  },

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect: function(suggest) {
    console.log(suggest); // eslint-disable-line
  },

  /**
   * When there are no suggest results
   * @param {String} userInput The user input
   */
  onSuggestNoResults: function(userInput) {
    console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
  }
});

ReactDOM.render(<App />, document.getElementById('app')); // eslint-disable-line
