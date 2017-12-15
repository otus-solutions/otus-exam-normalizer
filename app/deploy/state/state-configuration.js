(function() {
  'use strict';

  angular
    .module('normalizerjs.deploy')
    .constant('STATE', {
      'HOME': 'home',
      'SP': 'sp',
      'RS': 'rs',
      'ES': 'es',
      'RJ': 'rj',
      'MG': 'mg',
      'BA': 'ba'
    })
    .config(Configuration);

  Configuration.$inject = [
    '$urlRouterProvider',
    '$stateProvider',
    'normalizerjs.deploy.HomeStateProvider',
    'normalizerjs.deploy.SaoPauloStateProvider'
  ];

  function Configuration($urlRouterProvider, $stateProvider,HomeStateProvider,SaoPauloStateProvider) {
    //TODO Desenvolver os states de cada conversor
    $stateProvider.state(SaoPauloStateProvider.state);
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
