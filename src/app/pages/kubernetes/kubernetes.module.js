(function () {
  'use strict';

  angular.module('BlurAdmin.pages.kubernetes', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {

    $stateProvider
        .state('kubernetes', {
          url: '/kubernetes',
          templateUrl: 'app/pages/kubernetes/kubernetes.html',
          title: 'Kubernetes UI',
          sidebarMeta: {
            order: 800,
          },
        });
  }
})();
