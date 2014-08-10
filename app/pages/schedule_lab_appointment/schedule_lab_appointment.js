"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'browserSupport', 'radioClass'])
        .controller('ScheduleLabAppointmentController',
                [ '$scope', 'localStorageService', 'browserSupportService', 'radioClassService',
                    function ($scope, localStorageService, browserSupportService, radioClassService) {

                        var selectedYear = 2014;
                        var selectedMonth = 9;
                        var selectedDate = 1;
                        var selectedHours = 8;

                        var currentHighlightedDate;
                        var currentHighlightedTime;

                        var highlightedDateClass = 'today';
                        var highlightedTimeClass = 'now';

                        $scope.selectDate = function (day, month, year) {
                            selectedYear = year;
                            selectedMonth = month;
                            selectedDate = day;
                            updateSelectedDate();
                            updateCalendarHighlighting();
                        };

                        $scope.selectHour = function (hours) {
                            selectedHours = hours;
                            updateSelectedDate();
                            updateTimeHighlighting();
                        };

                        $scope.confirmAppointment = function () {
                            localStorageService.set('labAppointmentDate', $scope.selectedDate);
                        };

                        function updateSelectedDate() {
                            currentHighlightedDate = $scope.selectedDate;
                            $scope.selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDate, selectedHours);
                        }

                        function updateCalendarHighlighting() {
                            var initHighlightedDate = currentHighlightedDate;
                            if (!initHighlightedDate) {
                                currentHighlightedDate = $scope.selectedDate;
                            }
                            var currentHighlightedMonthId = currentHighlightedDate.getMonth() + 1;
                            var currentHighlightedDateId = currentHighlightedDate.getDate() + '-' + currentHighlightedMonthId + '-' + currentHighlightedDate.getFullYear();

                            if (!initHighlightedDate) {
                                radioClassService.selectElementClass(currentHighlightedDateId, highlightedDateClass);
                            } else {
                                var newHighlightedDateId = selectedDate + '-' + selectedMonth + '-' + selectedYear;
                                radioClassService.switchElementClass(currentHighlightedDateId, newHighlightedDateId, highlightedDateClass);
                                currentHighlightedDate = $scope.selectedDate;
                            }
                        }

                        function updateTimeHighlighting() {
                            var initHighlightedTime = currentHighlightedTime;
                            if (!initHighlightedTime) {
                                currentHighlightedTime = $scope.selectedDate;
                            }
                            var currentHighlightedTimeId = currentHighlightedTime.getHours();

                            if (!initHighlightedTime) {
                                radioClassService.selectElementClass(currentHighlightedTimeId, highlightedTimeClass);
                            } else {
                                radioClassService.switchElementClass(currentHighlightedTimeId, selectedHours, highlightedTimeClass);
                                currentHighlightedTime = $scope.selectedDate;
                            }
                        }

                        updateSelectedDate();
                        updateCalendarHighlighting();
                        updateTimeHighlighting();

                    } ]);
