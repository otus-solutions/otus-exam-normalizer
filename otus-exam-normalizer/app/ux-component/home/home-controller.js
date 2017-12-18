(function() {
  'use strict';

  angular
    .module('normalizerjs.uxComponent' )
    .controller('HomeController', Controller);

  Controller.$inject = [
    'normalizerjs.application.state.ApplicationStateService',
    '$timeout',
   '$mdSidenav'
  ];

  function Controller(ApplicationStateService, $timeout, $mdSidenav) {
    var self = this;
    self.title = "CCEM DEV";
    // ApplicationStateService.activateSaoPaulo();

    self.toggleLeft = buildToggler('left');
    self.toggleRight = buildToggler('right');


    self.rota = rota;
    self.centers = [
      {
        name: 'São Paulo',
        state: 'sp'
      },{
        name: 'Rio Grande do Sul',
        state: 'rs'
      },{
        name: 'Espírito Santo',
        state: 'es'
      },{
        name: 'Minas Gerais',
        state: 'mg'
      },{
        name: 'Bahia',
        state: 'ba'
      },{
        name: 'Rio de Janeiro',
        state: 'rj'
      }
    ];

    function rota(valor) {
      // ApplicationStateService.activateSaoPaulo();
      ApplicationStateService.setCurrentState(valor);
    }

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }


  }
}());
