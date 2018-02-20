(function () {
    'use strict';

    angular
        .module('normalizerjs.application.dependency', [
            /* Angular modules */
            'ngMaterial',
            'ngMessages',
            'ngAnimate',
            /* 3rd-party modules */
            'ui.router',
            'ngFileUpload',
            /* otus-model */
            'otusjs'
        ]);
}());