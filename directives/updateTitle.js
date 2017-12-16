angular.module('cuSpaFe')
    .directive('updateTitle', ['$rootScope', '$timeout',
        function ($rootScope, $timeout) {
            return {
                link: function (scope, element) {

                    var listener = function (event, toState) {

                        var title = 'Commit University';
                        if (toState && toState.pageTitle) {
                            title = 'Commit University - ' + toState.pageTitle;
                        }

                        $timeout(function () {
                            element.text(title);
                        }, 0, false);
                    };

                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            };
        }
    ]);
