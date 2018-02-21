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
    'normalizerjs.converter.FieldCenterService'
  ];

  function Controller(FieldCenterService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.completeFieldCenter;

    function onInit() {
      self.completeFieldCenter = FieldCenterService.getFieldCenterByAcronym(self.fieldCenter.acronym);
    }
  }
}());
