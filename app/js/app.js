'use strict';


// Declare app level module which depends on filters, and services
var routerApp = angular.module('myApp', [
    'ui.router',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
        url: "/home",
        templateUrl: 'partials/partial-home.html'
    })

    .state('home.list', {
        url: "/list",
        templateUrl: 'partials/partial-home-list.html',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })


    .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    })

    .state('about', {

    })
});
