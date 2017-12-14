(function () {
    'use strict';

    angular
        .module('normalizerjs.application', [
            'normalizerjs.application.dependency',
            'normalizerjs.application.state'
        ])
        .run(function () {
            console.info('Application module ready.');
        });

}());