describe('the Row Factory', function () {
  var Mock = {};
  var factory;

  beforeEach(function () {
    angular.mock.module('normalizerjs.converter');

    inject(function (_$injector_) {
      factory = _$injector_.get(
        'normalizerjs.converter.RowFactory', {}
      );
    });
  });

  describe("create method", function () {
    beforeEach(function () {
      mockRow();
    });
    it('should create an Row object ', function () {
      expect(Mock.Row.objectType).toEqual("Row");
    });
    it('the index should be equal to 0 ', function () {
      expect(Mock.Row.index).toEqual(0);
    });
    it('the originalLine should be equal to 0 ', function () {
      expect(Mock.Row.originalLine).toEqual(0);
    });
    it('the originalColumnsArray should be equal to [] ', function () {
      expect(Mock.Row.originalColumnsArray).toEqual([]);
    });
    it('the countRowsAfterLastResult should be equal to 1 ', function () {
      expect(Mock.Row.countRowsAfterLastResult).toEqual(1);
    });
    it('the fieldsRequiredfilled should be equal to false ', function () {
      expect(Mock.Row.fieldsRequiredfilled).toEqual(false);
    });
    it('the isValid should be equal to true ', function () {
      expect(Mock.Row.isValid).toEqual(true);
    });
    it('the isResult should be equal to false ', function () {
      expect(Mock.Row.isResult).toEqual(false);
    });
    it('the isNewExam should be equal to false ', function () {
      expect(Mock.Row.isNewExam).toEqual(false);
    });
    it('the isExamObservation should be equal to false ', function () {
      expect(Mock.Row.isExamObservation).toEqual(false);
    });
    it('the isResultObservation should be equal to false ', function () {
      expect(Mock.Row.isResultObservation).toEqual(false);
    });
    it('the observation should be equal to "" ', function () {
      expect(Mock.Row.observation).toEqual("");
    });
    it('the rejected should be equal to false ', function () {
      expect(Mock.Row.rejected).toEqual(false);
    });
    it('the rejectionMessage should be equal to "" ', function () {
      expect(Mock.Row.rejectionMessage).toEqual("");
    });
    it('the fields should be equal to [] ', function () {
      expect(Mock.Row.fields).toEqual([]);
    });
  });

  describe("fromJson method", function () {
    beforeEach(function () {
      mockRowsJson();
      mockRowsFromJson();
    });
    it('the objectType should be equal to RowsJson.objectType', function () {
      expect(Mock.RowsFromJson[0].objectType).toEqual(Mock.RowsJson[0].objectType);
    });
    it('the name should be equal to RowsJson.name', function () {
      expect(Mock.RowsFromJson[0].name).toEqual(Mock.RowsJson[0].name);
    });
    it('the value should be equal to RowsJson.value', function () {
      expect(Mock.RowsFromJson[0].value).toEqual(Mock.RowsJson[0].value);
    });
    it('the column should be equal to RowsJson.column', function () {
      expect(Mock.RowsFromJson[0].column).toEqual(Mock.RowsJson[0].column);
    });
  });

  describe("toJSON method", function () {
    beforeEach(function () {
      mockRowsJson();
      mockRowsFromJson();
    });
    it('the JSON should be valid', function () {
      expect(JSON.parse(JSON.stringify(Mock.RowsFromJson[0])).objectType).toEqual("Row");
    });
  });

  describe("insertField method", function () {
    beforeEach(function () {
      mockRow();
    });
    it('the JSON should be valid', function () {
      var field = Test.utils.data.Fields[0];
      Mock.Row.insertField(field);
      expect(Mock.Row[field.name]).toEqual(field.value);

      var otherField = Test.utils.data.Fields[1];
      Mock.Row.insertField(otherField);
      expect(Mock.Row[otherField.name]).toEqual(otherField.value);
    });
  });

  function mockRow() {
    Mock.Row = factory.create();
  }

  function mockRowsFromJson() {
    Mock.RowsFromJson = factory.fromJson(Mock.RowsJson);
  }

  function mockRowsJson() {
    Mock.RowsJson = Test.utils.data.rows;
  }
});


