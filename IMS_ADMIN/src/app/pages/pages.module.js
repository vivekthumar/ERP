/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.design',
    'BlurAdmin.pages.client',
    'BlurAdmin.pages.material',
    'BlurAdmin.pages.suppInventory',
    'BlurAdmin.pages.supplier',
    'BlurAdmin.pages.activity',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.maps',
    'BlurAdmin.pages.profile',
  ])
    .config(routeConfig)
    .run(runBlock)
    .controller('commonCtrl', commonCtrl);

  /** @ngInject */
  /** @ngInject */
    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider, $httpProvider, localStorageUtilsProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        /* baSidebarServiceProvider.addStaticItem({
         title: 'Pages',
         icon: 'ion-document',
         subMenu: [{
         title: 'Sign In',
         fixedHref: 'auth.html',
         blank: true
         }, {
         title: 'Sign Up',
         fixedHref: 'reg.html',
         blank: true
         }, {
         title: 'User Profile',
         stateRef: 'profile'
         }, {
         title: '404 Page',
         fixedHref: '404.html',
         blank: true
         }]
         });
         baSidebarServiceProvider.addStaticItem({
         title: 'Menu Level 1',
         icon: 'ion-ios-more',
         subMenu: [{
         title: 'Menu Level 1.1',
         disabled: true
         }, {
         title: 'Menu Level 1.2',
         subMenu: [{
         title: 'Menu Level 1.2.1',
         disabled: true
         }]
         }]
         });*/
        // Put your custom configurations here
        /*$httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                request: function (request) {
                    request.withCredentials = true;
                    request.headers['X-XSRF-TOKEN'] = localStorageUtilsProvider.$get().getFromLocalStorage('xsrfToken');
                    return request;
                },
                response: function (response) {
                    // do something on success
                    if (response.headers('XSRF-TOKEN') != null && ((response.config.cached == undefined) || ((response.config.cached != undefined) && response.config.cached == false))) {
                        localStorageUtilsProvider.$get().addToLocalStorage('xsrfToken', response.headers('XSRF-TOKEN'));
                    }
                    return response;
                },
                responseError: function (response) {
                    if (response.headers('XSRF-TOKEN') != null) {
                        localStorageUtilsProvider.$get().addToLocalStorage('xsrfToken', response.headers('XSRF-TOKEN'));
                    }
                    if (response.status === 401)
                        $location.url('/login');
                    return $q.reject(response);
                }
            };
        })*/
    }

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, serv) {
        // Activate loading indicator
        $rootScope.$isAuth = false;
        var authenticatedEvent = $rootScope.$on('Authenticated', function (event, status, withAlert) {
            if (status) {
                if (withAlert) {
                    $rootScope.$isAuth = true;
                    serv.toast.showSuccessToast('Login successfully.');
                }
            } else {
                if (withAlert) {
                    serv.toast.showWarningToast('Authentication Failed.');
                }
            }
        });
        var isPwdChanged = $rootScope.$on('isPwdChanged', function (event, status) {
            if (status) {
                $rootScope.resetPwd = true;
            }
        });
        var isPwdReset = $rootScope.$on('isPwdReset', function (event, status) {
            $state.go('dashboard');
            if (status) {
                serv.toast.showSuccessToast('Password reset successfully');
            } else {
                serv.toast.showWarningToast('Error while reseting password.');
            }
        });
        var isRegistered = $rootScope.$on('isRegistered', function (event, status) {
            if (status) {
                $state.go('auth_login');
                serv.toast.showSuccessToast('Registration successfully');
            } else {
                serv.toast.showWarningToast('Error while registration.');

            }
        });
        var loggedoutEvent = $rootScope.$on('LoggedOut', function (event, status) {
            if (status) {
                $rootScope.$isAuth = false;
                serv.toast.showSuccessToast('Logout successfully.');
            }
        });
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // serv.AuthService.checkStatus()
            //         .then(function (status) {
            //             $rootScope.$pageFinishedLoading = true;
            //             $rootScope.$isAuth = status;
            //         }, function (err) {
            //             $rootScope.$pageFinishedLoading = true;
            //             $rootScope.$isAuth = false;
            //         })
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function () {

        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function () {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
            authenticatedEvent();
            loggedoutEvent();
            isPwdChanged();
            isPwdReset();
            isRegistered();
        });
    }

    function commonCtrl($rootScope, $scope, $http, serv) {
        $scope.form = {};
        $scope.form.isWhiteGoldCB = false;
        $scope.form.usertype = 1;
        $scope.form.ttsversion = "v1.0.1"        
        $scope.goToFP = function () {
            $rootScope.FP = true;
            $rootScope.regPage = false;
            $rootScope.resetPwd = false;
        }

        $scope.goToLogIn = function () {
            $rootScope.FP = false;
            $rootScope.regPage = false;
            $rootScope.resetPwd = false;
        }

        $scope.goToReg = function () {
            $rootScope.FP = false;
            $rootScope.regPage = true;
            $rootScope.resetPwd = false;           
            
        }

        $scope.logIn = function () {
            serv.AuthService.login($scope.email, $scope.password);

        };
        $scope.logOut = function () {
            serv.AuthService.logout();
            window.location.reload();
        }

        $scope.forgotPassword = function () {
            $http({
                method: 'POST', url: $rootScope.baseUrl + 'auth/forgotPassword', data: {'email':$scope.fpEmail}
            }).then(function success(response) {
                serv.toast.showSuccessToast('Check your Email.');
                $scope.goToLogIn();
            }, function error(err) {
                serv.toast.showWarningToast('Error while getting new password.');
            });
        }

        $scope.resetPassword = function () {
            $http({
                method: 'POST', url: $rootScope.baseUrl + 'auth/changePassword', data: {'oldPassword': $scope.oldPassword, 'newPassword': $scope.newPassword}
            }).then(function success(response) {
                serv.toast.showSuccessToast('Password reset successfully.');
                $scope.goToLogIn();
            }, function error(err) {
                serv.toast.showWarningToast('Error while reset password.');
            });
        }
        $scope.userTypeData = {
            "Cloud-Silver": 0,
            "Cloud-Gold": 1
//            "Day Limit": 2,
//            "Request Limit": 3,
//            "CMS": 4

        }
        //$scope.reqQuotaSelect = [50000, 100000, 200000, 500000]
        // $scope.form.reqQuota = 50000;        
        // $scope.numericData = ['currency', 'digit'];
        // $scope.form.numeric = "currency";
        // $scope.form.autoPhraseCB = true;
        // $scope.form.levenshteinCB = true;
        // $scope.form.hindiOnlyCB = false;
        // $scope.form.phraseCB = false;
        // $scope.form.wordCB = true;
        // $scope.form.barakhadiCB = true;

        $scope.register = function () {
            var userObj = {
                'firstName': $scope.firstname,
                'lastName': $scope.lastname,
                'city': $scope.city,
                'company': $scope.company,
                'contactPerson': $scope.contactPerson,
                'phone': $scope.phone,
                'email': $scope.regEmail,
                'userType': $scope.form.usertype,
                'ttsVersion': $scope.form.ttsversion,
                'password': $scope.password,
                'requestQuota': Number($scope.form.reqQuota),
                'isWhiteGold': $scope.form.isWhiteGoldCB,
                'redisExtraDump': {"data":$scope.form.redisExtraDump},
                // 'numeric': $scope.form.numeric,
                // 'autoPhrase': $scope.form.autoPhraseCB,
                // 'levenshtein': $scope.form.levenshteinCB,
                // 'hindiOnly': $scope.form.hindiOnlyCB,
                // 'phrase': $scope.form.phraseCB,
                // 'word': $scope.form.wordCB,
                // 'barakhadi': $scope.form.barakhadiCB,
                'chargePerReq': Number($scope.chargePerReq),
                'charPerReq': $scope.form.charPerReq ? parseInt($scope.form.charPerReq, 10) : 0
            }
            console.log(userObj)            
            $http({
                method: 'POST', url: $rootScope.baseUrl + 'auth/registration', data: userObj
            }).then(function success(response) {
                serv.toast.showSuccessToast('Register successfully.');
                $scope.goToLogIn();
            }, function error(err) {
                serv.toast.showWarningToast('Error while registration.');
            });
        }


    }

   
})();
