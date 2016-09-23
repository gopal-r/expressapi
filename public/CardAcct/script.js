// Instantiate the app, the 'myCardAcctApp' parameter must match what is in ng-app
//myCardAcctApp is an Angular Module
//module() method -  declaration of the module with args as name of app, dependencies
var myCardAcctApp = angular.module('myCardAcctApp', [ 'ngCookies']);

//constant method sets to set up constants and can be used for environment configuration remembering that
// this has to be abstracted out for easy deployment and only publicly viewable config say publicly available
// dns, ip, s/b used
//Dev config
myCardAcctApp.constant('ENV_VARS', {
    baseUrl: '/api/',
    customerAcctsAPI: 'customer/cardaccts/'
});
//http://localhost:1337/api/ also works

// config method is a module method that registers an anon function 
// and injects provider objects http provider in this case
myCardAcctApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

// controller is a Module method registers CardAcct controller with the Module with 
// anonymous contructor function that creates the model ($scope and other dependencies injected to create model) 
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
    //call rest api to get customer card by posting a token in the body and an index in the query string. Not so vulnerable
    // This could not be get because the token will be compromised.
    // Issue with Cross Origin Resource Sharing caused me to pivot to a string input instead of JSON
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



