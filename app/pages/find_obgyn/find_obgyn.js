"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'browserSupport'])
        .controller('FindObGynController',
                [ '$scope', 'localStorageService', 'browserSupportService',
                    function ($scope, localStorageService, browserSupportService) {

                        $scope.selectDoctor = function (doctorFirstName, doctorLastName, doctorCredentials) {
                            localStorageService.set('doctorFirstName', doctorFirstName);
                            localStorageService.set('doctorLastName', doctorLastName);
                            localStorageService.set('doctorCredentials', doctorCredentials);
                        };

                    } ]);
