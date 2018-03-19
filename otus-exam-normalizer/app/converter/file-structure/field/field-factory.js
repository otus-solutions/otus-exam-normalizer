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
    self.createWithTemplateField = createWithTemplateField;

    function create() {
      return new Field({});
    }

    function createWithTemplateField(templateField) {
      var field = new Field({});
      field.name = templateField.name;
      field.column = templateField.column;
      field.required = templateField.required || false;
      field.isDate = templateField.isDate || false;

      if (templateField.rules) {
        field.examRule = templateField.rules.exam;
        field.resultRule = templateField.rules.result;
        field.examObservationRule = templateField.rules.examObservation;
        field.resultObservationRule = templateField.rules.resultObservation;
      }
      return field;
    }

    function fromJson(fieldInfoArray) {
      if (Array.isArray(fieldInfoArray)) {
        return fieldInfoArray.map(function (fieldInfo) {
          return new Field(fieldInfo);
        });
      } else {
        return [];
      }
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

    self.examRule = fieldInfo.examRule || undefined;
    self.examRuleApplied = fieldInfo.examRuleApplied || false;
    self.examRuleReturn = fieldInfo.examRuleReturn || undefined;

    self.resultRule = fieldInfo.resultRule || undefined;
    self.resultRuleApplied = fieldInfo.resultRuleApplied || false;
    self.resultRuleReturn = fieldInfo.resultRuleReturn || undefined;

    self.examObservationRule = fieldInfo.examObservationRule || undefined;
    self.examObservationRuleApplied = fieldInfo.examObservationRuleApplied || false;
    self.examObservationRuleReturn = fieldInfo.examObservationRuleReturn || undefined;

    self.resultObservationRule = fieldInfo.resultObservationRule || undefined;
    self.resultObservationRuleApplied = fieldInfo.resultObservationRuleApplied || false;
    self.resultObservationRuleReturn = fieldInfo.resultObservationRuleReturn || undefined;

    self.toJSON = toJSON;

    _onInit();

    function _onInit() {

    }

    function toJSON() {
      var json = {
        objectType: self.objectType,
        name: self.name,
        value: self.value,
        column: self.column,
        required: self.required,
        isDate: self.isDate,
        isEmpty: self.isEmpty,
        examRule: self.examRule,
        examRuleApplied: self.examRuleApplied,
        examRuleReturn: self.examRuleReturn,
        resultRule: self.resultRule,
        resultRuleApplied: self.resultRuleApplied,
        resultRuleReturn: self.resultRuleReturn,
        examObservationRule: self.examObservationRule,
        examObservationRuleApplied: self.examObservationRuleApplied,
        examObservationRuleReturn: self.examObservationRuleReturn,
        resultObservationRule: self.resultObservationRule,
        resultObservationRuleApplied: self.resultObservationRuleApplied,
        resultObservationRuleReturn: self.resultObservationRuleReturn
      };
      return json;
    }
  }
}());  