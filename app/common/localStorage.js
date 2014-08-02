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
                            var value = localStorage.getItem(key);
                            if (value) {
                                try {
                                    value = JSON.parse(value);
                                } catch (e) {
                                    console.log('An exception was caught while trying to parse JSON from local storage [key=' + key + ', value=' + value + '].');
                                    value = null;
                                }
                            }
                            return value;
                        },
                        set: function (key, value) {
                            localStorage.setItem(key, JSON.stringify(value));
                        }
                    };
                } ]);
