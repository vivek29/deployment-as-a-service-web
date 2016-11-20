/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui', [
    'BlurAdmin.pages.ui.buttons',
    'BlurAdmin.pages.ui.modals',
    'BlurAdmin.pages.ui.progressBars',
    'BlurAdmin.pages.ui.notifications',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
