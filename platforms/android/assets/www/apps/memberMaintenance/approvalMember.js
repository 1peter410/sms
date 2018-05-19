var approvalMemberControl = angular.module('approvalMemberScreen',[]);

approvalMemberControl.controller('approvalMemberController', approvalMemberController);

function approvalMemberController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $scope.nameInput="";
  $scope.emailInput="";
  $scope.mobileInput="";


  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.isDisabled = false;

  $scope.isOnline = false;

  $scope.getRegister = function() {

    $scope.isDisabled = true;
    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

     $http({
         method: 'POST',
         data: {
           'userName' : $scope.nameInput,
           'userEmail' : $scope.emailInput,
           'userMobile' : $scope.mobileInput,
           'teamID' : selectionData.TeamID
         },
         url: 'https://flash-schedules.000webhostapp.com/getRegister.php'
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
           $scope.isDisabled = true;
      });


  };

  $scope.viewDetails = function(yourSharedData){

      localStorage.setItem("approvalDetails", JSON.stringify(yourSharedData));
      window.location.href='./approvalDetailMember.html';

  }

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../memberMaintenance/approvalMember.html';
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
