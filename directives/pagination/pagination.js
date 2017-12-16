angular.module('cuSpaFe').directive('cuPagination', function () {
    return {
        restrict: 'A',
        scope: {
            pagination: "=cuPagination",
            search: "&cuSearch"
        },
        templateUrl: 'directives/pagination/pagination.html'
    };
});
