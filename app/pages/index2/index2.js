var ngTestingApp = angular.module('ngTestingApp', [ 'appStorage' ]);

ngTestingApp
        .controller('AppStorageController',
                [ '$scope', '$window', 'appStorage', function ($scope, $window, appStorage) {
                    "use strict";

                    var appStorageInstance = appStorage('MyAppStorage', 'ngTestAppStorage', $scope);

                    $scope.clearAppStorage = function () {
                        appStorageInstance.clear();
                    };

                    $scope.reloadPage = function () {
                        if ($window.localStorage) {
                            $window.location.reload();
                        }
                    };
                } ]);

ngTestingApp
        .controller('OtherController',
                [ '$scope', 'appStorage', function ($scope, appStorage) {
                    "use strict";

                    appStorage('MyAppStorage', 'ngTestAppStorage', $scope);
                    $scope.ngTestAppStorage.options = $scope.ngTestAppStorage.options || [];
                } ]);