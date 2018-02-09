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

    function fromJson(rowInfo) {
      return new Row(Field, rowInfo);
    }

    return self;
  }

  function Row(Field, rowInfo) {
    var self = this;

    self.objectType = 'Row';
    self.index = rowInfo.index || 0;
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
    self.fields = rowInfo.fields || [];

    self.toJSON = toJSON;
    self.insertField = insertField;

    _onInit();

    function _onInit() {
      
    }

    function insertField(field) {
      self.fields.push(field);
      if (!self[field.name]) self[field.name] = field.value;
      /* Campos Dinamicos
          aliquot = "";
          patientName = "";
          solicitationNumber = "";
          orderNumber = "";
          itemNumber = "";
          examCode = "";
          examName = "";
          label = "";
          result = "";
          requestDate = "";
          collectionDate = "";
          releaseDate = "";
      */
    }

    function toJSON() {
      var json = {
        self
      };

      return json;
    }
  }
}());

