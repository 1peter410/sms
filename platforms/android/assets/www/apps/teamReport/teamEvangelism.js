var teamEvangelismControl = angular.module('teamEvangelismScreen',[]);

teamEvangelismControl.controller('teamEvangelismController', teamEvangelismController);


function teamEvangelismController($scope, $http, $window) {

  var loginData = JSON.parse(localStorage.getItem("loginData"));
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.isDisabled = true;
  $scope.isOnline = false;

  $scope.startDate = "";
  $scope.endDate = "";

    $scope.getReport = function(){

      $scope.isOnline = true;
      document.getElementById("checkOnline").innerHTML = "Loading...";

      $scope.isDisabled = true;

      if($scope.startDate == ""  || $scope.startDate == null){
        $scope.start = new Date("2017-12-31");
      }else{
        var d = new Date($scope.startDate);
        d.setDate(d.getDate() + 1);
        $scope.start= d.toISOString().replace('-', '/').split('T')[0].replace('-', '/');;
      }
      if($scope.endDate == "" || $scope.endDate == null){
        $scope.end = new Date("2020-12-31");
      }else{
        var d = new Date($scope.endDate);
        d.setDate(d.getDate() + 1);
        $scope.end= d.toISOString().replace('-', '/').split('T')[0].replace('-', '/');;
      }

      $http({
          method: 'POST',
          data: {
            'teamID' : loginData.TeamID,
            'startDate' : $scope.start,
            'endDate' : $scope.end
           },
          url: 'https://flash-schedules.000webhostapp.com/teamEvangelism.php',
          timeout : 10000,
       }).then(function (response){

          if(response.data[0]!="GG"){

            $scope.reportList=response.data;
            $scope.isOnline = true;
            document.getElementById("checkOnline").innerHTML = "(Report Generated)";
            $scope.isDisabled = false;


          }else{
            $scope.reportList=response.data;
            $scope.isOnline = true;
            document.getElementById("checkOnline").innerHTML = "(No Report)";
            $scope.isDisabled = false;

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
