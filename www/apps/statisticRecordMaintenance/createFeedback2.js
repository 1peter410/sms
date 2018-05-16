var createFeedbackControl2 = angular.module('createFeedbackScreen2',[]);

createFeedbackControl2.controller('createFeedbackController2', createFeedbackController2);


function createFeedbackController2($scope, $http, $window) {

  var personalData = JSON.parse(localStorage.getItem("personalData"));

  if(personalData){
    $scope.nameInput=personalData.Name;
    $scope.socialInput=personalData.Social;
    $scope.mobileInput=personalData.Mobile;
  }else{
    $scope.nameInput='';
    $scope.socialInput='';
    $scope.mobileInput='';
  }

  $scope.isDisabled = false;


  $scope.finishPage = function() {

    var personalInfo = {Name:$scope.nameInput, Social:$scope.socialInput, Mobile:$scope.mobileInput};

    $scope.isDisabled = true;

    localStorage.setItem("personalData", JSON.stringify(personalInfo));

    window.location.href='../statisticRecordMaintenance/createFeedback3.html';



  };

  $scope.reset = function() {
    $scope.nameInput='';
    $scope.socialInput='';
    $scope.mobileInput='';

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
