/**
 * Created by k.danovsky on 12.05.2016.
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .service('themeLayoutSettings', themeLayoutSettings)
    .factory('serv', Serv)
    .factory('localStorageUtils', localStorageUtils);

  /** @ngInject */
  function themeLayoutSettings(baConfig) {
    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());
    var mobileClass = isMobile ? 'mobile' : '';
    var blurClass = baConfig.theme.blur ? 'blur-theme' : '';
    angular.element(document.body).addClass(mobileClass).addClass(blurClass);

    return {
      blur: baConfig.theme.blur,
      mobile: isMobile,
    }
  }

  function Serv($http, $rootScope, toastr) {
       $rootScope.baseUrl = 'http://localhost:3000/';
        // $rootScope.baseUrl = 'http://audiotravels.co.in/goldadminapi/';
        var serv = {};
        serv.lastPath = '';
        serv.GetPager = function (totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 10;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            function range(start, end, step, offset) {
                return Array.apply(null, Array((Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1)).map(function (_, i) {
                    return start < end ? i * (step || 1) + start - (offset || 0) : (start - (i * (step || 1))) + (offset || 0)
                })
            }
            // create an array of pages to ng-repeat in the pager control
            var pages = range(startPage, endPage);

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        };

        serv.AuthService =
                {
                    loggedIn: false,
                    checkStatus: function (event)
                    {
                        return $http({
                            method: 'GET', url: $rootScope.baseUrl + 'auth/session', params: {
                            }
                        }).then(function success(res) {
                            res = res.data;                            
                            $rootScope.ttsData = res.data.ttsVersionList ? res.data.ttsVersionList : [];
                            $rootScope.redisExtraDumpList = res.data.redisExtraDumpList ? res.data.redisExtraDumpList : [];
                            if (res.data.email) {
                                serv.AuthService.loggedIn = true;
                                $rootScope.userData = res.data;
                                $rootScope.$broadcast('getUserdata', true)
                                $rootScope.username = res.data.name ? res.data.name : res.data.fName;
                                return true;
                            } else {
                                serv.AuthService.loggedIn = false;
                                return false;
                            }
                        }, function error() {
                            $rootScope.$broadcast('Authenticated', false, false);//parameter : status , withAlert
                        });
                    },
                    login: function (username, password)
                    {
                        /* Do the login */
                        // If login success
                        $rootScope.loader = true;
                        return $http({
                            method: 'POST', url: $rootScope.baseUrl + 'auth/login', data: {
                                email: username,
                                password: password
                            }
                        }).then(function success(loginRes) {
                            loginRes = loginRes.data;
                            if (loginRes.data.email === username) {
                                if (loginRes.data.isPwdChanged) {
                                    $rootScope.$broadcast('isPwdChanged', true, false);
                                }
                                serv.AuthService.loggedIn = true;
                                $rootScope.userData = loginRes.data;
                                $rootScope.username = loginRes.data.name ? loginRes.data.name : loginRes.data.fName;
                                $rootScope.$broadcast('Authenticated', true, true);//parameter : status , withAlert
                            } else {
                                $rootScope.$broadcast('Authenticated', false, true);//parameter : status , withAlert
                            }
                        }, function error() {
                            $rootScope.$broadcast('Authenticated', false, true);//parameter : status , withAlert
                        });
                    },
                    logout: function ()
                    {
                        /* Do the logout */
                        // If logout success
                        return $http({
                            method: 'POST', url: $rootScope.baseUrl + 'auth/logout', params: {
                            }
                        }).then(function success(response) {
                            serv.AuthService.loggedIn = false
                            $rootScope.username = '';
                            $rootScope.$broadcast('LoggedOut', true);
                        }, function error() {

                        });
                    }
                };
        serv.toast =
                {
                    showSuccessToast: function (text) {
                        toastr.info(text, null, {
                            "autoDismiss": false,
                            "positionClass": "toast-top-right",
                            "type": "info",
                            "timeOut": "2000",
                            "extendedTimeOut": "2000",
                            "allowHtml": false,
                            "closeButton": false,
                            "tapToDismiss": true,
                            "progressBar": false,
                            "newestOnTop": true,
                            "maxOpened": 0,
                            "preventDuplicates": false,
                            "preventOpenDuplicates": false
                        })
                    },
                    showWarningToast: function (text) {//                        
                        toastr.warning(text, null, {})
                    }
                    ,
                    showErrorToast: function (text) {//                        
                        toastr.error(text, null, {})
                    },
                    clearToasts: function () {
                        toastr.clear();
                    }
                }


        return serv;
    }

    function localStorageUtils($log) {
        var localStorageUtils = {};

        localStorageUtils.addToLocalStorage = function (key, data) {
            if (typeof (localStorage) == 'undefined') {
                return "Error";
                $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
            } else {
                try {
                    data = JSON.stringify(data);
                    localStorage.setItem(key, data);
                    return "Success";
                } catch (e) {
                    if (e === QUOTA_EXCEEDED_ERR) {
                        $log.error("Quota exceeded!");
                    }
                    return "Error";
                }
                ;
            }
            ;
        };

        localStorageUtils.removeFromLocalStorage = function (key) {
            if (typeof (localStorage) == 'undefined') {
                return "Error";
                $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
            } else {
                try {
                    localStorage.removeItem(key);
                    return "Success";
                } catch (e) {
                    if (e === QUOTA_EXCEEDED_ERR) {
                        $log.error("Quota exceeded!");
                    }
                    return "Error";
                }
                ;
            }
            ;
        };

        localStorageUtils.getFromLocalStorage = function (key) {
            if (typeof (localStorage) == 'undefined') {
                return "Error";
                $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
            } else {
                try {
                    return JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    if (e === QUOTA_EXCEEDED_ERR) {
                        $log.error("Quota exceeded!");
                    }
                    return "Error";
                }
            }
        };

        localStorageUtils.checkLocalStorageKey = function (key) {
            if (typeof (localStorage) == 'undefined') {
                return false;
                $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
            } else {
                try {
                    if (localStorage[key]) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    if (e === QUOTA_EXCEEDED_ERR) {
                        $log.error("Quota exceeded!");
                    }
                    return false;
                }
            }
        };

        localStorageUtils.manageLocalStorageReturnList = function (key, data) {
            var currentData = localStorage.getItem(key);

            if (currentData == null) {
                var newList = new Array();
                newList.push(data);
                currentData = JSON.stringify(newList);
            } else {
                var currentList = JSON.parse(currentData);
                var isFound = false;
                var foundIndex;

                for (var _idx = 0; _idx < currentList.length; _idx++) {
                    if (currentList[_idx].id === data.id) {
                        isFound = true;
                        foundIndex = _idx;
                        break;
                    }
                }

                if (!isFound)
                    currentList.push(data);
                else if (angular.isDefined(foundIndex))
                    currentList.splice(foundIndex, 1, data);

                currentData = JSON.stringify(currentList);
            }
            localStorage.setItem(key, currentData);
        };

        return localStorageUtils;
    }


})();