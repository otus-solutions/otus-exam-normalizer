(function () {
  'use strict';

  angular
    .module('normalizerjs.uxComponent')
    .component('examUploadButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam-upload-button/exam-upload-button-template.html',
      bindings: {
        uploadFile: '<',
        validateFile: '<',
        fieldCenter: '<'
      }
    });

  Controller.$inject = [
    '$q',
    '$scope',
    '$element',
    '$mdToast',
    'normalizerjs.converter.FileStructureFactory',
    'normalizerjs.module.laboratory.ExamUploadService'
  ];

  function Controller($q, $scope, $element, $mdToast, FileStructureFactory, ExamUploadService) {
    const PROGRESS_MESSAGE = "Aguarde, carregando arquivo";
    const SUCCESS_MESSAGE = "Arquivo pronto para download";

    var self = this;
    var timeShowMsg = 4000;

    self.fileFormats = "";
    self.upload = upload;
    self.$onInit = onInit;

    function onInit(){
      self.fileFormats = self.fieldCenter.fileFormats.map(function(format){return "."+format}).toString();
    }

    $scope.$watch('file', function () {
      self.upload($scope.file);
    });

    function upload(file) {
      if (file) {
        if (!file.$error) {

          //TODO: Chamar o serviço que conversa com o model!

          _convertToWorkbook(file, function (workbook) {
            var rowsArray = XLSX.utils.sheet_to_json(
              workbook.Sheets[workbook.SheetNames[0]],
              {
                header: 1,
                dateNF: "dd/MM/yy hh:mm",
                defval: "",
                raw: false
              }
            )
            var fileStructure = FileStructureFactory.create();
            /*TODO: Setar o FieldCenter Correspondente
              fileStructure.setFieldCenter(self.fieldCenter);
            */
            fileStructure.setFieldCenter({ acronym: "SP" }); 
            fileStructure.createRowsWithSheet(rowsArray)
              .then(function () {
                _showToast("Convertendo arquivo de: " + fileStructure.template.fileType);
                console.log(fileStructure);
                ExamUploadService.fileStructureToModel(fileStructure);
              })
              .catch(function(error){
                _showToast(error);
              });
          });
        }
      }
    }

    function _convertToWorkbook(file, callback) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var bstr = e.target.result;
        var workbook = XLSX.read(bstr, { type: 'binary' });
        callback(workbook);
      };

      reader.readAsBinaryString(file);
    }

    function _showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(timeShowMsg)
      );
    }
  }
}());
