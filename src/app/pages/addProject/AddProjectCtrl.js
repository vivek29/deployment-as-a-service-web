

angular.module('BlurAdmin.pages.addProject', []).controller('AddProjectCtrl', function($scope,$uibModalInstance,DataService, $window) {
	var apc = this;

	apc.initAddProject = function(){
		$scope.projectTitle = "";
		$scope.projectDescription = "";
		$scope.addStyleTitle ="width:70%";
		$scope.addStyleDescription ="width:70%";
		
		$scope.currentUser = $window.localStorage.currentUser;
	}
	apc.cancel = function(){
		$uibModalInstance.dismiss();
	};

	apc.add = function(){
		if ($scope.projectTitle.length==0){
			$scope.titlePlaceholder ="Title can't be empty!";
			$scope.addStyleTitle = "width:70%;border: 1px solid red";
		}
		if ($scope.projectDescription == 0){
			$scope.descriptionPlaceholder = "Description can't be empty!";
			$scope.addStyleDescription = "width:70%;border: 1px solid red";
		}
		if ($scope.projectTitle.length!=0 && $scope.projectTitle.length!=0){
			console.log(1);
			var queryParams = "?title="+$scope.projectTitle+"&description="+
			$scope.projectDescription+"&user_id="+$window.localStorage.currentUserId;

			DataService.postData(urlConstants.PROJECTS+queryParams,{})
			.success(function(data) {
				$uibModalInstance.close('project added');
			}).error(function(err){
				$scope.formError = "Error while adding project.";
			});
		}
	};
});