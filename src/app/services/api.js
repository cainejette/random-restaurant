angular.module('rando').factory('api', ['$http', '$q', function ($http, $q) {
  const getData = (url) => {
    const deferred = $q.defer();
    $http.get(url)
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching from: ' + url);
        console.dir(new Date());
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