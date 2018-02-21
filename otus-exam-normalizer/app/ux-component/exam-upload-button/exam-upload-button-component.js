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
    '$mdDialog',
    'normalizerjs.converter.FileStructureFactory',
    'normalizerjs.module.laboratory.ExamUploadService'
  ];

  function Controller($q, $scope, $element, $mdToast, $mdDialog, FileStructureFactory, ExamUploadService) {
    const PROGRESS_MESSAGE = "Aguarde, carregando arquivo";
    const SUCCESS_MESSAGE = "Arquivo pronto para download";

    var _confirmReturn;
    var _timeShowMsg = 4000;
    var _fileOfModel;
    var self = this;
    self.fileStructure;
    self.progress;
    self.fileFormats = "";

    /* Public methods */
    self.$onInit = onInit;
    self.upload = upload;
    self.download = download;

    function onInit() {
      self.fileFormats = self.fieldCenter.fileFormats.map(function (format) { return "." + format }).toString();
      _buildReturnAlertDialogs();
    }

    $scope.$watch('file', function () {
      self.upload($scope.file);
    });

    function upload(file) {
      if (file) {
        if (!file.$error) {
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
            self.fileStructure = FileStructureFactory.create();
            self.fileStructure.name = _extractFileName(file.name);
            self.fileStructure.setFieldCenter({ acronym: "SP" });
            self.fileStructure.createRowsWithSheet(rowsArray)
              .then(function () {
                _showToast("Convertendo arquivo de: " + self.fileStructure.template.fileType);
                _fileOfModel = ExamUploadService.fileStructureToModel(self.fileStructure);
                self.progress = 100;
              })
              .catch(function (error) {
                _showToast(error);
              });
          });
        }
      }
    }

    function download() {
      var blob = new Blob([JSON.stringify(_fileOfModel)], { type: "application/json;charset=utf-8;" });
      var downloadLink = angular.element('<a></a>');
      downloadLink.attr('href', window.URL.createObjectURL(blob));
      downloadLink.attr('download', self.fileStructure.name + '.json');
      downloadLink[0].click();
      _returnToPreviousScreen();
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

    function _extractFileName(fullName) {
      var textArray = fullName.split(".");
      var name = "";

      for (var i = 0; i < textArray.length; i++) {
        var text = textArray[i];
        if (i < textArray.length - 1)
          name = name + (name ? "." : "") + text;
      }
      return name;
    }

    function _showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(_timeShowMsg)
      );
    }

    function _buildReturnAlertDialogs() {
      _confirmReturn = $mdDialog.confirm()
        .title('Retornar à tela anterior')
        .textContent('Você deseja realizar a conversão de mais um arquivo?')
        .ariaLabel('Confirmar retorno para a tela de upload de arquivo')
        .ok('Sim')
        .cancel('Cancelar');
    }

    function _returnToPreviousScreen() {
      $mdDialog.show(_confirmReturn).then(function () {
        self.progress = undefined;
      });
    }
  }
}());
