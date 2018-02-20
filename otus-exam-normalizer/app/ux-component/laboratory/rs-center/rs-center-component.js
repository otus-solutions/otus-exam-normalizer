(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('rsCenter', {
      templateUrl: 'app/ux-component/laboratory/rs-center/rs-center-template.html',
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
      console.log("RS center");
    }
  }
}());
