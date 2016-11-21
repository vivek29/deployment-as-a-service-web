'use strict';

var app = angular.module('BlurAdmin', [
  'ngAnimate',
  'ngMessages',
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

app.config(function($httpProvider, $locationProvider) {

  /**to remove hash in the URL**/
  $locationProvider.html5Mode({
    enabled : true,
    requireBase : false
  });

  $httpProvider.defaults.withCredentials = true;
});

