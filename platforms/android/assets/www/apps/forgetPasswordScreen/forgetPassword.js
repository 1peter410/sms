var forgetPasswordControl = angular.module('forgetPasswordScreen',[]);

forgetPasswordControl.controller('forgetPasswordController', forgetPasswordController);


function forgetPasswordController($scope, $http, $window) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $scope.isDisabled = false;
  $scope.emailInput = '';
  $scope.mobileInput = '';
  $scope.isOnline = false;


  $scope.forgetPasswordSubmit = function() {

    $scope.isDisabled = true;
    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Recovering...";


    $http({
             method: 'POST',
             data: {
                 'userEmail' : $scope.emailInput,
                 'userMobile' : $scope.mobileInput,
                 'teamID' : selectionData.TeamID

             },
             url: 'https://flash-schedules.000webhostapp.com/forgetPassword.php'
          }).then(function (response){

             if(response.data[0]=="DONE"){

               alert("Recover Password Instruction have send to your Email. Please check your Email Inbox/Junk Mail/Spam Mail.");
               $scope.emailInput = '';
               $scope.mobileInput = '';
               $scope.forgetPasswordForm.$setPristine();
               $scope.isDisabled = false;

             }else{

               alert("Recover Password Failed. Email or Mobile Number is Not Registered. Please Try Again.");
               $scope.isOnline = true;
               document.getElementById("checkOnline").style.color = "red";
               document.getElementById("checkOnline").innerHTML = "(Email or Mobile Number is Not Registered.)";
               $scope.isDisabled = false;

             }

          },function (error){
               alert("Please ensure You are connected to Internet.");
               $scope.isOnline = true;
               document.getElementById("checkOnline").style.color = "red";
               document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Recover Again)";
               $scope.isDisabled = false;
          });


  }

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../forgetPasswordScreen/forgetPassword.html';
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
      document.getElementById("checkOnline").innerHTML = "(Enter Registered Email and Mobile Number)";
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
