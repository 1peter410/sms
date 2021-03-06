var editProfileControl = angular.module('profileScreen',[]);

editProfileControl.controller('editProfileController', editProfileController);


editProfileControl.directive("ngConfirmClick", [
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

function editProfileController($scope, $http, $window) {

  var loginData = JSON.parse(localStorage.getItem("loginData"));

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.isDisabled = true;
  $scope.socialInput = '';
  $scope.emailInput = '';
  $scope.mobileInput = '';
  $scope.oldPasswordInput = '';
  $scope.newPasswordInput = '';
  $scope.retypePasswordInput ='';

  $scope.getProfileInfo = function(){

    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";
    document.getElementById("passwordSection").innerHTML = "Loading...";


    $scope.isDisabled = true;



    $http({
             method: 'POST',
             data: {
                 'userID' : loginData.UserID
             },
             url: 'https://flash-schedules.000webhostapp.com/getProfileInfo.php',
             timeout : 10000,
          }).then(function (response){

             $scope.socialInput = response.data[0].UserSocial;
             $scope.emailInput = response.data[0].UserEmail;
             $scope.mobileInput = response.data[0].UserMobile;

             $scope.isDisabled = false;
             $scope.isOnline = true;

             document.getElementById("checkOnline").innerHTML = "(Edit Information Section)";
             document.getElementById("passwordSection").innerHTML = "(Edit Password Section)";


          },function (error){
            alert("Please ensure You are connected to a Good Internet Connection.");
               $scope.isOnline = false;
               document.getElementById("checkOnline").style.color = "red";
               document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";

               document.getElementById("passwordSection").style.color = "red";
               document.getElementById("passwordSection").innerHTML = "(No Internet Connection - Click Me to Refresh)";
               $scope.isDisabled = false;
          });

  }


  $scope.editInfoSubmit = function() {

    $scope.isDisabled = true;
    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Editting Info...";

    $http({
             method: 'POST',
             data: {
                 'userID' : loginData.UserID,
                 'userSocial' : $scope.socialInput,
                 'userEmail' : $scope.emailInput,
                 'userMobile' : $scope.mobileInput

             },
             url: 'https://flash-schedules.000webhostapp.com/editProfileInfo.php',
             timeout : 10000,
          }).then(function (response){

             if(response.data[0]=="DONE"){

               alert("Edit Profile Info Successful.");
               $scope.getProfileInfo();

             }else if(response.data[0]=="EMAIL"){

               alert("Email Have Been Used. Please Try Again.");
               $scope.isOnline = true;
               document.getElementById("checkOnline").style.color = "red";
               document.getElementById("checkOnline").innerHTML = "(Email is Used)";
               $scope.isDisabled = false;

             }else if(response.data[0]=="MOBILE"){

               alert("Mobile Number Have Been Used. Please Try Again.");
               $scope.isOnline = true;
               document.getElementById("checkOnline").style.color = "red";
               document.getElementById("checkOnline").innerHTML = "(Mobile Number is Used)";
               $scope.isDisabled = false;

             }else{

               alert("Edit Profile Info Failed. Please Try Again.");
               $scope.isOnline = true;
               document.getElementById("checkOnline").style.color = "red";
               document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
               $scope.isDisabled = false;

             }

          },function (error){
            alert("Please ensure You are connected to a Good Internet Connection.");
               $scope.isOnline = true;
               document.getElementById("checkOnline").style.color = "red";
               document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Edit Again)";
               $scope.isDisabled = false;
          });


  }

  $scope.editPasswordSubmit = function() {

    $scope.isDisabled = true;
    $scope.isOnline = true;
    document.getElementById("passwordSection").style.color = "black";
    document.getElementById("passwordSection").innerHTML = "Changing Password...";

    $http({
             method: 'POST',
             data: {
                 'userID' : loginData.UserID,
                 'oldPassword' : $scope.oldPasswordInput,
                 'newPassword' : $scope.newPasswordInput,

             },
             url: 'https://flash-schedules.000webhostapp.com/editProfilePassword.php',
             timeout : 10000,
          }).then(function (response){

             if(response.data[0]=="DONE"){

               alert("Change Password Successful.");
               $scope.oldPasswordInput = '';
               $scope.newPasswordInput = '';
               $scope.retypePasswordInput ='';
               $scope.editProfilePassword.$setPristine();
               $scope.getProfileInfo();


             }else if(response.data[0]=="WRONG"){

               alert("Old Password Incorrect. Please Try Again.");
               $scope.isOnline = true;
                document.getElementById("passwordSection").style.color = "red";
                document.getElementById("passwordSection").innerHTML = "(Old Password Incorrect)";
               $scope.isDisabled = false;

             }else{

               alert("Change Password Failed. Please Try Again.");
               $scope.isOnline = true;
                document.getElementById("passwordSection").style.color = "red";
                document.getElementById("passwordSection").innerHTML = "(Something Went Wrong - Try Again)";
               $scope.isDisabled = false;

             }

          },function (error){
            alert("Please ensure You are connected to a Good Internet Connection.");
               $scope.isOnline = true;
               document.getElementById("passwordSection").style.color = "red";
               document.getElementById("passwordSection").innerHTML = "(No Internet Connection - Try Edit Again)";
               $scope.isDisabled = false;
          });


  }

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../editProfileScreen/editProfile.html';
    }

  }





}

editProfileControl.directive('passwordConfirm', ['$parse', function ($parse) {
 return {
    restrict: 'A',
    scope: {
      matchTarget: '=',
    },
    require: 'ngModel',
    link: function link(scope, elem, attrs, ctrl) {
      var validator = function (value) {
        ctrl.$setValidity('match', value === scope.matchTarget);
        return value;
      }

      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.push(validator);

      // This is to force validator when the original password gets changed
      scope.$watch('matchTarget', function(newval, oldval) {
        validator(ctrl.$viewValue);
      });

    }
  };
}]);

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


function exitApp(){
  navigator.app.exitApp();
}

function logOut(){
  window.localStorage.removeItem('selectionData');
  window.localStorage.removeItem('loginData');
  alert("You have Logged Out.");
  window.location.href='../selectionScreen/selection.html';

}
