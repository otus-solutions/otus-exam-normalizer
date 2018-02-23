describe('TemplateService service', function () {
  var Mock = {};
  var service;

  beforeEach(function () {
    angular.mock.module('normalizerjs.converter');

    inject(function (_$injector_) {
      service = _$injector_.get(
        'normalizerjs.converter.template.TemplateService', {}
      );
    });
  });

  describe('findTemplatesByFieldCenter method ', function () {
    beforeEach(function () {
      mockFieldCenter();
    });
    it('should have more than one model', function () {
      var templates = service.findTemplatesByFieldCenter(Mock.FieldCenter);
      expect(templates.length).toBeGreaterThan(1);
    });
  });

  describe('getTemplate method ', function () {
    beforeEach(function () {
      mockSheet();
      mockAvaiableTemplates();
    });
    it('should have more than one model', function () {
      var template = service.getTemplate(Mock.Sheet, Mock.AvaiableTemplates);
      expect(template.template).toEqual("bioquimica-urina-sp");
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

  function mockSheet() {
    Mock.Sheet = Test.utils.data.sheet;
  }

});