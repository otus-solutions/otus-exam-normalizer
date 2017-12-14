(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy', [
      'normalizerjs.application.dependency',
      'normalizerjs.application.state'
    ])
    .run(function () {
      console.info('Deploy module ready.');
    });



}());
