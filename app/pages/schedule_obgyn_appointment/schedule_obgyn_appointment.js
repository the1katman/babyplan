"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'firstLetterCapitalize'])
        .controller('ScheduleObGynAppointmentController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.doctorFirstName = localStorageService.get('doctorFirstName');
                    $scope.doctorLastName = localStorageService.get('doctorLastName');
                    $scope.doctorCredentials = localStorageService.get('doctorCredentials');

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

                    $scope.confirmAppointment = function () {
                        localStorageService.set('babyAppointment2Date', $scope.selectedDate);
                    };

                    function updateSelectedDate() {
                        $scope.selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHours);
                    }

                    updateSelectedDate();

                } ]);
