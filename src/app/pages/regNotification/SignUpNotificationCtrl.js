

angular.module('BlurAdmin.pages.regNotification', []).controller('SignUpNotificationCtrl', function($scope,$uibModalInstance) {

	$scope.ok = function(){
		$uibModalInstance.dismiss();
	};

});
