"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'browserSupport'])
        .controller('FindMidwifeController',
                [ '$scope', 'localStorageService', 'browserSupportService',
                    function ($scope, localStorageService, browserSupportService) {

                    $scope.selectMidwife= function (midwifeFirstName, midwifeLastName, credentials) {
                        localStorageService.set('midwifeFirstName', midwifeFirstName);
                        localStorageService.set('midwifeLastName', midwifeLastName);
                        localStorageService.set('midwifeCredentials', credentials);
                    };

                } ]);
