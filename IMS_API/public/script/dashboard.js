angular.module('scotchApp').controller('dashboardController', function($scope,$http,$location,$rootScope) {
   
    console.log("dashboard....")
    // $scope.signInModal = true;
    $scope.loader = false;

    $scope.getClientCount = function(){
        $http({
            method: "POST",
            url: "/dashboard/getClientCount"
        }).success(function (res, status, headers) {
            console.log("res  :: ", res)
            $scope.clientCount = res.count;
        });
    }
    $scope.getClientCount();
});
