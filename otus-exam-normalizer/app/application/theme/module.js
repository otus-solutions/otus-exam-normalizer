(function() {
  'use strict';

  angular
    .module('normalizerjs.application.theme', [])
    .run(runner);

    runner.$inject = [
      '$injector'
    ];

    function runner($injector) {
      console.info('Theme module ready.');
    }
}());
