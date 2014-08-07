"use strict";

angular
        .module('BabyPlanApp', ['localStorage'])
        .controller('FindMidwifeController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.selectMidwife= function (midwifeFirstName, midwifeLastName, credentials) {
                        localStorageService.set('midwifeFirstName', midwifeFirstName);
                        localStorageService.set('midwifeLastName', midwifeLastName);
                        localStorageService.set('midwifeCredentials', credentials);
                    };

                } ]);
