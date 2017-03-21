/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.supplier', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('supplier', {
          url: '/supplier',
          templateUrl : 'app/pages/supplier/supplier.html',
          controller: 'supplierCtrl',
          title: 'Supplier',
          sidebarMeta: {
            icon: 'glyphicon glyphicon-picture',
            order: 300,
          },
        })
  }

})();
