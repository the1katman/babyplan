"use strict";

angular
        .module('BabyPlanApp', ['localStorage', 'browserSupport', 'firstLetterCapitalize'])
        .controller('OnlineAppointmentSummaryController',
                [ '$scope', 'localStorageService', 'browserSupportService',
                    function ($scope, localStorageService, browserSupportService) {

                        $scope.midwifeFirstName = localStorageService.get('midwifeFirstName');
                        $scope.midwifeLastName = localStorageService.get('midwifeLastName');
                        $scope.midwifeCredentials = localStorageService.get('midwifeCredentials');

                        var firstAppointmentDateString = localStorageService.get('firstAppointmentDate');
                        $scope.firstAppointmentDate = firstAppointmentDateString;

                        var firstAppointmentDate = new Date(firstAppointmentDateString);
                        var dueDate = new Date();
                        dueDate.setDate(firstAppointmentDate.getDate() + (7 * 32));

                        $scope.dueDate = dueDate;

                    } ]);
