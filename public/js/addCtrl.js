/**
 * Created by ayush on 14/6/16.
 */
var addCtrl = angular.module('addCtrl', ['geolocation','gservice']);
addCtrl.controller('addCtrl', function($scope, $http,$rootScope, geolocation,gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0

    // Functions
    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            cosole.log($scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3));
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
        });
    });

    $scope.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";
                $scope.formData.latitude="";
                $scope.formData.longitude="";
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});