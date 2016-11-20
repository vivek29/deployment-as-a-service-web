
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('uniqueOrgName', uniqueOrgName);

  /** @ngInject */
  function uniqueOrgName($http, DataService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          element.bind('blur', function() {
            if (ngModel.$modelValue) {
              
              DataService.getData(urlConstants.UNIQUE_ORGNAME+ngModel.$modelValue, []).success(function(data) {
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