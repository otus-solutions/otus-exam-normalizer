(function() {
  'use strict';

  angular
    .module('normalizerjs.application', [
      'normalizerjs.application.state'
     
    ])
    .run(function() {
      console.info('Application module ready.');
    });

}());