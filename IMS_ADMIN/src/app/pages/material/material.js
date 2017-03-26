/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.material')
      .controller('materialCtrl', materialCtrl);

  /** @ngInject */
  function materialCtrl($scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http, serv) {
    
    var modalFlag = false;
    $scope.open = function (page, size) {
      modalFlag = true;
      $scope.modalInstance = $uibModal.open({
        animation: true,
        templateUrl: page,
        controller:materialCtrl,
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


      $scope.materialTypeObj = {
        "Hand-work": "Hand-work",
        "Ambroidairy": "Ambroidairy",
        "Silai": "Silai"
      }

      $scope.saveMaterial = function(){
          var dataObj = {
              'materialName': $scope.materialName,
              'materialItem': $scope.materialItem,
              'materialPrice': $scope.materialPrice,
              'materialCost': $scope.materialPrice * $scope.materialItem,
              'materialPending': $scope.materialPending,
              'materialRemarks': $scope.materialRemarks
          }
          console.log("dataObj  :: ", dataObj)

          $http({
              method: "POST",
              url: $scope.baseURL+"material/addMaterial",
              data: dataObj
          }).success(function (res, status, headers) {
              console.log("res  :: ", res);
              $scope.getMaterialData();
              $scope.modalInstance.close()
              if(res == true){
                  serv.toast.showSuccessToast('Material has been saved successfully..!');
              }else{
                serv.toast.showErrorToast('Material has not been saved..!');
              }
          });
      }

      $scope.editMaterial = function(page, size, materialID,tdFname,tdAdd,tdCity,tdState,tdCountry,tdMobile){
        
        modalFlag = true;
console.log("tdCountry  :: ", tdCountry)

$scope.tags = "kkkkjhkjhkjhkj"


        $scope.materialName = tdFname
        $scope.materialItem = tdAdd
        $scope.materialPrice = tdCity
        $scope.materialCost = tdState
        $scope.materialPending = tdCountry
        $scope.materialRemarks = tdMobile
         $scope.materialID = materialID

        $scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: page,
          size: size,
          controller:materialCtrl,
          scope: $scope,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

      }


      $scope.updateMaterial = function(){
         var dataObj = {
              'materialName': $scope.materialName,
              'materialItem': $scope.materialItem,
              'materialPrice': $scope.materialPrice,
              'materialCost': $scope.materialPrice * $scope.materialItem,
              'materialPending': $scope.materialPending,
              'materialRemarks': $scope.materialRemarks
          }

          console.log("dataObj  :: ", dataObj, $scope.materialID)

          if($scope.materialID){
            $http({
                method: "POST",
                url: $scope.baseURL+"material/updateMaterial",
                data: {'materialID' : $scope.materialID, 'data': dataObj}
            }).success(function (res, status, headers) {
                console.log("res  :: ", res)
                $scope.getMaterialData();
                $scope.modalInstance.close()
                if(res == true){
                  serv.toast.showSuccessToast('Material has been updated successfully..!');
                }else{
                  serv.toast.showErrorToast('Material has not been updated..!');
                }
            });
          }else{
             alert("Material ID not found ....!")
          }

          
      }

      $scope.deleteMaterial = function(materialID){
        $http({
              method: "POST",
              url: $scope.baseURL+"material/deleteMaterial",
              data: {'materialID' : materialID}
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.getMaterialData();
              if(res == true){
                serv.toast.showSuccessToast('Material has been deleted successfully..!');
              }else{
                serv.toast.showErrorToast('Material has not been deleted..!');
              }
          });
      }

      $scope.getMaterialData = function(){
        console.log("URL : ", $scope.baseURL+"material/getMaterialData")
        // $scope.materialGridData = [];
          $http({
              method: "POST",
              url:  $scope.baseURL+"material/getMaterialData"
          }).success(function (res, status, headers) {
              $scope.materialGridData = res;
              $scope.materialData = res;
              console.log('$scope.materialGridData  ;; ', $scope.materialGridData)
              if(res && res.length == 0){
                serv.toast.showErrorToast('Material data not found..!');
              }
              // $scope.$apply();
          });
      }
      console.log("modalFlag : ", modalFlag)
      if(modalFlag == false){
        $scope.getMaterialData();
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
