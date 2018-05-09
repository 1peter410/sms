var selectionControl = angular.module('selectionScreen',[]);

selectionControl.controller('selectionController', selectionController);


function selectionController($scope, $http, $window) {


  $scope.isDisabled = true;
  $scope.orgSelection;
  $scope.teamSelection;


  $scope.getOrganization = function() {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $http({
        method: 'GET',
        url: 'https://flash-schedules.000webhostapp.com/getOrganization.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.orgList=response.data;
          $scope.isDisabled = false;


        }else{
          alert("No Registered Organization.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          document.getElementById("goOnline").disabled=false;
          document.getElementById('goOnline').value = "Click to Go Online";
          $scope.isDisabled = false;
     });

  };


  $scope.getTeam = function() {

    $scope.isDisabled = true;

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $http({
        method: 'POST',
        data: {
             'orgID' : $scope.orgSelection.OrgID
         },
        url: 'https://flash-schedules.000webhostapp.com/getTeam.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          document.getElementById("teamSelection").disabled=false;

          $scope.teamList=response.data;
          $scope.isDisabled = false;


        }else{
          alert("No Registered Team.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });

  };

  $scope.selectionSubmit = function() {

    $scope.isDisabled = true;
    localStorage.setItem("selectionData", JSON.stringify($scope.teamSelection));
    var selectionData = JSON.parse(localStorage.getItem("selectionData"));
    window.location.href='../loginScreen/login.html';

  }

  $scope.goOnline = function() {

    window.location.href='../selectionScreen/selection.html';

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

function exitApp(){
  navigator.app.exitApp();
}
