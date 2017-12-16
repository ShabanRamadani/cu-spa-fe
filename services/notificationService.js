function notificationService (toaster, $filter) {
    var infoTitle = 'Info';
    var successTitle = 'Success';
    var warningTitle = 'Warning';
    var errorTitle = 'Error';
    var unexpectedError = 'Unexpected error occurred';
    var notAuthorized = 'Not authorized';
    var notFound = 'Not found';
    var validationError = 'Validation error';
    var internalServerError = 'Internal server error';

    function info (message) {
        toaster.pop('info', infoTitle, message);
    }

    function success (message) {
        toaster.pop('success', successTitle, message);
    }

    function warning (message) {
        toaster.pop('warning', warningTitle, message);
    }

    function showError (message, title) {
        toaster.pop('error', title, message);
    }

    function errorToaster (error) {
        try {
            var message = '';
            if (typeof error === 'string') {
                message = error;
                showError(message, errorTitle);
            } else {
                if (error.data) {
                    error = error.data;
                }
                var err = error.error;
                if (typeof err.message === 'string') {
                    // message = err.message;
                    showError(err.message, getTitle(err.http_code));
                } else {
                    angular.forEach(err.message, function (value) {
                        angular.forEach(value, function (val) {
                            showError(val, getTitle(err.http_code));
                        });
                    });
                }
            }
        }
        catch (e) {
            showError(unexpectedError, getTitle(500));
        }
    }

    function getTitle (httpStatusCode) {
        switch (httpStatusCode) {
            case 401:
                return notAuthorized;
            case 404:
                return notFound;
            case 400:
                return validationError;
            case 500:
                return internalServerError;
            default:
                return internalServerError;
        }
    }

    return {
        info: info,
        success: success,
        warning: warning,
        error: errorToaster
    };

}

angular.module('cuSpaFe')
    .service('notificationService', notificationService);
