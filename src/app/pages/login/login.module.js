
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: '/app/pages/login/login.html',

          title: 'Login',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
          controller: function($scope,$location,$window,DataService){
           $scope.login = function()
          {
            var params = {
                email: $scope.email,
                password: $scope.password
            };
            $scope.isDisabled = true;
            DataService.postData(urlConstants.LOGIN, params)
            .success(function(data) {
                $window.localStorage.currentUser = angular.toJson(data);
                $location.path('/dashboard');
            }).error(function(err){
              console.log("Error logging the User");
              $scope.invalidCreds = "Invalid Credentials! Please try again.";
              $scope.isDisabled = false;
              $scope.email = "";
              $scope.password = "";
              $scope.loginForm.$setPristine();
              $scope.tabVm = {};
            });

          }

          }
        });
  }

})();
