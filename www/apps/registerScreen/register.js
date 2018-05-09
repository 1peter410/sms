var registerControl = angular.module('registerScreen',[]);

registerControl.controller('registerController', registerController);


function registerController($scope, $http, $window) {

  $scope.nameInput ='';
  $scope.emailInput ='';
  $scope.mobileInput ='';
  $scope.socialInput ='';


  $scope.registerSubmit = function() {

    $scope.isDisabled = true;

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    var selectionData = JSON.parse(localStorage.getItem("selectionData"));

    $http({
        method: 'POST',
        data: {
            'userName' : $scope.nameInput,
            'userEmail' : $scope.emailInput,
            'userMobile' : $scope.mobileInput,
            'userSocial' : $scope.socialInput,
            'teamID' : selectionData.TeamID
        },
        url: 'https://flash-schedules.000webhostapp.com/register.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){
          localStorage.setItem("loginData", JSON.stringify(response.data[0]));

          var loginData = JSON.parse(localStorage.getItem("loginData"));
          alert("Registration Submitted. Please wait for Leader to Approve your Registration.");

          $window.location.href = '../loginScreen/login.html';

        }else if(response.data[0]=="EMAIL"){
          alert("Email is Used.");
          $scope.isDisabled = false;


        }else if(response.data[0]=="MOBILE"){
          alert("Mobile Number is Used.");
          $scope.isDisabled = false;


        }else{
          alert("Register Failed. Please try again.");
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
