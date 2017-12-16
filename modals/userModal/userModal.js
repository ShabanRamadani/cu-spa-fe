angular.module('cuSpaFe').controller('userModalController', function (user, $uibModalInstance, $http) {

    var vm = this;
    vm.isNew = !user;
    vm.user = vm.isNew ? {} : user;

    vm.save = function () {
        if (vm.isNew) {
            $http.post('http://localhost:8000/api/v1/users', vm.user).then(function () {
                vm.close();
            });
        } else {
            $http.put('http://localhost:8000/api/v1/users/' + vm.user.id, vm.user).then(function (response) {
                vm.close();
            });
        }
    };

    vm.close = function () {
        $uibModalInstance.close();
    }

});
