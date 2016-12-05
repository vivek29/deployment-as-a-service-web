

angular.module('BlurAdmin.pages.deleteProject', []).controller('DeleteProjectCtrl', function($scope,$rootScope,$window,$uibModalInstance,project,DataService) {

	var dpc = this;
	dpc.initialBlock = false;
	dpc.loadingBlock = true;
	dpc.deleteKey = false;
	dpc.disableBtn = false;
	dpc.deletedConfirmed = true;

	dpc.currentUser = angular.fromJson($window.localStorage.currentUser);
	dpc.project = project;

	dpc.okay = function(){

		dpc.disableBtn = true;		
		dpc.initialBlock = true;
		dpc.loadingBlock = false;
        dpc.project.aws_key = $scope.awsKey;
        						
		DataService.postData(urlConstants.DELETE_PROJECT+dpc.currentUser.user_id,dpc.project).success(function(data){

			dpc.loadingBlock = true;
        	dpc.deleteKey = true;
			dpc.deletedConfirmed = false;
			dpc.disableBtn = false;

			// update current user object(in case, if it's first project)
			$window.localStorage.currentUser = angular.toJson(data);

		}).error(function(err){
			console.log("Error while deleting project");
		});

	};

	dpc.cancel = function(){
		$rootScope.$emit("GetUserProjects", {});
		$uibModalInstance.dismiss();		
	};

});
