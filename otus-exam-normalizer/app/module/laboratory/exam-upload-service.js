(function () {
  'use strict';

  angular
    .module('normalizerjs.module.laboratory')
    .service('normalizerjs.module.laboratory.ExamUploadService', service);

  service.$inject = [
    'otusjs.laboratory.exam.sending.ExamLotService'
  ];

  function service(ExamLotService) {
    var self = this;

    /* Public methods */
    self.createExamSending = createExamSending;
    self.loadExamSendingFromJson = loadExamSendingFromJson;
    self.getExamList = getExamList;

    function createExamSending() {
      return ExamLotService.createExamSending();
    }

    function loadExamSendingFromJson(examResultLot, examResults) {
      return ExamLotService.buildExamSendingFromJson(examResultLot, examResults);
    }

    function getExamList() {
      return ExamLotService.getExamList();
    }
  }
}());