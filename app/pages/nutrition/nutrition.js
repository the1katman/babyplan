"use strict";

//noinspection JSUnusedLocalSymbols
angular
        .module('BabyPlanApp', ['ngRoute', 'localStorage', 'browserSupport', 'patient', 'nutrition'])
        .directive('ngDelay', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                scope: true,
                compile: function (element, attributes) {
                    var expression = attributes['ngChange'];
                    if (expression) {
                        var ngModel = attributes['ngModel'];
                        if (ngModel) {
                            attributes['ngModel'] = '$parent.' + ngModel;
                        }
                        attributes['ngChange'] = '$$delay.execute()';
                    }

                    return {
                        post: function (scope, element, attributes) {
                            if (expression) {
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
                [ '$scope', '$routeParams', '$timeout', 'localStorageService', 'browserSupportService', 'patientService', 'nutritionService',
                    function ($scope, $routeParams, $timeout, localStorageService, browserSupportService, patientService, nutritionService) {

                        //noinspection JSUnresolvedVariable
                        var startWeek = initWeekAsNumber($routeParams.startWeek, 1);
                        //noinspection JSUnresolvedVariable
                        var endWeek = initWeekAsNumber($routeParams.endWeek, null);

                        $scope.weeks = initWeeks(startWeek, endWeek);
                        var ordinalTrimester = initOrdinalTrimester(startWeek);
                        $scope.ordinalTrimesterLabel = initOrdinalTrimesterLabel(ordinalTrimester);

                        $scope.age = patientService.getAge();

                        $scope.heightFeet = getCurrentHeightFeet();
                        $scope.heightInches = getCurrentHeightInches();

                        $scope.weightInPounds = patientService.getWeightInPounds();

                        // TODO DUPLICATION: figure out how to factor out the the xChanged() methods if possible
                        // to remove duplication

                        $scope.ageChanged = function () {
                            var newAge = $scope.age;
                            var isNewAgeValid = patientService.isValidAge(newAge);
                            var currentAge = patientService.getAge();
                            if (!isNewAgeValid) {
                                $scope.age = currentAge;
                            } else if (newAge !== currentAge) {
                                patientService.setAge(newAge);
                                $scope.age = newAge;
                                updateCaloriesPerDay();
                            }
                        };

                        $scope.heightFeetChanged = function () {
                            var newHeightFeet = Number($scope.heightFeet);
                            var isNewHeightFeetValid = patientService.isValidHeightForFeet(newHeightFeet);
                            var currentHeightFeet = getCurrentHeightFeet();
                            if (!isNewHeightFeetValid) {
                                $scope.heightFeet = currentHeightFeet;
                            } else if (newHeightFeet !== currentHeightFeet) {
                                patientService.setHeightInInches((newHeightFeet * 12) + getCurrentHeightInches());
                                $scope.heightFeet = newHeightFeet;
                                updateCaloriesPerDay();
                            }
                        };

                        $scope.heightInchesChanged = function () {
                            var newHeightInches = Number($scope.heightInches);
                            var isNewHeightInchesValid = patientService.isValidHeightForInches(newHeightInches);
                            var currentHeightInches = getCurrentHeightInches();
                            if (!isNewHeightInchesValid) {
                                $scope.heightInches = currentHeightInches;
                            } else if (newHeightInches !== currentHeightInches) {
                                patientService.setHeightInInches((getCurrentHeightFeet() * 12) + Number(newHeightInches));
                                $scope.heightInches = newHeightInches;
                                updateCaloriesPerDay();
                            }
                        };

                        $scope.weightInPoundsChanged = function () {
                            var newWeightInPounds = $scope.weightInPounds;
                            var isNewWeightValid = patientService.isValidWeightInPounds(newWeightInPounds);
                            var currentWeightInPounds = patientService.getWeightInPounds();
                            if (!isNewWeightValid) {
                                $scope.weightInPounds = currentWeightInPounds;
                            } else if (newWeightInPounds !== currentWeightInPounds) {
                                patientService.setWeightInPounds(newWeightInPounds);
                                $scope.weightInPounds = newWeightInPounds;
                                updateCaloriesPerDay();
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
                            var initOrdinalTrimester = 1;
                            if (startWeek > 12 && startWeek < 28) {
                                initOrdinalTrimester = 2;
                            } else if (startWeek > 27) {
                                initOrdinalTrimester = 3;
                            }
                            return initOrdinalTrimester;
                        }

                        function initOrdinalTrimesterLabel(ordinalTrimester) {
                            var ordinalTrimesterLabel = 'First';
                            if (ordinalTrimester === 2) {
                                ordinalTrimesterLabel = 'Second';
                            } else if (ordinalTrimester === 3) {
                                ordinalTrimesterLabel = 'Third';
                            }
                            return ordinalTrimesterLabel;
                        }

                        function getCurrentHeightFeet() {
                            return Math.floor(getCurrentHeightInInches() / 12);
                        }

                        function getCurrentHeightInInches() {
                            return patientService.getHeightInInches();
                        }

                        function getCurrentHeightInches() {
                            return getCurrentHeightInInches() % 12;
                        }

                        function updateCaloriesPerDay() {
                            var heightInInches = (Number($scope.heightFeet) * 12) + Number($scope.heightInches);
                            $scope.caloriesPerDay = nutritionService.getIdealCaloriesPerDay($scope.age, heightInInches, $scope.weightInPounds, ordinalTrimester);
                        }

                        updateCaloriesPerDay()

                    } ]);
