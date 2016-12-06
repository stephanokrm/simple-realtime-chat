(function () {
    'use strict';

    angular
            .module('chat')
            .factory('ChatService', ChatService);

    ChatService.$inject = ['$http', 'ROUTE'];
    function ChatService($http, ROUTE) {
        var service = {
            index: index,
            store: store
        };

        return service;

        function index(success) {
            $http.get(ROUTE + 'ChatController@index').success(function (messages) {
                success(messages);
            });
        }

        function store(message, success) {
            $http.post(ROUTE + 'ChatController@store', message).success(function () {
                success();
            });
        }

    }

    angular
            .module('chat')
            .factory('UserService', UserService);

    UserService.$inject = ['$http', 'localStorageService', 'ROUTE'];
    function UserService($http, localStorageService, ROUTE) {
        var service = {
            logged: logged,
            login: login,
            getUser: getUser,
            storeUser: storeUser,
            getSessionId: getSessionId
        };

        return service;

        function logged() {
            return localStorageService.get('user') ? true : false;
        }

        function login(user) {
            storeUser(user);
            $http.post(ROUTE + 'UserController@login', user);
        }

        function getUser() {
            return localStorageService.get('user');
        }

        function storeUser(user) {
            localStorageService.set('user', user);
        }

        function getSessionId(success) {
            $http.get(ROUTE + 'UserController@sessionId').success(function (id) {
                success(id);
            });
        }

    }
})();