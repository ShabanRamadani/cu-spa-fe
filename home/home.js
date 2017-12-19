angular.module('home', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

angular.module('home').config(function ($stateProvider) {

    $stateProvider.state('cuSpaFe.home', {
        url: '/home',
        views: {
            'content': {
                templateUrl: 'home/home.html',
                controller: 'homeController',
                controllerAs: 'home',
                resolve: {}
            }
        },
        pageTitle: 'Home'
    });

}).controller('homeController', function ($log, $interval) {
    $log.info('Home controller is now loaded');
    var vm = this;
    vm.title = 'Current Time';

    $interval(function () {
        vm.date = moment().format('DD MMMM YYYY HH:mm:ss');
    }, 1000);

});

