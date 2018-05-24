var personalTargetControl = angular.module('personalTargetScreen',[]);

personalTargetControl.controller('personalTargetController', personalTargetController);


function personalTargetController($scope, $http, $window) {

  var loginData = JSON.parse(localStorage.getItem("loginData"));
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.isDisabled = true;
  $scope.isOnline = false;


    $scope.getReport = function(){

      $scope.isOnline = true;
      document.getElementById("checkOnline").innerHTML = "Loading...";

      $scope.isDisabled = true;


      $http({
          method: 'POST',
          data: {
            'userID' : loginData.UserID
           },
          url: 'https://flash-schedules.000webhostapp.com/personalTarget.php',
          timeout : 10000,
       }).then(function (response){

          if(response.data[0]=="No Target"){
            document.getElementById("checkOnline").style.color = "red";
            document.getElementById("checkOnline").innerHTML = "(No Faith Goal Set)";
            $scope.isDisabled = false;
            $scope.isOnline = true;

            $scope.targetList=null;
            $scope.archievedList=null;

          }else{


            if(response.data[1]!="No Record"){
              $scope.targetList=response.data[0];
              $scope.archievedList=response.data[1];

              document.getElementById("checkOnline").innerHTML = "(Faith Goal Report)";
              $scope.isDisabled = false;
              $scope.isOnline = true;

            }else{

              var dummyData = {Archieved:"0"};

              $scope.targetList=response.data[0];
              $scope.archievedList=dummyData;
              document.getElementById("checkOnline").innerHTML = "(Faith Goal Report)";
              $scope.isDisabled = false;
              $scope.isOnline = true;

            }


          }


       },function (error){
         alert("Please ensure You are connected to a Good Internet Connection.");
            $scope.isOnline = false;
            document.getElementById("checkOnline").style.color = "red";
            document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
            $scope.isDisabled = false;

       });

    }



    $scope.goOnline = function() {

      if(!$scope.isOnline){
        window.location.href='../personalReport/personalEvangelism.html';
      }

    }



    $scope.backToMenu = function() {

      window.location.href='../menuScreen/reportMenu.html';
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
