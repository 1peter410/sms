var viewMemberControl = angular.module('viewMemberScreen',[]);

viewMemberControl.controller('viewMemberController', viewMemberController);

function viewMemberController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $scope.nameInput="";
  $scope.roleInput="";
  $scope.statusInput="";


  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.isDisabled = false;

  $scope.isOnline = false;

  $scope.getMember = function() {

    $scope.isDisabled = true;
    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

     $http({
         method: 'POST',
         data: {
           'userName' : $scope.nameInput,
           'userRole' : $scope.roleInput,
           'userStatus' : $scope.statusInput,
           'teamID' : selectionData.TeamID
         },
         url: 'https://flash-schedules.000webhostapp.com/getMember.php',
         timeout : 10000,
      }).then(function (response){

         $scope.testing=response.data;
         document.getElementById("checkOnline").innerHTML = "(Click on List to View Details)";
         $scope.isOnline = true;
         $scope.isDisabled = false;



      },function (error){
        alert("Please ensure You are connected to a Good Internet Connection.");
           document.getElementById("checkOnline").style.color = "red";
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
           $scope.isOnline = false;
           $scope.isDisabled = true;
      });


  };

  $scope.viewDetails = function(yourSharedData){

      localStorage.setItem("memberDetails", JSON.stringify(yourSharedData));
      window.location.href='./detailMember.html';

  }

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../memberMaintenance/viewMember.html';
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
