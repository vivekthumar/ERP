/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, $http) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
      
      $scope.baseURL = "http://localhost:4000/"


      $scope.getClientCount = function(){
          $http({
              method: "POST",
              url: $scope.baseURL+"dashboard/getClientCount"
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.clientCount = res.count;

              $scope.charts = [{
                  color: pieColor,
                  description: 'Client',
                  stats: $scope.clientCount,
                  icon: 'face',
                }, {
                  color: pieColor,
                  description: 'Supplier',
                  stats: '5',
                  icon: 'money',
                }, {
                  color: pieColor,
                  description: 'Stock',
                  stats: '178,391',
                  icon: 'face',
                }, {
                  color: pieColor,
                  description: 'Earning',
                  stats: '$ 89,745',
                  icon: 'money',
                }
                ];

          });
      }
      $scope.getClientCount();

      
    

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();