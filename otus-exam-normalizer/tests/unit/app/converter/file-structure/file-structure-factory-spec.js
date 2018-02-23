describe('the FileStructure Factory', function () {
  var Mock = {};
  var factory;

  beforeEach(function () {
    angular.mock.module('normalizerjs.converter');

    inject(function (_$injector_) {
      factory = _$injector_.get(
        'normalizerjs.converter.FileStructureFactory', {}
      );
    });
  });

  describe("create method", function () {
    beforeEach(function () {
      mockFileStructure();
    });
    it('should create an FileStructure object ', function () {
      expect(Mock.FileStructure.objectType).toEqual("FileStructure");
    });
    it('the fileName should be equal to "" ', function () {
      expect(Mock.FileStructure.fileName).toEqual("");
    });
    it('the realizationDate should not be undefined ', function () {
      expect(Mock.FileStructure.realizationDate).not.toEqual(undefined);
    });
    it('the template should be equal to undefined ', function () {
      expect(Mock.FileStructure.template).toEqual(undefined);
    });
    it('the lastResult should be equal to undefined ', function () {
      expect(Mock.FileStructure.lastResult).toEqual(undefined);
    });
  });

  describe("fromJson method", function () {
    beforeEach(function () {
      mockFileStructuresJson();
      mockFileStructureFromJson();
    });
    it('the objectType should be equal to FileStructuresJson.objectType', function () {
      expect(Mock.FileStructureFromJson.objectType).toEqual(Mock.FileStructuresJson.objectType);
    });
    it('the fileName should be equal to FileStructuresJson.fileName', function () {
      expect(Mock.FileStructureFromJson.fileName).toEqual(Mock.FileStructuresJson.fileName);
    });
  });

  describe("toJSON method", function () {
    beforeEach(function () {
      mockFileStructuresJson();
      mockFileStructureFromJson();
    });
    it('the JSON should be valid', function () {
      expect(JSON.stringify(Mock.FileStructureFromJson)).toEqual(JSON.stringify(Mock.FileStructuresJson));
    });
  });

  describe("insertRow method", function () {
    beforeEach(function () {
      mockFileStructure();
      mockRow();
    });
    it('the Row should be inserted into the row array', function () {
      Mock.FileStructure.insertRow(Mock.Row);
      expect(Mock.FileStructure.rows[Mock.FileStructure.rows.length - 1]).toEqual(Mock.Row);
    });
    it('the lastResult should be equal to Mock.Row', function () {
      Mock.FileStructure.insertRow(Mock.Row);
      expect(Mock.FileStructure.lastResult).toEqual(Mock.Row);
    });
  });

  describe("setFieldCenter and getFieldCenter methods", function () {
    beforeEach(function () {
      mockFileStructure();
      mockFieldCenter();
    });
    it('the fieldCenter should be equal to Mock.FieldCenter', function () {
      Mock.FileStructure.setFieldCenter(Mock.FieldCenter);
      expect(Mock.FileStructure.getFieldCenter()).toEqual(Mock.FieldCenter);
    });
  });
  
  describe("findTemplate method", function () {
    beforeEach(function () {
      mockFileStructure();
      mockSheet();
      Mock.FileStructure.setFieldCenter(Mock.FieldCenter);
    });
    it('the template should not be undefined', function () {
      Mock.FileStructure.findTemplate(Mock.Sheet);
      expect(Mock.FileStructure.template).not.toEqual(undefined);
    });
  });

  describe("createRow method", function () {
    let originalLine = 3;
    beforeEach(function () {
      mockFileStructureWithTemplate();
      mockColumnsArray(originalLine);
    });
    it('should have a row', function () {
      Mock.FileStructureWithTemplate.createRow(Mock.ColumnsArray, originalLine);
      expect(Mock.FileStructureWithTemplate.rows.length).toEqual(1);
    });
  });

  describe("createRowsWithSheet method", function () {
    beforeEach(function () {
      mockFileStructureWithTemplate();
    });
    it('should have many rows', function () {
      Mock.FileStructureWithTemplate.createRowsWithSheet(Mock.Sheet);
      expect(Mock.FileStructureWithTemplate.rows.length).toEqual(253);
    });
  });

  function mockRow() {
    Mock.Row = Test.utils.data.rows[0];
  }
  
  function mockSheet() {
    Mock.Sheet = Test.utils.data.sheet;
  }

  function mockColumnsArray(line) {
    Mock.ColumnsArray = Test.utils.data.sheet[line];
  }

  function mockFieldCenter() {
    Mock.FieldCenter = {
      acronym: "SP"
    };
  }

  function mockFileStructure() {
    Mock.FileStructure = factory.create();
  }

  function mockFileStructureFromJson() {
    Mock.FileStructureFromJson = factory.fromJson(Mock.FileStructuresJson);
  }

  function mockFileStructureWithTemplate() {
    mockFieldCenter();
    mockSheet();
    Mock.FileStructureWithTemplate = factory.fromJson(Mock.FileStructuresJson);
    Mock.FileStructureWithTemplate.setFieldCenter(Mock.FieldCenter);
    Mock.FileStructureWithTemplate.findTemplate(Mock.Sheet);
  }

  function mockFileStructuresJson() {
    Mock.FileStructuresJson = {
      objectType: 'FileStructure',
      fieldCenter: {acronym:"SP"},
      fileName: 'my-file.xls',
      realizationDate: "2018-02-22T19:23:22.614Z",
      template: undefined,
      lastResult: undefined,
      sheet: [],
      rows: []
    };
  }
});