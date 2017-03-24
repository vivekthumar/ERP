/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.activity')
      .controller('activityCtrl', activityCtrl);

  /** @ngInject */
  function activityCtrl($scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http, serv) {
    
    var modalFlag = false;
    $scope.open = function (page, size) {
      modalFlag = true;
      $scope.modalInstance = $uibModal.open({
        animation: true,
        templateUrl: page,
        controller:activityCtrl,
        size: size,
        scope: $scope,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
    $scope.openProgressDialog = baProgressModal.open;

    $scope.baseURL = "http://localhost:4000/"


      $scope.activityTypeObj = {
        "Hand-work": "Hand-work",
        "Ambroidairy": "Ambroidairy",
        "Silai": "Silai"
      }

      // View
      $scope.viewActivity = function(page, size, actLog){
        
        modalFlag = true;

        $scope.activityLog = actLog

        console.log("EDIT     : ", $scope.activityLog)

        $scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: page,
          size: size,
          controller:activityCtrl,
          scope: $scope,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

      }

      $scope.deleteActivity = function(activityID){
        var r = confirm("Please confirm you want to delete record ?");
        if (r == true) {
          $http({
                method: "POST",
                url: $scope.baseURL+"activity/deleteActivity",
                data: {'activityID' : activityID}
            }).success(function (res, status, headers) {
                console.log("res  :: ", res)
                $scope.getActivityData();
                if(res == true){
                  serv.toast.showSuccessToast('Activity has been deleted successfully..!');
                }else{
                  serv.toast.showErrorToast('Activity has not been deleted..!');
                }
            });
        }
      }

      $scope.getActivityData = function(){
        console.log("URL : ", $scope.baseURL+"activity/getActivityData")
        // $scope.activityGridData = [];
          $http({
              method: "POST",
              url:  $scope.baseURL+"activity/getActivityData"
          }).success(function (res, status, headers) {
              $scope.activityGridData = res;
              $scope.activityData = res;
              console.log('$scope.activityGridData  ;; ', $scope.activityGridData)
              if(res && res.length == 0){
                serv.toast.showErrorToast('Activity data not found..!');
              }
              // $scope.$apply();
          });
      }
      
      console.log("modalFlag : ", modalFlag)
      if(modalFlag == false){
        $scope.getActivityData();
      }


    $scope.smartTablePageSize = 10;

 
    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else return 'Not set'
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };


    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';


  }

})();
