var createMemberControl = angular.module('createMemberScreen',[]);

createMemberControl.controller('createMemberController', createMemberController);


function createMemberController($scope, $http, $window) {

  $scope.nameInput="";
  $scope.emailInput="";
  $scope.mobileInput="";
  $scope.socialInput="";
  $scope.roleInput="Member";

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


  $scope.createMemberSubmit = function() {

    $scope.isDisabled = true;
    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Creating...";


    $http({
        method: 'POST',
        data: {
            'userName' : $scope.nameInput,
            'userEmail' : $scope.emailInput,
            'userMobile' : $scope.mobileInput,
            'userSocial' : $scope.socialInput,
            'userRole' : $scope.roleInput,
            'teamID' : selectionData.TeamID
        },
        url: 'https://flash-schedules.000webhostapp.com/createMember.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Create Member.");

          $window.location.href = '../memberMaintenance/createMember.html';

        }else if(response.data[0]=="EMAIL"){
          alert("Email is Used.");
          $scope.isOnline = true;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Email is Used)";
          $scope.isDisabled = false;


        }else if(response.data[0]=="MOBILE"){
          alert("Mobile Number is Used.");
          $scope.isOnline = true;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Mobile Number is Used)";
          $scope.isDisabled = false;


        }else{
          alert("Create Member Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Create Again)";
          $scope.isDisabled = false;
     });

  };


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../memberMaintenance/createMember.html';
    }

  }

  $scope.checkOnline = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

    if(!window.navigator.onLine){
      alert("Please ensure You are connected to Internet.");
      $scope.isOnline = false;
      document.getElementById("checkOnline").style.color = "red";
      document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
    }else{
      $scope.isOnline = true;
      document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Enter Data)";
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
