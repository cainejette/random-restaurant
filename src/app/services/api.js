angular.module('rando').factory('api', ['$http', '$q', function ($http, $q) {
  const getData = (url) => {
    const deferred = $q.defer();
    $http.get(url)
      .success(data => {
        console.dir(data);
        deferred.resolve(data);
      })
      .error(err => {
        console.log('Error fetching from: ' + url);
        deferred.reject(err);
      });

    return deferred.promise;
  }

  const getRestaurants = () => {
    return getData('/api/restaurants');
  }

  return {
    getData,
    getRestaurants
  };
}]);