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

                        var highlightedClass = 'today';

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
                                radioClassService.selectElementClass(currentHighlightedDateId, highlightedClass);
                            } else {
                                var newHighlightedDateId = selectedDate + '-' + selectedMonth + '-' + selectedYear;
                                radioClassService.switchElementClass(currentHighlightedDateId, newHighlightedDateId, highlightedClass);
                                currentHighlightedDate = $scope.selectedDate;
                            }
                        }

                        updateSelectedDate();
                        updateCalendarHighlighting();

                    } ]);
