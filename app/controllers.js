(function () {
    'use strict';

    angular
            .module('chat')
            .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$mdDialog', 'ChatService', 'UserService'];
    function ChatController($scope, $mdDialog, ChatService, UserService) {
        var confirm;
        var user = {};
        var message = {};
        $scope.user = {name: '-', session: 'Não informado'};
        $scope.messages = [];
        $scope.store = store;

        if (UserService.logged()) {
            $scope.user = UserService.getUser();
        } else {
            confirm = $mdDialog.prompt()
                    .title('Informe seu nome')
                    .ariaLabel('Nome')
                    .ok('Confirmar');

            $mdDialog.show(confirm).then(function (name) {
                confirm = $mdDialog.prompt()
                        .title('Informe o ID da sessão')
                        .ariaLabel('ID')
                        .ok('Entrar')
                        .cancel('Nova sessão');

                $mdDialog.show(confirm).then(function (session) {
                    user = {name: name, session: session};
                    $scope.user = user;
                    UserService.login(user);
                    refresh();
                }, function () {
                    UserService.getSessionId(function (session) {
                        user = {name: name, session: session};
                        UserService.storeUser(user);
                        $scope.user = user;
                        refresh();
                    });
                });
            });

            function refresh() {
                setInterval(function () {
                    ChatService.index(function (messages) {
                        $scope.messages = messages;
                    });
                }, 2000);
            }


        }

        function store() {
            message = {text: $scope.chat.newMessage, user: $scope.user, date: new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString(), class: 'user'};
            ChatService.store(message, function () {
                $scope.chat.newMessage = '';
                $scope.messages.push(message);
            });
        }
    }

})();