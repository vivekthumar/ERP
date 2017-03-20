angular.module('scotchApp').controller('signinController', function($scope,$http,$location,$rootScope) {
    $scope.signInModal = true;
    $scope.signUpModal = false;

    $scope.showSignUp = function(){
        $scope.signInModal = false;
        $scope.signUpModal = true;
    }
    $scope.showSignIn = function(){
            $scope.signInModal = true;
            $scope.signUpModal = false;
        }

    $scope.signUp = function(){
        if($scope.Fname && $scope.Lname && $scope.mobile && $scope.Uname && $scope.email && $scope.password){
            var data = {
                "Fname" : $scope.Fname,
                "Lname" : $scope.Lname,
                "mobile" : $scope.mobile,
                "Uname" : $scope.Uname,
                "email" : $scope.email,
                "password" : $scope.password
            }
            angular.element(".progress-indicator").show();
            $http({
                method: "POST",
                url: "/Login/register",
                data: data
            }).success(function (res, status, headers) {
                console.log("res : ", res, status)
                angular.element(".progress-indicator").hide();
            });

        }else{
            $scope.registerAlertShow = true;
            $scope.registerAlertMsg = "Required field missing...!"
        }
    }
    $scope.login = function(Uname, password){
        console.log("TEST  :: ", Uname, password)
        if(Uname && password){
            var data = {
                "Uname" : Uname,
                "password" : password
            }
            console.log("datadata : ", data)
            $http({
                method: "POST",
                url: "/auth/signin",
                data: data
            }).success(function (res, status, headers) {
                console.log("res : ", res, status)
                $location.path('/dashboard')
            });

        }else{
            alert("Required Field Missing...!")
        }
    }

});
