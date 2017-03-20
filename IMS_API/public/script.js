var scotchApp = angular.module('scotchApp', ['ngRoute','angularUtils.directives.dirPagination']);
// alert("HIIII")
scotchApp.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'signin2.html',
            controller  : 'signinController'
        })
        .when('/signin', {
            templateUrl : 'signin2.html',
            controller  : 'signinController'
        })
        .when('/logout', {
            templateUrl : 'pages/logout.html',
            controller  : 'signinController'
        })
        .when('/dashboard', {
            templateUrl : 'dashboard.html',
            controller  : 'dashboardController'
        })
        .when('/jobWork', {
            templateUrl : 'jobWork.html',
            controller  : 'jobWorkController'
        })
        .when('/client', {
            templateUrl : 'client.html',
            controller  : 'clientController'
        })
        .when('/supplierInventory', {
            templateUrl : 'supplierInventory.html',
            controller  : 'supplierInventoryController'
        })
        .when('/supplier', {
            templateUrl : 'supplier.html',
            controller  : 'supplierController'
        })
        .when('/design', {
            templateUrl : 'design.html',
            controller  : 'designController'
        })
        .when('/test', {
            templateUrl : 'test.html',
            controller  : 'testController'
        })
        .otherwise({
            templateUrl : 'signin.html',
            controller  : 'signinController'
        });
});

