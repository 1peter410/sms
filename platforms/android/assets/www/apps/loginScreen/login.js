var loginControl = angular.module('loginScreen',[]);

loginControl.controller('loginController', loginController);


function loginController($scope, $http, $window) {

  $scope.emailInput = '';
  $scope.passwordInput = '';
  $scope.isDisabled = false;

  $scope.loginSubmit = function() {

    $scope.isDisabled = true;

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $http({
        method: 'POST',
        data: {
            'userEmail' : $scope.emailInput,
            'userPassword' : $scope.passwordInput,
        },
        url: 'https://flash-schedules.000webhostapp.com/login.php'
     }).then(function (response){

        if(response.data[0]!="GG"){
          localStorage.setItem("loginData", JSON.stringify(response.data[0]));

          var loginData = JSON.parse(localStorage.getItem("loginData"));
          alert("Successful Login"+"\n\nWelcome, "+loginData.UserName);

          $window.location.href = '../menuScreen/menu.html';

        }else{
          alert("Login Failed. Incorrect Email or Password.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;
     });

  };


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

function exitApp(){
  navigator.app.exitApp();
}
