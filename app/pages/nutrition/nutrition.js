"use strict";

//noinspection JSUnusedLocalSymbols
angular
        .module('BabyPlanApp', ['ngRoute', 'localStorage', 'browserSupport'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/',
                    {
                        templateUrl: "app/pages/nutrition/nutrition_app.html",
                        controller: "NutritionController"
                    })
                    .when('/weeks/:startWeek?/:endWeek?',
                    {
                        templateUrl: "app/pages/nutrition/nutrition_app.html",
                        controller: "NutritionController"
                    })
        })
        .controller('NutritionController',
                [ '$scope', '$routeParams', 'localStorageService', 'browserSupportService',
                    function ($scope, $routeParams, localStorageService, browserSupportService) {

                        //noinspection JSUnresolvedVariable
                        var startWeek = initWeekAsNumber($routeParams.startWeek, 1);
                        //noinspection JSUnresolvedVariable
                        var endWeek = initWeekAsNumber($routeParams.endWeek, null);

                        $scope.weeks = initWeeks(startWeek, endWeek);
                        $scope.ordinalTrimester = initOrdinalTrimester(startWeek);

                        function initWeekAsNumber(initWeek, defaultWeek) {
                            var week = initWeek;
                            if (!week || isNaN(week)) {
                                week = defaultWeek;
                            }
                            return week;
                        }

                        function initWeeks(startWeek, endWeek) {
                            var weeks = 'Week';

                            var showEndWeek = isValidEndWeek(endWeek, startWeek);
                            if (showEndWeek) {
                                weeks += "s";
                            }
                            weeks += ' ' + startWeek;
                            if (showEndWeek) {
                                weeks += ' - ' + endWeek;
                            }

                            return weeks;
                        }

                        function isValidEndWeek(endWeek, startWeek) {
                            return endWeek && Number(startWeek) < Number(endWeek);
                        }

                        function initOrdinalTrimester(startWeek) {
                            var ordinalTrimester = 'First';
                            if (startWeek > 12 && startWeek < 28) {
                                ordinalTrimester = 'Second';
                            } else if (startWeek > 27) {
                                ordinalTrimester = 'Third';
                            }
                            return ordinalTrimester;
                        }

                    } ]);
