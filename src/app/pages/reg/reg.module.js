
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
          controller: function($scope,$location){

           $scope.register = function()
          {
            console.log("clicked register");
            // make http call here,
            // $location.path("/login");
          }
        }
        });
  }

})();
