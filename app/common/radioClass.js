"use strict";

angular
        .module('radioClass', [])
        .factory('radioClassService',
                [ '$window', function ($window) {

                    function toggleElementClass(htmlId, className) {
                        if (className) {
                            //noinspection JSUnresolvedVariable
                            $window.document.getElementById(htmlId).classList.toggle(className);
                        }
                    }

                    return {
                        selectElementClass: function (htmlId, className) {
                            toggleElementClass(htmlId, className);
                        },
                        switchElementClass: function (srcHtmlId, destHtmlId, className) {
                            if (className && srcHtmlId !== destHtmlId) {
                                toggleElementClass(srcHtmlId, className);
                                toggleElementClass(destHtmlId, className);
                            }
                        }
                    };

                } ]);
