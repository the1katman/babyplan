"use strict";

var babyPlanApp = angular.module('BabyPlanApp', []);

babyPlanApp.controller('BabyPlanController', function ($scope) {

    $scope.showNutritionCategory = false;
    $scope.showAppointmentsCategory = false;

    $scope.selectCategory = function (selectedCategory) {
        if ('all' === selectedCategory) {
            $scope.showNutritionCategory = true;
            $scope.showAppointmentsCategory = true;
        } else {
            $scope.showNutritionCategory = 'nutrition' === selectedCategory;
            $scope.showAppointmentsCategory = 'appointments' === selectedCategory;
        }
    };

});
