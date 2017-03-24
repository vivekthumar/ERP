/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.client', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('client', {
          url: '/client',
          templateUrl : 'app/pages/client/client.html',
          controller: 'clientCtrl',
          title: 'Client',
          sidebarMeta: {
            icon: 'glyphicon glyphicon-user',
            order: 300,
          },
        })
  }

})();
