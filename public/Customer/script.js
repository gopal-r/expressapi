// Instantiate the app, the 'myCustApp' parameter must match what is in ng-app
//myCustApp is an Angular Module
//module() method -  declaration of the module with args as name of app, dependencies
var myCustApp = angular.module('myCustApp', ['ngCookies']);

//constant method sets to set up constants and can be used for environment configuration remembering that
// this has to be abstracted out for easy deployment and only publicly viewable config say publicly available
// dns, ip, s/b used
//Dev config
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

// controller is a Module method registers Cust controller with the Module with
// anonymous contructor function that creates the model ($scope and other dependencies injected to create model) 
myCustApp.controller('Cust', function ($scope, $location, $window, $cookieStore, $sce, $http, ENV_VARS) {
    $scope.token = $cookieStore.get('tkn');
    $scope.screen_name = $cookieStore.get('sn');
    //Validate token - returns cust if token valid.   
    var data = { "screen_name": "", "token": "" };
    data.screen_name = $scope.screen_name;
    data.token = $scope.token;
    //call rest api to get customer by posting a token. This could not be get because the token will be compromised.
    // Issue with Cross Origin Resource Sharing caused me to pivot to a string input instead of JSON
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

    //register an handler for button ng-click
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



