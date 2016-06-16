'use strict';

angular.module('rando').controller('ctrl',
    ['$scope', 'api',
        function ($scope, api) {
            console.log('hello!');
            api.getRestaurants();
        }]
)
