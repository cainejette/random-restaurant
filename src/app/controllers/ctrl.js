'use strict';

angular.module('rando').controller('ctrl',
    ['$scope', 'api',
        function ($scope, api) {
            $scope.restaurants = [];

            const getRestaurants = (address) => {
                api.getRestaurants(address).then(data => {
                    $scope.restaurants = data.businesses;
                });
            }

            $scope.submit = () => {
                getRestaurants($scope.address);
            }
        }]
)
