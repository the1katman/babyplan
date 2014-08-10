"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'browserSupport'])
        .controller('BrowserSupportController',
                [ '$scope', 'localStorageService', 'browserSupportService',
                    function ($scope, localStorageService, browserSupportService) {
                    } ]);
