(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('mgCenter', {
      templateUrl: 'app/ux-component/laboratory-center-dashboard/mg-center/mg-center-template.html',
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
