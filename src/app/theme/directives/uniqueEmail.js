
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('uniqueEmail', uniqueEmail);

  /** @ngInject */
  function uniqueEmail($http, DataService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          element.bind('blur', function() {
            if (ngModel.$modelValue) {
              
              DataService.getData(urlConstants.UNIQUE_EMAIL+ngModel.$modelValue, []).success(function(data) {
                ngModel.$setValidity('unique', data.available);
              });
            }
          });
          element.bind('keyup', function() {
            ngModel.$setValidity('unique', true);
          });
        }
    };
  }

})();