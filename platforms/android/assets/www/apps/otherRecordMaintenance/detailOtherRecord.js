var detailOtherRecordControl = angular.module('detailOtherRecordScreen',[]);

detailOtherRecordControl.controller('detailOtherRecordController', detailOtherRecordController);


function detailOtherRecordController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));
  var otherRecordData = JSON.parse(localStorage.getItem("otherRecordDetails"));

  $scope.isDisabled = false;
  $scope.startDate = new Date(otherRecordData.OtherStartDate);
  $scope.endDate = new Date(otherRecordData.OtherEndDate);
  $scope.nameInput= otherRecordData.OtherName;
  $scope.categorySelection;
  $scope.reachOutInput=otherRecordData.OtherCount;
  $scope.remarkInput=otherRecordData.OtherRemark;

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.getCategory = function() {

    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {
          'teamID' : selectionData.TeamID
         },
        url: 'https://flash-schedules.000webhostapp.com/getCategory.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.categoryList=response.data;

            for (var go in $scope.categoryList){

              if(otherRecordData.CategoryID==$scope.categoryList[go].CategoryID){
                $scope.categorySelection=$scope.categoryList[go];
              }
            }


          $scope.isDisabled = false;


        }else{
          alert("No Category is Created.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });

  };


  $scope.editOtherRecordSubmit = function() {

    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {
          'otherID' : otherRecordData.OtherID,
          'startDate' : $scope.startDate,
          'endDate' : $scope.endDate,
          'otherName' : $scope.nameInput,
          'categoryID' : $scope.categorySelection.CategoryID,
          'otherCount' : $scope.reachOutInput,
          'otherRemark' : $scope.remarkInput,
          'teamID' : selectionData.TeamID,
         },
        url: 'https://flash-schedules.000webhostapp.com/editOtherRecord.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Edit Record.");
          window.localStorage.removeItem('otherRecordDetails');
          $window.location.href = '../otherRecordMaintenance/viewOtherRecord.html';


        }else if(response.data[0]=="DUPLICATED"){

          alert("This Record Details is already Created (Same Name and Same Category is already Exist).");
          $scope.isDisabled = false;


        }else{
          alert("Failed to Edit Record.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });



  };

  $scope.deleteOtherRecordSubmit = function() {

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'otherID' : otherRecordData.OtherID,
           'teamID': selectionData.TeamID
         },
         url: 'https://flash-schedules.000webhostapp.com/deleteOtherRecord.php'
      }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Delete Record.");
          window.localStorage.removeItem('otherRecordDetails');
          $window.location.href = '../otherRecordMaintenance/viewOtherRecord.html';

        }else{
          alert("Delete Record Failed. Please try again.");
          $scope.isDisabled = false;
        }



      },function (error){
           alert("Please ensure You are connected to Internet.");
           $scope.isDisabled = false;
      });


  };


  $scope.backToView = function(){

    window.localStorage.removeItem('otherRecordDetails');
    window.location.href='../otherRecordMaintenance/viewOtherRecord.html';
  }


}


var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', function (evt) {
			  //do nothing on Back Presss
        }, false);


    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    }

};
