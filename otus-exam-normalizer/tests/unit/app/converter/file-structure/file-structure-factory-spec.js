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
      mockFileStructuresFromJson();
    });
    it('the objectType should be equal to FileStructuresJson.objectType', function () {
      expect(Mock.FileStructuresFromJson.objectType).toEqual(Mock.FileStructuresJson.objectType);
    });
    it('the fileName should be equal to FileStructuresJson.fileName', function () {
      expect(Mock.FileStructuresFromJson.fileName).toEqual(Mock.FileStructuresJson.fileName);
    });
  });

  describe("toJSON method", function () {
    beforeEach(function () {
      mockFileStructuresJson();
      mockFileStructuresFromJson();
    });
    it('the JSON should be valid', function () {
      expect(JSON.stringify(Mock.FileStructuresFromJson)).toEqual(JSON.stringify(Mock.FileStructuresJson));
    });
  });

  describe("insertField method", function () {
    // beforeEach(function () {
    //   mockFileStructure();
    // });
    // it('the JSON should be valid', function () {
    //   let field = Test.utils.data.Fields[0];
    //   Mock.FileStructure.insertField(field);
    //   expect(Mock.FileStructure[field.name]).toEqual(field.value);

    //   let otherField = Test.utils.data.Fields[1];
    //   Mock.FileStructure.insertField(otherField);
    //   expect(Mock.FileStructure[otherField.name]).toEqual(otherField.value);
    // });
  });

  function mockFileStructure() {
    Mock.FileStructure = factory.create();
  }

  function mockFileStructuresFromJson() {
    Mock.FileStructuresFromJson = factory.fromJson(Mock.FileStructuresJson);
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









