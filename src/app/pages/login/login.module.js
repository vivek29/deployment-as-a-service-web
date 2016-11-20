
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
           controller: function($scope,$location){

           $scope.login = function()
          {
            var params = {
                name: $scope.displayName,
                email: $scope.email,
                password: $scope.password
            };

            DataService.postData(urlConstants.LOGIN, params)
            .success(function(data) {
                $scope.userDetails = data;
                console.log(userDetails);

             //    getUserProjects();
            }).error(function(err){
              console.log("Error logging the User");
            });

          }  

          }
        });
  }

})();
