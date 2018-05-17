
var viewFeedbackControl = angular.module('viewFeedbackScreen',[]);

viewFeedbackControl.controller('viewFeedbackController', viewFeedbackController);

function viewFeedbackController($scope, $http, $window) {


  var selectionData = JSON.parse(localStorage.getItem("selectionData"));

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.categorySelection;

  $scope.Q4 = {
   availableOptions: [
     {value: 'No Filter Interest'},
     {value: 'Wanted to know Christianity'},
     {value: 'Not Wanted to know Christianity'},
   ],
   selectedOption: {value: 'No Filter Interest'}
  };


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
