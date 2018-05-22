var cateogryInfoControl = angular.module('cateogryInfoScreen',[]);

cateogryInfoControl.controller('cateogryInfoController', cateogryInfoController);


function cateogryInfoController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));
  var targetData = JSON.parse(localStorage.getItem("targetDetails"));

  $scope.categorySelection;
  $scope.descInput="";

  $scope.isDisabled = false;


  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.getCategory = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

    $http({
        method: 'POST',
        data: {
          'teamID' : selectionData.TeamID
         },
        url: 'https://flash-schedules.000webhostapp.com/getCategory.php',
        timeout : 10000,
     }).then(function (response){

        if(response.data[0]!="GG"){

          document.getElementById("categorySelection").disabled=false;

          $scope.categoryList=response.data;


          $scope.isDisabled = false;
          $scope.isOnline = true;
          document.getElementById("checkOnline").innerHTML = "(Please Select a Category)";


        }else{
          alert("No Category is Created.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Category Created)";
          $scope.isDisabled = false;
        }


     },function (error){
       alert("Please ensure You are connected to a Good Internet Connection.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
          $scope.isOnline = false;
          $scope.isDisabled = false;

     });

  };


  $scope.categoryChange = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Loading...";


    $http({
        method: 'POST',
        data: {
          'categoryID' : $scope.categorySelection.CategoryID
         },
        url: 'https://flash-schedules.000webhostapp.com/getCategoryByID.php',
        timeout : 10000,
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.descInput=response.data[0].CategoryDesc;
          document.getElementById("checkOnline").innerHTML = "(Please Select a Category)";
          $scope.isDisabled = false;

        }else{
          alert("Failed to Get info.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }


     },function (error){
       alert("Please ensure You are connected to a Good Internet Connection.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Select Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;

     });



  };



  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../infoHelpScreen/categoryInfo.html';
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
