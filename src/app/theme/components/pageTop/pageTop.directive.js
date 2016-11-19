/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  var page = angular.module('BlurAdmin.theme.components');
      
  page.directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      controller: function($scope,$location,$cookieStore,$cookies){
      }
    };
  }



})();