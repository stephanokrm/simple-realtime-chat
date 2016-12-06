(function () {
    'use strict';

    angular.module('chat', [
        'ngMaterial',
        'ngAnimate',
        'LocalStorageModule',
        'ui.router'
    ]).config(ChatConfig);

    angular.module('chat').config(ThemingConfig);
    
    angular.module('chat').constant('ROUTE', 'http://localhost/Chat/server/server.php?route=');

    ChatConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    ThemingConfig.$inject = ['$mdThemingProvider'];

    function ChatConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider.
                state('chat', {
                    url: '/',
                    templateUrl: 'Chat/app/views/chat.html',
                    controller: 'ChatController'
                });
    }

    function ThemingConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
                .primaryPalette('light-blue', {
                    'default': '600'
                })
                .accentPalette('light-blue', {
                    'default': '700'
                });
    }
})();