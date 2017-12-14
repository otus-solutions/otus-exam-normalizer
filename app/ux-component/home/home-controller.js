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
    

  }
}());
