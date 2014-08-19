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
                        dueDate.setDate(firstAppointmentDate.getDate() + (7 * 36));
                        $scope.dueDate = dueDate;

                        var babyAppointment2Date = localStorageService.get('babyAppointment2Date');
                        $scope.hasBabyAppointment2Date = babyAppointment2Date !== null;
                        if ($scope.hasBabyAppointment2Date) {
                            $scope.doctorFirstName = localStorageService.get('doctorFirstName');
                            $scope.doctorLastName = localStorageService.get('doctorLastName');
                            $scope.doctorCredentials = localStorageService.get('doctorCredentials');

                            $scope.babyAppointment2Date = babyAppointment2Date;
                        }

                        var labAppointmentDate = localStorageService.get('labAppointmentDate');
                        $scope.hasLabAppointmentDate = labAppointmentDate !== null;
                        if ($scope.hasLabAppointmentDate) {
                            $scope.labAppointmentDate = labAppointmentDate;
                        }

                    } ]);
