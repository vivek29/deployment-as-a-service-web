
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.logout', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('logout', {
          url: '/logout',
          templateUrl: '/app/pages/logout/logout.html',
       
          title: 'Logout',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
           controller: function($scope,$location){
         //  $scope.title = 'My Contacts';

           $scope.logout = function()
          {
            console.log("clicked logout");

            /**
                Make http call here
            */
            }
             $scope.logout();
          }  
          
        });
  }

})();
