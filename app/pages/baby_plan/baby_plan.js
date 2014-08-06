"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'firstLetterCapitalize'])
        .controller('BabyPlanController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.appointmentsCategorySelected = true;
                    $scope.nutritionCategorySelected = false;

                    var firstAppointmentDate = getFirstAppointmentDate();
                    $scope.hadFirstAppointment = firstAppointmentDate !== null;
                    if ($scope.hadFirstAppointment) {
                        $scope.doctorLastName = localStorageService.get('doctorLastName');
                        $scope.firstAppointmentDate = firstAppointmentDate;
                    }

                    $scope.categorySelected = function () {
                        var selectedCategories = getSelectedCategories();
                        $scope.selectedCategories = getSelectedCategoriesString(selectedCategories);
                    };

                    $scope.resetPlan = function() {
                        localStorageService.clear();
                        $scope.hadFirstAppointment = false;
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

                    function getFirstAppointmentDate() {
                        var firstAppointmentDate = localStorageService.get('firstAppointmentDate');
                        if (firstAppointmentDate) {
                            try {
                                firstAppointmentDate = new Date(firstAppointmentDate);
                            } catch (e) {
                                console.log('An exception was caught while trying to parse the first appointment date [' + firstAppointmentDate + '].');
                                firstAppointmentDate = null;
                            }
                        }

                        return firstAppointmentDate;
                    }

                    $scope.categorySelected();

                } ]);
