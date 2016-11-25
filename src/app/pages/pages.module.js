
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.login',
    'BlurAdmin.pages.logout',
    'BlurAdmin.pages.reg',
    'BlurAdmin.pages.regNotification',
    'BlurAdmin.pages.loginNotification',
    'BlurAdmin.pages.addProject',
    'BlurAdmin.pages.deleteProject',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.home',
    'BlurAdmin.pages.kubernetes',
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
