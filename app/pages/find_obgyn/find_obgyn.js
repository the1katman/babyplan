"use strict";

angular
        .module('BabyPlanApp', ['localStorage'])
        .controller('ScheduleAppointmentController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.selectDoctor = function (doctorLastName) {
                        localStorageService.set('doctorFirstName', doctorFirstName);
                        localStorageService.set('doctorLastName', doctorLastName);
                        localStorageService.set('doctorCredentials', doctorCredentials);
                    };

                } ]);
