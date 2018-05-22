var detailMemberControl = angular.module('detailMemberScreen',[]);

detailMemberControl.controller('detailMemberController', detailMemberController);

detailMemberControl.directive("ngConfirmClick", [
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

function detailMemberController($scope, $http, $window) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  var memberData = JSON.parse(localStorage.getItem("memberDetails"));

  $scope.nameInput = memberData.UserName;
  $scope.emailInput = memberData.UserEmail;
  $scope.mobileInput = memberData.UserMobile;
  $scope.socialInput = memberData.UserSocial;
  $scope.roleInput = memberData.UserRole;
  $scope.passwordInput = memberData.UserPassword;

  $scope.isDisabled = false;
  $scope.isOnline = false;

  $scope.editMemberSubmit = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Editing...";

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'userName' : $scope.nameInput,
           'userEmail' : $scope.emailInput,
           'userSocial' : $scope.socialInput,
           'userMobile' : $scope.mobileInput,
           'userPassword' :  $scope.passwordInput,
           'userRole' : $scope.roleInput,
           'userID': memberData.UserID
         },
         url: 'https://flash-schedules.000webhostapp.com/editMember.php',
         timeout : 10000,
      }).then(function (response){


        if(response.data[0]=="DONE"){

          alert("Successful Edit Member.");
          window.localStorage.removeItem('cateogryDetails');
          $window.location.href = '../memberMaintenance/viewMember.html';

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
          alert("Edit Member Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }


      },function (error){
        alert("Please ensure You are connected to a Good Internet Connection.");
           document.getElementById("checkOnline").style.color = "red";
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Edit Again)";
           $scope.isOnline = false;
           $scope.isDisabled = false;
      });


  };


  $scope.deactiveMemberSubmit = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Deactiving...";

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'userID': memberData.UserID
         },
         url: 'https://flash-schedules.000webhostapp.com/deactiveMember.php',
         timeout : 10000,
      }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Successful Deactive Member.");
          window.localStorage.removeItem('memberDetails');
          $window.location.href = '../memberMaintenance/viewMember.html';

        }else{
          alert("Deactive Member Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isDisabled = false;
        }


      },function (error){
        alert("Please ensure You are connected to a Good Internet Connection.");
           document.getElementById("checkOnline").style.color = "red";
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Deactive Again)";
           $scope.isOnline = true;
           $scope.isDisabled = false;
      });


  };

  $scope.activeMemberSubmit = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Activating...";

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'userID': memberData.UserID
         },
         url: 'https://flash-schedules.000webhostapp.com/activeMember.php',
         timeout : 10000,
      }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Successful Activate Member.");
          window.localStorage.removeItem('memberDetails');
          $window.location.href = '../memberMaintenance/viewMember.html';

        }else{
          alert("Activate Member Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isDisabled = false;
        }


      },function (error){
        alert("Please ensure You are connected to a Good Internet Connection.");
           document.getElementById("checkOnline").style.color = "red";
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Activate Again)";
           $scope.isOnline = true;
           $scope.isDisabled = false;
      });


  };



  $scope.backToView = function(){

    window.localStorage.removeItem('memberDetails');
    window.location.href='../memberMaintenance/viewMember.html';
  }


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../memberMaintenance/detailMember.html';
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
      document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Edit)";

      if(memberData.UserStatus=='Active'){
        document.getElementById('activeBtn').style.visibility = 'hidden';
      }else if(memberData.UserStatus=='Deactivate'){
        document.getElementById('deactiveBtn').style.visibility = 'hidden';
        document.getElementById('editBtn').style.visibility = 'hidden';
      }

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
