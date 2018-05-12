var viewCategoryControl = angular.module('viewCategoryScreen',[]);

viewCategoryControl.controller('viewCategoryController', viewCategoryController);


function viewCategoryController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.isDisabled = false;


  $scope.getCategory = function() {

    document.getElementById("checkOnline").innerHTML = "Loading...";
    $scope.isDisabled = true;


     $http({
         method: 'POST',
         data: {
           'teamID' : selectionData.TeamID
         },
         url: 'https://flash-schedules.000webhostapp.com/viewCategory.php'
      }).then(function (response){

         $scope.testing=response.data;
         document.getElementById("checkOnline").innerHTML = "(Click on List to View Details)";
         $scope.isDisabled = false;


      },function (error){
           alert("Please ensure You are connected to Internet.");
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Go Online)";
           $scope.isDisabled = false;
      });


  };

  $scope.viewDetails = function(yourSharedData){

      localStorage.setItem("cateogryDetails", JSON.stringify(yourSharedData));
      window.location.href='./detailCategory.html';

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
