/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.jobwork')
      .controller('jobworkCtrl', jobworkCtrl);

  /** @ngInject */
  function jobworkCtrl($scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http, serv) {
    
    var modalFlag = false;
    $scope.open = function (page, size) {

      $scope.getsupplierData = function(){
          $http({
              method: "POST",
              url:  $scope.baseURL+"supplier/getSupplierData"
          }).success(function (res, status, headers) {
              $scope.supplierGridData = res;
          });
      }
      $scope.getdesignData = function(){
          $http({
              method: "POST",
              url:  $scope.baseURL+"design/getDesignData"
          }).success(function (res, status, headers) {
              $scope.designGridData = res;
          });
      }
      $scope.getClientData = function(){
          $http({
              method: "POST",
              url:  $scope.baseURL+"client/getClientData"
          }).success(function (res, status, headers) {
              $scope.clientGridData = res;
              modalFlag = true;
              $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: page,
                controller:jobworkCtrl,
                size: size,
                scope: $scope,
                resolve: {
                  items: function () {
                    return $scope.items;
                  }
                }
              });
          });
      }
      $scope.getsupplierData();
      $scope.getdesignData();
      $scope.getClientData();
    };
    $scope.openProgressDialog = baProgressModal.open;

    $scope.baseURL = "http://localhost:4000/"


      $scope.jobworkTypeObj = {
        "Hand-work": "Hand-work",
        "Ambroidairy": "Ambroidairy",
        "Silai": "Silai"
      }

      $scope.saveJobwork = function(){
          var dataObj = {
              'jobworkFname': $scope.jobworkFname,
              'jobworkAddress': $scope.jobworkAddress,
              'jobworkCity': $scope.jobworkCity,
              'jobworkState': $scope.jobworkState,
              'jobworkCountry': $scope.jobworkCountry,
              'jobworkMobile': $scope.jobworkMobile,
              'jobworkEmail': $scope.jobworkEmail,
              'jobworkType': $scope.jobworkType
          }
          console.log("dataObj  :: ", dataObj)

          $http({
              method: "POST",
              url: $scope.baseURL+"jobwork/addJobwork",
              data: dataObj
          }).success(function (res, status, headers) {
              console.log("res  :: ", res);
              $scope.getJobworkData();
              $scope.modalInstance.close()
              if(res == true){
                  serv.toast.showSuccessToast('Jobwork has been saved successfully..!');
              }else{
                serv.toast.showErrorToast('Jobwork has not been saved..!');
              }  
          });
      }

      $scope.editJobwork = function(page, size, jobworkID,tdFname,tdAdd,tdCity,tdState,tdCountry,tdMobile,tdEmail,tdType){
        
        modalFlag = true;

        $scope.jobworkFname = tdFname
        $scope.jobworkAddress = tdAdd
        $scope.jobworkCity = tdCity
        $scope.jobworkState = tdState
        $scope.jobworkCountry = tdCountry
        $scope.jobworkMobile = tdMobile
        $scope.jobworkEmail = tdEmail
        $scope.jobworkType = tdType
        $scope.jobworkID = jobworkID


        $scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: page,
          size: size,
          controller:jobworkCtrl,
          scope: $scope,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

      }


      $scope.updateJobwork = function(){
         var dataObj = {
              'jobworkFname': $scope.jobworkFname,
              'jobworkAddress': $scope.jobworkAddress,
              'jobworkCity': $scope.jobworkCity,
              'jobworkState': $scope.jobworkState,
              'jobworkCountry': $scope.jobworkCountry,
              'jobworkMobile': $scope.jobworkMobile,
              'jobworkEmail': $scope.jobworkEmail,
              'jobworkType': $scope.jobworkType
          }

          console.log("dataObj  :: ", dataObj, $scope.jobworkID)

          if($scope.jobworkID){
            $http({
                method: "POST",
                url: $scope.baseURL+"jobwork/updateJobwork",
                data: {'jobworkID' : $scope.jobworkID, 'data': dataObj}
            }).success(function (res, status, headers) {
                console.log("res  :: ", res)
                $scope.getJobworkData();
                $scope.modalInstance.close()
                if(res == true){
                  serv.toast.showSuccessToast('Jobwork has been updated successfully..!');
                }else{
                  serv.toast.showErrorToast('Jobwork has not been updated..!');
                }
            });
          }else{
             alert("Jobwork ID not found ....!")
          }

          
      }

      $scope.deleteJobwork = function(jobworkID){
        $http({
              method: "POST",
              url: $scope.baseURL+"jobwork/deleteJobwork",
              data: {'jobworkID' : jobworkID}
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.getJobworkData();
              if(res == true){
                serv.toast.showSuccessToast('Jobwork has been deleted successfully..!');
              }else{
                serv.toast.showErrorToast('Jobwork has not been deleted..!');
              }
          });
      }

      $scope.getJobworkData = function(){
        console.log("URL : ", $scope.baseURL+"jobwork/getJobworkData")
        // $scope.jobworkGridData = [];
          $http({
              method: "POST",
              url:  $scope.baseURL+"jobwork/getJobworkData"
          }).success(function (res, status, headers) {
              $scope.jobworkGridData = res;
              $scope.jobworkData = res;
              console.log('$scope.jobworkGridData  ;; ', $scope.jobworkGridData)
              if(res && res.length == 0){
                serv.toast.showErrorToast('Jobwork data not found..!');
              }
              // $scope.$apply();
          });
      }
      console.log("modalFlag : ", modalFlag)
      if(modalFlag == false){
        $scope.getJobworkData();
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
