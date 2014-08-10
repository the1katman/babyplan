"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'browserSupport', 'firstLetterCapitalize'])
        .controller('OnlineAppointmentController',
                [ '$scope', 'localStorageService', 'browserSupportService',
                    function ($scope, localStorageService, browserSupportService) {

                    $scope.midwifeFirstName = localStorageService.get('midwifeFirstName');
                    $scope.midwifeLastName = localStorageService.get('midwifeLastName');
                    $scope.midwifeCredentials = localStorageService.get('midwifeCredentials');

                    localStorageService.set('firstAppointmentDate', new Date().toJSON());

                } ]);
