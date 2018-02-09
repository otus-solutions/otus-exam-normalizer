(function () {
  'use strict';

  angular
    .module('normalizerjs.converter')
    .factory('normalizerjs.converter.Field', Factory);

  Factory.$inject = [
    
  ];

  function Factory(FieldRule) {
    var self = this;
    self.create = create;
    self.fromJson = fromJson;

    function create() {
      return new Field();
    }

    function createWithTemplateField(templateField) {
      var field = new Field();

      field.name = templateField.name;
      field.column = templateField.column;
      field.required = templateField.required;
      field.isDate = templateField.isDate;

      field.rules = templateField.rules;

      if(field.rules) {
        if(field.rules.exam) field.examRule = false;
        if(field.rules.result) field.resultRule = true;
        if(field.rules.examObservation) field.examObservationRule = true;
        if(field.rules.resultObservation) field.resultObservationRule = true;
      }

      return field;
    }

    function fromJson(fieldInfo) {
      return new Field(fieldInfo);
    }

    return self;
  }

  function Field(fieldInfo) {
    var self = this;

    self.objectType = 'Field';
    self.name = fieldInfo.name || "";
    self.value = fieldInfo.value || "";
    self.column = fieldInfo.column || "";
    self.required = fieldInfo.required || false;
    self.isDate = fieldInfo.isDate || false;
    self.isEmpty = fieldInfo.isEmpty || false;

    self.rules = fieldInfo.rules || "";
    
    self.examRule = fieldInfo.examRule || false;
    self.examRuleApplied = fieldInfo.examRuleApplied || false;
    self.examRuleReturn = fieldInfo.examRuleReturn || undefined;
    
    self.resultRule = fieldInfo.resultRule || false;
    self.resultRuleApplied = fieldInfo.resultRuleApplied || false;
    self.resultRuleReturn = fieldInfo.resultRuleReturn || undefined;
    
    self.examObservationRule = fieldInfo.examObservationRule || false;
    self.examObservationRuleApplied = fieldInfo.examObservationRuleApplied || false;
    self.examObservationRuleReturn = fieldInfo.examObservationRuleReturn || undefined;
    
    self.resultObservationRule = fieldInfo.resultObservationRule || false;
    self.resultObservationRuleApplied = fieldInfo.resultObservationRuleApplied || false;
    self.resultObservationRuleReturn = fieldInfo.resultObservationRuleReturn || undefined;
    
    self.toJSON = toJSON;

    _onInit();

    function _onInit() {
      
    }

    function toJSON() {
      var json = {
        self
      };

      return json;
    }
  }
}());  