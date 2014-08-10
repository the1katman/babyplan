"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'browserSupport', 'radioClass'])
        .controller('ScheduleLabAppointmentController',
                [ '$scope', 'localStorageService', 'browserSupportService', 'radioClassService',
                    function ($scope, localStorageService, browserSupportService, radioClassService) {

                        $scope.selectedDate = new Date("September 1, 2014 8:00");

                        var currentHighlightedDate;
                        var currentHighlightedTime;

                        var highlightedDateClass = 'today';
                        var highlightedTimeClass = 'now';

                        $scope.selectDate = function (day, month, year) {
                            updateSelectedDate(year, month, day);
                            updateDateHighlighting();
                        };

                        $scope.selectHour = function (hours) {
                            var selectedDate = $scope.selectedDate;
                            var selectedYear = selectedDate.getFullYear();
                            var selectedMonth = selectedDate.getMonth() + 1;
                            var selectedDateDate = selectedDate.getDate();
                            updateSelectedDate(selectedYear, selectedMonth, selectedDateDate, hours);
                            updateTimeHighlighting();
                        };

                        $scope.confirmAppointment = function () {
                            localStorageService.set('labAppointmentDate', $scope.selectedDate);
                        };

                        function updateSelectedDate(year, month, date, hours) {
                            if (!hours) {
                                hours = $scope.selectedDate.getHours();
                            }
                            $scope.selectedDate = new Date(year, month - 1, date, hours);
                        }

                        function updateDateHighlighting() {
                            var newHighlightedDate = $scope.selectedDate;
                            radioClassService.updateHighlight(getDateId, currentHighlightedDate, newHighlightedDate, highlightedDateClass);
                            currentHighlightedDate = newHighlightedDate;
                        }

                        function getDateId(date) {
                            var monthId = date.getMonth() + 1;
                            return date.getDate() + '-' + monthId + '-' + date.getFullYear();
                        }

                        function updateTimeHighlighting() {
                            var newHighlightedTime = $scope.selectedDate;
                            radioClassService.updateHighlight(getHoursId, currentHighlightedTime, newHighlightedTime, highlightedTimeClass);
                            currentHighlightedTime = newHighlightedTime;
                        }

                        function getHoursId(date) {
                            return date.getHours();
                        }

                        updateDateHighlighting();
                        updateTimeHighlighting();

                    } ]);
