var detailTargetControl = angular.module('detailTargetScreen',[]);

detailTargetControl.controller('detailTargetController', detailTargetController);

detailTargetControl.directive("ngConfirmClick", [
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


function detailTargetController($scope, $http, $window) {

  var selectionData = JSON.parse(localStorage.getItem("selectionData"));
  var targetData = JSON.parse(localStorage.getItem("targetDetails"));

  $scope.nameInput=targetData.UserName;
  $scope.targetInput=targetData.TargetCount;
  $scope.categorySelection;
  $scope.isDisabled = false;

  if(targetData.TargetStartDate){
    $scope.startDate = new Date(targetData.TargetStartDate);
    $scope.endDate = new Date(targetData.TargetEndDate);
  }else{
    $scope.startDate = "";
    $scope.endDate = "";
  }




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

          document.getElementById("categorySelection").disabled=false;

          $scope.categoryList=response.data;

          if(targetData.CategoryID!=''){

            for (var go in $scope.categoryList){

              if(targetData.CategoryID==$scope.categoryList[go].CategoryID){
                $scope.categorySelection=$scope.categoryList[go];
              }
            }

          }

          $scope.isDisabled = false;
          $scope.isOnline = true;
          document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Enter Data)";


        }else{
          alert("No Category is Created.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Category Created)";
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


  $scope.editTarget = function() {

    $scope.isOnline = true;
    $scope.isDisabled = true;
    document.getElementById("checkOnline").style.color = "black";
    document.getElementById("checkOnline").innerHTML = "Editing...";

    var curDate = new Date();

    if(new Date($scope.startDate) >= new Date($scope.endDate)){
      alert('End Date should be greater than start date.');
      $scope.isDisabled = false;
      document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Enter Data)";

    }else{

      $http({
          method: 'POST',
          data: {
            'targetID' : targetData.TargetID,
            'targetCount' : $scope.targetInput,
            'categoryID' : $scope.categorySelection.CategoryID,
            'startDate' : $scope.startDate,
            'endDate' : $scope.endDate,

           },
          url: 'https://flash-schedules.000webhostapp.com/editTarget.php',
          timeout : 10000,
       }).then(function (response){

          if(response.data[0]=="DONE"){

            alert("Successful Edit Target.");
            window.localStorage.removeItem('targetDetails');
            $window.location.href = '../targetMaintenance/viewTarget.html';


          }else{
            alert("Failed to Edit Target.");
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


    }





  };


  $scope.backToView = function(){

    window.localStorage.removeItem('targetDetails');
    window.location.href='../targetMaintenance/viewTarget.html';
  }


  $scope.goOnline = function(){

    if(!$scope.isOnline){
      window.location.href='../targetMaintenance/detailTarget.html';
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
