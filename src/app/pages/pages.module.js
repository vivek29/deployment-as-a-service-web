
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.login',
    'BlurAdmin.pages.logout',
    'BlurAdmin.pages.reg',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.home',
    'ngCookies',

  ])
.config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {

    console.log("routing");

      $urlRouterProvider
        .otherwise('/home');
  }

})();
