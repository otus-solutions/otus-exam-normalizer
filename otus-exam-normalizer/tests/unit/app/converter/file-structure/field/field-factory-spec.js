describe('the Field Factory', function () {
  var Mock = {};
  var factory;

  beforeEach(function () {
    angular.mock.module('normalizerjs.converter');

    inject(function (_$injector_) {
      factory = _$injector_.get(
        'normalizerjs.converter.Field', {}
      );
    });
  });

  describe("create method", function () {
    beforeEach(function () {
      mockField();
    });

    it('should create an Field object ', function () {
      expect(Mock.Field.objectType).toEqual("Field");
    });
    it('the name should be equal to "" ', function () {
      expect(Mock.Field.name).toEqual("")
    });
    it('the value should be equal to "" ', function () {
      expect(Mock.Field.value).toEqual("")
    });
    it('the column should be equal to "" ', function () {
      expect(Mock.Field.column).toEqual("")
    });
    it('the required should be equal to false ', function () {
      expect(Mock.Field.required).toEqual(false)
    });
    it('the isDate should be equal to false ', function () {
      expect(Mock.Field.isDate).toEqual(false)
    });
    it('the isEmpty should be equal to false ', function () {
      expect(Mock.Field.isEmpty).toEqual(false)
    });
    it('the examRule should be equal to undefined ', function () {
      expect(Mock.Field.examRule).toEqual(undefined)
    });
    it('the examRuleApplied should be equal to false ', function () {
      expect(Mock.Field.examRuleApplied).toEqual(false)
    });
    it('the examRuleReturn should be equal to undefined ', function () {
      expect(Mock.Field.examRuleReturn).toEqual(undefined)
    });
    it('the resultRule should be equal to undefined ', function () {
      expect(Mock.Field.resultRule).toEqual(undefined)
    });
    it('the resultRuleApplied should be equal to false ', function () {
      expect(Mock.Field.resultRuleApplied).toEqual(false)
    });
    it('the resultRuleReturn should be equal to undefined ', function () {
      expect(Mock.Field.resultRuleReturn).toEqual(undefined)
    });
    it('the examObservationRule should be equal to undefined ', function () {
      expect(Mock.Field.examObservationRule).toEqual(undefined)
    });
    it('the examObservationRuleApplied should be equal to false ', function () {
      expect(Mock.Field.examObservationRuleApplied).toEqual(false)
    });
    it('the examObservationRuleReturn should be equal to undefined ', function () {
      expect(Mock.Field.examObservationRuleReturn).toEqual(undefined)
    });
    it('the resultObservationRule should be equal to undefined ', function () {
      expect(Mock.Field.resultObservationRule).toEqual(undefined)
    });
    it('the resultObservationRuleApplied should be equal to false ', function () {
      expect(Mock.Field.resultObservationRuleApplied).toEqual(false)
    });
    it('the resultObservationRuleReturn should be equal to undefined ', function () {
      expect(Mock.Field.resultObservationRuleReturn).toEqual(undefined)
    });
  });

  describe("createWithTemplateField method", function () {
    beforeEach(function () {
      mockTemplateField();
      mockFieldByTemplateField();
    });
    it('the name should be equal to TemplateField.name', function () {
      expect(Mock.FieldByTemplateField.name).toEqual(Mock.TemplateField.name);
    });
    it('the column should be equal to TemplateField.column', function () {
      expect(Mock.FieldByTemplateField.column).toEqual(Mock.TemplateField.column);
    });
    it('the required should be equal to TemplateField.required', function () {
      expect(Mock.FieldByTemplateField.required).toEqual(Mock.TemplateField.required);
    });
    it('the isDate should be equal to TemplateField.isDate', function () {
      expect(Mock.FieldByTemplateField.isDate).toEqual(Mock.TemplateField.isDate);
    });

    it('the examRule should be equal to TemplateField.rules.result', function () {
      expect(Mock.FieldByTemplateField.examRule).toEqual(Mock.TemplateField.rules.result)
    });
    it('the resultRule should be equal to TemplateField.rules.exam', function () {
      expect(Mock.FieldByTemplateField.resultRule).toEqual(Mock.TemplateField.rules.exam)
    });
    it('the examObservationRule should be equal to TemplateField.rules.examObservation', function () {
      expect(Mock.FieldByTemplateField.examObservationRule).toEqual(Mock.TemplateField.rules.examObservation)
    });
    it('the resultObservationRule should be equal to TemplateField.rules.resultObservation', function () {
      expect(Mock.FieldByTemplateField.resultObservationRule).toEqual(Mock.TemplateField.rules.resultObservation)
    });
  });

  describe("fromJson method", function () {
    beforeEach(function () {
      mockFieldsJson();
      mockFieldsFromJson();
    });
    it('the objectType should be equal to FieldsJson.objectType', function () {
      expect(Mock.FieldsFromJson[0].objectType).toEqual(Mock.FieldsJson[0].objectType);
    });
    it('the name should be equal to FieldsJson.name', function () {
      expect(Mock.FieldsFromJson[0].name).toEqual(Mock.FieldsJson[0].name);
    });
    it('the value should be equal to FieldsJson.value', function () {
      expect(Mock.FieldsFromJson[0].value).toEqual(Mock.FieldsJson[0].value);
    });
    it('the column should be equal to FieldsJson.column', function () {
      expect(Mock.FieldsFromJson[0].column).toEqual(Mock.FieldsJson[0].column);
    });
  });

  describe("toJSON method", function () {
    beforeEach(function () {
      mockFieldsJson();
      mockFieldsFromJson();
    });
    it('the JSON should be valid', function () {
      expect(JSON.stringify(Mock.FieldsFromJson[0])).toEqual(JSON.stringify(Mock.FieldsJson[0]));
    });
  });

  function mockField() {
    Mock.Field = factory.create();
  }

  function mockTemplateField() {
    Mock.TemplateField = {
      name: "aliquot",
      column: 1,
      required: true,
      isDate: false,
      rules: {
        result: {
          isEmpty: true,
        },
        exam: {
          isEmpty: true,
        },
        examObservation: {
          isEmpty: true,
        },
        resultObservation: {
          isEmpty: true,
        }
      },
    };
  }

  function mockFieldByTemplateField() {
    Mock.FieldByTemplateField = factory.createWithTemplateField(Mock.TemplateField);
  }

  function mockFieldsFromJson() {
    Mock.FieldsFromJson = factory.fromJson(Mock.FieldsJson);
  }

  function mockFieldsJson() {
    Mock.FieldsJson = Test.utils.data.Fields;
  }
});



