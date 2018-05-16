
var createFeedbackControl1 = angular.module('createFeedbackScreen1',[]);

createFeedbackControl1.controller('createFeedbackController1', createFeedbackController1);

function createFeedbackController1($scope, $http, $window) {

  var feedbackData = JSON.parse(localStorage.getItem("feedbackData"));


  if(feedbackData){

    $scope.Q1 = {
     availableOptions: [
       {value: 'Not Clear'},
       {value: 'Neutral'},
       {value: 'Very Clear'},
     ],
     selectedOption: {value: feedbackData.Q1.selectedOption.value}
    };

    $scope.Q2 = {
     availableOptions: [
       {value: 'Yes'},
       {value: 'Neutral'},
       {value: 'No'},
     ],
     selectedOption: {value: feedbackData.Q2.selectedOption.value}
    };

    $scope.Q3 = {
     availableOptions: [
       {value: 'I rather not discuss about it'},
       {value: 'I am Neutral about it'},
       {value: 'I very interested to discuss about it'},
     ],
     selectedOption: {value: feedbackData.Q3.selectedOption.value}
    };

    $scope.Q4 = {
     availableOptions: [
       {value: 'Yes'},
       {value: 'No'},
     ],
     selectedOption: {value: feedbackData.Q4.selectedOption.value}
    };

    $scope.commentInput=feedbackData.Comment;
  }else{

    $scope.Q1 = {
     availableOptions: [
       {value: 'Not Clear'},
       {value: 'Neutral'},
       {value: 'Very Clear'},
     ],
     selectedOption: null
     };

     $scope.Q2 = {
      availableOptions: [
        {value: 'Yes'},
        {value: 'Neutral'},
        {value: 'No'},
      ],
      selectedOption: null
     };

     $scope.Q3 = {
      availableOptions: [
        {value: 'I rather not discuss about it'},
        {value: 'I am Neutral about it'},
        {value: 'I very interested to discuss about it'},
      ],
      selectedOption: null
     };

     $scope.Q4 = {
      availableOptions: [
        {value: 'Yes'},
        {value: 'No'},
      ],
      selectedOption: null
     };

    $scope.commentInput='';
  }




  $scope.isDisabled = false;


  $scope.personalInfoPage = function() {

    var feedback = {Q1:$scope.Q1, Q2:$scope.Q2, Q3:$scope.Q3, Q4:$scope.Q4, Comment:$scope.commentInput};

    $scope.isDisabled = true;

    localStorage.setItem("feedbackData", JSON.stringify(feedback));

    window.location.href='../statisticRecordMaintenance/createFeedback2.html';

    //var feedbackData = JSON.parse(localStorage.getItem("feedbackData"));

  };

  $scope.reset = function() {

    window.localStorage.removeItem('feedbackData');

    $scope.Q1 = {
     availableOptions: [
       {value: 'Not Clear'},
       {value: 'Neutral'},
       {value: 'Very Clear'},
     ],
     selectedOption: null
     };

     $scope.Q2 = {
      availableOptions: [
        {value: 'Yes'},
        {value: 'Neutral'},
        {value: 'No'},
      ],
      selectedOption: null
     };

     $scope.Q3 = {
      availableOptions: [
        {value: 'I rather not discuss about it'},
        {value: 'I am Neutral about it'},
        {value: 'I very interested to discuss about it'},
      ],
      selectedOption: null
     };

     $scope.Q4 = {
      availableOptions: [
        {value: 'Yes'},
        {value: 'No'},
      ],
      selectedOption: null
     };

    $scope.commentInput='';

  };


  $scope.backToSelection = function() {

    window.localStorage.removeItem('feedbackData');
    window.localStorage.removeItem('personalData');

    window.location.href='../menuScreen/submitOption.html';
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
