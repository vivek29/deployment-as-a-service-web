'use strict';

var app = angular.module('BlurAdmin', [
  'ngAnimate',
  'ngCookies',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'ngRoute',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
]);

app.controller('appController', appController);

function appController($scope, $http,$cookies) {
  console.log("in app controller");
    $scope.showHideProfileBtn = function () {

        var userEmail = $cookies.getAll().email;
        console.log(userEmail);
        if (userEmail != undefined) {
            $scope.profileButtonVisible = true;
            //$('#profileButton').attr("href", "#/profile/" + userEmail);
        }
        else {
            $scope.profileButtonVisible = false;
        }
    }
    $scope.showHideProfileBtn();


    $scope.search = function () {
        var searchQuery = $scope.queryText;
        if (searchQuery == "" || searchQuery == null || searchQuery == undefined) {
            alert("Enter a movie name in Search Box e.g Avengers ");
        }
        else {
            window.location.href = '#/search/' + searchQuery;
        }
    }

}
