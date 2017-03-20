angular.module('scotchApp').controller('clientController', function($scope,$http,$location,$rootScope) {
   
    console.log("client....")
    // $scope.signInModal = true;
    $scope.loader = false;

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
            url: "/client/addClient",
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
            url: "/client/updateClient",
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
            url: "/client/deleteClient",
            data: {'clientID' : clientID}
        }).success(function (res, status, headers) {
            console.log("res  :: ", res)
            $scope.getClientData();
        });
    }

    $scope.getClientData = function(){
        $http({
            method: "POST",
            url: "/client/getClientData"
        }).success(function (res, status, headers) {
            console.log("res  :: ", res)
            $scope.clientData = res;
        });
    }
    $scope.getClientData();


});
