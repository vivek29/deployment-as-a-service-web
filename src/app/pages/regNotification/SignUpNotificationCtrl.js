

angular.module('BlurAdmin.pages.regNotification', []).controller('SignUpNotificationCtrl', function($scope,$uibModalInstance) {

	var sunc = this;

	sunc.ok = function(){
		$uibModalInstance.dismiss();
	};

});
