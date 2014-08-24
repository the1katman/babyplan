"use strict";

angular
        .module('patient', ['localStorage'])
        .factory('patientService',
                [ 'localStorageService', function (localStorageService) {

                    var ageKey = 'age';
                    var maxAge = 99;

                    var heightInInchesKey = 'heightInInches';
                    var maxHeightForFeet = 7;
                    var maxHeightForInches = 11;
                    var maxHeightInInches = maxHeightForFeet * 12 + maxHeightForInches;

                    var weightInPoundsKey = 'weightInPounds';
                    var maxWeightInPounds = 999;

                    function initAge(defaultAge) {
                        var age = getAge();
                        if (!age) {
                            setAge(defaultAge);
                        }
                    }

                    function isValidAge(age) {
                        return age
                                && !isNaN(age)
                                && age > 0
                                && age <= maxAge;
                    }

                    function getAge() {
                        return localStorageService.get(ageKey);
                    }

                    function setAge(newAge) {
                        if (isValidAge(newAge)) {
                            localStorageService.set(ageKey, newAge);
                        }
                    }

                    function initHeightInInches(defaultHeightInInches) {
                        var heightInInches = getHeightInInches();
                        if (!heightInInches) {
                            setHeightInInches(defaultHeightInInches);
                        }
                    }

                    function isValidHeightForFeet(heightForFeet) {
                        return heightForFeet
                                && !isNaN(heightForFeet)
                                && heightForFeet > 0
                                && heightForFeet <= maxHeightForFeet;
                    }

                    function isValidHeightForInches(heightForInches) {
                        return !isNaN(heightForInches)
                                && heightForInches >= 0
                                && heightForInches <= maxHeightForInches;
                    }

                    function getHeightInInches() {
                        return localStorageService.get(heightInInchesKey);
                    }

                    function setHeightInInches(newHeightInInches) {
                        if (newHeightInInches
                                && !isNaN(newHeightInInches)
                                && newHeightInInches > 0
                                && newHeightInInches <= maxHeightInInches) {
                            localStorageService.set(heightInInchesKey, newHeightInInches);
                        }
                    }

                    function initWeightInPounds(defaultWeightInPounds) {
                        var weightInPounds = getWeightInPounds();
                        if (!weightInPounds) {
                            setWeightInPounds(defaultWeightInPounds);
                        }
                    }

                    function isValidWeightInPounds(weightInPounds) {
                        return weightInPounds
                                && !isNaN(weightInPounds)
                                && weightInPounds > 0
                                && weightInPounds <= maxWeightInPounds;
                    }

                    function getWeightInPounds() {
                        return localStorageService.get(weightInPoundsKey);
                    }

                    function setWeightInPounds(newWeightInPounds) {
                        if (isValidWeightInPounds(newWeightInPounds)) {
                            localStorageService.set(weightInPoundsKey, newWeightInPounds);
                        }
                    }

                    function init() {
                        initAge(27);
                        initHeightInInches(64); // 5'4"
                        initWeightInPounds(129);
                    }

                    init();

                    return {
                        init: function () {
                            init();
                        },
                        isValidAge: function (age) {
                            return isValidAge(age);
                        },
                        getAge: function () {
                            return getAge();
                        },
                        setAge: function (newAge) {
                            setAge(newAge);
                        },
                        isValidHeightForFeet: function (feet) {
                            return isValidHeightForFeet(feet);
                        },
                        isValidHeightForInches: function (inches) {
                            return isValidHeightForInches(inches);
                        },
                        getHeightInInches: function () {
                            return getHeightInInches();
                        },
                        setHeightInInches: function (newHeightInInches) {
                            setHeightInInches(newHeightInInches);
                        },
                        isValidWeightInPounds: function (weightInPounds) {
                            return isValidWeightInPounds(weightInPounds);
                        },
                        getWeightInPounds: function () {
                            return getWeightInPounds();
                        },
                        setWeightInPounds: function (newWeightInPounds) {
                            setWeightInPounds(newWeightInPounds);
                        }
                    };

                } ]);
