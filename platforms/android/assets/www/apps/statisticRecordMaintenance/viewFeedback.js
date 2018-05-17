
var viewFeedbackControl = angular.module('viewFeedbackScreen',[]);


viewFeedbackControl.controller('viewFeedbackController', viewFeedbackController);

function viewFeedbackController($scope, $http, $window) {

  var loginData = JSON.parse(localStorage.getItem("loginData"));
  var selectionData = JSON.parse(localStorage.getItem("selectionData"));


  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.categorySelection;

  $scope.selectedCategory="";

  $scope.nameInput="";
  $scope.remarkInput="";

  $scope.dateInput =null;

  $scope.monthInput='GG';
  $scope.yearInput='GG';


  $scope.Q4 = {
   availableOptions: [
     {value: 'No Filter Interest'},
     {value: 'Wanted to know Christianity'}
   ],
   selectedOption: {value: 'No Filter Interest'}
  };

  $scope.question="";

  $scope.getCategory = function() {

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


    $scope.getRecord = function() {

      $scope.isDisabled = true;

      if($scope.categorySelection){
        $scope.selectedCategory=$scope.categorySelection.CategoryID;
      }else{
        $scope.selectedCategory="";
      }

      if($scope.dateInput!=null){
        $scope.monthInput= $scope.dateInput.getMonth()+1;
        $scope.yearInput= $scope.dateInput.getFullYear();
      }else{
        $scope.monthInput='GG';
        $scope.yearInput='GG';
      }

      if($scope.Q4.selectedOption.value=="No Filter Interest"){
        $scope.question="";
      }else{
        $scope.question="Yes";
      }


      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

      $http({
          method: 'POST',
          data: {
            'q4' : $scope.question,
            'categoryID' : $scope.selectedCategory,
            'nameInput' : $scope.nameInput,
            'remarkInput' : $scope.remarkInput,
            'monthInput' : $scope.monthInput,
            'yearInput' : $scope.yearInput,
            'userID' : loginData.UserID
          },
          url: 'https://flash-schedules.000webhostapp.com/getRecord.php'
       }).then(function (response){

          $scope.testing=response.data;
          $scope.isDisabled = false;

       },function (error){
            alert("Please ensure You are connected to Internet.");
            $scope.isDisabled = false;
       });


    }

    $scope.viewDetails = function(yourSharedData){

        localStorage.setItem("recordDetails", JSON.stringify(yourSharedData));
        window.location.href='./detailFeedback.html';

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
