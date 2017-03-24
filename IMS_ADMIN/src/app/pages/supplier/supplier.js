/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.supplier')
      .controller('supplierCtrl', supplierCtrl);

  /** @ngInject */
  function supplierCtrl($rootScope, $scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http, serv) {
    
    var modalFlag = false;
    $scope.open = function (page, size) {
      modalFlag = true;
      $scope.modalInstance = $uibModal.open({
        animation: true,
        templateUrl: page,
        controller:supplierCtrl,
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

      $scope.savesupplier = function(){
          var dataObj = {
              'supplierFname': $scope.supplierFname,
              'supplierAddress': $scope.supplierAddress,
              'supplierCity': $scope.supplierCity,
              'supplierState': $scope.supplierState,
              'supplierCountry': $scope.supplierCountry,
              'supplierMobile': $scope.supplierMobile,
              'supplierEmail': $scope.supplierEmail,
              'user':$rootScope.userData.email
          }
          console.log("dataObj  :: ", dataObj)

          $http({
              method: "POST",
              url: $scope.baseURL+"supplier/addSupplier",
              data: dataObj
          }).success(function (res, status, headers) {
              console.log("res  :: ", res);
              $scope.getsupplierData();
              $scope.modalInstance.close()
               if(res == true){
                  serv.toast.showSuccessToast('Supplier has been saved successfully..!');
              }else{
                serv.toast.showErrorToast('Supplier has not been saved..!');
              }
          });
      }

      $scope.editsupplier = function(page, size, supplierID,tdFname,tdAdd,tdCity,tdState,tdCountry,tdMobile,tdEmail){
        
        modalFlag = true;

        $scope.supplierFname = tdFname
        $scope.supplierAddress = tdAdd
        $scope.supplierCity = tdCity
        $scope.supplierState = tdState
        $scope.supplierCountry = tdCountry
        $scope.supplierMobile = tdMobile
        $scope.supplierEmail = tdEmail
        $scope.supplierID = supplierID

        console.log("EDIT     : ", supplierID,tdFname,tdAdd,tdCity,tdState,tdCountry,tdMobile,tdEmail)

        $scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: page,
          size: size,
          controller:supplierCtrl,
          scope: $scope,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

      }


      $scope.updatesupplier = function(){
         var dataObj = {
              'supplierFname': $scope.supplierFname,
              'supplierAddress': $scope.supplierAddress,
              'supplierCity': $scope.supplierCity,
              'supplierState': $scope.supplierState,
              'supplierCountry': $scope.supplierCountry,
              'supplierMobile': $scope.supplierMobile,
              'supplierEmail': $scope.supplierEmail,
              'user':$rootScope.userData.email
          }

          console.log("dataObj  :: ", dataObj, $scope.supplierID)

          if($scope.supplierID){
            $http({
                method: "POST",
                url: $scope.baseURL+"supplier/updateSupplier",
                data: {'supplierID' : $scope.supplierID, 'data': dataObj}
            }).success(function (res, status, headers) {
                console.log("res  :: ", res)
                $scope.getsupplierData();
                $scope.modalInstance.close()
                if(res == true){
                  serv.toast.showSuccessToast('Supplier has been updated successfully..!');
                }else{
                  serv.toast.showErrorToast('Supplier has not been updated..!');
                }
            });
          }else{
             alert("supplier ID not found ....!")
          }

          
      }

      $scope.deletesupplier = function(supplierID){
        console.log("supplierID  :: ", supplierID)
        var r = confirm("Please confirm you want to delete record ?");
          if (r == true) {   
            $http({
                  method: "POST",
                  url: $scope.baseURL+"supplier/deleteSupplier",
                  data: {'supplierID' : supplierID, 'user':$rootScope.userData.email}
              }).success(function (res, status, headers) {
                  console.log("res  :: ", res)
                  $scope.getsupplierData();
                  if(res == true){
                      serv.toast.showSuccessToast('Supplier has been deleted successfully..!');
                    }else{
                      serv.toast.showErrorToast('Supplier has not been deleted..!');
                    }
              });
            }
      }

      $scope.getsupplierData = function(){
        console.log("URL : ", $scope.baseURL+"supplier/getSupplierData")
        // $scope.supplierGridData = [];
          $http({
              method: "POST",
              url:  $scope.baseURL+"supplier/getSupplierData"
          }).success(function (res, status, headers) {
              $scope.supplierGridData = res;
              console.log('$scope.supplierGridData  ;; ', $scope.supplierGridData)
              if(res && res.length == 0){
                serv.toast.showErrorToast('Supplier data not found..!');
              }
          });
      }
      console.log("modalFlag : ", modalFlag)
      if(modalFlag == false){
        $scope.getsupplierData();
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
