"use strict";

angular
        .module('BabyPlanApp', ['localStorage'])
        .controller('ScheduleLabAppointmentController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    var selectedYear = 2014;
                    var selectedMonth = 9;
                    var selectedDay = 1;
                    var selectedHours = 8;

                    $scope.selectDate = function (day, month, year) {
                        selectedYear = year;
                        selectedMonth = month;
                        selectedDay = day;
                        updateSelectedDate();
                    };

                    $scope.selectHour = function (hours) {
                        selectedHours = hours;
                        updateSelectedDate();
                    };

                    $scope.confirmAppointment = function() {
                        localStorageService.set('labAppointmentDate', $scope.selectedDate);
                    };

                    function updateSelectedDate() {
                        $scope.selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHours);
                    }

                    updateSelectedDate();

                } ]);
