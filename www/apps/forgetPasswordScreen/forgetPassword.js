var forgetPasswordControl = angular.module('forgetPasswordScreen',[]);

forgetPasswordControl.controller('forgetPasswordController', forgetPasswordController);


function forgetPasswordController($scope, $http, $window) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $scope.isDisabled = false;
  $scope.emailInput = '';
  $scope.mobileInput = '';

  $scope.forgetPasswordSubmit = function() {

    $scope.isDisabled = true;


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
               $scope.isDisabled = false;

             }

          },function (error){
               alert("Please ensure You are connected to Internet.");
               $scope.isDisabled = false;
          });


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
