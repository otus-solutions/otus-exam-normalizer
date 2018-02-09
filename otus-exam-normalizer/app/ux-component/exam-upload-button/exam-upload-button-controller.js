(function () {
	'use strict';

	angular
		.module('normalizerjs.uxComponent')
		.controller('FileUploadController', Controller);

	Controller.$inject = [
		'$scope',
		'Upload',
		'$timeout'
	];

	function Controller($scope, Upload, $timeout) {
		var self = this;

		$scope.$watch('gFiles', function () {
			$scope.upload($scope.gFiles);
		});

		$scope.upload = function (gFiles) {
			if (gFiles && gFiles.length) {
				for (var i = 0; i < gFiles.length; i++) {
					var file = gFiles[i];
					if (!file.$error) {
						Upload.upload({
							url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
							data: {
								file: file
							}
						})
							.then(function (response) {
								$timeout(function () { });
							}, function (response) {
								console.log('Error status: ' + response.status);
							}, function (evt) {
								var progressPercentage = parseInt(100.0 *
									evt.loaded / evt.total);
								$scope.progress = progressPercentage + '% ';
							});
					}
				}
			}
		}

	}

}());
