(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .service('DataService', function($http) {

		this.getData = function(dataURI, params) {
			return $http({
				method : 'GET',
				url : dataURI,
				data : params
			});
		};

		this.postData = function(dataURI, params) {
			return $http({
				method : 'POST',
				url : dataURI,
				data : params
			});
		};

		this.putData = function(dataURI, params) {
			return $http({
				method : 'PUT',
				url : dataURI,
				data : params
			});
		};

		this.deleteData = function(dataURI, params) {
			return $http({
				method : 'DELETE',
				url : dataURI,
				data : params
			});
		};
	});
	
})();