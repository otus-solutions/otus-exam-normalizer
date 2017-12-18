(function() {
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
    self.showMessage = showMessage;

    self.route = route;
    self.centers = [{
      name: 'São Paulo',
      state: 'sp'
    }, {
      name: 'Rio Grande do Sul',
      state: 'rs'
    }, {
      name: 'Espírito Santo',
      state: 'es'
    }, {
      name: 'Minas Gerais',
      state: 'mg'
    }, {
      name: 'Bahia',
      state: 'ba'
    }, {
      name: 'Rio de Janeiro',
      state: 'rj'
    }];

    self.$onInit = onInit;

    function onInit() {
      if (window.sessionStorage.getItem('pageLoaded') !== "true") {
        window.sessionStorage.setItem('pageLoaded', "true");
        self.showMessage();
      }

    }

    function route(valor) {
      // ApplicationStateService.activateSaoPaulo();
      ApplicationStateService.setCurrentState(valor);
    }

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

    function showMessage() {

      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Olá')
        .textContent('Seja bem vindo ao Otus Normalizer')
        .ariaLabel('Alert Dialog Init')
        .ok('Fechar')

      );
    }



  }
}());
