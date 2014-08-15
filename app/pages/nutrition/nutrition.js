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

                        $scope.age = 27;
                        $scope.ageModel = $scope.age;

                        $scope.heightFeet = 5;
                        $scope.heightFeetModel = $scope.heightFeet;

                        $scope.heightInches = 4;
                        $scope.heightInchesModel = $scope.heightInches;

                        $scope.weightInPounds = 129;
                        $scope.weightInPoundsModel = $scope.weightInPounds;

                        // TODO DUPLICATION: figure out how to factor out the the xChanged() methods if possible
                        // to remove duplication

                        $scope.ageChanged = function () {
                            var ageModel = $scope.ageModel;
                            var isValidAge = ageModel
                                    && !isNaN(ageModel)
                                    && ageModel > 0
                                    && ageModel < 100;
                            if (!isValidAge) {
                                ageModel = $scope.age;
                            }
                            $scope.age = ageModel;
                            $scope.ageModel = ageModel;
                        };

                        $scope.heightFeetChanged = function () {
                            var heightFeetModel = $scope.heightFeetModel;
                            var isValidFeet = heightFeetModel
                                    && !isNaN(heightFeetModel)
                                    && heightFeetModel > 0
                                    && heightFeetModel < 8;
                            if (!isValidFeet) {
                                heightFeetModel = $scope.heightFeet;
                            }
                            $scope.heightFeet = heightFeetModel;
                            $scope.heightFeetModel = heightFeetModel;
                        };

                        $scope.heightInchesChanged = function () {
                            var heightInchesModel = $scope.heightInchesModel;
                            var isValidInches = heightInchesModel
                                    && !isNaN(heightInchesModel)
                                    && heightInchesModel >= 0
                                    && heightInchesModel <= 12;
                            if (!isValidInches) {
                                heightInchesModel = $scope.heightInches;
                            }
                            $scope.heightInches = heightInchesModel;
                            $scope.heightInchesModel = heightInchesModel;
                        };

                        $scope.weightInPoundsChanged = function () {
                            var weightInPoundsModel = $scope.weightInPoundsModel;
                            var isValidWeightInPounds = weightInPoundsModel
                                    && !isNaN(weightInPoundsModel)
                                    && weightInPoundsModel > 0
                                    && weightInPoundsModel < 1000;
                            if (!isValidWeightInPounds) {
                                weightInPoundsModel = $scope.weightInPounds;
                            }
                            $scope.weightInPounds = weightInPoundsModel;
                            $scope.weightInPoundsModel = weightInPoundsModel;
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

                    } ]);
