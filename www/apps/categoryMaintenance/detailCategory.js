var detailCategoryControl = angular.module('detailCategoryScreen',[]);

detailCategoryControl.controller('detailCategoryController', detailCategoryController);


function detailCategoryController($scope, $http, $window) {

  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  var detailData = JSON.parse(localStorage.getItem("cateogryDetails"));

  $scope.isDisabled = false;
  $scope.CategoryID = detailData.CategoryID;
  $scope.nameInput = detailData.CategoryName;
  $scope.descInput = detailData.CategoryDesc;
  $scope.TeamID = detailData.TeamID;


  $scope.editCategorySubmit = function() {

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'categoryID' : $scope.CategoryID,
           'categoryName' : $scope.nameInput,
           'categoryDesc' : $scope.descInput,
           'teamID': $scope.TeamID
         },
         url: 'https://flash-schedules.000webhostapp.com/editCategory.php'
      }).then(function (response){


        if(response.data[0]=="DONE"){

          alert("Successful Edit Category.");
          window.localStorage.removeItem('cateogryDetails');
          $window.location.href = '../categoryMaintenance/viewCategory.html';

        }else if(response.data[0]=="NAME"){

          alert("Category Name is already used.");
          $scope.isDisabled = false;


        }else{
          alert("Edit Category Failed. Please try again.");
          $scope.isDisabled = false;
        }




      },function (error){
           alert("Please ensure You are connected to Internet.");
           $scope.isDisabled = false;
      });


  };

  $scope.deleteCategorySubmit = function() {

    $scope.isDisabled = true;

     $http({
         method: 'POST',
         data: {
           'categoryID' : $scope.CategoryID,
           'teamID': $scope.TeamID
         },
         url: 'https://flash-schedules.000webhostapp.com/deleteCategory.php'
      }).then(function (response){

        if(response.data[0]=="DONE"){

          alert("Successful Delete Category.");
          window.localStorage.removeItem('cateogryDetails');
          $window.location.href = '../categoryMaintenance/viewCategory.html';

        }else{
          alert("Delete Category Failed. Please try again.");
          $scope.isDisabled = false;
        }



      },function (error){
           alert("Please ensure You are connected to Internet.");
           $scope.isDisabled = false;
      });


  };


  $scope.backToView = function(){

    window.localStorage.removeItem('cateogryDetails');
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
