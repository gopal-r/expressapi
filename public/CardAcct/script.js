// Instantiate the app, the 'myCardAcctApp' parameter must match what is in ng-app
var myCardAcctApp = angular.module('myCardAcctApp', ['ngResource', 'ngCookies']);

//Dev config
myCardAcctApp.constant('ENV_VARS', {
    baseUrl: '/api/',
    customerAcctsAPI: 'customer/cardaccts/'
});
//http://localhost:1337/api/ also works


myCardAcctApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

// Create the controller, the 'CustAuth' parameter must match an ng-controller directive
myCardAcctApp.controller('CardAcct', function ($scope, $location, $window, $cookieStore,$http, ENV_VARS) {
    $scope.token = $cookieStore.get('tkn');
    $scope.screen_name = $cookieStore.get('sn');
    $scope.crdindx = 0;
    if (window.location.search.indexOf("&")<0)
    { $scope.crdindx = window.location.search.split("=")[1]; }
    else
    { $scope.crdindx = window.location.search.split("&")[0].split("=")[1]; }
    //Validate token - returns cust if token valid.  
    var data = { "screen_name": "", "token": "" };
    data.screen_name = $scope.screen_name;
    data.token = $scope.token;

    $http.post(ENV_VARS.baseUrl + ENV_VARS.customerAcctsAPI + $scope.crdindx,
        ';;;' + data.screen_name + ';;;' + data.token + ';;;',
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }
    ).success(function (response) {
        $scope.cardacct = response;
    }).error(function (response) {
        $scope.Dbg = response;
    });
})

myCardAcctApp.filter('isArray', function () {
    return function (input) {
        return angular.isArray(input);
    }
});
myCardAcctApp.filter('isLink', function () {
    return function (input) {
        return input.startsWith("http");
    }
});

angular.element(window.document.body).ready(function () {
    window.document.getElementById('tm').innerHTML = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
});



