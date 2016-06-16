'use strict';

angular.module('rando').controller('ctrl',
    ['$scope', 'api',
        function ($scope, api) {
            // $scope.restaurants = [];
            $scope.restaurant = {};
            
            const getRestaurants = (address) => {
                api.getRestaurants(address).then(data => {
                    // $scope.restaurants = data.businesses;
                    $scope.restaurant = data.businesses[Math.floor(Math.random() * 20)]
                });
            }

            $scope.submit = () => {
                getRestaurants($scope.address);
            }
        }]
)
