var ngTestingApp = angular.module('ngTestingApp', [ 'appStorage' ]);

ngTestingApp
        .controller('AppStorageController',
                [ '$scope', '$window', 'localStorageService', function ($scope, $window, localStorageService) {
                    "use strict";

                    $scope.clearAppStorage = function () {
                        localStorageService.clear();
                    };

                    $scope.reloadPage = function () {
                        if ($window.localStorage) {
                            $window.location.reload();
                        }
                    };
                } ]);

ngTestingApp
        .controller('OtherController',
                [ '$scope', function ($scope) {
                    "use strict";
                    $scope.ngTestAppStorage.options = $scope.ngTestAppStorage.options || [];
                } ]);