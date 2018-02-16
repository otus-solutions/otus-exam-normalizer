(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('rjCenter', {
      templateUrl: 'app/ux-component/laboratory/rj-center/rj-center-template.html',
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
