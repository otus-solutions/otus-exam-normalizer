(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('baCenter', {
      templateUrl: 'app/ux-component/laboratory-center-dashboard/ba-center/ba-center-template.html',
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

    function onInit() { }
  }
}());
