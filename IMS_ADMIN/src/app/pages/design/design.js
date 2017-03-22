/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.design')
      .controller('designCtrl', designCtrl);

  /** @ngInject */
  function designCtrl($scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http, serv) {
    
    var modalFlag = false;
    $scope.open = function (page, size) {
      modalFlag = true;
      $scope.modalInstance = $uibModal.open({
        animation: true,
        templateUrl: page,
        controller:designCtrl,
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

      $scope.savedesign = function(){
          var dataObj = {
              'designNo': $scope.designNo,
              'designPrice': $scope.designPrice,
              'designType': $scope.designType,
              'designName': $scope.designName,
              'designImg': $scope.designImg,
              'designRmrk': $scope.designRmrk
          }
          console.log("dataObj  :: ", dataObj)

          $http({
              method: "POST",
              url: $scope.baseURL+"design/addDesign",
              data: dataObj
          }).success(function (res, status, headers) {
              console.log("res  :: ", res);
              $scope.getdesignData();
              $scope.modalInstance.close()
              if(res == true){
                  serv.toast.showSuccessToast('Design has been saved successfully..!');
              }else{
                serv.toast.showErrorToast('Design has not been saved..!');
              }
          });
      }

      $scope.editdesign = function(page, size, designID,tdDno,tdDprice,tdDtype,tdDname,tdDimg,tdDrmrk){
        
        modalFlag = true;

        $scope.designNo = tdDno
        $scope.designPrice = tdDprice
        $scope.designType = tdDtype
        $scope.designName = tdDname
        $scope.designImg = tdDimg
        $scope.designRmrk = tdDrmrk
        $scope.designID = designID

        $scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: page,
          size: size,
          controller:designCtrl,
          scope: $scope,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

      }


      $scope.updatedesign = function(){
         var dataObj = {
              'designNo': $scope.designNo,
              'designPrice': $scope.designPrice,
              'designType': $scope.designType,
              'designName': $scope.designName,
              'designImg': $scope.designImg,
              'designRmrk': $scope.designRmrk
          }

          console.log("dataObj  :: ", dataObj, $scope.designID)

          if($scope.designID){
            $http({
                method: "POST",
                url: $scope.baseURL+"design/updateDesign",
                data: {'designID' : $scope.designID, 'data': dataObj}
            }).success(function (res, status, headers) {
                console.log("res  :: ", res)
                $scope.getdesignData();
                $scope.modalInstance.close()
                if(res == true){
                  serv.toast.showSuccessToast('Design has been updated successfully..!');
                }else{
                  serv.toast.showErrorToast('Design has not been updated..!');
                }
            });
          }else{
             alert("design ID not found ....!")
          }

          
      }

      $scope.deletedesign = function(designID){
        $http({
              method: "POST",
              url: $scope.baseURL+"design/deleteDesign",
              data: {'designID' : designID}
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.getdesignData();
              if(res == true){
                serv.toast.showSuccessToast('Design has been deleted successfully..!');
              }else{
                serv.toast.showErrorToast('Design has not been deleted..!');
              }
          });
      }

      $scope.getdesignData = function(){
        console.log("URL : ", $scope.baseURL+"design/getDesignData")
        // $scope.designGridData = [];
          $http({
              method: "POST",
              url:  $scope.baseURL+"design/getDesignData"
          }).success(function (res, status, headers) {
              $scope.designGridData = res;
              console.log('$scope.designGridData  ;; ', $scope.designGridData)
              if(res && res.length == 0){
                serv.toast.showErrorToast('Design data not found..!');
              }
          });
      }
      console.log("modalFlag : ", modalFlag)
      if(modalFlag == false){
        $scope.getdesignData();
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
