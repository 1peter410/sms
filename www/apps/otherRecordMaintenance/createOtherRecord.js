var createOtherRecordControl = angular.module('createOtherRecordScreen',[]);

createOtherRecordControl.controller('createOtherRecordController', createOtherRecordController);


function createOtherRecordController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $scope.isDisabled = false;
  $scope.startDate ='';
  $scope.endDate ='';
  $scope.nameInput='';
  $scope.categorySelection;
  $scope.reachOutInput='';
  $scope.remarkInput='';

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


  $scope.createOtherRecordSubmit = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Creating...";

    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {
            'startDate' : $scope.startDate,
            'endDate' : $scope.endDate,
            'otherName' : $scope.nameInput,
            'categoryID' : $scope.categorySelection.CategoryID,
            'otherCount' : $scope.reachOutInput,
            'otherRemark' : $scope.remarkInput,
            'teamID' : selectionData.TeamID,

        },
        url: 'https://flash-schedules.000webhostapp.com/createOtherRecord.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Create Record.");

          $window.location.href = '../otherRecordMaintenance/createOtherRecord.html';

        }else if(response.data[0]=="DUPLICATED"){

          alert("This Record Details is already Created. (Same Name and Same Category is already Exist)");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Event with Same Category Existed)";
          $scope.isDisabled = false;
          $scope.isOnline = true;

        }else{
          alert("Create Record Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Create Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
     });

  };


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
          $scope.isOnline = true;
          document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Enter Data)";
          $scope.isDisabled = false;


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


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../otherRecordMaintenance/createOtherRecord.html';
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
