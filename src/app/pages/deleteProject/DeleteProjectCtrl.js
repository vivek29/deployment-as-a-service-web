

angular.module('BlurAdmin.pages.deleteProject', []).controller('DeleteProjectCtrl', function($scope,$window,$uibModalInstance,project,DataService) {

	var dpc = this;
	dpc.currentUser = angular.fromJson($window.localStorage.currentUser);

	dpc.okay = function(){

		DataService.deleteData(urlConstants.DELETE_PROJECT+dpc.currentUser.user_id,project).success(function(data){
			console.log(data);
			$uibModalInstance.close();
		}).error(function(err){
			console.log("Error while deleting project");
		});
	};

	dpc.cancel = function(){
		$uibModalInstance.dismiss();
	};

});
