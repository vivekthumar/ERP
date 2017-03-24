/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.suppInventory', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('suppInventory', {
          url: '/suppInventory',
          templateUrl : 'app/pages/suppInventory/suppInventory.html',
          controller: 'suppInventoryCtrl',
          title: 'Supplier Inventory',
          sidebarMeta: {
            icon: 'glyphicon glyphicon-picture',
            order: 300,
          },
        })
  }

})();
