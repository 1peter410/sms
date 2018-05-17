var submitOptionControl = angular.module('submitOptionScreen',[]);

submitOptionControl.controller('submitOptionController', submitOptionController);


function submitOptionController($scope, $http, $window) {


    $scope.checkOnline = function() {

      if(!window.navigator.onLine){
        alert("Please ensure You are connected to Internet.");

        $scope.isDisabled = true;

        document.getElementById("goOnline").disabled=false;
        document.getElementById('goOnline').value = "Click to Go Online";
      }else{
        $scope.isDisabled = false;
      }


    }

    $scope.goOnline = function() {

      window.location.href='../menuScreen/submitOption.html';

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
