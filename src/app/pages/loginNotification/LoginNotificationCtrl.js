

angular.module('BlurAdmin.pages.loginNotification', []).controller('LoginNotificationCtrl', function($scope,$uibModalInstance) {

	var lunc = this;

	lunc.ok = function(){
		$uibModalInstance.dismiss();
	};

});
