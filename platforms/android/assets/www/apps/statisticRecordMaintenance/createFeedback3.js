var createFeedbackControl3 = angular.module('createFeedbackScreen3',[]);

createFeedbackControl3.controller('createFeedbackController3', createFeedbackController3);


function createFeedbackController3($scope, $http, $window) {

  var personalData = JSON.parse(localStorage.getItem("personalData"));
  $scope.name = personalData.Name;

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


function finalScreen(){
  window.location.href='../statisticRecordMaintenance/createFeedback4.html';
}
