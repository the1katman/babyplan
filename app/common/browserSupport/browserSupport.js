"use strict";

angular
        .module('browserSupport', ['localStorage'])
        .factory('browserSupportService',
                [ '$window', 'localStorageService', function ($window, localStorageService) {

                    if (!localStorageService.isSupported()) {
                        $window.location.href = "browser_config_not_supported.html";
                    }

                } ]);
