/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.jobwork', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('jobwork', {
          url: '/jobwork',
          templateUrl : 'app/pages/jobwork/jobwork.html',
          controller: 'jobworkCtrl',
          title: 'JOB Work',
          sidebarMeta: {
            icon: 'glyphicon glyphicon-picture',
            order: 300,
          },
        })
  }

})();
