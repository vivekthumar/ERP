/**
 * Created by k.danovsky on 12.05.2016.
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .service('themeLayoutSettings', themeLayoutSettings)
    .factory('serv', Serv)
   
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
  
})();