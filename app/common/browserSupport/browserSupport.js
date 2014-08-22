"use strict";

angular
        .module('browserSupport', ['localStorage'])
        .factory('browserSupportService',
                [ '$window', 'localStorageService', function ($window, localStorageService) {

                    if (!localStorageService.isSupported() || isIELessThan11()) {
                        $window.location.href = "browser_config_not_supported.html";
                    }

                    // If document.documentMode is a number, then it is a read-only property, and so
                    // the browser is IE 8+.

                    // Otherwise, if conditional compilation works, then the browser is IE < 11.

                    // Otherwise, the browser is non-IE.

                    // TODO fix: this currently returns true for ie 11 as the browser.
                    function isIELessThan11() {
                        //noinspection JSUnusedAssignment
                        var isIELessThan11 = false;
                        var cachedDocumentMode = document.documentMode;

                        // try to set the document mode to the empty string
                        setDocumentMode('');

                        isIELessThan11 = typeof document.documentMode === 'number' || eval("/*@cc_on!@*/!1");
                        // reset the document mode for non-ie browsers
                        setDocumentMode(cachedDocumentMode);

                        return isIELessThan11;
                    }

                    function setDocumentMode(documentMode) {
                        try {
                            document.documentMode = documentMode;
                        } catch (e) {
                        }
                    }

                } ]);
