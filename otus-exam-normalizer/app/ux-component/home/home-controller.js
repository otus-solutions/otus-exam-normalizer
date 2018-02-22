(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .controller('HomeController', Controller);

  Controller.$inject = [
    'normalizerjs.application.state.ApplicationStateService',
    '$timeout',
    '$mdSidenav',
    '$mdDialog'
  ];

  function Controller(ApplicationStateService, $timeout, $mdSidenav, $mdDialog) {
    var self = this;

    self.toggleLeft = buildToggler('left');
    self.load = false;

    /* Public methods */
    self.$onInit = onInit;
    self.route = route;

    function onInit() { }

    function route(valor) {
      ApplicationStateService.setCurrentState(valor);
      $mdSidenav('left').close();
    }

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }
}());
