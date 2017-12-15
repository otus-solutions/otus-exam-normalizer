(function () {
    'use strict';

    angular
        .module('normalizerjs.application', ['normalizerjs.states'])
        .run(function () {
            console.info('Application module ready.');
        });

}());
