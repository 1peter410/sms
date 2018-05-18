var detailFeedbackControl = angular.module('detailFeedbackScreen',[]);

detailFeedbackControl.controller('detailFeedbackController', detailFeedbackController);


function detailFeedbackController($scope, $http, $window) {

  var loginData = JSON.parse(localStorage.getItem("loginData"));
  var selectionData = JSON.parse(localStorage.getItem("selectionData"));
  var recordData = JSON.parse(localStorage.getItem("recordDetails"));

  $scope.isDisabled = false;

  $scope.nameInput=recordData.RespondentName;
  $scope.socialInput=recordData.RespondentSocial;
  $scope.mobileInput=recordData.RespondentMobile;

  $scope.categorySelection;
  $scope.partnerSelection;

  $scope.remarkInput=recordData.EvangelismRemark;

  if(recordData.Q1){
    $scope.Q1 = {
     availableOptions: [
       {value: 'Not Clear'},
       {value: 'Neutral'},
       {value: 'Very Clear'},
     ],
     selectedOption: {value: recordData.Q1}
     };

     $scope.Q2 = {
      availableOptions: [
        {value: 'Yes'},
        {value: 'Neutral'},
        {value: 'No'},
      ],
      selectedOption: {value: recordData.Q2}
     };

     $scope.Q3 = {
      availableOptions: [
        {value: 'I rather not discuss about it'},
        {value: 'I am Neutral about it'},
        {value: 'I very interested to discuss about it'},
      ],
      selectedOption: {value: recordData.Q3}
     };

     $scope.Q4 = {
      availableOptions: [
        {value: 'Yes'},
        {value: 'No'},
      ],
      selectedOption: {value: recordData.Q4}
     };
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
  }



  $scope.commentInput=recordData.EvangelismComment;

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


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

            for (var go in $scope.categoryList){

              if(recordData.CategoryID==$scope.categoryList[go].CategoryID){
                $scope.categorySelection=$scope.categoryList[go];
              }
            }


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


  $scope.getUser = function() {

    $scope.isOnline = true;
    document.getElementById("checkOnline").innerHTML = "Loading...";

    $scope.isDisabled = true;

    $http({
        method: 'POST',
        data: {
          'teamID' : selectionData.TeamID,
          'userID' : loginData.UserID

         },
        url: 'https://flash-schedules.000webhostapp.com/getUser.php'
     }).then(function (response){

        if(response.data[0]!="GG"){

          $scope.partnerList=response.data;


                      for (var go in $scope.partnerList){

                        if(recordData.PartnerWith==$scope.partnerList[go].UserID){
                          $scope.partnerSelection=$scope.partnerList[go];
                        }
                      }

          $scope.isDisabled = false;

        }else{
          alert("No User from Database.");
          $scope.isDisabled = false;
        }

        $scope.isOnline = true;
        document.getElementById("checkOnline").innerHTML = "(Click on Text Box to Enter Data)";


     },function (error){
          alert("Please ensure You are connected to Internet.");
          document.getElementById("checkOnline").style.color = "red";
          document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Click Me to Refresh)";
          $scope.isOnline = false;
          $scope.isDisabled = false;

     });

  };


    $scope.editFeedback = function(){

      $scope.isOnline = true;
      $scope.isDisabled = true;
      document.getElementById("checkOnline").style.color = "black";
      document.getElementById("checkOnline").innerHTML = "Editing...";

      if($scope.partnerSelection){
        $scope.partnerWith=$scope.partnerSelection.UserID;
      }else{
        $scope.partnerWith='Holy Spirit';
      }

      if($scope.categorySelection){
        $scope.selectCategory=$scope.categorySelection.CategoryID;
      }



      if($scope.Q1.selectedOption==null){
        $scope.Q1="";
      }

      if($scope.Q2.selectedOption==null){
        $scope.Q2="";
      }

      if($scope.Q3.selectedOption==null){
        $scope.Q3="";
      }

      if($scope.Q4.selectedOption==null){
        $scope.Q4="";
      }



      $http({
          method: 'POST',
          data: {
            'evangelismID' : recordData.EvangelismID,
            'respondentName': $scope.nameInput,
            'respondentMobile': $scope.mobileInput,
            'respondentSocial': $scope.socialInput,
            'q1': $scope.Q1.selectedOption.value,
            'q2': $scope.Q2.selectedOption.value,
            'q3': $scope.Q3.selectedOption.value,
            'q4': $scope.Q4.selectedOption.value,
            'evangelismComment': $scope.commentInput,
            'partnerWith': $scope.partnerWith,
            'evangelismRemark': $scope.remarkInput,
            'categoryID': $scope.selectCategory

           },
          url: 'https://flash-schedules.000webhostapp.com/editFeedback.php'
       }).then(function (response){

          if(response.data[0]=="DONE"){

            alert("Edit Record Success.");
            $scope.isDisabled = false;
            window.localStorage.removeItem('recordDetails');
            window.location.href='../statisticRecordMaintenance/viewFeedback.html';

          }else{
            alert("Edit Feedback failed. Please Try Again.");
            document.getElementById("checkOnline").style.color = "red";
            document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
            $scope.isDisabled = false;
            $scope.isOnline = true;

          }


       },function (error){
            alert("Please ensure You are connected to Internet.");
            document.getElementById("checkOnline").style.color = "red";
            document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Edit Again)";
            $scope.isDisabled = false;
            $scope.isOnline = true;

       });



    }


    $scope.deleteFeedback = function(){

      $scope.isDisabled = true;
      $scope.isOnline = true;
      document.getElementById("checkOnline").style.color = "black";
      document.getElementById("checkOnline").innerHTML = "Deleting...";

      $http({
          method: 'POST',
          data: {
            'evangelismID' : recordData.EvangelismID,

           },
          url: 'https://flash-schedules.000webhostapp.com/deleteFeedback.php'
       }).then(function (response){

          if(response.data[0]=="DONE"){

            alert("Delete Record Success.");
            $scope.isDisabled = false;
            window.localStorage.removeItem('recordDetails');
            window.location.href='../statisticRecordMaintenance/viewFeedback.html';

          }else{
            alert("Delete Feedback failed. Please Try Again.");
            document.getElementById("checkOnline").style.color = "red";
            document.getElementById("checkOnline").innerHTML = "(Something Went Wrong - Try Again)";
            $scope.isDisabled = false;
            $scope.isOnline = true;

          }


       },function (error){
            alert("Please ensure You are connected to Internet.");
            $scope.isOnline = false;
            document.getElementById("checkOnline").style.color = "red";
            document.getElementById("checkOnline").innerHTML = "(No Internet Connection - Try Delete Again)";
            $scope.isDisabled = false;
            $scope.isOnline = true;


       });

    }


    $scope.backToView = function(){

      window.localStorage.removeItem('recordDetails');
      window.location.href='../statisticRecordMaintenance/viewFeedback.html';
    }

    $scope.goOnline = function(){

      if(!$scope.isOnline){
        window.location.href='../statisticRecordMaintenance/detailFeedback.html';
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
