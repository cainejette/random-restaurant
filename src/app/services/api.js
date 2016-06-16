angular.module('rando').factory('api', ['$http', '$q', function ($http, $q) {

  const getRestaurants = (address) => {
    const deferred = $q.defer();

    $http.post('/api/restaurants/', {address: address})
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