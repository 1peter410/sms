var submitOptionControl = angular.module('submitOptionScreen',[]);

submitOptionControl.controller('submitOptionController', submitOptionController);


function submitOptionController($scope, $http, $window) {


  $scope.isDisabled = true;
  $scope.isOnline = false;


    $scope.checkOnline = function() {

      $scope.isOnline = true;
      document.getElementById("checkOnline").innerHTML = "Loading...";

      if(!window.navigator.onLine){
        alert("Please ensure You are connected to Internet.");
        $scope.isOnline = false;
        $scope.isDisabled = true;

        document.getElementById("checkOnline").style.color = "red";
        document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
      }else{
        $scope.isOnline = true;
          $scope.isDisabled = false;
        document.getElementById("checkOnline").innerHTML = "(Record Selection)";
      }

    }

    $scope.goOnline = function() {

      if(!$scope.isOnline){
        window.location.href='../menuScreen/submitOption.html';
      }

    }

    $scope.createFeedback = function() {
      window.localStorage.removeItem('feedbackData');
      window.localStorage.removeItem('personalData');
      window.location.href='../statisticRecordMaintenance/createFeedback1.html';
    }

    $scope.selfSubmit = function() {


      window.location.href='../statisticRecordMaintenance/selfSubmit.html';


    }

    $scope.viewRecord = function() {


      window.location.href='../statisticRecordMaintenance/viewFeedback.html';


    }

    $scope.viewInfo = function() {


      window.location.href='../infoHelpScreen/categoryInfo.html';


    }


    $scope.backToMenu = function() {

      window.localStorage.removeItem('feedbackData');
      window.localStorage.removeItem('personalData');

      window.location.href='../menuScreen/menu.html';
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

function logOut(){

  window.localStorage.removeItem('feedbackData');
  window.localStorage.removeItem('personalData');
  window.localStorage.removeItem('targetDetails');
  window.localStorage.removeItem('otherRecordDetails');
  window.localStorage.removeItem('cateogryDetails');
  window.localStorage.removeItem('selectionData');
  window.localStorage.removeItem('loginData');
  alert("You have Logged Out.");
  window.location.href='../selectionScreen/selection.html';

}

function displayUserInfo() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));

    if(loginData.UserRole!="Leader"){
      document.getElementsByName("leaderOnly")[0].setAttribute("class", "imageButton");
      document.getElementsByName("leaderOnly")[1].setAttribute("class", "imageButton");

    }

    document.getElementById("userNameSpan").innerHTML = loginData.UserName;
    document.getElementById("userTeamSpan").innerHTML = loginData.TeamName;
}
