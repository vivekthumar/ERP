/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.design', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('design', {
          url: '/design',
          templateUrl : 'app/pages/design/design.html',
          controller: 'designCtrl',
          title: 'Design',
          sidebarMeta: {
            icon: 'glyphicon glyphicon-picture',
            order: 300,
          },
        })
  }

})();
