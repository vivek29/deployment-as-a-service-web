
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reg', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('reg', {
          url: '/reg',
          templateUrl: 'app/pages/reg/reg.html',
          title: 'Registration',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
          controller: function($scope,$location,$window,DataService,$uibModal){

           $scope.signup = function()
          {
            var params = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                organization: $scope.orgName,
                email: $scope.email,
                password: $scope.password
            };
            console.log(params);
            DataService.postData(urlConstants.SIGNUP, params)
            .success(function(data) {
            }).error(function(err){     
            });

            var modalInstance = $uibModal.open({
              templateUrl : 'app/pages/regNotification/signUpNotification.html',
              controller : 'SignUpNotificationCtrl',
              controllerAs : 'sunc',
              size : 'md',
            });

            modalInstance.result.then(function() {
              //modal success
            }, function() {
               $location.path('/login');
            }); 

          }
        }
        });
  }

})();
