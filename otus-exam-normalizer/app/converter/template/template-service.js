(function () {
  'use strict';

  angular
    .module('normalizerjs.converter')
    .service('normalizerjs.converter.TemplateService', Service);

  Service.$inject = [
    'normalizerjs.converter.FieldCenterService',
    'normalizerjs.converter.RowFactory'
  ];

  function Service(FieldCenterService, Row) {
    var self = this;

    self.allTemplates; //TODO: get this

    self.createRow = createRow;

    _onInit();

    function _onInit() {
      //TODO 
    }

    function createRow(template, columnsArray, lastRow) {
      var row = Row.create();

      row.originalColumnsArray = columnsArray;
      row.index = lastRow ? lastRow.index + 1 : 0;
      row.rowsAfterLastResult = lastRow ? lastRow.rowsAfterLastResult + 1 : 1;

      /*TODO: {
        create
      }*/
      return row;
    }

    function _fillRow(row, template){
      
    }

    function findTemplatesByFieldCenter(fieldCenter) {
      var acronym = fieldCenter.acronym;
      var availableTemplates = [];
      var fieldCenterDefinition = FieldCenterService.getDefinitionByFieldCenter(fieldCenter);

      availableTemplates = self.allTemplates.filter(function(template){
        return (
          fieldCenterDefinition.template.filter(function(centerTemplate){
            return (
              centerTemplate.template === template.template
              && centerTemplate.version === template.version
            );
          }).length
        );
      });

      return availableTemplates;
    }

    

    return self;
  }
}());
