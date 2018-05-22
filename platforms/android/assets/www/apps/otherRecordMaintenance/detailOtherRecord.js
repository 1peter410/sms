var detailOtherRecordControl = angular.module('detailOtherRecordScreen',[]);

detailOtherRecordControl.controller('detailOtherRecordController', detailOtherRecordController);

detailOtherRecordControl.directive("ngConfirmClick", [
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

function detailOtherRecordController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));
  var otherRecordData = JSON.parse(localStorage.getItem("otherRecordDetails"));

  $scope.isDisabled = false;
  $scope.startDate = new Date(otherRecordData.OtherStartDate);
  $scope.endDate = new Date(otherRecordData.OtherEndDate);
  $scope.nameInput= otherRecordData.OtherName;
  $scope.categorySelection;
  $scope.reachOutInput=otherRecordData.OtherCount;
  $scope.remarkInput=otherRecordData.OtherRemark;

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.getCategory = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";


    $http({
        method: 'POST',
        data: {
          'teamID' : selectionData.TeamID
         },
        url: 'https://flash-schedules.000webhostapp.com/getCategory.php',
        timeout : 10000,
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.categoryList=response.data;

            for (var go in $scope.categoryList){

              if(otherRecordData.CategoryID==$scope.categoryList[go].CategoryID){
                $scope.categorySelection=$scope.categoryList[go];
              }
            }


          $scope.isOnline = true;
          document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Enter Data)";
          $scope.isDisabled = false;


        }else{
          alert("No Category is Created.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Category Created)";
          $scope.isOnline = true;
          $scope.isDisabled = false;


        }


     },function (error){
       alert("Please ensure You are connected to a Good Internet Connection.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
          $scope.isOnline = false;
          $scope.isDisabled = false;

     });

  };


  $scope.editOtherRecordSubmit = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Editing...";

    $http({
        method: 'POST',
        data: {
          'otherID' : otherRecordData.OtherID,
          'startDate' : $scope.startDate,
          'endDate' : $scope.endDate,
          'otherName' : $scope.nameInput,
          'categoryID' : $scope.categorySelection.CategoryID,
          'otherCount' : $scope.reachOutInput,
          'otherRemark' : $scope.remarkInput,
          'teamID' : selectionData.TeamID,
         },
        url: 'https://flash-schedules.000webhostapp.com/editOtherRecord.php',
        timeout : 10000,
     }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Edit Record.");
          window.localStorage.removeItem('otherRecordDetails');
          $window.location.href = '../otherRecordMaintenance/viewOtherRecord.html';


        }else if(response.data[0]=="DUPLICATED"){

          alert("This Record Details is already Created (Same Name and Same Category is already Exist).");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Event with Same Category Existed)";
          $scope.isOnline = true;
          $scope.isDisabled = false;


        }else{
          alert("Failed to Edit Record.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }


     },function (error){
       alert("Please ensure You are connected to a Good Internet Connection.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Edit Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;

     });



  };

  $scope.deleteOtherRecordSubmit = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Deleting...";

     $http({
         method: 'POST',
         data: {
           'otherID' : otherRecordData.OtherID,
           'teamID': selectionData.TeamID
         },
         url: 'https://flash-schedules.000webhostapp.com/deleteOtherRecord.php',
         timeout : 10000,
      }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Delete Record.");
          window.localStorage.removeItem('otherRecordDetails');
          $window.location.href = '../otherRecordMaintenance/viewOtherRecord.html';

        }else{
          alert("Delete Record Failed. Please try again.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
          $scope.isOnline = true;
          $scope.isDisabled = false;
        }



      },function (error){
        alert("Please ensure You are connected to a Good Internet Connection.");
           $scope.isOnline = true;
           document.getElementById("checkOnline").style.color = "red";
           document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Delete Again)";
           $scope.isDisabled = false;
      });


  };


  $scope.backToView = function(){

    window.localStorage.removeItem('otherRecordDetails');
    window.location.href='../otherRecordMaintenance/viewOtherRecord.html';
  }

  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../otherRecordMaintenance/detailOtherRecord.html';
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
