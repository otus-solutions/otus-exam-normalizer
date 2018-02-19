(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('converter', {
      templateUrl: 'app/ux-component/converter/converter-template.html',
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
      console.log("converter");
    }
  }
}());
