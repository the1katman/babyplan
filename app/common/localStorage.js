"use strict";

angular
        .module('localStorage', [])
        .factory('localStorageService',
                [ '$window', function ($window) {

                    //noinspection JSUnresolvedVariable
                    var localStorage = $window.localStorage;

                    var isLocalStorageSupported = initLocalStorageSupport();

                    function initLocalStorageSupport() {
                        var localStorageSupport = false;
                        if (localStorage) {
                            var test = 'test';
                            try {
                                localStorage.setItem(test, test);
                                localStorage.removeItem(test);
                                localStorageSupport = true;
                            } catch (e) {
                            }
                        }
                        return localStorageSupport;
                    }

                    return {
                        isSupported: function() {
                            return isLocalStorageSupported;
                        },
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
                        },
                        clear: function() {
                            localStorage.clear();
                        }
                    };
                } ]);
