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
      console.log($scope.suppliers)
    };
    $scope.baseURL = "http://localhost:4000/";

    $scope.getsupplierData = function(){
        $http({
            method: "POST",
            url:  $scope.baseURL+"supplier/getSupplierData"
        }).success(function (res, status, headers) {
            $scope.supplierGridData = res;
            console.log("+++++++",$scope.suppliers)
            if($scope.suppliers){
              var index = $scope.supplierGridData ? $scope.supplierGridData.findIndex(x => x.supplierFname==$scope.suppliers) : 0;
              $scope.suppliers = $scope.supplierGridData[index];
            }
        });
    }
    $scope.getdesignData = function(){
        $http({
            method: "POST",
            url:  $scope.baseURL+"design/getDesignData"
        }).success(function (res, status, headers) {
            $scope.designGridData = res;
            if($scope.designType){
              var index = $scope.designGridData ? $scope.designGridData.findIndex(x => x.designType==$scope.designType) : 0;
              $scope.designType = $scope.designGridData[index];
            }
        });
    }
    $scope.getClientData = function(){
        $http({
            method: "POST",
            url:  $scope.baseURL+"client/getClientData"
        }).success(function (res, status, headers) {
            $scope.clientGridData = res;
            if($scope.clientname){
              var index = $scope.clientGridData ? $scope.clientGridData.findIndex(x => x.clientFname==$scope.clientname) : 0;
              $scope.clientname = $scope.clientGridData[index];
            }
        });
    }
    $scope.getMaterialData = function(){
        $http({
            method: "POST",
            url:  $scope.baseURL+"client/getMaterialData"
        }).success(function (res, status, headers) {
            $scope.materialGridData = res;
            
        });
    }
    $scope.getsupplierData();
    $scope.getdesignData();
    $scope.getClientData();
    $scope.getMaterialData();

    $scope.openProgressDialog = baProgressModal.open;

      $scope.jobworkTypeObj = {
        "Hand-work": "Hand-work",
        "Ambroidairy": "Ambroidairy",
        "Silai": "Silai"
      }

      $scope.statusArr = ["inprogress", "rework", "completed", "release" ]

      $scope.saveJobwork = function(){
          var dataObj = {
              'suppliers': $scope.suppliers ? $scope.suppliers.supplierFname : "",
              'designType': $scope.designType ? $scope.designType.designType : "",
              'designName': $scope.designName,
              'clientname': $scope.clientname ? $scope.clientname.clientFname : "",
              'noPitch': $scope.noPitch,
              'pricePerPitch': $scope.pricePerPitch,
              'totalAmount': $scope.noPitch * $scope.pricePerPitch,
              'deadLine': $scope.deadLine,
              'material': $scope.material ? $scope.material.materialType : "",
              'noOfMaterial': $scope.noOfMaterial,
              'processType': $scope.processType,
              'status': $scope.status
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
              $scope.$apply();
          });
      }

      $scope.editJobwork = function(page, size, jobworkID,suppliers,designType,designName,clientname,noPitch,pricePerPitch,totalAmount,deadLine,material,noOfMaterial,processType,status){
        
        modalFlag = true;

        $scope.suppliers = suppliers;
        $scope.designType = designType;
        $scope.designName = designName;
        $scope.clientname = clientname;
        $scope.noPitch = noPitch;
        $scope.pricePerPitch = pricePerPitch;
        $scope.totalAmount = totalAmount;
        $scope.deadLine = new Date(deadLine);
        $scope.material = material;
        $scope.noOfMaterial = noOfMaterial;
        $scope.processType = processType;
        $scope.status = status;


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
              'suppliers': $scope.suppliers ? $scope.suppliers.supplierFname : "",
              'designType': $scope.designType ? $scope.designType.designType : "",
              'designName': $scope.designName,
              'clientname': $scope.clientname ? $scope.clientname.clientFname : "",
              'noPitch': $scope.noPitch,
              'pricePerPitch': $scope.pricePerPitch,
              'totalAmount': $scope.noPitch * $scope.pricePerPitch,
              'deadLine': $scope.deadLine,
              'material': $scope.material ? $scope.material.materialType : "",
              'noOfMaterial': $scope.noOfMaterial,
              'processType': $scope.processType,
              'status': $scope.status
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
