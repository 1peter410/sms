var submissionControl = angular.module('submissionScreen',[]);

submissionControl.controller('submissionController', submissionController);


function submissionController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));
  var loginData = JSON.parse(localStorage.getItem("loginData"));


  var feedbackData = JSON.parse(localStorage.getItem("feedbackData"));
  var personalData = JSON.parse(localStorage.getItem("personalData"));

  $scope.isDisabled = false;
  $scope.categorySelection;
  $scope.partnerSelection=null;

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.getCategory = function() {

    $http({
        method: 'POST',
        data: {
          'teamID' : selectionData.TeamID
         },
        url: 'https://flash-schedules.000webhostapp.com/getCategory.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.categoryList=response.data;

          $scope.isDisabled = false;


        }else{
          alert("No Category is Created.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });

  };

  $scope.getUser = function() {

    $http({
        method: 'POST',
        data: {
          'teamID' : selectionData.TeamID,
          'userID' : loginData.UserID

         },
        url: 'https://flash-schedules.000webhostapp.com/getUser.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.partnerList=response.data;

          $scope.isDisabled = false;


        }else{
          alert("No User from Database.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isDisabled = false;

     });

  };


  $scope.submitRecord= function(){
    alert($scope.categorySelection.CategoryID);

    if($scope.partnerSelection){
      alert($scope.partnerSelection.UserID);

    }else{
      alert("GG");
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
