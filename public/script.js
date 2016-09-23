// Instantiate the app, the 'myPortal' parameter must match what is in ng-app
//myPortal is an Angular Module 
//module() method -  declaration of the module with args as name of app, dependencies
var myPortal = angular.module('myPortal', ['ngCookies']);

//constant method sets to set up constants and can be used for environment configuration remembering that
// this has to be abstracted out for easy deployment and only publicly viewable config say publicly available
// dns, ip, s/b used
//Dev config
myPortal.constant('ENV_VARS', {
    baseUrl: '/api/',
    tokenAPI: 'tokens/'
});
//http://localhost:1337/api/ also works

// config method is a module method that registers an anon function 
// and injects provider objects http provider in this case
myPortal.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

// controller is a Module method registers CustAuth controller with the Module with
// anonymous contructor function that creates the model ($scope and other dependencies injected to create model) 
myPortal.controller('CustAuth', function ($scope, $location, $window, $cookieStore, $http, ENV_VARS) {
     $scope.login = function () {
  
        if (!$scope.PIN || $scope.PIN === '' || !$scope.screen_name || $scope.screen_name === '')
        { $scope.Dbg = "invld"; }
        else
        {
            var data = { "screen_name": "", "PIN_hash": "" };
            data.screen_name = $scope.screen_name;
            data.PIN_hash = myHash($scope.PIN);

             // Call rest API to verify customer without waiting but passing a call back;
            // Issue with Cross Origin Resource Sharing caused me to pivot to a string input instead of JSON
            $http.post(ENV_VARS.baseUrl + ENV_VARS.tokenAPI,
                ';;;'+ data.screen_name + ';;;' + data.PIN_hash + ';;;',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }
            ).success(function (response) {                
                $scope.token = response.token;
                if (!$scope.token || $scope.token === '')
                    $scope.Dbg = "unauth";
                else {
                    $cookieStore.put('tkn', $scope.token);
                    $cookieStore.put('sn', $scope.screen_name);
                    window.location = $location.path() + "/Customer/Index.html";
                };
            }).error(function (response) {             
                $scope.Dbg = response;
            });   
           
        };
    }; 
    
});

myHash = function (pin) {    
    return pin;
    //not yet implemented;
};
angular.element(window.document.body).ready(function () {
    window.document.getElementById('tm').innerHTML = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
});



