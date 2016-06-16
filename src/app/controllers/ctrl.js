'use strict';

angular.module('rando').controller('ctrl',
    ['$scope', 'api',
        function ($scope, api) {
            $scope.restaurants = [];

            const getRestaurants = () => {
                api.getRestaurants().then(data => {
                    $scope.restaurants = data.businesses;
                });
            }

            getRestaurants();
        }]
)
