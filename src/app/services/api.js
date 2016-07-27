angular.module('rando').factory('api', ['$http', '$q', function ($http, $q) {

  const getRestaurants = (address, radius, filters) => {
    const deferred = $q.defer();
    console.dir(filters);
    $http.post('/api/restaurants/', { address, radius, filters })
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
        deferred.reject(err);
      });

      return deferred.promise;
  }

  const getCategories = () => {
    const deferred = $q.defer();

    $http.get('api/categories/')
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching categories.');
        deferred.reject(err);
      });

      return deferred.promise;
  }

  return {
    getRestaurants,
    getAddress,
    getCategories
  };
}]);