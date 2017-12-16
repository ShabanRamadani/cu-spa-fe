angular.module('home', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

angular.module('home').config(function ($stateProvider) {

    /* Add New States Above */

}).controller('homeController', function ($log, $interval) {
    $log.info('Home controller is now loaded');
    var vm = this;
    vm.title = 'Current Time';

    $interval(function () {
        vm.date = moment().format('DD MMM YYYY HH:mm:ss');
    }, 1000);

});

