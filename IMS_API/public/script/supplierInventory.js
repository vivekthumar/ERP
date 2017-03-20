angular.module('scotchApp').controller('designController', function($scope,$http,$location,$rootScope) {
   
    console.log("design....")
    // $scope.signInModal = true;
    $scope.loader = false;

    $scope.saveDesign = function(){
    	$http({
            method: "POST",
            url: "/customer/customerList"
        }).success(function (res, status, headers) {
            $scope.customerList = res.text;
            angular.element(".progress-indicator").hide();
        });
    }
   	
   	$scope.editDesign = function(){
    	$http({
            method: "POST",
            url: "/customer/customerList"
        }).success(function (res, status, headers) {
            $scope.customerList = res.text;
            angular.element(".progress-indicator").hide();
        });
    }

    $scope.deleteDesign = function(){
    	$http({
            method: "POST",
            url: "/customer/customerList"
        }).success(function (res, status, headers) {
            $scope.customerList = res.text;
            angular.element(".progress-indicator").hide();
        });
    }
});
