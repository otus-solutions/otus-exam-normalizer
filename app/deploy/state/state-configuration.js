(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .constant('STATE', {
      'ACCESS': 'access',
      'ACTIVITY_ADDER': 'activity-adder',
      'ACTIVITY_CATEGORY_ADDER': 'activity-category-adder',
      'ACTIVITY_PLAYER': 'activity-player',
      'PAPER_ACTIVITY_ADDER': 'paper-activity-adder',
      'PAPER_ACTIVITY_INITIALIZER': 'paper-activity-initializer',
      'APPLICATION': 'application',
      'DASHBOARD': 'dashboard',
      'PARTICIPANT_DASHBOARD': 'participant-dashboard',
      'INSTALLER': 'installer',
      'LOGIN': 'login',
      'PARTICIPANT': 'participant',
      'PARTICIPANT_ACTIVITY': 'activity',
      'PARTICIPANT_REPORT': 'report',
      'SESSION': 'session',
      'SIGNUP': 'signup',
      'SIGNUP_RESULT': 'signup-result',
      'LABORATORY': 'laboratory-participant',
      'SAMPLE_TRANSPORTATION_LOT_INFO_MANAGER': 'sample-transportation-lot-info-manager',
      'SAMPLE_TRANSPORTATION_MANAGER_LIST': 'sample-transportation-manager-list',
      'SAMPLE_TRANSPORTATION_DASHBOARD': 'sample-transportation-dashboard'
    })
    .config(Configuration);

  Configuration.$inject = [
    '$urlRouterProvider',
    '$stateProvider'
  ];

  function Configuration($urlRouterProvider, $stateProvider) {
    //TODO Desenvolver os states de cada conversor
    // $stateProvider.state(SaoPauloStateProvider.state);
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
