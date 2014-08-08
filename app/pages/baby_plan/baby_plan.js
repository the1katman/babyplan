"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'firstLetterCapitalize'])
        .controller('BabyPlanController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.appointmentsCategorySelected = true;
                    $scope.labsCategorySelected = true;
                    $scope.nutritionCategorySelected = false;

                    var firstAppointmentDate = getDateFromLocalStorage('firstAppointmentDate');
                    $scope.hadFirstAppointment = firstAppointmentDate !== null;
                    if ($scope.hadFirstAppointment) {
                        $scope.midwifeFirstName = localStorageService.get('midwifeFirstName');
                        $scope.midwifeLastName = localStorageService.get('midwifeLastName');
                        $scope.midwifeCredentials = localStorageService.get('midwifeCredentials');

                        $scope.firstAppointmentDate = firstAppointmentDate;
                    }

                    var labAppointmentDate = getDateFromLocalStorage('labAppointmentDate');
                    $scope.hasLabAppointmentDate = labAppointmentDate !== null;
                    if ($scope.hasLabAppointmentDate) {
                        $scope.labAppointmentDate = labAppointmentDate;
                    }

                    var babyAppointment2Date = getDateFromLocalStorage('babyAppointment2Date');
                    $scope.hasBabyAppointment2Date = babyAppointment2Date !== null;
                    if ($scope.hasBabyAppointment2Date) {
                        $scope.doctorFirstName = localStorageService.get('doctorFirstName');
                        $scope.doctorLastName = localStorageService.get('doctorLastName');
                        $scope.doctorCredentials = localStorageService.get('doctorCredentials');

                        $scope.babyAppointment2Date = babyAppointment2Date;
                    }

                    $scope.categorySelected = function () {
                        var selectedCategories = getSelectedCategories();
                        $scope.selectedCategories = getSelectedCategoriesString(selectedCategories);
                    };

                    $scope.resetPlan = function () {
                        localStorageService.clear();
                        $scope.hadFirstAppointment = false;
                    };

                    function getSelectedCategories() {
                        var selectedCategories = [];

                        if ($scope.appointmentsCategorySelected === true) {
                            selectedCategories.push("Appointments");
                        }
                        if ($scope.labsCategorySelected === true) {
                            selectedCategories.push("Labs");
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

                    function getDateFromLocalStorage(key) {
                        var date = localStorageService.get(key);
                        if (date) {
                            try {
                                date = new Date(date);
                            } catch (e) {
                                console.log('An exception was caught while trying to parse the date [' + date + '].');
                                date = null;
                            }
                        }

                        return date;
                    }

                    $scope.categorySelected();

                } ]);
