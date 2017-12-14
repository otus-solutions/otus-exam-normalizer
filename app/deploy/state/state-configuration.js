(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .constant('STATE', {
      'HOME': 'home',
      'SP_NORMALIZER': 'sp-normalizer',
      'RS_NORMALIZER': 'rs-normalizer',
      'ES_NORMALIZER': 'es-normalizer',
      'RJ_NORMALIZER': 'rj-normalizer',
      'MG_NORMALIZER': 'mg-normalizer',
      'BA_NORMALIZER': 'ba-normalizer'
    })
    .config(Configuration);

  Configuration.$inject = [
    '$urlRouterProvider',
    '$stateProvider',
    'normalizerjs.deploy.HomeStateProvider'
  ];

  function Configuration($urlRouterProvider, $stateProvider, HomeStateProvider) {
    //TODO Desenvolver os states de cada conversor
    // $stateProvider.state(SaoPauloStateProvider.state);
    $stateProvider.state(HomeStateProvider.state);
    // $stateProvider.state(RioGrandeDoSulStateProvider.state);
    // $stateProvider.state(MinasGeraisStateProvider.state);
    // $stateProvider.state(EspiritoSantoStateProvider.state);
    // $stateProvider.state(BahiaStateProvider.state);
    // $stateProvider.state(RioDeJaneiroStateProvider.state);

    /* Default state (route) */
    $urlRouterProvider.otherwise(HomeStateProvider.state.url);
    // $locationProvider.html5Mode(false);
  }
}());
