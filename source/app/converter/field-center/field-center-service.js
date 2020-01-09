(function () {
  'use strict';

  angular
    .module('normalizerjs.converter')
    .service('normalizerjs.converter.FieldCenterService', Service);

  Service.$inject = [

  ];

  function Service() {
    var self = this;
    self.fieldCenterList = Definitions.fieldCenterList;
    self.getFieldCenterByAcronym = getFieldCenterByAcronym;

    _onInit();

    function _onInit() {

    }

    function getFieldCenterByAcronym(acronym) {
      return self.fieldCenterList.find(function(fieldCenter){
        return acronym === fieldCenter.acronym;
      });
    }

    return self;
  }
}());
