angular.module('cuSpaFe').controller('userModalController', function (user, $uibModalInstance, $http, notificationService) {

    var vm = this;
    vm.isNew = !user;
    vm.user = vm.isNew ? {} : user;

    vm.save = function () {
        if (vm.isNew) {
            $http.post('http://localhost:8000/api/v1/users', vm.user).then(function () {
                notificationService.success('User created with success');
                vm.close();
            }, function (error) {
                notificationService.error(error);
            });
        } else {
            $http.put('http://localhost:8000/api/v1/users/' + vm.user.id, vm.user).then(function (response) {
                notificationService.success('User updated with success');
                vm.close();
            }, function (error) {
                notificationService.error(error);
            });
        }
    };

    vm.close = function () {
        $uibModalInstance.close();
    };

});
