var registerControl = angular.module('registerScreen',[]);

registerControl.controller('registerController', registerController);

registerControl.directive("ngConfirmClick", [
  function() {
   return {
     priority: -1,
      restrict: "A",
      link: function(scope, element, attrs) {
        element.bind("click", function(e) {
          var message;
          message = attrs.ngConfirmClick;
          if (message && !confirm(message)) {
           e.stopImmediatePropagation();
           e.preventDefault();
          }
        });
      }
    };
  }
]);

function registerController($scope, $http, $window) {

  $scope.nameInput ='';
  $scope.emailInput ='';
  $scope.mobileInput ='';
  $scope.socialInput ='';

  $scope.isOnline = false;

  $scope.registerSubmit = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Registering...";

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    var selectionData = JSON.parse(localStorage.getItem("selectionData"));

    $http({
        method: 'POST',
        data: {
            'userName' : $scope.nameInput,
            'userEmail' : $scope.emailInput,
            'userMobile' : $scope.mobileInput,
            'userSocial' : $scope.socialInput,
            'teamID' : selectionData.TeamID
        },
        url: 'https://flash-schedules.000webhostapp.com/register.php',
        timeout : 10000,
     }).then(function (response){

        if(response.data[0]=="DONE"){
          localStorage.setItem("loginData", JSON.stringify(response.data[0]));

          var loginData = JSON.parse(localStorage.getItem("loginData"));
          alert("Registration Submitted. Please wait for Leader to Approve your Registration.");

          $window.location.href = '../loginScreen/login.html';

        }else if(response.data[0]=="EMAIL"){
          alert("Email is Used.");
          $scope.isOnline = true;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Email is Used)";
          $scope.isDisabled = false;


        }else if(response.data[0]=="MOBILE"){
          alert("Mobile Number is Used.");
          $scope.isOnline = true;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Mobile Number is Used)";
          $scope.isDisabled = false;


        }else{
          alert("Register Failed. Please try again.");
          $scope.isOnline = true;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isDisabled = false;
        }


     },function (error){
       alert("Please ensure You are connected to a Good Internet Connection.");
          $scope.isOnline = true;
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Register Again)";
          $scope.isDisabled = false;
     });

  }

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../registerScreen/register.html';
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
