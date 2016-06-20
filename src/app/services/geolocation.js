angular.module('rando').factory('geolocation', ['$q', '$window', function ($q, $window) {

    const getCurrentPosition = () => {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Cannot geolocate.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                position => deferred.resolve(position),
                err => deferred.reject(err));
        }

        return deferred.promise;
    }

    return {
        getCurrentPosition
    };
}]);