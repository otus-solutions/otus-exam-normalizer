(function () {
  'use strict';

  angular
    .module('normalizerjs.module.laboratory')
    .service('normalizerjs.module.laboratory.ExamUploadService', service);

  service.$inject = [
    'otusjs.laboratory.exam.sending.ExamSendingFactory',
    'otusjs.laboratory.exam.sending.Exam',
    'otusjs.laboratory.exam.sending.ExamLot',
    'otusjs.laboratory.exam.sending.ExamObservation',
    'otusjs.laboratory.exam.sending.ExamResults'
  ];

  function service(ExamSendingFactory, Exam, ExamLot, ExamObservation, ExamResults) {
    var self = this;

    /* Public methods */
    self.fileStructureToModel = fileStructureToModel;

    function fileStructureToModel(fileStructure) {
      var examSending = ExamSendingFactory.create();
      examSending.examLot.objectType = "ExamLot";
      examSending.examLot.fileName = fileStructure.fileName;
      examSending.examLot.realizationDate = new Date();
      examSending.examLot.resultsQuantity = 0;
      examSending.examLot.fieldCenter = {
        acronym: fileStructure.getFieldCenter().acronym
      };

      fileStructure.rows.forEach(function (row) {
        if (row.isResult || row.isNewExam || row.isExamObservation || row.isResultObservation) {
          if (row.isNewExam) {
            var newExam = Exam.create();
            newExam.name = row.examName;
            examSending.exams.push(newExam);
          }
          if (row.isResult && examSending.exams && examSending.exams.length) {
            var newResult = ExamResults.create();
            newResult.examName = row.examName;
            newResult.aliquotCode = row.aliquot;
            //TODO: verificar se é realmente essa data que deve ser obtida!
            newResult.releaseDate = row.releaseDate;
            newResult.resultName = row.label;
            newResult.value = row.result;
            examSending.exams[examSending.exams.length - 1].examResults.push(
              newResult
            )
          }
          if (row.isExamObservation && examSending.exams && examSending.exams.length) {
            var observation = ExamObservation.create();
            observation.name = row.label; //Não sabemos o que vai aqui
            observation.value = row.observation;
            examSending.exams[examSending.exams.length - 1].observations.push(observation);
          }
          if (row.isResultObservation
            && examSending.exams && examSending.exams.length
            && examSending.exams[examSending.exams.length - 1].examResults
            && examSending.exams[examSending.exams.length - 1].examResults.length
          ) {
            var lastExamIndex = examSending.exams.length - 1;
            var lastResultIndex = examSending.exams[lastExamIndex].examResults.length - 1;
            var observation = ExamObservation.create();
            observation.name = row.label; //Não sabemos o que vai aqui
            observation.value = row.observation;
            examSending.exams[lastExamIndex].examResults[lastResultIndex].observations.push(observation);
          }
        }
      });
      examSending.examLot.resultsQuantity = examSending.getExamList().length;
      console.log(examSending);
    }

  }
}());