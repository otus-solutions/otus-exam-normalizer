(function() {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .controller('HomeController', Controller);

  Controller.$inject = [
    'normalizerjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;
    self.title = "CCEM CEV";

    self.centers = [
      {
        name: 'São Paulo'
      },{
        name: 'Rio Grande do Sul'
      },{
        name: 'Espírito Santo'
      },{
        name: 'Minas Gerais'
      },{
        name: 'Bahia'
      },{
        name: 'Rio de Janeiro'
      }
    ];


  }
}());
