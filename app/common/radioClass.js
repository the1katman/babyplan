"use strict";

angular
        .module('radioClass', [])
        .factory('radioClassService',
                [ '$window', function ($window) {

                    function updateClassHighlighting(getHtmlIdFromModel, currentHighlightModel, newHighlightModel, highlightClassName) {
                        var initHighlightModel = currentHighlightModel;
                        if (!initHighlightModel) {
                            currentHighlightModel = newHighlightModel;
                        }
                        var currentHighlightedHtmlId = getHtmlIdFromModel(currentHighlightModel);

                        if (!initHighlightModel) {
                            // select the element class
                            toggleElementClass(currentHighlightedHtmlId, highlightClassName);
                        } else {
                            var newHighlightedHtmlId = getHtmlIdFromModel(newHighlightModel);
                            switchElementClass(currentHighlightedHtmlId, newHighlightedHtmlId, highlightClassName);
                        }
                    }

                    function toggleElementClass(htmlId, className) {
                        if (className) {
                            //noinspection JSUnresolvedVariable
                            $window.document.getElementById(htmlId).classList.toggle(className);
                        }
                    }

                    function switchElementClass(srcHtmlId, destHtmlId, className) {
                        if (className && srcHtmlId !== destHtmlId) {
                            toggleElementClass(srcHtmlId, className);
                            toggleElementClass(destHtmlId, className);
                        }
                    }

                    return {
                        updateHighlight: function (getHtmlIdFromModel, currentHighlightModel, newHighlightModel, highlightClassName) {
                            updateClassHighlighting(getHtmlIdFromModel, currentHighlightModel, newHighlightModel, highlightClassName);
                        }
                    };

                } ]);
