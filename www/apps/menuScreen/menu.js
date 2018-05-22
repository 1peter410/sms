var menuControl = angular.module('menuScreen',[]);

menuControl.controller('menuController', menuController);


function menuController($scope, $http, $window) {


  $scope.isOnline = false;
  var loginData = JSON.parse(localStorage.getItem("loginData"));

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    $scope.goOnline = function(){

      if(!$scope.isOnline){
        window.location.href='../menuScreen/menu.html';
      }

    }

    $scope.checkOnline = function() {

      $scope.isDisabled = true;
      $scope.isOnline = true;
      document.getElementById("checkOnline").innerHTML = "Loading...";

      document.getElementById("myDIV").style.opacity = "0.5";


        $http({
            method: 'POST',
            data: {
                'userID' : loginData.UserID,
                'userName' : loginData.UserName,
                'userStatus' : loginData.UserStatus,
                'userRole' : loginData.UserRole,
                'userPassword' : loginData.UserPassword,
                'userEmail' : loginData.UserEmail
            },
            url: 'https://flash-schedules.000webhostapp.com/checkAccount.php',
            timeout : 10000,
         }).then(function (response){

            if(response.data[0]!='GG'){
              $scope.isDisabled = false;
              $scope.isOnline = true;
              document.getElementById("myDIV").style.opacity = "1";
              document.getElementById("checkOnline").innerHTML = "(Menu Selection)";

            }else{
              window.localStorage.removeItem('approvalDetails');
              window.localStorage.removeItem('memberDetails');
              window.localStorage.removeItem('feedbackData');
              window.localStorage.removeItem('personalData');
              window.localStorage.removeItem('targetDetails');
              window.localStorage.removeItem('otherRecordDetails');
              window.localStorage.removeItem('recordDetails');
              window.localStorage.removeItem('cateogryDetails');
              window.localStorage.removeItem('selectionData');
              window.localStorage.removeItem('loginData');
              alert("Account Details Have Been Changed. Please Re-login.");
              window.location.href='../selectionScreen/selection.html';
            }


         },function (error){
           alert("Please ensure You are connected to a Good Internet Connection.");
              $scope.isOnline = false;
              $scope.isDisabled = true;
              document.getElementById("checkOnline").style.color = "red";
              document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
         });



      }


    $scope.editProfile = function() {
      window.location.href='../editProfileScreen/editProfile.html';
    }

    $scope.option = function() {
      window.localStorage.removeItem('feedbackData');
      window.localStorage.removeItem('personalData');
      window.location.href='../menuScreen/submitOption.html';
    }

    $scope.report = function() {

    }

    $scope.member = function() {
      window.location.href='../memberMaintenance/viewMember.html';
    }

    $scope.target = function() {
      window.location.href='../targetMaintenance/viewTarget.html';
    }

    $scope.other = function() {
      window.location.href='../otherRecordMaintenance/viewOtherRecord.html';
    }

    $scope.category = function() {
      window.location.href='../categoryMaintenance/viewCategory.html';
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

function exitApp(){
  navigator.app.exitApp();
}

function logOut(){

  window.localStorage.removeItem('feedbackData');
  window.localStorage.removeItem('personalData');
  window.localStorage.removeItem('targetDetails');
  window.localStorage.removeItem('otherRecordDetails');
  window.localStorage.removeItem('recordDetails');
  window.localStorage.removeItem('cateogryDetails');
  window.localStorage.removeItem('selectionData');
  window.localStorage.removeItem('loginData');
  alert("You have Logged Out.");
  window.location.href='../selectionScreen/selection.html';

}

function displayUserInfo() {
    var loginData = JSON.parse(localStorage.getItem("loginData"));

    if(loginData.UserRole!="Leader"){
      document.getElementsByName("leaderOnly")[0].setAttribute("class", "imageButton");
      document.getElementsByName("leaderOnly")[1].setAttribute("class", "imageButton");

    }

    document.getElementById("userNameSpan").innerHTML = loginData.UserName;
    document.getElementById("userTeamSpan").innerHTML = loginData.TeamName;
}
