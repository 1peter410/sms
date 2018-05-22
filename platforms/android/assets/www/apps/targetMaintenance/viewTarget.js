var viewTargetControl = angular.module('viewTargetScreen',[]);

viewTargetControl.controller('viewTargetController', viewTargetController);


function viewTargetController($scope, $http, $window) {

  $scope.nameInput='';
  $scope.showOption='ALL';


  $scope.isDisabled = false;
  var selectionData = JSON.parse(localStorage.getItem("selectionData"));


  $scope.getTarget = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $http({
        method: 'POST',
        data: {
          'nameInput' : $scope.nameInput,
          'teamID' : selectionData.TeamID,
          'showOption' : $scope.showOption
        },
        url: 'https://flash-schedules.000webhostapp.com/getTarget.php',
        timeout : 10000,
     }).then(function (response){

        $scope.testing=response.data;
        document.getElementById("checkOnline").innerHTML = "(Click on List to View Details)";
        $scope.isOnline = true;
        $scope.isDisabled = false;

     },function (error){
       alert("Please ensure You are connected to a Good Internet Connection.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
          $scope.isOnline = false;
          $scope.isDisabled = false;
     });

  };




  $scope.viewDetails = function(yourSharedData){

      localStorage.setItem("targetDetails", JSON.stringify(yourSharedData));
      window.location.href='./detailTarget.html';

  }


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../targetMaintenance/viewTarget.html';
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
