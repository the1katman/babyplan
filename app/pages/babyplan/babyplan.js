"use strict";

var babyPlanApp = angular.module('BabyPlanApp', []);

babyPlanApp.controller('BabyPlanController', function ($scope) {

    $scope.appointmentsCategorySelected = true;
    $scope.nutritionCategorySelected = false;

    $scope.categorySelected = function () {
        var selectedCategories = getSelectedCategories();
        $scope.selectedCategories = getSelectedCategoriesString(selectedCategories);
    };

    function getSelectedCategories() {
        var selectedCategories = [];

        if ($scope.appointmentsCategorySelected === true) {
            selectedCategories.push("Appointments");
        }
        if ($scope.nutritionCategorySelected === true) {
            selectedCategories.push("Nutrition");
        }

        return selectedCategories;
    }

    function getSelectedCategoriesString(selectedCategories) {
        var selectedCategoriesString = '';

        var numCategories = selectedCategories.length;
        if (numCategories > 0) {
            var isFirst = true;
            for (var i = 0; i < numCategories; i++) {
                if (!isFirst) {
                    selectedCategoriesString += ", ";
                } else {
                    isFirst = false;
                }
                selectedCategoriesString += selectedCategories[i];
            }
        }

        return selectedCategoriesString;
    }

    $scope.categorySelected();

});
