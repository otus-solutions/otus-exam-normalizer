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
    self.route = route;

    //TODO: remover, isso deve ficar na definição
    self.fieldCenterList = [
      {
        name: "Bahia",
        acronym: "BA",
        code: 1
      },
      {
        name: "Espírito Santo",
        acronym: "ES",
        code: 2
      },
      {
        acronym: "MG",
        name: "Minas Gerais",
        code: 3
      },
      {
        name: "Rio de Janeiro",
        acronym: "RJ",
        code: 4
      },
      {
        name: "Rio Grande do Sul",
        acronym: "RS",
        code: 5
      },
      {
        acronym: "SP",
        name: "São Paulo",
        code: 6
      }
    ];

    self.findFieldCenterByAcronym = function (acronym) {
      var fieldCenter;

      if (acronym) {
        fieldCenter = self.fieldCenterList.find(function (center) {
          return center.acronym.toUpperCase() === acronym.toUpperCase();
        });
      }
      return fieldCenter;
    }

    self.$onInit = onInit;

    function onInit() { }

    function route(valor) {
      // ApplicationStateService.activateSaoPaulo();
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
