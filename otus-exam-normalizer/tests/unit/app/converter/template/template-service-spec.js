describe('TemplateService service', function () {
  var Mock = {};
  var service;
  var RowFactory;

  beforeEach(function () {
    angular.mock.module('normalizerjs.converter');

    inject(function (_$injector_) {
      service = _$injector_.get(
        'normalizerjs.converter.template.TemplateService', {}
      );
      RowFactory = _$injector_.get(
        'normalizerjs.converter.RowFactory', {}
      );
    });
  });

  describe('findTemplatesByFieldCenter method ', function () {
    beforeEach(function () {
      mockFieldCenter();
    });
    it('should have more than one model', function () {
      let templates = service.findTemplatesByFieldCenter(Mock.FieldCenter);
      expect(templates.length).toBeGreaterThan(1);
    });
  });

  describe('getTemplate method ', function () {
    beforeEach(function () {
      mockSheet();
      mockAvaiableTemplates();
    });
    it('should have more than one model', function () {
      let template = service.getTemplate(Mock.Sheet, Mock.AvaiableTemplates);
      expect(template.template).toEqual("bioquimica-urina-sp");
    });
  });

  describe('getColumn method ', function () {
    beforeEach(function () {
      mockTemplate();
    });
    it('the column should be equal to 1', function () {
      let column = service.getColumn("aliquot", Mock.Template);
      expect(column).toEqual(1);
    });
    it('the column should be equal to 5', function () {
      let column = service.getColumn("examCode", Mock.Template);
      expect(column).toEqual(5);
    });
    it('the column should be equal to 6', function () {
      let column = service.getColumn("examName", Mock.Template);
      expect(column).toEqual(6);
    });
    it('the column should be equal to 7', function () {
      let column = service.getColumn("label", Mock.Template);
      expect(column).toEqual(7);
    });
  });

  describe('getValueFromSheet method ', function () {
    beforeEach(function () {
      mockTemplate();
    });
    it('the value should be equal to "Matrícula"', function () {
      let value = service.getValueFromSheet(Mock.Sheet, 2, 0);
      expect(value).toEqual("Matrícula");
    });
    it('the value should be equal to "Nome do Paciente"', function () {
      let value = service.getValueFromSheet(Mock.Sheet, 2, 1);
      expect(value).toEqual("Nome do Paciente");
    });
    it('the value should be equal to "C0000942782"', function () {
      let value = service.getValueFromSheet(Mock.Sheet, 3, 0);
      expect(value).toEqual("C0000942782");
    });
  });

  describe('fillRow method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockRowFilled();
    });
    it('the registrationCode should be equal to C0000942782', function () {
      expect(Mock.RowFilled.registrationCode).toEqual("C0000942782");
    });
    it('the aliquot should be equal to 363004755', function () {
      expect(Mock.RowFilled.aliquot).toEqual("363004755");
    });
    it('the solicitationNumber should be equal to 1118947', function () {
      expect(Mock.RowFilled.solicitationNumber).toEqual("1118947");
    });
    it('the orderNumber should be equal to 7839104', function () {
      expect(Mock.RowFilled.orderNumber).toEqual("7839104");
    });
    it('the itemNumber should be equal to 4040767', function () {
      expect(Mock.RowFilled.itemNumber).toEqual("4040767");
    });
    it('the examCode should be equal to 111100', function () {
      expect(Mock.RowFilled.examCode).toEqual("111100");
    });
    it('the examName should be equal to "SÓDIO - URINA AMOSTRA ISOLADA"', function () {
      expect(Mock.RowFilled.examName).toEqual("SÓDIO - URINA AMOSTRA ISOLADA");
    });
    it('the label should be equal to "SÓDIO...................................:"', function () {
      expect(Mock.RowFilled.label).toEqual("SÓDIO...................................:");
    });
    it('the result should be equal to 148', function () {
      expect(Mock.RowFilled.result).toEqual("148");
    });
    it('the releaseDate should be equal to "26/05/17 12:11"', function () {
      let date = service.dateValueToISOString("26/05/17 12:11", Mock.Template.formatType.date);
      expect(Mock.RowFilled.releaseDate).toEqual(date);
    });
  });

  describe('equalLastResult method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
    });
    it('the aliquot should be equal to the last result', function () {
      let returned = service.equalLastResult("aliquot", Mock.RowFilled, Mock.LastResult);
      expect(returned).toEqual(true);
    });
    it('the examCode examCode not be equal to the last result', function () {
      let returned = service.equalLastResult("examCode", Mock.RowFilled, Mock.LastResult);
      expect(returned).toEqual(false);
    });
  });

  describe('contains method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
    });
    it('(1) the return should be equal to true', function () {
      let returned = service.contains("aliquot", Mock.RowFilled, ["3"]);
      expect(returned).toEqual(true);
    });
    it('(2) the return should be equal to false', function () {
      let returned = service.contains("aliquot", Mock.RowFilled, ["a"]);
      expect(returned).toEqual(false);
    });
  });

  describe('notContains method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
    });
    it('(1) the return should be equal to false', function () {
      let returned = service.notContains("aliquot", Mock.RowFilled, ["3"]);
      expect(returned).toEqual(false);
    });
    it('(2) the return should be equal to true', function () {
      let returned = service.notContains("aliquot", Mock.RowFilled, ["a"]);
      expect(returned).toEqual(true);
    });
  });

  describe('exists method ', function () {
    it('(1) the return should be equal to false', function () {
      let returned = service.exists(undefined);
      expect(returned).toEqual(false);
    });
    it('(2) the return should be equal to true', function () {
      let returned = service.exists("");
      expect(returned).toEqual(true);
    });
    it('(3) the return should be equal to true', function () {
      let returned = service.exists(0);
      expect(returned).toEqual(true);
    });
    it('(4) the return should be equal to true', function () {
      let returned = service.exists(false);
      expect(returned).toEqual(true);
    });
  });

  describe('isEmpty method ', function () {
    it('(1) the return should be equal to true', function () {
      let returned = service.isEmpty(undefined);
      expect(returned).toEqual(true);
    });
    it('(2) the return should be equal to true', function () {
      let returned = service.isEmpty("");
      expect(returned).toEqual(true);
    });
    it('(3) the return should be equal to false', function () {
      let returned = service.isEmpty(0);
      expect(returned).toEqual(false);
    });
    it('(4) the return should be equal to false', function () {
      let returned = service.isEmpty(false);
      expect(returned).toEqual(false);
    });
  });

  describe('dateValueToISOString method ', function () {
    beforeEach(function () {
      mockTemplate();
    });
    it('(1) the return should be equal to "2017-05-26T15:11:00.000Z"', function () {
      let returned = service.dateValueToISOString("26/05/17 12:11", Mock.Template.formatType.date);
      expect(returned).toEqual("2017-05-26T15:11:00.000Z");
    });
    it('(2) the return should be equal to "2017-05-26T15:11:00.000Z"', function () {
      let returned = service.dateValueToISOString(
        "m:11, h:12, a:2017, M:5, d:26",
        {
          minutes: { start: 2, length: 2 },
          hours: { start: 8, length: 2 },
          year: { start: 14, length: 4 },
          month: { start: 22, length: 1 },
          day: { start: 27, length: 2 }
        }
      );
      expect(returned).toEqual("2017-05-26T15:11:00.000Z");
    });
  });

  describe('getFieldValue method ', function () {
    beforeEach(function () {
      mockTemplate();
    });
    it('(1) the return should be equal to "363004755"', function () {
      let returned = service.getFieldValue(
        Test.utils.data.Fields[0],
        Test.utils.data.sheet[4],
        Mock.Template
      );
      expect(returned).toEqual("363004755");
    });
    it('(2) the return should be equal to "111100"', function () {
      let returned = service.getFieldValue(
        Test.utils.data.Fields[1],
        Test.utils.data.sheet[4],
        Mock.Template
      );
      expect(returned).toEqual("111100");
    });
  });

  describe('getObservation method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
    });
    it('(1) the return should be equal to "363004755"', function () {
      let returned = service.getObservation(
        {
          observationFromTheField: "aliquot"
        },
        Mock.RowFilled,
        Mock.LastResult
      );
      expect(returned).toEqual("363004755");
    });
    it('(2) the return should be equal to "CREATININA - URINA AMOSTRA ISOLADA"', function () {
      let returned = service.getObservation(
        {
          getObservation: (row, lastResult) => lastResult.examName
        },
        Mock.RowFilled,
        Mock.LastResult
      );
      expect(returned).toEqual("CREATININA - URINA AMOSTRA ISOLADA");
    });
  });

  describe('validateFunctionRules method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
    });
    it('(1) the return should be equal to false', function () {
      let returned = service.validateFunctionRules(
        {
          otherValidation: (row, lastResult) => row.aliquot !== lastResult.aliquot
        },
        Mock.RowFilled,
        Mock.LastResult,
        true
      );
      expect(returned).toEqual(false);
    });
    it('(2) the return should be equal to true', function () {
      let returned = service.validateFunctionRules(
        {},
        Mock.RowFilled,
        Mock.LastResult,
        true
      );
      expect(returned).toEqual(true);
    });
  });

  describe('validateSimpleRules method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
    });
    it('(1) the return should be equal to true', function () {
      let returned = service.validateSimpleRules(
        Test.utils.data.Fields[0],
        {
          isEmpty: false,
          equalLastResult: true,
          contains: ['3'],
          notContains: ['a']
        },
        Mock.RowFilled,
        Mock.LastResult
      );
      expect(returned).toEqual(true);
    });
  });

  describe('validateFieldsRule method ', function () {
    var fields = {};
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
      service.validateFieldsRule(Mock.RowFilled, Mock.LastResult);
      Mock.RowFilled.fields.forEach(field => {
        fields[field.name] = field;
      });
    });
    it('the aliquot.resultRuleReturn should be equal to true', function () {
      expect(fields.aliquot.resultRuleReturn).toEqual(true);
    });
    it('the examCode.resultRuleReturn should be equal to true', function () {
      expect(fields.examCode.resultRuleReturn).toEqual(true);
    });
    it('the examName.resultRuleReturn should be equal to true', function () {
      expect(fields.examName.resultRuleReturn).toEqual(true);
    });
    it('the label.resultRuleReturn should be equal to true', function () {
      expect(fields.label.resultRuleReturn).toEqual(true);
    });
    it('the aliquot.examObservationRuleReturn should be undefined', function () {
      expect(fields.aliquot.examObservationRuleReturn).toEqual(undefined);
    });
    it('the examCode.examObservationRuleReturn should be undefined', function () {
      expect(fields.examCode.examObservationRuleReturn).toEqual(undefined);
    });
    it('the examName.examObservationRuleReturn should be undefined', function () {
      expect(fields.examName.examObservationRuleReturn).toEqual(undefined);
    });
    it('the label.examObservationRuleReturn should be undefined', function () {
      expect(fields.label.examObservationRuleReturn).toEqual(undefined);
    });
  });

  describe('validateRow method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
      service.validateFieldsRule(Mock.RowFilled, Mock.LastResult);
      service.validateRow(Mock.RowFilled, Mock.LastResult, Mock.Template);
    });
    it('the isResult should be equal to true', function () {
      expect(Mock.RowFilled.isResult).toEqual(true);
    });
    it('the isNewExam should be equal to true', function () {
      expect(Mock.RowFilled.isNewExam).toEqual(true);
    });
    it('the isExamObservation should be equal to false', function () {
      expect(Mock.RowFilled.isExamObservation).toEqual(false);
    });
    it('the isResultObservation should be equal to false', function () {
      expect(Mock.RowFilled.isResultObservation).toEqual(false);
    });
  });

  describe('createRow method ', function () {
    beforeEach(function () {
      mockTemplate();
      mockLastResult();
      mockRowFilled();
      mockRowCreated();
    });
    it('the isResult should be equal to true', function () {
      expect(Mock.RowCreated.isResult).toEqual(true);
    });
    it('the isNewExam should be equal to true', function () {
      expect(Mock.RowCreated.isNewExam).toEqual(true);
    });
    it('the isExamObservation should be equal to false', function () {
      expect(Mock.RowCreated.isExamObservation).toEqual(false);
    });
    it('the isResultObservation should be equal to false', function () {
      expect(Mock.RowCreated.isResultObservation).toEqual(false);
    });
    it('the registrationCode should be equal to C0000942782', function () {
      expect(Mock.RowCreated.registrationCode).toEqual("C0000942782");
    });
    it('the aliquot should be equal to 363004755', function () {
      expect(Mock.RowCreated.aliquot).toEqual("363004755");
    });
    it('the solicitationNumber should be equal to 1118947', function () {
      expect(Mock.RowCreated.solicitationNumber).toEqual("1118947");
    });
    it('the orderNumber should be equal to 7839104', function () {
      expect(Mock.RowCreated.orderNumber).toEqual("7839104");
    });
    it('the itemNumber should be equal to 4040767', function () {
      expect(Mock.RowCreated.itemNumber).toEqual("4040767");
    });
    it('the examCode should be equal to 111100', function () {
      expect(Mock.RowCreated.examCode).toEqual("111100");
    });
    it('the examName should be equal to "SÓDIO - URINA AMOSTRA ISOLADA"', function () {
      expect(Mock.RowCreated.examName).toEqual("SÓDIO - URINA AMOSTRA ISOLADA");
    });
    it('the label should be equal to "SÓDIO...................................:"', function () {
      expect(Mock.RowCreated.label).toEqual("SÓDIO...................................:");
    });
    it('the result should be equal to 148', function () {
      expect(Mock.RowCreated.result).toEqual("148");
    });
    it('the releaseDate should be equal to "26/05/17 12:11"', function () {
      let date = service.dateValueToISOString("26/05/17 12:11", Mock.Template.formatType.date);
      expect(Mock.RowCreated.releaseDate).toEqual(date);
    });
  });

  function mockFieldCenter() {
    Mock.FieldCenter = {
      acronym: "SP"
    };
  }

  function mockAvaiableTemplates() {
    mockFieldCenter();
    Mock.AvaiableTemplates = service.findTemplatesByFieldCenter(Mock.FieldCenter);
  }

  function mockTemplate() {
    if (!Mock.Sheet) mockSheet();
    if (!Mock.AvaiableTemplates) mockAvaiableTemplates();
    Mock.Template = service.getTemplate(Mock.Sheet, Mock.AvaiableTemplates);
  }

  function mockSheet() {
    Mock.Sheet = Test.utils.data.sheet;
  }

  function mockLastResult() {
    Mock.LastResult = RowFactory.fromJson([Test.utils.data.LastResult])[0];
  }

  function mockRowFilled() {
    if (!Mock.Template) mockTemplate();
    if (!Mock.LastResult) mockLastResult();
    let columnsArray = Test.utils.data.sheet[4];
    let row = RowFactory.create();
    row.originalColumnsArray = columnsArray;
    row.originalLine = 4;
    row.index = Mock.LastResult ? Mock.LastResult.index + 1 : 0;
    row.countRowsAfterLastResult = Mock.LastResult ? Mock.LastResult.countRowsAfterLastResult + 1 : 0;
    service.fillRow(row, columnsArray, Mock.Template);
    Mock.RowFilled = row;
  }
  
  function mockRowCreated() {
    if (!Mock.Template) mockTemplate();
    if (!Mock.LastResult) mockLastResult();
    Mock.RowCreated = service.createRow(
      Mock.Template,
      Test.utils.data.sheet[4],
      Mock.LastResult,
      Mock.LastResult,
      4
    );
  }
});