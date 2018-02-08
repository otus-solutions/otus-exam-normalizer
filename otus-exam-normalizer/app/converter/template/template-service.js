(function (){
  'use strict';

  angular
    .module('normalizerjs.converter')
    .service('normalizerjs.converter.TemplateService', Service);

  Service.$inject = [
    'normalizerjs.converter.FieldCenterService',
    'normalizerjs.converter.RowFactory',
    'normalizerjs.converter.Field'
  ];

  function Service(FieldCenterService, Row, Field){
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

    function _onInit(){

    }

    function _getValue(row){

    }

    function _equalLastResult(property, row, lastResult){
      return lastResult && row[property].toString().trim().toUpperCase() === lastResult[property].toString().trim().toUpperCase() ? true : false;
    }

    function _notContains(property, row, textArray){
      return !_contains(property, row, textArray);
    }

    function _contains(property, row, textArray){
      var value = row[property];
      var contains = false;
      var re = new RegExp(value, "i");

      for (var i = 0; i < textArray.length; i++){
        text = textArray[i];
        if(re.test(text)){
          contains = true;
          break;
        }
      }
      return contains;
    }

    function _exists(value){
      return value !== undefined ? true : false;
    }

    function _isEmpty(value){
      return value === undefined || value === "" ? true : false;
    }

    function createRow(template, columnsArray, lastRow){
      var row = Row.create();

      row.originalColumnsArray = columnsArray;
      row.index = lastRow ? lastRow.index + 1 : 0;
      row.countRowsAfterLastResult = lastRow ? lastRow.countRowsAfterLastResult + 1 : 1;

      /*TODO: {
        create
      }*/

      return row;
    }

    function _dateValueToISOString(value, formatDate){
      var currentYear = new Date().getFullYear().toString().substr(2, 2);

      if(formatDate.day) var day = value.substr(formatDate.day.start, formatDate.day.length);
      if(formatDate.month) var month = value.substr(formatDate.month.start, formatDate.month.length);
      if(formatDate.year){
        var year = value.substr(formatDate.year.start, formatDate.year.length);
        if(year.length == 2){
          year = (currentYear > year ? '19' : '20') + year;
        }
      }
      if(formatDate.hours) var hours = value.substr(formatDate.hours.start, formatDate.hours.length);
      if(formatDate.minutes) var minutes = value.substr(formatDate.minutes.start, formatDate.minutes.length);
      if(formatDate.seconds) var seconds = value.substr(formatDate.seconds.start, formatDate.seconds.length);
      if(formatDate.milliseconds) var milliseconds = value.substr(formatDate.milliseconds.start, formatDate.milliseconds.length);

      day = day || 0;
      month = month || 0;
      year = year || 0;
      hours = hours || 0;
      minutes = minutes || 0;
      seconds = seconds || 0;
      milliseconds = milliseconds || 0;

      var date = new Date(Number(year), Number(month) - 1, Number(day),
                          Number(hours), Number(minutes), Number(seconds), 
                          Number(milliseconds));

      return date.toISOString();
    }

    function _validateRules(property, row, lastRow){

      isEmpty
      equalLastResult
      contains
      notContains
    }

    function _validateFunctionRules(){

    }

    function _getFieldValue(field, columnsArray, template){
      var value = columnsArray[field.column];
      if(filter.isDate && template.formatType && template.formatType.date){
        value = _dateValueToISOString(value, template.formatType.date);
      }
      return value;
    }

    function _fillRow(row, columnsArray, template){
      var isValid = true;
      var isResult = true;

      template.fields.forEach(function (templateField){
        var field = Field.createWithTemplateField(templateField);
        var value = _getFieldValue(field,columnsArray, template);
        if(_isEmpty(value)){
          if(field.required) {
            field.isEmpty = true;
            isValid = false;
          }
          if(!_isEmpty(template.valueIfUndefined)) value = template.valueIfUndefined;
        }
        field.value = value;
        row.insertField(field);
      });

      return row;
    }

    function _validateFieldRules(field, rules, row, lastResult){
      var isValid = true;
      
      if(isValid && _exists(rules.isEmpty)){
        var expected = rules.isEmpty;
        returned = field.isEmpty;
        isValid = expected === returned;
      }
      
      if(isValid && _exists(rules.equalLastResult)){
        var expected = rules.equalLastResult;
        returned = _equalLastResult(field.name, row, lastResult);
        isValid = expected === returned;
      }
      
      if(isValid && _exists(rules.contains)){
        var textArray = rules.contains;
        returned = _contains(field.name, row, textArray);
        isValid = returned;
      }
      
      
      if(isValid && _exists(rules.notContains)){
        var textArray = rules.notContains;
        returned = _notContains(field.name, row, textArray);
        isValid = returned;
      }

      return isValid;
    }

    function _validateRow(row, lastResult){
      row.fields.forEach(function(field){
        var isValid = true;

        if(field.required && field.isEmpty) isValid = false;

        if(isValid && field.examRule){
          isValid = _validateFieldRules(filter, field.rules.exam, row, lastResult);
          field.examRuleApplied = true;
          field.examRuleReturn = isValid;
        }

        if(isValid && field.resultRule){
          isValid = _validateFieldRules(filter, field.rules.result, row, lastResult);
          field.resultRuleApplied = true;
          field.resultRuleReturn = isValid;
        }

        if(isValid && field.examObservationRule){
          isValid = _validateFieldRules(filter, field.rules.examObservation, row, lastResult);
          field.examObservationRuleApplied = true;
          field.examObservationRuleReturn = isValid;
        }

        if(isValid && field.resultObservationRule){
          isValid = _validateFieldRules(filter, field.rules.resultObservation, row, lastResult);
          field.resultObservationRuleApplied = true;
          field.resultObservationRuleReturn = isValid;
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
    }

    function findTemplatesByFieldCenter(fieldCenter){
      var acronym = fieldCenter.acronym;
      var availableTemplates = [];
      var fieldCenterDefinition = FieldCenterService.getFieldCenterByAcronym(fieldCenter.acronym);

      availableTemplates = self.allTemplates.filter(function (template){
        return (
          fieldCenterDefinition.template.filter(function (centerTemplate){
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