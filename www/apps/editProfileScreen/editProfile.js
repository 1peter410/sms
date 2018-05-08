var editProfileControl = angular.module('profileScreen',[]);

editProfileControl.controller('editProfileController', editProfileController);


function editProfileController($scope, $http, $window) {

  $scope.socialInput = '';
  $scope.oldPasswordInput = '';
  $scope.newPasswordInput = '';
  $scope.retypePasswordInput ='';
  $scope.isDisabled = false;

  $scope.editInfoSubmit = function() {

    $scope.isDisabled = true;

  }

  $scope.changePasswordSubmit = function() {

    $scope.isDisabled = true;

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
  window.localStorage.removeItem('loginData');
  alert("You have Logged Out.");
  window.location.href='../loginScreen/login.html';

}
