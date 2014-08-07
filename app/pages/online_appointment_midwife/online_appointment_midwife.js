"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'firstLetterCapitalize'])
        .controller('OnlineAppointmentController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.midwifeFirstName = localStorageService.get('midwifeFirstName');
                    $scope.midwifeLastName = localStorageService.get('midwifeLastName');
                    $scope.midwifeCredentials = localStorageService.get('midwifeCredentials');

                    localStorageService.set('firstAppointmentDate', new Date().toJSON());

                } ]);
