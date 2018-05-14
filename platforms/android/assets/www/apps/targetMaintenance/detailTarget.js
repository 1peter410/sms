var detailTargetControl = angular.module('detailTargetScreen',[]);

detailTargetControl.controller('detailTargetController', detailTargetController);


function detailTargetController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));
  var targetData = JSON.parse(localStorage.getItem("targetDetails"));

  $scope.nameInput=targetData.UserName;
  $scope.targetInput=targetData.TargetCount;
  $scope.categorySelection;
  $scope.isDisabled = false;


  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.getCategory = function() {

    $http({
        method: 'POST',
        data: {
          'teamID' : selectionData.TeamID
         },
        url: 'https://flash-schedules.000webhostapp.com/getCategory.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          document.getElementById("categorySelection").disabled=false;

          $scope.categoryList=response.data;

          if(targetData.CategoryID!=''){

            for (var go in $scope.categoryList){

              if(targetData.CategoryID==$scope.categoryList[go].CategoryID){
                $scope.categorySelection=$scope.categoryList[go];
              }
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


  $scope.editTarget = function() {

    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {
          'targetID' : targetData.TargetID,
          'targetCount' : $scope.targetInput,
          'categoryID' : $scope.categorySelection.CategoryID

         },
        url: 'https://flash-schedules.000webhostapp.com/editTarget.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Edit Target.");
          window.localStorage.removeItem('targetDetails');
          $window.location.href = '../targetMaintenance/viewTarget.html';


        }else{
          alert("Failed to Edit Target.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });



  };


  $scope.backToView = function(){

    window.localStorage.removeItem('targetDetails');
    window.location.href='../targetMaintenance/viewTarget.html';
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
