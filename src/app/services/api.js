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

  const getAddress = (lat, long) => {
    const deferred = $q.defer();

    $http.post('/api/coordinates/', { lat, long })
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching address for coordinates.');
        $httpdeferred.reject(err);
      });

      return deferred.promise;
  }

  return {
    getRestaurants,
    getAddress
  };
}]);