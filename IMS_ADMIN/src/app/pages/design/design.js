/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.design')
      .controller('designCtrl', designCtrl);

  /** @ngInject */
  function designCtrl($rootScope, $scope, $filter, editableOptions, editableThemes,  $uibModal, baProgressModal, $http, serv) {
    
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


    //  $scope.myFunc = function() {
    //     var files = $(this).get(0).files;
    //     console.log("files  >> ", files)
    //     if (files.length > 0){
    //       // create a FormData object which will be sent as the data payload in the
    //       // AJAX request
    //       var formData = new FormData();

    //       // loop through all the selected files and add them to the formData object
    //       for (var i = 0; i < files.length; i++) {
    //         var file = files[i];

    //         // add the files to formData object for the data payload
    //         formData.append('uploads[]', file, file.name);
    //       }
    //       console,log("formData  >> ", formData)
    //     }
    // };



      // $('#upload-input').on('change', function(){

      //   var files = $(this).get(0).files;
      //   console.log("files  >> ", files)
      //   if (files.length > 0){
      //     // create a FormData object which will be sent as the data payload in the
      //     // AJAX request
      //     var formData = new FormData();

      //     // loop through all the selected files and add them to the formData object
      //     for (var i = 0; i < files.length; i++) {
      //       var file = files[i];

      //       // add the files to formData object for the data payload
      //       formData.append('uploads[]', file, file.name);
      //     }
      //     console,log("formData  >> ", formData)
      //     // $.ajax({
      //     //   url: '/upload',
      //     //   type: 'POST',
      //     //   data: formData,
      //     //   processData: false,
      //     //   contentType: false,
      //     //   success: function(data){
      //     //       console.log('upload successful!\n' + data);
      //     //   },
      //     //   xhr: function() {
      //     //     // create an XMLHttpRequest
      //     //     var xhr = new XMLHttpRequest();

      //     //     // listen to the 'progress' event
      //     //     xhr.upload.addEventListener('progress', function(evt) {

      //     //       if (evt.lengthComputable) {
      //     //         // calculate the percentage of upload completed
      //     //         var percentComplete = evt.loaded / evt.total;
      //     //         percentComplete = parseInt(percentComplete * 100);

      //     //         // update the Bootstrap progress bar with the new percentage
      //     //         $('.progress-bar').text(percentComplete + '%');
      //     //         $('.progress-bar').width(percentComplete + '%');

      //     //         // once the upload reaches 100%, set the progress bar text to done
      //     //         if (percentComplete === 100) {
      //     //           $('.progress-bar').html('Done');
      //     //         }

      //     //       }

      //     //     }, false);

      //     //     return xhr;
      //     //   }
      //     // });

      //   }
      // });


// $scope.setFile = function(element) {
//         $scope.$apply(function($scope) {
//             $scope.theFile = element.files[0];

//             // $scope.$apply(function (scope) {  
//                 $scope.AttachStatus = "";  
//                 $scope.files = []  
//                 for (var i = 0; i < element.files.length; i++) {  
//                     $scope.files.push(element.files[i])  
//                 }  

//                 var fd = new FormData() 
//                  for (var i in $scope.files) {  
//                     fd.append("uploadedFile", $scope.files[i])  
//                 }  
//                 // $scope.progressVisible = false  
//             // });  


//              console.log("$scope.theFile  :: ", $scope.theFile, $scope.files, fd)
//         });
//     };

$scope.setFile = function(element) {

    $scope.$apply(function($scope) {
        $scope.theFile = element.files[0];


        var formData = new FormData();

      // loop through all the selected files and add them to the formData object
      for (var i = 0; i < element.files.length; i++) {
        var file = element.files[i];

        // add the files to formData object for the data payload
        formData.append('uploads[]', file, file.name);
      }


        // $scope.$apply(function (scope) {  
            // $scope.AttachStatus = "";  
            // $scope.files = []  
            // for (var i = 0; i < element.files.length; i++) {  
            //     $scope.files.push(element.files[i])  
            // }  

            // var fd = new FormData() 
            //  for (var i in $scope.files) {  
            //     fd.append("uploadedFile", $scope.files[i])  
            // }  
            // $scope.progressVisible = false  
        // });  

     $.ajax({
        url: $scope.baseURL+'design/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
             serv.toast.showSuccessToast('Image has been updated successfully..!');
        }
      });    

         console.log("$scope.theFile  :: ",formData, $scope.theFile)
    });
  }



     
      $scope.savedesign = function(){
          var dataObj = {
              'designNo': $scope.designNo,
              'designPrice': $scope.designPrice,
              'designType': $scope.designType,
              'designName': $scope.designName,
              'designImg': "assets/uploads/"+ $scope.theFile.name,
              'designRmrk': $scope.designRmrk,
              'user':$rootScope.userData.email
          }
           // $scope.filename = $scope.file.name;
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
              'designImg':  "assets/uploads/"+ $scope.theFile.name,
              'designRmrk': $scope.designRmrk,
              'user':$rootScope.userData.email
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
        var r = confirm("Please confirm you want to delete record ?");
        if (r == true) {   
          $http({
                method: "POST",
                url: $scope.baseURL+"design/deleteDesign",
                data: {'designID' : designID, 'user':$rootScope.userData.email}
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
