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
    it('the aliquot should be equal to the last result', function () {
      let returned = service.contains("aliquot", Mock.RowFilled, "");
      expect(returned).toEqual(true);
    });
    it('the examCode examCode not be equal to the last result', function () {
      let returned = service.contains("examCode", Mock.RowFilled, "");
      expect(returned).toEqual(false);
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
    if(!Mock.Template) mockTemplate();
    if(!Mock.LastResult) mockLastResult();
    let columnsArray = Test.utils.data.sheet[4];
    let row = RowFactory.create();
    row.originalColumnsArray = columnsArray;
    row.originalLine = 4;
    row.index = Mock.LastResult ? Mock.LastResult.index + 1 : 0;
    row.countRowsAfterLastResult = Mock.LastResult ? Mock.LastResult.countRowsAfterLastResult + 1 : 0;
    service.fillRow(row, columnsArray, Mock.Template);
    Mock.RowFilled = row;
  }
});