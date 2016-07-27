'use strict';

angular.module('rando').controller('ctrl',
    ['$scope', 'api', 'geolocation', '$window',
        function ($scope, api, geolocation, $window) {
            $scope.restaurant = null;
            const getCategories = () => {
                api.getCategories().then(data => {
                    $scope.allCategories = data;
                    $scope.categories = data.map(category => category.title);
                });
            };
            getCategories();

            $scope.slider = {
                value: 3000,
                options: {
                    step: 100,
                    ceil: 6000,
                    translate: (value) => value + 'm',
                    showSelectionBar: true
                }
            };

            $scope.filters = [];
            $scope.addFilter = (filter) => {
                console.dir($scope.filters);
                console.dir('adding filter: ' + filter);
                $scope.filters.push(filter);
                $scope.choice = '';
            }

            $scope.removeFilter = (filter) => {
                console.dir('removing filter: ' + filter);
                $scope.filters.splice($scope.filters.indexOf(filter), 1);
            }

            const getRestaurants = (address, radius) => {
                api.getRestaurants(address, radius, $scope.filters).then(data => {
                    $scope.restaurant = data.businesses[Math.floor(Math.random() * 20)]
                    console.dir($scope.restaurant);
                    console.dir($scope.restaurant.url);
                    $scope.distance = Math.ceil($scope.restaurant.distance / 100) * 100;
                });
            }

            $scope.getAddress = () => {
                $scope.loading = true;
                geolocation.getCurrentPosition().then(location => {
                    api.getAddress(location.coords.latitude, location.coords.longitude).then(address => {
                        $scope.loading = false;
                        $scope.address = address[0].formattedAddress;
                        console.dir($scope.address);
                    });
                });
                
            }

            $scope.submit = () => {
                getRestaurants($scope.address, $scope.slider.value);
            }
        }]
)
