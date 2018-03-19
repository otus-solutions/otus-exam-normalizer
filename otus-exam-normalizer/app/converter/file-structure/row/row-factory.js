(function () {
  'use strict';

  angular
    .module('normalizerjs.converter')
    .factory('normalizerjs.converter.RowFactory', Factory);

  Factory.$inject = [
    'normalizerjs.converter.Field'
  ];

  function Factory(Field) {
    var self = this;
    self.create = create;
    self.fromJson = fromJson;

    function create() {
      return new Row(Field, {});
    }

    function fromJson(rowInfoArray) {
      if (Array.isArray(rowInfoArray)) {
        return rowInfoArray.map(function (rowInfo) {
          return new Row(Field, rowInfo);
        });
      } else {
        return [];
      }
    }

    return self;
  }

  function Row(Field, rowInfo) {
    var self = this;

    self.objectType = 'Row';
    self.index = rowInfo.index || 0;
    self.originalLine = rowInfo.originalLine || 0;
    self.originalColumnsArray = rowInfo.originalColumnsArray || [];
    self.countRowsAfterLastResult = rowInfo.countRowsAfterLastResult || 1;

    self.fieldsRequiredfilled = rowInfo.fieldsRequiredfilled || false;
    self.isValid = rowInfo.isValid || true;
    self.isResult = rowInfo.isResult || false;
    self.isNewExam = rowInfo.isNewExam || false;
    self.isExamObservation = rowInfo.isExamObservation || false;
    self.isResultObservation = rowInfo.isResultObservation || false;
    self.observation = rowInfo.observation || "";
    self.rejected = rowInfo.rejected || false;
    self.rejectionMessage = rowInfo.rejectionMessage || "";
    self.fields = Field.fromJson(rowInfo.fields);

    self.toJSON = toJSON;
    self.insertField = insertField;

    _onInit();

    function _onInit() {
      _fillDynamicAttributes();
    }

    function _fillDynamicAttributes() {
      if (self.fields && self.fields.length) {
        self.fields.forEach(function (field) {
          _insertDynamicAttributes(field);
        });
      }
    }
    function _insertDynamicAttributes(field) {
      if (!self[field.name]) self[field.name] = field.value;
      /*
      //Example:
        self.aliquot = field.value;
        self.registrationCode = field.value;
        self.solicitationNumber = field.value;
        self.orderNumber = field.value;
        self.itemNumber = field.value;
        self.examCode = field.value;
        self.examName = field.value;
        self.label = field.value;
        self.result = field.value;
        self.requestDate = field.value;
        self.collectionDate = field.value;
        self.releaseDate = field.value;
      */
    }

    function insertField(field) {
      self.fields.push(field);
      _insertDynamicAttributes(field);
    }

    function toJSON() {
      var json = {
        objectType: self.objectType,
        index: self.index,
        originalLine: self.originalLine,
        originalColumnsArray: self.originalColumnsArray,
        countRowsAfterLastResult: self.countRowsAfterLastResult,
        fieldsRequiredfilled: self.fieldsRequiredfilled,
        isValid: self.isValid,
        isResult: self.isResult,
        isNewExam: self.isNewExam,
        isExamObservation: self.isExamObservation,
        isResultObservation: self.isResultObservation,
        observation: self.observation,
        rejected: self.rejected,
        rejectionMessage: self.rejectionMessage,
        fields: self.fields
      };
      return json;
    }
  }
}());

