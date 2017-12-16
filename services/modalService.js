angular.module('cuSpaFe').service('modalService', function ($uibModal) {

    function getTemplate (title, bodyContent, showBothButtons) {
        return '<div class="modal-header">' +
            '<h3 class="modal-title" id="modal-title">' +
            title +
            '</h3>' +
            '</div>' +
            '<div class="modal-body" id="modal-body">' +
            bodyContent +
            '</div>' +
            '<div class="modal-footer">' +
            '<button class="btn btn-primary" type="button" ng-click="$close()">OK</button>' +
            '<button class="btn btn-warning" type="button" ng-click="$dismiss()" ng-if="' + showBothButtons + '">Cancel</button>' +
            '</div>';
    }

    return {
        modalConfirmation: function () {
            var title = 'Confirmation';
            var bodyContent = 'Are you sure you want to perform this operation?';
            var modalInstance = $uibModal.open({
                animation: true,
                template: getTemplate(title, bodyContent, true),
                size: 'md'
            });
            return modalInstance.result;
        },
        showInfo: function (info) {
            var title = 'Info';
            var modalInstance = $uibModal.open({
                animation: true,
                template: getTemplate(title, info),
                size: 'md'
            });
            return modalInstance.result;
        }
    };

});
