/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
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
           controller: function($scope,$location,$cookieStore,$cookies){
         //  $scope.title = 'My Contacts';

           $scope.logout = function()
          {
            console.log("clicked logout");
            $cookies.remove("email");
            $cookies.remove("password");
          

           console.log($cookies.getAll().email);
            console.log($cookies.getAll().password);
            $cookies.put ("loggedIn", "false");
               
            }

             $scope.logout();

          }  







          
        });
  }

})();
