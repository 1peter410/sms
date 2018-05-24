var reportMenuControl = angular.module('reportMenuScreen',[]);

reportMenuControl.controller('reportMenuController', reportMenuController);


function reportMenuController($scope, $http, $window) {


  $scope.isDisabled = true;
  $scope.isOnline = false;


    $scope.checkOnline = function() {

      var loginData = JSON.parse(localStorage.getItem("loginData"));

      if(loginData.UserRole!="Leader"){
        document.getElementsByName("leaderOnly")[0].setAttribute("class", "imageButton");
        document.getElementsByName("leaderOnly")[1].setAttribute("class", "imageButton");

      }



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
        document.getElementById("checkOnline").innerHTML = "(Report Selection)";
      }

    }

    $scope.goOnline = function() {

      if(!$scope.isOnline){
        window.location.href='../menuScreen/submitOption.html';
      }

    }


    $scope.personalEvangelism = function() {
      window.location.href='../personalReport/personalEvangelism.html';
    }

    $scope.personalTarget = function() {
      window.location.href='../personalReport/personalTarget.html';
    }



    $scope.backToMenu = function() {

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
