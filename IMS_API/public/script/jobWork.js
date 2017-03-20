angular.module('scotchApp').controller('jobWorkController', function($scope,$http,$location,$rootScope) {
   
    console.log("design....")
    // $scope.signInModal = true;
    $scope.loader = false;

    $scope.saveDesign = function(){
    	console.log("save")
    }
   	
   	$scope.editDesign = function(){
    	console.log("edit")
    }

    $scope.deleteDesign = function(){
    	console.log("delete")
    }
});
