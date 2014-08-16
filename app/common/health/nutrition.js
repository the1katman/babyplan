"use strict";

angular
        .module('nutrition', [])
        .factory('nutritionService',
                [ function () {

                    function getTrimesterAddition(ordinalTrimester) {
                        var trimesterAddtional = 0;

                        if (ordinalTrimester > 1) {
                            trimesterAddtional = 200;
                        }
                        if (ordinalTrimester > 2) {
                            trimesterAddtional += 190;
                        }

                        return trimesterAddtional;
                    }

                    return {
                        getIdealCaloriesPerDay: function (age, heightInInches, weightInPounds, ordinalTrimester) {
                            var massInKg = Number(weightInPounds) / 2.2046;
                            var heightInCm = Number(heightInInches) * 2.54;
                            // using Mifflin St Jeor equation
                            var result = (10 * massInKg) + (6.25 * heightInCm) - (5 * Number(age)) - 161;

                            var trimesterAddition = getTrimesterAddition(ordinalTrimester);

                            return result + trimesterAddition;
                        }
                    };

                } ]);
