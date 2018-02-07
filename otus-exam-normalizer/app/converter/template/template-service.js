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
    var properties = [
      "aliquot",
      "patientName",
      "solicitationNumber",
      "orderNumber",
      "itemNumber",
      "examCode",
      "examName",
      "label",
      "result",
      "requestDate",
      "collectionDate",
      "releaseDate"
    ];


    self.allTemplates = Definitions.templates;
    self.createRow = createRow;

    _onInit();

    function _onInit() {

    }

    function _getValue(row) {

    }

    function _equalLastResult(property, row, lastRow) {
      return lastRow && row[property].toString().trim().toUpperCase() === lastRow[property].toString().trim().toUpperCase() ? true : false;
    }

    function _notContains(property, row, textArray) {
      return !_contains(property, row, textArray);
    }

    function _contains(property, row, textArray) {
      var value = row[property];
      var contains = false;
      var re = new RegExp(value, "i");

      for (var i = 0; i < textArray.length; i++) {
        text = textArray[i];
        if (re.test(text)) {
          contains = true;
          break;
        }
      }
      return contains;
    }

    function _isEmpty(value){
      return value === undefined || value === "" ? true : false;
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

    function _validateRules(property, row, lastRow){
      
      isEmpty
      equalLastResult
      contains
      notContains
    }

    function _validateFunctionRules(){
      
    }
    
    function _fillRow(row, columnsArray, template) {
      var isValid = true;
      var isResult = true;

      properties.forEach(function(property){
        var value = template.fields[property];
        if(_isEmpty(value)){
          if(template[property].required) isValid = false;
          if(!_isEmpty(template.valueIfUndefined)) value = template.valueIfUndefined;
        }
        row[property] = value;
      });

      properties.forEach(function(property){
        var field = template.fields[property];
        
        if(field.rules){
          if(field.rules.result){
            
          }
  
          if(field.rules.exam){
  
          }
          
          if(field.rules.examObservation){
  
          }
  
          if(field.rules.resultObservation){
  
          }
        }
      });

      if(template.rules){
        if(template.rules.result){
          
        }

        if(template.rules.exam){

        }
        
        if(template.rules.examObservation){

        }

        if(template.rules.resultObservation){

        }
      }

      return row;
    }

    function findTemplatesByFieldCenter(fieldCenter) {
      var acronym = fieldCenter.acronym;
      var availableTemplates = [];
      var fieldCenterDefinition = FieldCenterService.getFieldCenterByAcronym(fieldCenter.acronym);

      availableTemplates = self.allTemplates.filter(function (template) {
        return (
          fieldCenterDefinition.template.filter(function (centerTemplate) {
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