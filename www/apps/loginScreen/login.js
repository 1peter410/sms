var loginControl = angular.module('loginScreen',[]);

loginControl.controller('loginController', loginController);


function loginController($scope, $http, $window) {

  $scope.emailInput = '';
  $scope.passwordInput = '';
  $scope.isDisabled = false;

  $scope.isOnline = false;

  $scope.loginSubmit = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Logining...";

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    var selectionData = JSON.parse(localStorage.getItem("selectionData"));

    $http({
        method: 'POST',
        data: {
            'userEmail' : $scope.emailInput,
            'userPassword' : $scope.passwordInput,
            'teamID' : selectionData.TeamID
        },
        url: 'https://flash-schedules.000webhostapp.com/login.php'
     }).then(function (response){

        if(response.data[0]!="GG"){
          localStorage.setItem("loginData", JSON.stringify(response.data[0]));

          var loginData = JSON.parse(localStorage.getItem("loginData"));
          alert("Successful Login"+"\n\nWelcome, "+loginData.UserName);

          $window.location.href = '../menuScreen/menu.html';

        }else{
          $scope.isOnline = true;
          alert("Login Failed. Incorrect Email or Password.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Incorrect Login Email or Password)";
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isOnline = true;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Login Again)";
          $scope.isDisabled = false;
     });

  };

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../loginScreen/login.html';
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
      document.getElementById("checkOnline").innerHTML = "(Enter Email and Password to Login)";
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

function displaySelectionInfo() {
    var selectionData = JSON.parse(localStorage.getItem("selectionData"));

    document.getElementById("userOrgSpan").innerHTML = selectionData.OrgName;
    document.getElementById("userTeamSpan").innerHTML = selectionData.TeamName;
}

function exitApp(){
  window.localStorage.removeItem('selectionData');
  navigator.app.exitApp();
}

function backSelection(){
  window.localStorage.removeItem('selectionData');
  window.location.href='../selectionScreen/selection.html';
}
