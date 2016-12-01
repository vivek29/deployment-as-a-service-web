

angular.module('BlurAdmin.pages.addProject', []).controller('AddProjectCtrlOne', function($scope, $rootScope,$uibModal,$uibModalInstance,DataService, $window) {

	var apco = this;

	apco.userProjects = $rootScope.userAllProjects;

	if(apco.userProjects.length ==0) {
		apco.isFirstProject = true;
	}
	else{
		apco.isFirstProject = false;
	}

	apco.cancel = function(){
		$uibModalInstance.dismiss();			
	};

	apco.add = function(){

		var project = {
            projectName: $scope.projectTitle,
            description: $scope.projectDescription,
            cloudProvider: "AWS",
            cloud_access_key: $scope.awsAccessKey,
            cloud_secret_key: $scope.awsSecretKey,
            Aws_key : $scope.awsKey
        };

		$uibModalInstance.dismiss();

		var modalInstance1 = $uibModal.open({
	      templateUrl : 'app/pages/addProject/addProject2.html',
	      controller : 'AddProjectCtrlSec',
	      controllerAs : 'apcs',
	      resolve : {
	        project : function() {
	          return project;
	        }
	      },
	      backdrop: 'static'
	    });

	    modalInstance1.result.then(function() {
	    //  pc.getUserProjects();
	    }, function() {
	      //modal exited
	    });
	};


})
.controller('AddProjectCtrlSec', function($scope,$uibModal,$uibModalInstance,DataService, project, $window) {

	var apcs = this;
	apcs.instanceTypes = ['t2.nano','t2.micro','t2.small','t2.medium','t2.large',
							'm4.large','m4.xlarge','m4.2xlarge','c4.large'];

	apcs.cancel = function(){
		$uibModalInstance.dismiss();
	};

	apcs.add = function(){
	
		project.master_size = $scope.masterSize;
		project.node_size = $scope.nodeSize;
		project.node_numbers = $scope.nodeNumbers;
		project.volume_size = $scope.volumeSize;

		$uibModalInstance.dismiss();

		var modalInstance1 = $uibModal.open({
	      templateUrl : 'app/pages/addProject/addProject3.html',
	      controller : 'AddProjectCtrlThird',
	      controllerAs : 'apct',
	      resolve : {
	        project : function() {
	          return project;
	        }
	      },
	      backdrop: 'static'
	    });

	    modalInstance1.result.then(function() {
	    //  pc.getUserProjects();
	    }, function() {
	      //modal exited
	    });


	};
})
.controller('AddProjectCtrlThird', function($scope,$rootScope,$uibModal,$uibModalInstance,DataService, project, $window) {

	var apct = this;
	apct.disableContinue = true;
	apct.downloadKey = false;
	apct.loadingBlock = false;
	apct.projectReadyMessage = false;
	apct.pm = false;

	apct.progressMessage = "This will take some time(approx 30-40 mins)...";

	apct.initAddProject = function(){		

		$scope.currentUser = angular.fromJson($window.localStorage.currentUser);

		DataService.postData(urlConstants.ADD_PROJECT+$scope.currentUser.user_id,project)
		.success(function(data) {

			apct.loadingBlock = true;
			apct.pm = true;
			apct.projectReadyMessage = true;
			apct.downloadKey = true;
			apct.disableContinue = false;

			apct.project = data;
			// see this once
			$scope.key = apct.project.aws_key;

		}).error(function(err){
			console.log(err);
			$scope.formError = "Error while adding project.";
		});		

	}

	apct.startDownloadingKey = function(){

		var link = document.createElement('a');
		link.download = apct.project.projectName+".pem";
		var blob = new Blob([$scope.key], {type: 'text/plain'});
		link.href = window.URL.createObjectURL(blob);
		link.click();
	}

	apct.cancel = function(){
		$uibModalInstance.dismiss();
		$rootScope.$emit("GetUserProjects", {});
	};

	apct.continue = function(){

		$uibModalInstance.dismiss();

		var modalInstance1 = $uibModal.open({
	      templateUrl : 'app/pages/addProject/addProject4.html',
	      controller : 'AddProjectCtrlFourth',
	      controllerAs : 'apcf',
	      resolve : {
	        project : function() {
	          return apct.project;
	        }
	      },
	      backdrop: 'static'
	    });

	    modalInstance1.result.then(function() {
	    //  pc.getUserProjects();
	    }, function() {
	      //modal exited
	    });


	};
})
.controller('AddProjectCtrlFourth', function($scope, $rootScope,$location, $uibModal,$uibModalInstance,DataService, project, $window) {

	var apcf = this;
	console.log(project);
	apcf.project = project;    

	apcf.cancel = function(){
		$uibModalInstance.dismiss();
	};

	apcf.deployAppExisting = function(){

		$uibModalInstance.dismiss();

		var modalInstance1 = $uibModal.open({
	      templateUrl : 'app/pages/addProject/addProject5.html',
	      controller : 'AddProjectCtrlFifth',
	      controllerAs : 'apcfi',
	      resolve : {
	        project : function() {
	          return project;
	        }
	      },
	      backdrop: 'static'
	    });

	    modalInstance1.result.then(function() {
	    //  pc.getUserProjects();
	    }, function() {
	    	$rootScope.$emit("GetUserProjects", {});
	    });


	};

	apcf.deployAppManually = function(){

		$uibModalInstance.dismiss();

		// update projects on dashboard
		$rootScope.$emit("GetUserProjects", {});

		$location.path("/kubernetes");
	};

})
.controller('AddProjectCtrlFifth', function($scope, $rootScope,$location, $uibModal,$uibModalInstance,DataService, project, $window) {

	var apcfi = this;
	console.log(project);
	apcfi.project = project;    

	apcfi.cancel = function(){
		$uibModalInstance.dismiss();
	};

	apcfi.next = function(){

		apcfi.project.old_clusterURL = "https://"+$scope.masterURL+":443";
		apcfi.project.clusterMasterUsername = "admin";
		apcfi.project.clusterMasterPassword = $scope.clusterPassword;

		$uibModalInstance.dismiss();

		var modalInstance1 = $uibModal.open({
	      templateUrl : 'app/pages/addProject/addProject6.html',
	      controller : 'AddProjectCtrlSixth',
	      controllerAs : 'apcsi',
	      resolve : {
	        project : function() {
	          return apcfi.project;
	        }
	      },
	      backdrop: 'static'
	    });

	    modalInstance1.result.then(function() {
	    //  pc.getUserProjects();
	    }, function() {

	    });
	};

})
.controller('AddProjectCtrlSixth', function($scope, $rootScope,$location, $uibModal,$uibModalInstance,DataService, project, $window) {

	var apcsi = this;
	console.log(project);
	// initialize replicas with existing values
	apcsi.replicas = [];
	apcsi.disableDeploy = true;
	apcsi.loadingMessage = false;
	apcsi.loadingBlock = false;
	apcsi.gotClusterInfo = false;
	apcsi.clusterServices = [];
	apcsi.clusterDeployments = [];


/*
	// remove this
	apcsi.loadingBlock = true;
	apcsi.loadingMessage = true;
	apcsi.disableDeploy = false;
	apcsi.gotClusterInfo = true;

	// DUMMY DATA
	apcsi.clusterServices = [{'apiVersion' : 'v1', 'kind': 'Service', 'metadata' : {'name': 'web','labels':{'name' : 'web'}},
								'spec' : {'type': 'LoadBalancer','ports': {'port': '80','targetPort' : '3000','protocol': 'TCP'}}},
							  {'apiVersion' : 'v1', 'kind': 'Service', 'metadata' : {'name': 'mongo','labels':{'name' : 'mongo'}},
								'spec' : {'type': undefined,'ports': {'port': '27017','targetPort' : '27017','protocol': undefined}}}	
	];

	apcsi.clusterDeployments = [{'apiVersion' : 'extensions/v1beta1', 'kind': 'Deployment', 'metadata' : {'name': 'mongo-deployment'},
								'spec' : {'replicas' : 1,'spec': {'containers': {'image' : 'mongo', 'ports' : {'name': 'mongo','containerPort' : '27017'}},
								'volumes' : {'name': 'mongo-persistent-storage'}}}},
								{'apiVersion' : 'extensions/v1beta1', 'kind': 'Deployment', 'metadata' : {'name': 'web-deployment'},
								'spec' : {'replicas' : 2,'spec': {'containers': {'image' : 'gcr.io/kube-mean/myapp', 'ports' : {'name': 'http-server','containerPort' : '3000'}},
								'volumes' : {'name': undefined}}}}
	];


	for(var i=0; i<apcsi.clusterDeployments.length;i++){
		apcsi.replicas.push(apcsi.clusterDeployments[i].spec.replicas);
	}
*/

//	apcsi.project = project;    

	apcsi.init = function(){
		console.log(project);
		DataService.postData(urlConstants.GET_CLUSTER_DETAILS+project.project_id,project)
		.success(function(data) {

			// see this
			project = data;
			console.log(project);
			console.log(project.services);
			console.log(project.deployments);
			apcsi.clusterServices = project.services;
			apcsi.clusterDeployments = project.deployments;

			for(var i=0; i<apcsi.clusterDeployments.length;i++){
				apcsi.replicas.push(apcsi.clusterDeployments[i].spec.replicas);
			}

			apcsi.loadingBlock = true;
			apcsi.disableDeploy = false;
			apcsi.gotClusterInfo = true;
			apcsi.loadingMessage = true;

		}).error(function(err){
			console.log(err);
		});			

	}

	apcsi.cancel = function(){
		$uibModalInstance.dismiss();
	};

	apcsi.deployApp = function(){

		// get number of replicas for deployments
		apcsi.finalReplicas = apcsi.replicas;

		for(var i=0;i<apcsi.finalReplicas.length;i++){
			apcsi.clusterDeployments[i].spec.replicas = apcsi.finalReplicas[i];
		}

		// update project
		project.deployments = apcsi.clusterDeployments;

		$uibModalInstance.dismiss();

		var modalInstance1 = $uibModal.open({
	      templateUrl : 'app/pages/addProject/addProject7.html',
	      controller : 'AddProjectCtrlSeventh',
	      controllerAs : 'apcse',
	      resolve : {
	        project : function() {
	          return project;
	        }
	      },
	      backdrop: 'static'
	    });

	    modalInstance1.result.then(function() {
	    //  pc.getUserProjects();
	    }, function() {

	    });

	};

})
.controller('AddProjectCtrlSeventh', function($scope, $rootScope,$location, $uibModal,$uibModalInstance,DataService, project, $window) {

	var apcse = this;
	apcse.project = project;

	apcse.loadingBlock = false;
	apcse.disableClose = true;
	apcse.gotAppURL = false;			
	apcse.loadingMessage = "Please wait.. Deploying your application..";

	apcse.loadingBlock = true;
			apcse.disableClose = false;			
			apcse.loadingMessage = "Your app is now deployed...";
			apcse.gotAppURL = true;

	apcse.init = function(){

		DataService.postData(urlConstants.DEPLOY_APP+apcse.project.project_id,apcse.project)
		.success(function(data) {

			apcse.loadingBlock = true;
			apcse.disableClose = false;			
			apcse.loadingMessage = "Your app is now deployed...";
			apcse.gotAppURL = true;			

			// see this also
			apcse.project = data;

		}).error(function(err){
			console.log(err);
		});

	}

	apcse.cancel = function(){
		$uibModalInstance.dismiss();
	};

});




