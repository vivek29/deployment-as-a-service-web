

angular.module('BlurAdmin.pages.addProject', []).controller('AddProjectCtrl', function($scope,$uibModalInstance,DataService, $window) {
	var apc = this;

	//$scope.step = 1;
	//console.log("step no"+step);
	//apc.setStep = function(step){
//		$scope.step = step;
		//console.log(step);
	//};


	apc.initAddProject = function(){
		$scope.projectTitle = "";
		$scope.projectDescription = "";
		$scope.addStyleTitle ="width:70%";
		$scope.addStyleDescription ="width:70%";
		
		$scope.currentUser = $window.localStorage.currentUser;

		$scope.masterSize = "";
		$scope.nodeSize = "";
		$scope.nodeNumbers = "";
		$scope.volumeSize - "";



	}
	apc.cancel = function(){
		$uibModalInstance.dismiss();
	};

	apc.add = function(){
		console.log("in add function");
		if ($scope.projectTitle.length==0){
			$scope.titlePlaceholder ="Title can't be empty!";
			$scope.addStyleTitle = "width:70%;border: 1px solid red";
		}
		if ($scope.projectDescription == 0){
			$scope.descriptionPlaceholder = "Description can't be empty!";
			$scope.addStyleDescription = "width:70%;border: 1px solid red";
		}

		if ($scope.masterSize.length==0){
			$scope.masterSizePlaceholder ="Master Size can't be empty!";
			$scope.addStyleMasterSize = "width:70%;border: 1px solid red";
		}


		//add condition for masterSize 
		if ($scope.projectTitle.length!=0 && $scope.projectDescription.length!=0){
			console.log(1);
			var queryParams = "?title="+$scope.projectTitle+"&description="+
			$scope.projectDescription+"&user_id="+$window.localStorage.currentUserId;

			DataService.postData(urlConstants.PROJECTS+queryParams,{})
			.success(function(data) {
				console.log("data succ"+data);
				$uibModalInstance.close('project added');
			}).error(function(err){
				console.log("data succ"+data);
				$scope.formError = "Error while adding project.";
			});
		}





	};
});