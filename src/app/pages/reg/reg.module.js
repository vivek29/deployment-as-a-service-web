/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
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
          controller: function($scope,$location,$cookieStore,$cookies){
           //$scope.title = 'My Contacts';

           $scope.register = function(user)
          {
            console.log("clicked register");

            $cookies.put ("email", user.username);
            $cookies.put ("password", user.password);
            $location.path("/login");

          }
        }
        });
  }

})();
