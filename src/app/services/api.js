angular.module('rando').factory('api', ['$http', '$q', function ($http, $q) {

  const getRestaurants = (address, radius) => {
    const deferred = $q.defer();

    $http.post('/api/restaurants/', { address, radius })
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching from: ' + url);
        deferred.reject(err);
      });

    return deferred.promise;
  }

  return {
    getRestaurants
  };
}]);