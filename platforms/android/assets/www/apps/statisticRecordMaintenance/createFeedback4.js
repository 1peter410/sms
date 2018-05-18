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

  $scope.partnerWith;

  $scope.remarkInput="";

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.getCategory = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";
    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {

          'teamID' : selectionData.TeamID
         },
        url: 'https://flash-schedules.000webhostapp.com/getCategory.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.categoryList=response.data;

          document.getElementById("checkOnline").innerHTML = "(Please Select Category and Partner)";
          $scope.isOnline = true;


        }else{
          alert("No Category is Created.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Category Created)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isOnline = false;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
          $scope.isDisabled = false;

     });

  };

  $scope.getUser = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";
    $scope.isDisabled = true;

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
          $scope.isOnline = true;


        }else{
          $scope.isDisabled = false;
          $scope.isOnline = true;

        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          $scope.isOnline = false;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
          $scope.isDisabled = false;

     });

  };




  $scope.submitRecord= function(){

    $scope.isDisabled = true;

    if($scope.partnerSelection){
      $scope.partnerWith=$scope.partnerSelection.UserID;
    }else{
      $scope.partnerWith='Holy Spirit';
    }

    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Submitting...";

    $http({
        method: 'POST',
        data: {
          'respondentName': personalData.Name,
          'respondentMobile': personalData.Mobile,
          'respondentSocial': personalData.Social,
          'q1': feedbackData.Q1.selectedOption.value,
          'q2': feedbackData.Q2.selectedOption.value,
          'q3': feedbackData.Q3.selectedOption.value,
          'q4': feedbackData.Q4.selectedOption.value,
          'evangelismComment': feedbackData.Comment,
          'partnerWith': $scope.partnerWith,
          'evangelismRemark': $scope.remarkInput,
          'categoryID': $scope.categorySelection.CategoryID,
          'userID': loginData.UserID,
          'teamID' : selectionData.TeamID

         },
        url: 'https://flash-schedules.000webhostapp.com/createFeedback.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Create Feedback Success.");
          $scope.isDisabled = false;
          window.localStorage.removeItem('feedbackData');
          window.localStorage.removeItem('personalData');
          window.location.href='../menuScreen/submitOption.html';

        }else{
          alert("Create Feedback failed. Please Try Again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Submit Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;

     });



  }


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../statisticRecordMaintenance/createFeedback4.html';
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
