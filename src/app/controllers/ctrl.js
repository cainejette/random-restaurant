'use strict';

angular.module('rando').controller('ctrl',
    ['$scope', 'api', 'geolocation',
        function ($scope, api, geolocation) {
            $scope.restaurant = null;
            
            $scope.slider = {
                value: 2000,
                options: {
                    step: 100,
                    ceil: 4000,
                    translate: (value) => value + 'm',
                    showSelectionBar: true
                }
            };

            const getRestaurants = (address, radius) => {
                api.getRestaurants(address, radius).then(data => {
                    $scope.restaurant = data.businesses[Math.floor(Math.random() * 20)]
                    $scope.distance = Math.ceil($scope.restaurant.distance / 100) * 100;
                });
            }

            $scope.getAddress = () => {
                $scope.loading = true;
                geolocation.getCurrentPosition().then(location => {
                    api.getAddress(location.coords.latitude, location.coords.longitude).then(address => {
                        $scope.loading = false;
                        $scope.address = address[0].formattedAddress;
                    });
                });
                
            }

            $scope.submit = () => {
                getRestaurants($scope.address, $scope.slider.value);
            }
        }]
)
