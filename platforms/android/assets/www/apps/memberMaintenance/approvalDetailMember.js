var approvalDetailMemberControl = angular.module('approvalDetailMemberScreen',[]);

approvalDetailMemberControl.controller('approvalDetailMemberController', approvalDetailMemberController);

approvalDetailMemberControl.directive("ngConfirmClick", [
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

function approvalDetailMemberController($scope, $http, $window) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  var approvalData = JSON.parse(localStorage.getItem("approvalDetails"));

  $scope.nameInput = approvalData.UserName;
  $scope.emailInput = approvalData.UserEmail;
  $scope.mobileInput = approvalData.UserMobile;
  $scope.socialInput = approvalData.UserSocial;


  $scope.isDisabled = false;
  $scope.isOnline = false;


  $scope.rejectMemberSubmit = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Rejecting...";

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'userID': approvalData.UserID
         },
         url: 'https://flash-schedules.000webhostapp.com/rejectMember.php'
      }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Successful Reject Member.");
          window.localStorage.removeItem('approvalDetails');
          $window.location.href = '../memberMaintenance/approvalMember.html';

        }else{
          alert("Reject Member Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isDisabled = false;
        }


      },function (error){
           alert("Please ensure You are connected to Internet.");
           document.getElementById("checkOnline").style.color = "red";
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Reject Again)";
           $scope.isOnline = true;
           $scope.isDisabled = false;
      });


  };

  $scope.approveMemberSubmit = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Approving...";

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'userID': approvalData.UserID
         },
         url: 'https://flash-schedules.000webhostapp.com/activeMember.php'
      }).then(function (response){

        if(response.data[0]=="DONE"){
          alert("Successful Approve Member.");
          window.localStorage.removeItem('approvalDetails');
          $window.location.href = '../memberMaintenance/approvalMember.html';

        }else{
          alert("Approve Member Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isDisabled = false;
        }


      },function (error){
           alert("Please ensure You are connected to Internet.");
           document.getElementById("checkOnline").style.color = "red";
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Approve Again)";
           $scope.isOnline = true;
           $scope.isDisabled = false;
      });


  };



  $scope.backToView = function(){

    window.localStorage.removeItem('memberDetails');
    window.location.href='../memberMaintenance/approvalMember.html';
  }


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../memberMaintenance/approvalDetailMember.html';
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
