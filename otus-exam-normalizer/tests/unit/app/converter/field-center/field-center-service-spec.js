describe('FieldCenter service', function () {
  var Mock = {};
  var fieldCenterService;

  beforeEach(function () {
    angular.mock.module('normalizerjs.converter');

    inject(function (_$injector_) {
      fieldCenterService = _$injector_.get(
        'normalizerjs.converter.FieldCenterService', {}
      );
    });
  });

  describe('getFieldCenterByAcronym method ', function () {
    it('aconym should be equal SP', function () {
      var fieldCenter = fieldCenterService.getFieldCenterByAcronym('SP');
      expect(fieldCenter.acronym).toEqual('SP');
    });
  });
});