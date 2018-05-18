var viewOtherRecordControl = angular.module('viewOtherRecordScreen',[]);

viewOtherRecordControl.controller('viewOtherRecordController', viewOtherRecordController);


function viewOtherRecordController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $scope.isDisabled = false;
  $scope.dateInput =null;

  $scope.monthInput='GG';
  $scope.yearInput='GG';

  $scope.nameInput='';

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


  $scope.getOtherRecord = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

    if($scope.dateInput!=null){
      $scope.monthInput= $scope.dateInput.getMonth()+1;
      $scope.yearInput= $scope.dateInput.getFullYear();
    }else{
      $scope.monthInput='GG';
      $scope.yearInput='GG';
    }

    $http({
        method: 'POST',
        data: {
          'otherName' : $scope.nameInput,
          'monthInput' : $scope.monthInput,
          'yearInput' : $scope.yearInput,
          'teamID' : selectionData.TeamID
         },
        url: 'https://flash-schedules.000webhostapp.com/getOtherRecord.php'
     }).then(function (response){


          $scope.testing=response.data;
          document.getElementById("checkOnline").innerHTML = "(Click on List to View Details)";
          $scope.isOnline = true;

          $scope.isDisabled = false;


     },function (error){
          alert("Please ensure You are connected to Internet.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
          $scope.isOnline = false;
          $scope.isDisabled = false;

     });

  };


  $scope.viewDetails = function(yourSharedData){

      localStorage.setItem("otherRecordDetails", JSON.stringify(yourSharedData));
      window.location.href='./detailOtherRecord.html';

  }

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../otherRecordMaintenance/viewOtherRecord.html';
    }

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
