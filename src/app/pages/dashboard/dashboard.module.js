/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', ['ngRoute','ngCookies'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($httpProvider,$stateProvider) {



    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
          resolve : {loggedIn : checkLogin},

        });
  


     $httpProvider
    .interceptors
    .push(function($q, $location)
    {
        return {
            response: function(response)
            { 
                console.log("response"+response);
                return response;
            },
            responseError: function(response)
            {
                console.log("response err"+response);
                if (response.status == 401)
                    $location.path('/login');
                return $q.reject(response);
            }
        };
    }); 

  }


var checkLogin =  function($q, $timeout, $http, $location, $rootScope,$cookieStore,$cookies)
{
    var deferred = $q.defer();
  console.log("in dashboard");
//console.log($cookies.get("email"));

  console.log("clicked login");
 // console.log(user);
  //var formUser = user.username;
  //var formPassword = user.password;

  console.log($cookies.getAll().email);
  console.log($cookies.getAll().password);
   var email =   $cookies.getAll().email;
   var password = $cookies.getAll().password;

  //  console.log($cookieStore.get("email"));
   // console.log($cookieStore.get("password"));
  // console.log("logged in "+$cookie.getAll().loggedIn);
  
    if (email === 'daas@gmail.com' && password === "daas"){
         // $rootScope.currentUser = email;
            deferred.resolve();
        }
        
        // User is Not Authenticated
        else
        {
            console.log('You need to log in.');
            deferred.reject();
            $location.path('/login');
           
        }
    console.log (deferred.promise);
    
    
    return deferred.promise;
};

  /*
  function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
*/
})();
