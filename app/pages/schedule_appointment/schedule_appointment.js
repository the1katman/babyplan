"use strict";

angular
        .module('BabyPlanApp', ['localStorage'])
        .controller('ScheduleAppointmentController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.selectDoctor = function (doctorLastName) {
                        localStorageService.set('doctorLastName', doctorLastName);
                    };

                } ]);
