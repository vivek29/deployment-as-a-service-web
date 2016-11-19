
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

           $scope.login = function(user)
          {
            console.log("clicked login");
            console.log(user);
            var formEmail = user.email;
            var formPassword = user.password;

            /**
                Make http call here. if success next page
                 $location.path("/dashboard");
            */
          }  

          }
        });
  }

})();
