"use strict";

angular
        .module('BabyPlanApp', ['localStorage'])
        .controller('FindObGynController',
                [ '$scope', 'localStorageService', function ($scope, localStorageService) {

                    $scope.selectDoctor = function (doctorFirstName, doctorLastName, doctorCredentials) {
                        localStorageService.set('doctorFirstName', doctorFirstName);
                        localStorageService.set('doctorLastName', doctorLastName);
                        localStorageService.set('doctorCredentials', doctorCredentials);
                    };

                } ]);
