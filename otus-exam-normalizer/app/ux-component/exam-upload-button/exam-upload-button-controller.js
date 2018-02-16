(function () {
	'use strict';

	angular
		.module('normalizerjs.uxComponent')
		.controller('FileUploadController', Controller);

	Controller.$inject = [
		'$scope',
		'$element',
		'normalizerjs.module.laboratory.ExamUploadService'
	];

	function Controller($scope, $element, ExamUploadService) {
		var self = this;

		/* Public methods */
		self.upload = upload;

		$scope.$watch('file', function () {
			self.upload($scope.file);
		});

		function upload(file) {
			if (file) {
				if (!file.$error) {
					console.log($scope.file);
					var reader = new FileReader();
					console.log(reader);

					reader.onload = function () {
						//TODO: aplicar o modelo?
						ExamUploadService.createExamSending();
						var text = reader.result;
						console.log(text);
					};
					reader.readAsText($scope.file);
				}
			}
		}
	}

}());
