"use strict";

angular
        .module('localStorage', [])
        .factory('localStorageService',
                [ '$window', function ($window) {

                    //noinspection JSUnresolvedVariable
                    var localStorage = $window.localStorage;

                    if (!localStorage) {
                        throw new Error('Could not find suitable storage');
                    }

                    return {
                        get: function (key) {
                            var valueString = localStorage.getItem(key);
                            var value = {};
                            try {
                                value = valueString ? JSON.parse(valueString) : {};
                            }
                            catch (e) {
                                console.log('Parse error for localStorage ' + key);
                            }
                            return value;
                        },
                        set: function (key, value) {
                            localStorage.setItem(name, JSON.stringify(value));
                        }
                    };
                } ]);
