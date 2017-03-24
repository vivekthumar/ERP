/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.activity', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('activity', {
          url: '/activity',
          templateUrl : 'app/pages/activity/activity.html',
          controller: 'activityCtrl',
          title: 'Activity',
          sidebarMeta: {
            icon: 'glyphicon glyphicon-eye-open',
            order: 300,
          },
        })
  }

})();
