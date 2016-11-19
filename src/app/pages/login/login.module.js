/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
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
           controller: function($scope,$location,$cookieStore,$cookies){
         //  $scope.title = 'My Contacts';

           $scope.login = function(user)
          {
            console.log("clicked login");
            console.log(user);
            var formUser = user.username;
            var formPassword = user.password;

           console.log($cookies.getAll().email);
            console.log($cookies.getAll().password);
            var email =   $cookies.getAll().email;
            var password = $cookies.getAll().password;


            if (email === formUser  && password === formPassword){
              $cookies.put ("loggedIn", "true");
             $location.path("/dashboard");

            }
            else{
               $cookies.put ("loggedIn", "false");
                alert('email and password does not match !');

            }

          }  







          }
        });
  }

})();
