/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.client')
      .controller('clientCtrl', clientCtrl);

  /** @ngInject */
  function clientCtrl($scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http) {
    $scope.open = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        controller: clientCtrl,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
    $scope.openProgressDialog = baProgressModal.open;

    $scope.baseURL = "http://localhost:4000/"


      $scope.clientTypeObj = {
        "Hand-work": "Hand-work",
        "Ambroidairy": "Ambroidairy",
        "Silai": "Silai"
      }

      $scope.saveClient = function(){
          var dataObj = {
              'clientFname': $scope.clientFname,
              'clientAddress': $scope.clientAddress,
              'clientCity': $scope.clientCity,
              'clientState': $scope.clientState,
              'clientCountry': $scope.clientCountry,
              'clientMobile': $scope.clientMobile,
              'clientEmail': $scope.clientEmail,
              'clientType': $scope.clientType
          }
          console.log("dataObj  :: ", dataObj)

          $http({
              method: "POST",
              url: $scope.baseURL+"client/addClient",
              data: dataObj
          }).success(function (res, status, headers) {
              console.log("res  :: ", res);
              $scope.getClientData();
              $('#addClient').modal('hide');
          });
      }

      $scope.editClient = function(clientID,tdFname,tdAdd,tdCity,tdState,tdCountry,tdMobile,tdEmail,tdType){
        $scope.clientFname = tdFname
        $scope.clientAddress = tdAdd
        $scope.clientCity = tdCity
        $scope.clientState = tdState
        $scope.clientCountry = tdCountry
        $scope.clientMobile = tdMobile
        $scope.clientEmail = tdEmail
        $scope.clientType = tdType
        $scope.clientID = clientID
      }


      $scope.updateClient = function(){
         var dataObj = {
              'clientFname': $scope.clientFname,
              'clientAddress': $scope.clientAddress,
              'clientCity': $scope.clientCity,
              'clientState': $scope.clientState,
              'clientCountry': $scope.clientCountry,
              'clientMobile': $scope.clientMobile,
              'clientEmail': $scope.clientEmail,
              'clientType': $scope.clientType
          }

          console.log("dataObj  :: ", dataObj, $scope.clientID)

          $http({
              method: "POST",
              url: $scope.baseURL+"client/updateClient",
              data: {'clientID' : $scope.clientID, 'data': dataObj}
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.getClientData();
              $('#editClient').modal('hide');
          });
      }

      $scope.deleteClient = function(clientID){
        $http({
              method: "POST",
              url: $scope.baseURL+"client/deleteClient",
              data: {'clientID' : clientID}
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.getClientData();
          });
      }

      $scope.getClientData = function(){
        console.log("URL : ", $scope.baseURL+"client/getClientData")
          $http({
              method: "POST",
              url:  $scope.baseURL+"client/getClientData"
          }).success(function (res, status, headers) {
              console.log("res  :: ", res)
              $scope.clientData = res;
          });
      }
      $scope.getClientData();


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
