"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'firstLetterCapitalize'])
        .controller('OnlineAppointmentController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.doctorLastName = localStorageService.get('doctorLastName');

                    localStorageService.set('firstAppointmentDate', new Date().toJSON());

                } ]);
