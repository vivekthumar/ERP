/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.material', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('material', {
          url: '/material',
          templateUrl : 'app/pages/material/material.html',
          controller: 'materialCtrl',
          title: 'Material',
          sidebarMeta: {
            icon: 'glyphicon glyphicon-picture',
            order: 300,
          },
        })
  }

})();
