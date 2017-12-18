(function () {
    'use strict';

    angular
        .module('normalizerjs.application', [
          'normalizerjs.states',
          'normalizerjs.application.theme'
        ])
        .run(function () {
            console.info('Application module ready.');
        });

}());
