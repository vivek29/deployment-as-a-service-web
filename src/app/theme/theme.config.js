
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .config(config);

  /** @ngInject */
  function config(baConfigProvider, colorHelper) {
    baConfigProvider.changeTheme({blur: true});
    
    baConfigProvider.changeColors({
      default: 'rgba(#000000, 0.2)',
      defaultText: '#ffffff',
      dashboard: {
        white: '#ffffff',
      },
    });
  }
})();
