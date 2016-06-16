'use strict';

angular.module('rando').controller('ctrl',
    ['$scope', 'api',
        function ($scope, api) {
            this.restaurants = [];

            const getRestaurants = () => {
                api.getRestaurants().then(data => {
                    this.restaurants = data;
                    console.dir(this.restaurants);
                });
            }

            getRestaurants();
        }]
)
