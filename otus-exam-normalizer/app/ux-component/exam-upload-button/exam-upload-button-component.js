(function () {
    'use strict';

    angular
        .module('normalizerjs')
        .component('examUploadButton', {
            controller: Controller,
            templateUrl: 'app/ux-component/exam-upload-button/exam-upload-button-template.html',
            bindings: {
                uploadFile: '<',
                validateFile: '<',
            }
        });

    Controller.$inject = [
        '$q',
        '$element',
        '$mdToast'
    ];

    function Controller($q, $element, $mdToast) {
        var self = this;
        var timeShowMsg = 3000;
        var fr = new FileReader();

        self.$onInit = onInit;
        self.upload = self.uploadFile || upload;
        self.validate = self.validateFile || _validateFileToUpload;

        function onInit() {
            fr.onload = receivedText;
            self.fileData = {};
            self.fileData.examResultLot = {};
            self.fileData.examResultLot.fieldCenter = {};

            self.input = $($element[0].querySelector('#fileInput'));
            self.input.on('change', function (e) {
                console.log(e.target.result)
                console.log(e.target.files[0])
                self.upload(e.target.files);
                // if (_validateFileToUpload(e.target.files[0])) {
                //   fr.readAsText(e.target.files[0]);
                // }
            });
        }

        function upload() {
            self.input.click();
        }

        function _validateFileToUpload(file) {
            if (_typeIsValid(file.type)) {
                return true;
            } else {
                _toastError();
            }
        }

        function _typeIsValid(type) {
            return type === "application/json";
        }

        function receivedText(e) {
            var lines = e.target.result;
            console.log(lines)

            if (1 === 2) {
                if (!_fileIsEmpty(lines)) {
                    self.fileData.examResults = JSON.parse(lines);
                    ProjectContextService.setFileStructure(self.fileData);
                    self.action = ProjectContextService.setExamSendingAction('upload');
                    ApplicationStateService.activateExamResultsVisualizer();
                } else {
                    self.input[0].value = '';
                    _toastEmptyFile();
                }
            }
        }

        function _fileIsEmpty(lines) {
            if (!lines) {
                return true;
            } else if (!JSON.parse(lines).length) {
                return true;
            } else {
                return false;
            }
        }

        function _toastEmptyFile() {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('O arquivo está vazio')
                    .hideDelay(timeShowMsg)
            );
        }

        function _toastError() {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Arquivo inválido')
                    .hideDelay(timeShowMsg)
            );
        }
    }
}());
