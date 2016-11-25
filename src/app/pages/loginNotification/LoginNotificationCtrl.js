

angular.module('BlurAdmin.pages.loginNotification', []).controller('LoginNotificationCtrl', function($scope,$uibModalInstance) {

	$scope.ok = function(){
		$uibModalInstance.dismiss();
	};

});
