(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('rjCenter', {
      templateUrl: 'app/ux-component/laboratory-center-dashboard/rj-center/rj-center-template.html',
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
      console.log("RJ center");
    }
  }
}());
