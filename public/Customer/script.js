// Instantiate the app, the 'myCustApp' parameter must match what is in ng-app
var myCustApp = angular.module('myCustApp', ['ngResource','ngCookies']);

//Dev config
myCustApp.constant('ENV_VARS', {
    baseUrl: '/api/',
    customerAPI: 'customer/'
});
//http://localhost:1337/api/ also works


myCustApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

// Create the controller, the 'CustAuth' parameter must match an ng-controller directive
myCustApp.controller('Cust', function ($scope, $location, $window, $cookieStore, $sce, $http, ENV_VARS) {
    $scope.token = $cookieStore.get('tkn');
    $scope.screen_name = $cookieStore.get('sn');
    //Validate token - returns cust if token valid.   
    var data = { "screen_name": "", "token": "" };
    data.screen_name = $scope.screen_name;
    data.token = $scope.token;

    $http.post(ENV_VARS.baseUrl + ENV_VARS.customerAPI,
        ';;;' + data.screen_name + ';;;' + data.token + ';;;',
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }
    ).success(function (response) {
        $scope.cust = response;
    }).error(function (response) {
        $scope.Dbg = response;
    });


    $scope.change_src = function (indx) {
        $scope.card_url = $sce.trustAsResourceUrl($location.path() + "/CardAcct/Index.html?indx=" + indx+ "&dt" + Date.now());        
    };
})

myCustApp.filter('isArray', function () {
    return function (input) {
        return angular.isArray(input);
    }
});
myCustApp.filter('isLink', function () {
    return function (input) {
        return input.startsWith("http");
    }
});
angular.element(window.document.body).ready(function () {
    window.document.getElementById('tm').innerHTML = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
});



