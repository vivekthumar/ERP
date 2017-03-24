/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.suppInventory')
      .controller('suppInventoryCtrl', suppInventoryCtrl);

  /** @ngInject */
  function suppInventoryCtrl($scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http, serv) {
    
    var modalFlag = false;
    $scope.open = function (page, size) {
      modalFlag = true;
      $scope.modalInstance = $uibModal.open({
        animation: true,
        templateUrl: page,
        controller:suppInventoryCtrl,
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


      $scope.suppInventoryTypeObj = {
        "Hand-work": "Hand-work",
        "Ambroidairy": "Ambroidairy",
        "Silai": "Silai"
      }

      $scope.saveSuppInventory = function(){
          var dataObj = {
              'suppInventoryFname': $scope.suppInventoryFname,
              'suppInventoryAddress': $scope.suppInventoryAddress,
              'suppInventoryCity': $scope.suppInventoryCity,
              'suppInventoryState': $scope.suppInventoryState,
              'suppInventoryCountry': $scope.suppInventoryCountry,
              'suppInventoryMobile': $scope.suppInventoryMobile,
              'suppInventoryEmail': $scope.suppInventoryEmail,
              'suppInventoryType': $scope.suppInventoryType
          }
          console.log("dataObj  :: ", dataObj)

          $http({
              method: "POST",
              url: $scope.baseURL+"suppInventory/addSuppInventory",
              data: dataObj
          }).success(function (res, status, headers) {
              console.log("res  :: ", res);
              $scope.getSuppInventoryData();
              $scope.modalInstance.close()
              if(res == true){
                  serv.toast.showSuccessToast('SuppInventory has been saved successfully..!');
              }else{
                serv.toast.showErrorToast('SuppInventory has not been saved..!');
              }
              


              
              
          });
      }

      $scope.editSuppInventory = function(page, size, suppInventoryID,tdFname,tdAdd,tdCity,tdState,tdCountry,tdMobile,tdEmail,tdType){
        
        modalFlag = true;

        $scope.suppInventoryFname = tdFname
        $scope.suppInventoryAddress = tdAdd
        $scope.suppInventoryCity = tdCity
        $scope.suppInventoryState = tdState
        $scope.suppInventoryCountry = tdCountry
        $scope.suppInventoryMobile = tdMobile
        $scope.suppInventoryEmail = tdEmail
        $scope.suppInventoryType = tdType
        $scope.suppInventoryID = suppInventoryID

        console.log("EDIT     : ", suppInventoryID,tdFname,tdAdd,tdCity,tdState,tdCountry,tdMobile,tdEmail,tdType)

        $scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: page,
          size: size,
          controller:suppInventoryCtrl,
          scope: $scope,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

      }


      $scope.updateSuppInventory = function(){
         var dataObj = {
              'suppInventoryFname': $scope.suppInventoryFname,
              'suppInventoryAddress': $scope.suppInventoryAddress,
              'suppInventoryCity': $scope.suppInventoryCity,
              'suppInventoryState': $scope.suppInventoryState,
              'suppInventoryCountry': $scope.suppInventoryCountry,
              'suppInventoryMobile': $scope.suppInventoryMobile,
              'suppInventoryEmail': $scope.suppInventoryEmail,
              'suppInventoryType': $scope.suppInventoryType
          }

          console.log("dataObj  :: ", dataObj, $scope.suppInventoryID)

          if($scope.suppInventoryID){
            $http({
                method: "POST",
                url: $scope.baseURL+"suppInventory/updateSuppInventory",
                data: {'suppInventoryID' : $scope.suppInventoryID, 'data': dataObj}
            }).success(function (res, status, headers) {
                console.log("res  :: ", res)
                $scope.getSuppInventoryData();
                $scope.modalInstance.close()
                if(res == true){
                  serv.toast.showSuccessToast('SuppInventory has been updated successfully..!');
                }else{
                  serv.toast.showErrorToast('SuppInventory has not been updated..!');
                }
            });
          }else{
             alert("SuppInventory ID not found ....!")
          }

          
      }

      $scope.deleteSuppInventory = function(suppInventoryID){
        $http({
              method: "POST",
              url: $scope.baseURL+"suppInventory/deleteSuppInventory",
              data: {'suppInventoryID' : suppInventoryID}
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.getSuppInventoryData();
              if(res == true){
                serv.toast.showSuccessToast('SuppInventory has been deleted successfully..!');
              }else{
                serv.toast.showErrorToast('SuppInventory has not been deleted..!');
              }
          });
      }

      $scope.getSuppInventoryData = function(){
        console.log("URL : ", $scope.baseURL+"suppInventory/getSuppInventoryData")
        // $scope.suppInventoryGridData = [];
          $http({
              method: "POST",
              url:  $scope.baseURL+"suppInventory/getSuppInventoryData"
          }).success(function (res, status, headers) {
              $scope.suppInventoryGridData = res;
              $scope.suppInventoryData = res;
              console.log('$scope.suppInventoryGridData  ;; ', $scope.suppInventoryGridData)
              if(res && res.length == 0){
                serv.toast.showErrorToast('SuppInventory data not found..!');
              }
              // $scope.$apply();
          });
      }
      console.log("modalFlag : ", modalFlag)
      if(modalFlag == false){
        $scope.getSuppInventoryData();
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
