var createCategoryControl = angular.module('createCategoryScreen',[]);

createCategoryControl.controller('createCategoryController', createCategoryController);


function createCategoryController($scope, $http, $window) {

  $scope.nameInput='';
  $scope.descInput='';
  $scope.isDisabled = false;
  $scope.isOnline = false;

  $scope.createCategorySubmit = function() {

    $scope.isDisabled = true;
    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Creating...";

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    var selectionData = JSON.parse(localStorage.getItem("selectionData"));

    $http({
        method: 'POST',
        data: {
            'categoryName' : $scope.nameInput,
            'categoryDesc' : $scope.descInput,
            'teamID' : selectionData.TeamID
        },
        url: 'https://flash-schedules.000webhostapp.com/createCategory.php'
     }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Create Category.");

          $window.location.href = '../categoryMaintenance/createCategory.html';

        }else if(response.data[0]=="NAME"){

          alert("Category Name is already used.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Category Name is Used)";
          $scope.isDisabled = false;


        }else{
          alert("Create Category Failed. Please try again.");
          $scope.isDisabled = false;
        }


     },function (error){
          alert("Please ensure You are connected to Internet.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Create Again)";
          $scope.isDisabled = false;
     });

  };


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../categoryMaintenance/createCategory.html';
    }

  }

  $scope.checkOnline = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

    if(!window.navigator.onLine){
      alert("Please ensure You are connected to Internet.");
      $scope.isOnline = false;
      document.getElementById("checkOnline").style.color = "red";
      document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
    }else{
      $scope.isOnline = true;
      document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Enter Data)";
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
