"use strict";

//noinspection JSUnusedLocalSymbols
angular
        .module('BabyPlanApp', ['ngRoute', 'localStorage', 'browserSupport'])
        .directive('ngDelay', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                scope: true,
                compile: function (element, attributes) {
                    var expression = attributes['ngChange'];
                    if (!expression) {
                        return;
                    }

                    var ngModel = attributes['ngModel'];
                    if (ngModel) {
                        attributes['ngModel'] = '$parent.' + ngModel;
                    }
                    attributes['ngChange'] = '$$delay.execute()';

                    return {
                        post: function (scope, element, attributes) {
                            scope.$$delay = {
                                expression: expression,
                                delay: scope.$eval(attributes['ngDelay']),
                                execute: function () {
                                    var state = scope.$$delay;
                                    state.then = Date.now();
                                    $timeout(function () {
                                        if (Date.now() - state.then >= state.delay) {
                                            scope.$parent.$eval(expression);
                                        }
                                    }, state.delay);
                                }
                            };
                        }
                    }
                }
            };
        }])
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
                [ '$scope', '$routeParams', '$timeout', 'localStorageService', 'browserSupportService',
                    function ($scope, $routeParams, $timeout, localStorageService, browserSupportService) {

                        //noinspection JSUnresolvedVariable
                        var startWeek = initWeekAsNumber($routeParams.startWeek, 1);
                        //noinspection JSUnresolvedVariable
                        var endWeek = initWeekAsNumber($routeParams.endWeek, null);

                        $scope.weeks = initWeeks(startWeek, endWeek);
                        $scope.ordinalTrimester = initOrdinalTrimester(startWeek);

                        var age = 27;
                        $scope.ageModel = age;

                        var heightFeet = 5;
                        $scope.heightFeetModel = heightFeet;

                        var heightInches = 4;
                        $scope.heightInchesModel = heightInches;

                        var weightInPounds = 129;
                        $scope.weightInPoundsModel = weightInPounds;

                        // TODO DUPLICATION: figure out how to factor out the the xChanged() methods if possible
                        // to remove duplication

                        $scope.ageChanged = function () {
                            var ageModel = $scope.ageModel;
                            var isValidAge = ageModel
                                    && !isNaN(ageModel)
                                    && ageModel > 0
                                    && ageModel < 100;
                            var isSameAge = true;
                            if (!isValidAge) {
                                ageModel = age;
                            } else {
                                isSameAge = ageModel === age;
                            }
                            age = ageModel;
                            $scope.ageModel = ageModel;
                            if (isValidAge && !isSameAge) {
                                calculateCaloriesPerDay();
                            }
                        };

                        $scope.heightFeetChanged = function () {
                            var heightFeetModel = $scope.heightFeetModel;
                            var isValidFeet = heightFeetModel
                                    && !isNaN(heightFeetModel)
                                    && heightFeetModel > 0
                                    && heightFeetModel < 8;
                            var isSameHeightFeet = true;
                            if (!isValidFeet) {
                                heightFeetModel = heightFeet;
                            } else {
                                isSameHeightFeet = heightFeetModel === heightFeet;
                            }
                            heightFeet = heightFeetModel;
                            $scope.heightFeetModel = heightFeetModel;
                            if (isValidFeet && !isSameHeightFeet) {
                                calculateCaloriesPerDay();
                            }
                        };

                        $scope.heightInchesChanged = function () {
                            var heightInchesModel = $scope.heightInchesModel;
                            var isValidInches = heightInchesModel
                                    && !isNaN(heightInchesModel)
                                    && heightInchesModel >= 0
                                    && heightInchesModel <= 12;
                            var isSameHeightInches = true;
                            if (!isValidInches) {
                                heightInchesModel = heightInches;
                            } else {
                                isSameHeightInches = heightInchesModel === heightInches;
                            }
                            heightInches = heightInchesModel;
                            $scope.heightInchesModel = heightInchesModel;
                            if (isValidInches && !isSameHeightInches) {
                                calculateCaloriesPerDay();
                            }
                        };

                        $scope.weightInPoundsChanged = function () {
                            var weightInPoundsModel = $scope.weightInPoundsModel;
                            var isValidWeightInPounds = weightInPoundsModel
                                    && !isNaN(weightInPoundsModel)
                                    && weightInPoundsModel > 0
                                    && weightInPoundsModel < 1000;
                            var isSameWeightInPounds = true;
                            if (!isValidWeightInPounds) {
                                weightInPoundsModel = weightInPounds;
                            } else {
                                isSameWeightInPounds = weightInPoundsModel === weightInPounds;
                            }
                            weightInPounds = weightInPoundsModel;
                            $scope.weightInPoundsModel = weightInPoundsModel;
                            if (isValidWeightInPounds && !isSameWeightInPounds) {
                                calculateCaloriesPerDay();
                            }
                        };

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

                        function calculateCaloriesPerDay() {
                            var massInKg = Number(weightInPounds) / 2.2046;
                            var heightInCm = calcHeightInCm(heightFeet, heightInches);

                            // using Mifflin St Jeor equation
                            $scope.caloriesPerDay = (10 * massInKg) + (6.25 * heightInCm) - (5 * Number(age)) - 161;
                        }

                        function calcHeightInCm(heightFeet, heightInches) {
                            var totalInches = (Number(heightFeet) * 12) + Number(heightInches);
                            return totalInches * 2.54;
                        }

                        calculateCaloriesPerDay();

                    } ]);
