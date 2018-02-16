(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('esCenter', {
      templateUrl: 'app/ux-component/laboratory/es-center/es-center-template.html',
      bindings: {
        fieldCenter: '<'
      },
      controller: Controller
    });

  Controller.$inject = [

  ];

  function Controller() {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      console.log("");
    }
  }
}());
